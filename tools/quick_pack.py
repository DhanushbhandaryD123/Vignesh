"""Quick packed-alpha video from white-cyclorama portrait footage.

Simple luminance-based keying that works with OpenCV 5.x without ximgproc.
"""
import cv2
import numpy as np
import subprocess
import os
import json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def smoothstep(lo, hi, x):
    t = np.clip((x - lo) / max(hi - lo, 1e-6), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def key_frame(bgr):
    """Simple but effective white-cyclorama key."""
    h, w = bgr.shape[:2]
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB).astype(np.float32)
    L = lab[:, :, 0]

    # Estimate background from border ring
    ring = 12
    border = np.zeros((h, w), np.uint8)
    border[:ring, :] = 1
    border[-ring:, :] = 1
    border[:, :ring] = 1
    border[:, -ring:] = 1
    # Only use bright border pixels
    border[L < 150] = 0
    bg_L = float(np.median(L[border > 0])) if border.any() else 220.0

    # Distance from background
    diff = np.maximum(bg_L - L, 0.0)

    # Chroma distance
    A = lab[:, :, 1] - 128.0
    B = lab[:, :, 2] - 128.0
    bg_A = float(np.median(A[border > 0])) if border.any() else 0.0
    bg_B = float(np.median(B[border > 0])) if border.any() else 0.0
    chroma_dist = np.sqrt((A - bg_A)**2 + (B - bg_B)**2)

    dist = diff * 1.0 + chroma_dist * 1.6

    # Soft alpha
    alpha = smoothstep(12, 46, dist).astype(np.float32)

    # Background connectivity: flood from edges
    bg_mask = (dist < 10).astype(np.uint8)
    bg_mask = cv2.morphologyEx(bg_mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))

    # Keep only bg connected to edges
    n, lab_cc, stats, _ = cv2.connectedComponentsWithStats(bg_mask, 8)
    touching = set()
    for edge_pixels in [lab_cc[0, :], lab_cc[-1, :], lab_cc[:, 0], lab_cc[:, -1]]:
        touching |= set(np.unique(edge_pixels).tolist())
    touching.discard(0)
    reachable = np.isin(lab_cc, list(touching)).astype(bool) if touching else np.zeros_like(bg_mask, bool)

    # Foreground mask
    fg_mask = (dist > 52).astype(np.uint8)
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))

    # Largest component
    n2, lab2, stats2, _ = cv2.connectedComponentsWithStats(fg_mask, 8)
    if n2 > 1:
        areas = stats2[1:, cv2.CC_STAT_AREA]
        biggest = 1 + int(np.argmax(areas))
        fg_mask = (lab2 == biggest).astype(np.uint8)

    # Trimap
    band = 26
    grown = cv2.dilate(fg_mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2*band+1, 2*band+1)))
    unknown = grown.astype(bool) & ~fg_mask.astype(bool)

    a = np.zeros_like(alpha)
    a[fg_mask > 0] = 1.0
    a[unknown] = alpha[unknown]
    a[unknown & (dist < 10)] = 0.0
    a[reachable & ~fg_mask.astype(bool)] = np.minimum(
        a[reachable & ~fg_mask.astype(bool)],
        alpha[reachable & ~fg_mask.astype(bool)]
    )

    # Choke and clamp
    a = np.clip((a - 0.06) / max(1e-6, 1.0 - 0.06), 0.0, 1.0)
    a = smoothstep(0.14, 0.96, a).astype(np.float32)

    # Floor guard
    y0 = int(h * 0.86)
    band_floor = a[y0:, :]
    gate = smoothstep(0.30, 0.72, band_floor)
    depth = np.linspace(0.0, 1.0, band_floor.shape[0], dtype=np.float32)[:, None]
    a[y0:, :] = band_floor * (1.0 - depth * (1.0 - gate))

    return a


def main():
    src = os.path.join(ROOT, "Gireesh video 1.mp4")
    out_w, out_h = 720, 1280
    outdir = os.path.join(ROOT, "public", "media")
    os.makedirs(outdir, exist_ok=True)

    cap = cv2.VideoCapture(src)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    end = min(240, total)

    pw, ph = out_w * 2, out_h
    mp4 = os.path.join(outdir, "hero.mp4")
    webm = os.path.join(outdir, "hero.webm")

    cmd = [
        "ffmpeg", "-v", "error", "-y",
        "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", "%dx%d" % (pw, ph),
        "-r", "24", "-i", "-",
        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "16",
        "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.1",
        "-color_range", "pc", "-movflags", "+faststart", mp4,
        "-an", "-c:v", "libvpx-vp9", "-crf", "26", "-b:v", "0",
        "-row-mt", "1", "-cpu-used", "3", "-pix_fmt", "yuv420p", webm,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    prev = None
    written = 0
    for i in range(end):
        ok, fr = cap.read()
        if not ok:
            break
        a = key_frame(fr)

        # Temporal smoothing (motion-adaptive)
        if prev is not None:
            w = np.clip(0.55 + np.abs(a - prev) * 2.5, 0.0, 1.0)
            a = w * a + (1.0 - w) * prev
        prev = a

        # Premultiplied colour
        col = fr.astype(np.float32) * a[..., None]
        col = cv2.resize(col, (out_w, out_h), interpolation=cv2.INTER_AREA)
        m = cv2.resize(a, (out_w, out_h), interpolation=cv2.INTER_AREA)
        mat = np.repeat((m * 255.0)[..., None], 3, axis=2)
        packed = np.concatenate([np.clip(col, 0, 255), np.clip(mat, 0, 255)], 1)
        proc.stdin.write(packed.astype(np.uint8).tobytes())
        written += 1

        if i % 30 == 0:
            print("  frame %d/%d" % (i, end), flush=True)

    proc.stdin.close()
    proc.wait()
    cap.release()

    # Poster
    cap2 = cv2.VideoCapture(mp4)
    ok, poster_fr = cap2.read()
    cap2.release()
    if ok:
        cv2.imwrite(os.path.join(outdir, "hero.jpg"),
                    poster_fr[:, :out_w], [cv2.IMWRITE_JPEG_QUALITY, 82])

    # Update manifest
    mpath = os.path.join(outdir, "manifest.json")
    man = json.load(open(mpath, encoding="utf-8"))
    man["clips"]["hero"]["w"] = out_w
    man["clips"]["hero"]["h"] = out_h
    man["clips"]["hero"]["frames"] = written
    json.dump(man, open(mpath, "w", encoding="utf-8"), indent=2)

    print("Done: %d frames encoded" % written)
    return written


if __name__ == "__main__":
    main()
