// ==========================================================================
// WORK ARCHIVE CONTROLLER
// Category filtering, lazy previewing, and theater lightbox player
// ==========================================================================

const CATEGORIES = [
  { id: 'all', title: 'All Projects', count: 50 },
  { id: 'ai-videos', title: 'AI Concept Films', count: 5, folder: 'ai-videos' },
  { id: 'marketing-videos', title: 'Marketing & Commercials', count: 10, folder: 'marketing-videos' },
  { id: 'socail-media-reels', title: 'Social Media Reels', count: 13, folder: 'socail-media-reels', isVertical: true },
  { id: 'events-higlights', title: 'Events & Highlights', count: 8, folder: 'events-higlights' },
  { id: 'promotional-videos', title: 'Promotional Films', count: 7, folder: 'promotional-videos' },
  { id: 'interior-videos', title: 'Interior & Architectural', count: 4, folder: 'interior-videos' },
  { id: 'wedding-video-editing', title: 'Wedding Films & Stories', count: 2, folder: 'wedding-video-editing' },
  { id: 'album-song', title: 'Music & Album Songs', count: 1, folder: 'album-song' },
];

const VIDEOS = [
  // AI Videos
  {
    id: 'ai-1',
    category: 'ai-videos',
    title: 'Bharath Marketing Commercial',
    file: 'bharath-marketing-20-06.mp4',
    relPath: 'public/assets/ai-videos/bharath-marketing-20-06.mp4',
    isVertical: false,
  },
  {
    id: 'ai-2',
    category: 'ai-videos',
    title: 'BM Visual Concept & Grading',
    file: 'bm-18-07.mp4',
    relPath: 'public/assets/ai-videos/bm-18-07.mp4',
    isVertical: false,
  },
  {
    id: 'ai-3',
    category: 'ai-videos',
    title: 'Brown Wood Architectural Study',
    file: 'brown-wood-17-07.mp4',
    relPath: 'public/assets/ai-videos/brown-wood-17-07.mp4',
    isVertical: false,
  },
  {
    id: 'ai-4',
    category: 'ai-videos',
    title: 'Malhar Cinematic AI Vision',
    file: 'malhar-18-08.mp4',
    relPath: 'public/assets/ai-videos/malhar-18-08.mp4',
    isVertical: false,
  },
  {
    id: 'ai-5',
    category: 'ai-videos',
    title: 'Soorya Bhagya AI Atmosphere',
    file: 'soorya-bhagya-24-06.mp4',
    relPath: 'public/assets/ai-videos/soorya-bhagya-24-06.mp4',
    isVertical: false,
  },

  // Album Song
  {
    id: 'album-1',
    category: 'album-song',
    title: 'Aakasha Deepavu — Music Video',
    file: 'aakasha-deepavu-1.mp4',
    relPath: 'public/assets/album-song/aakasha-deepavu-1.mp4',
    isVertical: false,
  },

  // Events & Highlights
  {
    id: 'ev-1',
    category: 'events-higlights',
    title: 'Baby Model High Fashion Shoot',
    file: 'baby-model.mp4',
    relPath: 'public/assets/events-higlights/baby-model.mp4',
    isVertical: false,
  },
  {
    id: 'ev-2',
    category: 'events-higlights',
    title: 'Dream Events Grand Gathering',
    file: 'dream-events-03-06.mp4',
    relPath: 'public/assets/events-higlights/dream-events-03-06.mp4',
    isVertical: false,
  },
  {
    id: 'ev-3',
    category: 'events-higlights',
    title: 'Architectural Estate Tour',
    file: 'house-tour-2.mp4',
    relPath: 'public/assets/events-higlights/house-tour-2.mp4',
    isVertical: false,
  },
  {
    id: 'ev-4',
    category: 'events-higlights',
    title: 'Kamalashile Heritage Celebration',
    file: 'kamalashile.mp4',
    relPath: 'public/assets/events-higlights/kamalashile.mp4',
    isVertical: false,
  },
  {
    id: 'ev-5',
    category: 'events-higlights',
    title: 'Parvah Festival Chapter II',
    file: 'parvah-2-25-05.mp4',
    relPath: 'public/assets/events-higlights/parvah-2-25-05.mp4',
    isVertical: false,
  },
  {
    id: 'ev-6',
    category: 'events-higlights',
    title: 'Parvah Live Acoustic Performance',
    file: 'parvah-music-singer-1.mp4',
    relPath: 'public/assets/events-higlights/parvah-music-singer-1.mp4',
    isVertical: false,
  },
  {
    id: 'ev-7',
    category: 'events-higlights',
    title: 'Preethi & Prasanna Highlights',
    file: 'preethi-and-prasanna-highlights.mp4',
    relPath: 'public/assets/events-higlights/preethi-and-prasanna-highlights.mp4',
    isVertical: false,
  },
  {
    id: 'ev-8',
    category: 'events-higlights',
    title: 'Zutto Music Jam Session',
    file: 'zutto-reel-6-music-jamming.mp4',
    relPath: 'public/assets/events-higlights/zutto-reel-6-music-jamming.mp4',
    isVertical: false,
  },

  // Interior Videos
  {
    id: 'int-1',
    category: 'interior-videos',
    title: 'Modern Kitchen & Dining Experience',
    file: 'kitchen-dinning-and-wet-kitchen-1.mp4',
    relPath: 'public/assets/interior-videos/kitchen-dinning-and-wet-kitchen-1.mp4',
    isVertical: false,
  },
  {
    id: 'int-2',
    category: 'interior-videos',
    title: 'Parva Interior Atmosphere I',
    file: 'parva-10-06.mp4',
    relPath: 'public/assets/interior-videos/parva-10-06.mp4',
    isVertical: false,
  },
  {
    id: 'int-3',
    category: 'interior-videos',
    title: 'Parva Architectural Design II',
    file: 'parva-25-07.mp4',
    relPath: 'public/assets/interior-videos/parva-25-07.mp4',
    isVertical: false,
  },
  {
    id: 'int-4',
    category: 'interior-videos',
    title: 'Luxury Villa Tour & Ambience',
    file: 'villa-1.mp4',
    relPath: 'public/assets/interior-videos/villa-1.mp4',
    isVertical: false,
  },

  // Marketing Videos
  {
    id: 'mkt-1',
    category: 'marketing-videos',
    title: 'Hanuman Brand Campaign 06-04',
    file: 'hanuman-06-04.mp4',
    relPath: 'public/assets/marketing-videos/hanuman-06-04.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-2',
    category: 'marketing-videos',
    title: 'Hanuman Brand Showcase 18-08',
    file: 'hanuman-18-08.mp4',
    relPath: 'public/assets/marketing-videos/hanuman-18-08.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-3',
    category: 'marketing-videos',
    title: 'Hanuman Silks Heritage TVC',
    file: 'hanuman-silk-07-07-1.mp4',
    relPath: 'public/assets/marketing-videos/hanuman-silk-07-07-1.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-4',
    category: 'marketing-videos',
    title: 'Hanuman Silks Festive Collection',
    file: 'hanuman-silk-10-04.mp4',
    relPath: 'public/assets/marketing-videos/hanuman-silk-10-04.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-5',
    category: 'marketing-videos',
    title: 'Hanuman Silks Master Commercial',
    file: 'hanuman-silk-18-04-1.mp4',
    relPath: 'public/assets/marketing-videos/hanuman-silk-18-04-1.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-6',
    category: 'marketing-videos',
    title: 'Hero Motocorp Dynamic Spot',
    file: 'hero-14-07-1.mp4',
    relPath: 'public/assets/marketing-videos/hero-14-07-1.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-7',
    category: 'marketing-videos',
    title: 'Koppas Brand Identity Commercial',
    file: 'koppas-13-07.mp4',
    relPath: 'public/assets/marketing-videos/koppas-13-07.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-8',
    category: 'marketing-videos',
    title: 'MSDC Corporate Impact Film',
    file: 'msdc-22-06.mp4',
    relPath: 'public/assets/marketing-videos/msdc-22-06.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-9',
    category: 'marketing-videos',
    title: 'Sagar Lifestyle Commercial',
    file: 'sagar-17-08.mp4',
    relPath: 'public/assets/marketing-videos/sagar-17-08.mp4',
    isVertical: false,
  },
  {
    id: 'mkt-10',
    category: 'marketing-videos',
    title: 'Vida EV Motion Showcase',
    file: 'vida.mp4',
    relPath: 'public/assets/marketing-videos/vida.mp4',
    isVertical: false,
  },

  // Promotional Videos
  {
    id: 'pro-1',
    category: 'promotional-videos',
    title: 'Advanced Surveillance Promo',
    file: 'cctv-1.mp4',
    relPath: 'public/assets/promotional-videos/cctv-1.mp4',
    isVertical: false,
  },
  {
    id: 'pro-2',
    category: 'promotional-videos',
    title: 'Hyundai Exter Launch Campaign',
    file: 'hyundai-exter-2.mp4',
    relPath: 'public/assets/promotional-videos/hyundai-exter-2.mp4',
    isVertical: false,
  },
  {
    id: 'pro-3',
    category: 'promotional-videos',
    title: 'Nectar Treats Gourmet Spot',
    file: 'nectartreats-3.mp4',
    relPath: 'public/assets/promotional-videos/nectartreats-3.mp4',
    isVertical: false,
  },
  {
    id: 'pro-4',
    category: 'promotional-videos',
    title: 'Parvaa Brand Exploration',
    file: 'parvaa-explore.mp4',
    relPath: 'public/assets/promotional-videos/parvaa-explore.mp4',
    isVertical: false,
  },
  {
    id: 'pro-5',
    category: 'promotional-videos',
    title: 'Soorya Bhagya Festival Promo',
    file: 'soorya-bhagya-16-03-1.mp4',
    relPath: 'public/assets/promotional-videos/soorya-bhagya-16-03-1.mp4',
    isVertical: false,
  },
  {
    id: 'pro-6',
    category: 'promotional-videos',
    title: 'Sulthan Luxury Watches Feature',
    file: 'sulthan-watches-3.mp4',
    relPath: 'public/assets/promotional-videos/sulthan-watches-3.mp4',
    isVertical: false,
  },
  {
    id: 'pro-7',
    category: 'promotional-videos',
    title: 'Zutto Lifestyle Promo Cut',
    file: 'zutto-explore.mp4',
    relPath: 'public/assets/promotional-videos/zutto-explore.mp4',
    isVertical: false,
  },

  // Social Media Reels (Vertical 9:16)
  {
    id: 'reel-1',
    category: 'socail-media-reels',
    title: 'Urban Living Aesthetic Reel',
    file: 'house-girl-video-1.mp4',
    relPath: 'public/assets/socail-media-reels/house-girl-video-1.mp4',
    isVertical: true,
  },
  {
    id: 'reel-2',
    category: 'socail-media-reels',
    title: 'Neo Fashion Beat Reel',
    file: 'neo-12-06.mp4',
    relPath: 'public/assets/socail-media-reels/neo-12-06.mp4',
    isVertical: true,
  },
  {
    id: 'reel-3',
    category: 'socail-media-reels',
    title: 'Parva Persona Spotlight',
    file: 'parva-madam.mp4',
    relPath: 'public/assets/socail-media-reels/parva-madam.mp4',
    isVertical: true,
  },
  {
    id: 'reel-4',
    category: 'socail-media-reels',
    title: 'Preeti Celebratory Reel',
    file: 'preeti-akka-1.mp4',
    relPath: 'public/assets/socail-media-reels/preeti-akka-1.mp4',
    isVertical: true,
  },
  {
    id: 'reel-5',
    category: 'socail-media-reels',
    title: 'Prism Dynamic Beat Cut',
    file: 'prism-2nd.mp4',
    relPath: 'public/assets/socail-media-reels/prism-2nd.mp4',
    isVertical: true,
  },
  {
    id: 'reel-6',
    category: 'socail-media-reels',
    title: 'Puttalaxmi Vibrant Energy',
    file: 'puttalaxmi.mp4',
    relPath: 'public/assets/socail-media-reels/puttalaxmi.mp4',
    isVertical: true,
  },
  {
    id: 'reel-7',
    category: 'socail-media-reels',
    title: 'Sachin Cinematic Portrait',
    file: 'sachin-bro-2.mp4',
    relPath: 'public/assets/socail-media-reels/sachin-bro-2.mp4',
    isVertical: true,
  },
  {
    id: 'reel-8',
    category: 'socail-media-reels',
    title: 'SBK Kinetic Story 02-08',
    file: 'sbk-02-08-1.mp4',
    relPath: 'public/assets/socail-media-reels/sbk-02-08-1.mp4',
    isVertical: true,
  },
  {
    id: 'reel-9',
    category: 'socail-media-reels',
    title: 'SBK Fast-Paced Edit 13-07',
    file: 'sbk-13-07-re.mp4',
    relPath: 'public/assets/socail-media-reels/sbk-13-07-re.mp4',
    isVertical: true,
  },
  {
    id: 'reel-10',
    category: 'socail-media-reels',
    title: 'SVS Studio Reel Session',
    file: 'svs-reel-5.mp4',
    relPath: 'public/assets/socail-media-reels/svs-reel-5.mp4',
    isVertical: true,
  },
  {
    id: 'reel-11',
    category: 'socail-media-reels',
    title: 'Trading & Tech Momentum',
    file: 'trading-14-07.mp4',
    relPath: 'public/assets/socail-media-reels/trading-14-07.mp4',
    isVertical: true,
  },
  {
    id: 'reel-12',
    category: 'socail-media-reels',
    title: 'Market Trading Dynamics',
    file: 'trading.mp4',
    relPath: 'public/assets/socail-media-reels/trading.mp4',
    isVertical: true,
  },
  {
    id: 'reel-13',
    category: 'socail-media-reels',
    title: 'Zutto Nightlife Reel Cut',
    file: 'zutto-reel-02.mp4',
    relPath: 'public/assets/socail-media-reels/zutto-reel-02.mp4',
    isVertical: true,
  },

  // Wedding Films
  {
    id: 'wed-1',
    category: 'wedding-video-editing',
    title: 'Cinematic Engagement Story',
    file: 'engagement-video.mp4',
    relPath: 'public/assets/wedding-video-editing/engagement-video.mp4',
    isVertical: false,
  },
  {
    id: 'wed-2',
    category: 'wedding-video-editing',
    title: 'Navya & Ganesh Wedding Highlights',
    file: 'navya-ganesh-1.mp4',
    relPath: 'public/assets/wedding-video-editing/navya-ganesh-1.mp4',
    isVertical: false,
  },
];

// App State
let activeCategory = 'all';
let searchQuery = '';
let currentVideoIndex = -1;
let currentVisibleVideos = [];

// DOM References
const tabsContainer = document.getElementById('workTabs');
const searchInput = document.getElementById('workSearchInput');
const contentContainer = document.getElementById('workContent');
const modal = document.getElementById('theaterModal');
const modalDialog = document.getElementById('theaterDialog');
const modalVideo = document.getElementById('theaterVideo');
const modalCat = document.getElementById('theaterCat');
const modalTitle = document.getElementById('theaterTitle');
const modalClose = document.getElementById('theaterClose');
const modalPrev = document.getElementById('theaterPrev');
const modalNext = document.getElementById('theaterNext');
const modalLoader = document.getElementById('theaterLoader');
const modalBigPlay = document.getElementById('theaterBigPlay');
const modalUnmuteTip = document.getElementById('theaterUnmuteTip');
const modalFullscreen = document.getElementById('theaterFullscreen');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTabs();
  renderContent();
  setupEvents();
  setupHUDHeaderRule();
});

// Build Tabs
function renderTabs() {
  tabsContainer.innerHTML = CATEGORIES.map((cat) => `
    <button class="work-tab ${cat.id === activeCategory ? 'is-active' : ''}" data-cat="${cat.id}">
      <span>${cat.title}</span>
      <span class="work-tab__count">${cat.count}</span>
    </button>
  `).join('');

  tabsContainer.querySelectorAll('.work-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const catId = tab.getAttribute('data-cat');
      setCategory(catId);
    });
  });
}

function setCategory(catId) {
  activeCategory = catId;
  tabsContainer.querySelectorAll('.work-tab').forEach((t) => {
    t.classList.toggle('is-active', t.getAttribute('data-cat') === catId);
  });
  renderContent();

  // Scroll smoothly to section if specific category chosen
  if (catId !== 'all') {
    const el = document.getElementById(`cat-${catId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Render Videos Grouped By Category
function renderContent() {
  const query = searchQuery.trim().toLowerCase();
  
  // Filter all matching items
  const matched = VIDEOS.filter((v) => {
    const matchesCat = activeCategory === 'all' || v.category === activeCategory;
    const matchesQuery = !query || v.title.toLowerCase().includes(query) || v.file.toLowerCase().includes(query);
    return matchesCat && matchesQuery;
  });

  currentVisibleVideos = matched;

  if (matched.length === 0) {
    contentContainer.innerHTML = `
      <div style="text-align: center; padding: 100px 20px; color: var(--dim);">
        <p style="font-size: 20px; text-transform: uppercase; letter-spacing: 0.1em; color: #fff;">No films found matching "${searchQuery}"</p>
        <p style="font-size: 14px;">Try searching for a different keyword or select another category above.</p>
      </div>
    `;
    return;
  }

  // Group by Category
  const categoriesToRender = activeCategory === 'all'
    ? CATEGORIES.filter((c) => c.id !== 'all')
    : CATEGORIES.filter((c) => c.id === activeCategory);

  let html = '';

  for (const cat of categoriesToRender) {
    const catVideos = matched.filter((v) => v.category === cat.id);
    if (catVideos.length === 0) continue;

    const isReels = cat.id === 'socail-media-reels';

    html += `
      <section class="category-group" id="cat-${cat.id}">
        <header class="category-header">
          <div class="category-header__left">
            <h2 class="category-title">${cat.title}</h2>
            <span class="category-badge">${catVideos.length} ${catVideos.length === 1 ? 'Film' : 'Films'}</span>
          </div>
          <span class="category-meta">• ${isReels ? '9:16 Vertical Reel Format' : 'Cinematic 16:9'} •</span>
        </header>

        <div class="video-grid ${isReels ? 'video-grid--reels' : ''}">
          ${catVideos.map((video) => renderCard(video)).join('')}
        </div>
      </section>
    `;
  }

  contentContainer.innerHTML = html;

  // Setup Lazy Video Observers and Click Listeners
  setupCards();
}

const R2_CDN = 'https://pub-106712c34ecf4a41864eac3b5eb2058e.r2.dev';

function getVideoUrl(video) {
  // If running locally, use local files
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return video.relPath;
  }
  // When live on Vercel, stream high-speed directly from Cloudflare R2 CDN!
  return `${R2_CDN}/${video.category}/${video.file}`;
}

function renderCard(video) {
  const catObj = CATEGORIES.find((c) => c.id === video.category);
  const videoUrl = getVideoUrl(video);
  return `
    <article class="video-card" data-video-id="${video.id}">
      <div class="video-card__media">
        <video 
          preload="metadata" 
          muted 
          playsinline 
          loop 
          data-src="${videoUrl}">
        </video>
        <div class="video-card__overlay">
          <div class="video-card__play">
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>
      </div>
      <div class="video-card__info">
        <span class="video-card__cat">${catObj ? catObj.title : video.category}</span>
        <h3 class="video-card__title">${video.title}</h3>
        <div class="video-card__meta">
          <span>Click to watch</span>
          <span>Full HD · 1080p</span>
        </div>
      </div>
    </article>
  `;
}

// Setup interactions on cards
function setupCards() {
  const cards = contentContainer.querySelectorAll('.video-card');

  // Lazy load video src when card approaches viewport
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const v = entry.target;
            if (!v.src && v.getAttribute('data-src')) {
              v.src = v.getAttribute('data-src');
              v.load();
              // Render crisp frame once ready
              v.addEventListener('loadeddata', () => {
                if (v.currentTime === 0) {
                  v.currentTime = 0.05;
                }
              }, { once: true });
            }
            obs.unobserve(v);
          }
        });
      }, { rootMargin: '300px' })
    : null;

  cards.forEach((card) => {
    const videoId = card.getAttribute('data-video-id');
    const videoEl = card.querySelector('video');

    if (observer && videoEl) {
      observer.observe(videoEl);
    } else if (videoEl && !videoEl.src) {
      videoEl.src = videoEl.getAttribute('data-src');
    }

    // Hover to preview in card
    card.addEventListener('mouseenter', () => {
      if (!videoEl.src && videoEl.getAttribute('data-src')) {
        videoEl.src = videoEl.getAttribute('data-src');
      }
      if (videoEl.paused) {
        videoEl.play().catch(() => {});
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!videoEl.paused) {
        videoEl.pause();
        videoEl.currentTime = 0.05;
      }
    });

    // Click to open in Lightbox Theater with audio and full controls
    card.addEventListener('click', () => {
      openTheater(videoId);
    });
  });
}

// Theater Lightbox
function openTheater(videoId) {
  const idx = currentVisibleVideos.findIndex((v) => v.id === videoId);
  if (idx === -1) return;

  currentVideoIndex = idx;
  const video = currentVisibleVideos[currentVideoIndex];
  const catObj = CATEGORIES.find((c) => c.id === video.category);
  const videoUrl = getVideoUrl(video);

  modalCat.textContent = catObj ? catObj.title : video.category;
  modalTitle.textContent = video.title;

  // Open modal
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Sizing based on predefined flag
  modalDialog.classList.toggle('is-vertical', !!video.isVertical);

  // Show buffer loader & hide other overlays
  if (modalLoader) modalLoader.classList.add('is-visible');
  if (modalBigPlay) modalBigPlay.classList.remove('is-visible');
  if (modalUnmuteTip) modalUnmuteTip.classList.remove('is-visible');

  // Load and play video in Full HD from Cloudflare R2
  modalVideo.src = videoUrl;
  modalVideo.currentTime = 0;
  modalVideo.load();
  modalVideo.muted = false; // Try unmuted sound first

  // Auto-adapt aspect ratio dynamically from actual video dimensions
  modalVideo.onloadedmetadata = () => {
    const isVert = modalVideo.videoHeight > modalVideo.videoWidth;
    modalDialog.classList.toggle('is-vertical', isVert);
  };

  // Safe play handling
  const playPromise = modalVideo.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      if (modalLoader) modalLoader.classList.remove('is-visible');
    }).catch((err) => {
      console.warn("Autoplay with sound restricted, playing muted with unmute option:", err);
      modalVideo.muted = true;
      modalVideo.play().then(() => {
        if (modalLoader) modalLoader.classList.remove('is-visible');
        if (modalUnmuteTip) modalUnmuteTip.classList.add('is-visible');
      }).catch(() => {
        if (modalLoader) modalLoader.classList.remove('is-visible');
        if (modalBigPlay) modalBigPlay.classList.add('is-visible');
      });
    });
  }
}

function closeTheater() {
  modal.classList.remove('is-open');
  modalVideo.pause();
  modalVideo.src = '';
  document.body.style.overflow = '';
  if (modalLoader) modalLoader.classList.remove('is-visible');
  if (modalBigPlay) modalBigPlay.classList.remove('is-visible');
  if (modalUnmuteTip) modalUnmuteTip.classList.remove('is-visible');
}

function nextTheaterVideo() {
  if (currentVisibleVideos.length === 0) return;
  currentVideoIndex = (currentVideoIndex + 1) % currentVisibleVideos.length;
  openTheater(currentVisibleVideos[currentVideoIndex].id);
}

function prevTheaterVideo() {
  if (currentVisibleVideos.length === 0) return;
  currentVideoIndex = (currentVideoIndex - 1 + currentVisibleVideos.length) % currentVisibleVideos.length;
  openTheater(currentVisibleVideos[currentVideoIndex].id);
}

// Global Event Listeners
function setupEvents() {
  // Search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderContent();
  });

  // Modal Buttons
  modalClose.addEventListener('click', closeTheater);
  modalNext.addEventListener('click', nextTheaterVideo);
  modalPrev.addEventListener('click', prevTheaterVideo);

  // Fullscreen button
  if (modalFullscreen) {
    modalFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (modalVideo.requestFullscreen) {
          modalVideo.requestFullscreen();
        } else if (modalVideo.webkitRequestFullscreen) {
          modalVideo.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  // Video playback events inside theater
  modalVideo.addEventListener('waiting', () => {
    if (modalLoader) modalLoader.classList.add('is-visible');
  });

  modalVideo.addEventListener('playing', () => {
    if (modalLoader) modalLoader.classList.remove('is-visible');
    if (modalBigPlay) modalBigPlay.classList.remove('is-visible');
  });

  modalVideo.addEventListener('canplay', () => {
    if (modalLoader) modalLoader.classList.remove('is-visible');
  });

  modalVideo.addEventListener('pause', () => {
    if (modalLoader) modalLoader.classList.remove('is-visible');
    if (!modalVideo.ended && modalBigPlay) {
      modalBigPlay.classList.add('is-visible');
    }
  });

  // Big play button click
  if (modalBigPlay) {
    modalBigPlay.addEventListener('click', (e) => {
      e.stopPropagation();
      modalVideo.play();
    });
  }

  // Click directly on video to toggle play/pause
  modalVideo.addEventListener('click', (e) => {
    if (modalVideo.paused) {
      modalVideo.play();
    } else {
      modalVideo.pause();
    }
  });

  // Unmute banner click
  if (modalUnmuteTip) {
    modalUnmuteTip.addEventListener('click', (e) => {
      e.stopPropagation();
      modalVideo.muted = false;
      modalUnmuteTip.classList.remove('is-visible');
    });
  }

  // Click outside dialog to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTheater();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeTheater();
    if (e.key === 'ArrowRight') nextTheaterVideo();
    if (e.key === 'ArrowLeft') prevTheaterVideo();
    if (e.key === ' ') {
      e.preventDefault();
      if (modalVideo.paused) modalVideo.play();
      else modalVideo.pause();
    }
    if (e.key === 'f' || e.key === 'F') {
      if (modalFullscreen) modalFullscreen.click();
    }
  });

  // Mobile menu burger toggle
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !open);
      menu.hidden = open;
    });
  }
}

// Chamfered Header Bracket Drawing (Matches Index page HUD underline)
function setupHUDHeaderRule() {
  const rulePath = document.getElementById('hdrRulePath');
  const rule = document.getElementById('hdrRule');
  if (!rulePath || !rule) return;

  const updateRule = () => {
    const w = window.innerWidth;
    const h = rule.clientHeight || 70;
    const chamfer = 14;
    const edge = Math.max(14, w * 0.02);

    // polyline coords matching the HUD bracket
    const pts = [
      `${edge},${h - chamfer * 2}`,
      `${edge + chamfer},${h - chamfer}`,
      `${w - edge - chamfer},${h - chamfer}`,
      `${w - edge},${h - chamfer * 2}`
    ].join(' ');

    rulePath.setAttribute('points', pts);
    const len = rulePath.getTotalLength() || 2000;
    rule.style.setProperty('--len', len);
    rulePath.style.strokeDasharray = len;
    rulePath.style.strokeDashoffset = '0';
  };

  updateRule();
  window.addEventListener('resize', updateRule);
}
