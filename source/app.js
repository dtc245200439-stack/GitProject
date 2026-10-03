/* ==========================================================================
   CartoonHub Kids - Interactive Video Switcher & Search Engine
   ========================================================================== */

const CARTOON_VIDEOS = [
  {
    id: 'video-1',
    title: 'Doraemon Thuyết Minh - Tập 1: Chú Mèo Máy Đến Từ Tương Lai',
    thumb: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    embedUrl: 'https://www.youtube.com/embed/5qap5aO4i9A',
    views: 1250000,
    date: '2026-10-01',
    quality: 'FullHD 1080p',
    desc: 'Phim hoạt hình Doraemon thuyết minh tiếng Việt chất lượng cao. Câu chuyện về chú mèo máy thông minh Doraemon cùng những bảo bối kỳ diệu cứu giúp Nobita.'
  },
  {
    id: 'video-2',
    title: 'Tom & Jerry Thuyết Minh - Trận Chiến Mèo Và Chuột Hài Hước',
    thumb: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=300&q=80',
    embedUrl: 'https://www.youtube.com/embed/t06RUxPbp_c',
    views: 3400000,
    date: '2026-09-28',
    quality: 'HD 720p',
    desc: 'Bộ phim hoạt hình kinh điển Tom and Jerry với những pha rượt đuổi thông minh, hài hước mang lại tiếng cười sảng khoái cho trẻ em.'
  },
  {
    id: 'video-3',
    title: 'Larva Ấu Trùng Tinh Nhuệ - Tập Đặt Biệt Hài Hước',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80',
    embedUrl: 'https://www.youtube.com/embed/1-ZpHr5l0U0',
    views: 2100000,
    date: '2026-10-02',
    quality: 'FullHD 1080p',
    desc: 'Ấu Trùng Larva Đỏ và Vàng với những cuộc phiêu lưu dưới cống ngầm cực kỳ nhộn nhạo và bổ ích.'
  },
  {
    id: 'video-4',
    title: 'Peppa Pig Tiếng Việt - Những Buổi Chơi Ngoại Khóa Bổ Ích',
    thumb: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80',
    embedUrl: 'https://www.youtube.com/embed/5U37y9V-jGg',
    views: 980000,
    date: '2026-09-15',
    quality: 'HD 720p',
    desc: 'Chú heo Peppa cùng gia đình nhỏ chia sẻ những bài học giáo dục nhận thức và giao tiếp tự nhiên cho các bé thiếu nhi.'
  }
];

class CartoonApp {
  constructor() {
    this.videos = [...CARTOON_VIDEOS];
    this.currentVideo = this.videos[0];
    this.init();
  }

  init() {
    this.renderPlaylist();
    this.loadVideo(this.currentVideo);
    this.bindEvents();
  }

  renderPlaylist() {
    const playlistEl = document.getElementById('playlistMenu');
    if (!playlistEl) return;

    playlistEl.innerHTML = '';
    this.videos.forEach(video => {
      const li = document.createElement('li');
      li.className = `video-item ${video.id === this.currentVideo.id ? 'active' : ''}`;
      li.dataset.id = video.id;

      li.innerHTML = `
        <img src="${video.thumb}" alt="${video.title}" class="item-thumb">
        <div class="item-info">
          <div class="item-title">${this.escapeHtml(video.title)}</div>
          <div class="item-meta">👁️ ${this.formatNumber(video.views)} lượt xem</div>
        </div>
      `;

      li.addEventListener('click', () => {
        this.currentVideo = video;
        document.querySelectorAll('.video-item').forEach(item => item.classList.remove('active'));
        li.classList.add('active');
        this.loadVideo(video);
      });

      playlistEl.appendChild(li);
    });
  }

  loadVideo(video) {
    const iframe = document.getElementById('mainVideoIframe');
    const titleEl = document.getElementById('currentVideoTitle');
    const viewsEl = document.getElementById('currentVideoViews');
    const qualityEl = document.getElementById('currentVideoQuality');
    const descEl = document.getElementById('currentVideoDesc');

    if (iframe) iframe.src = video.embedUrl + '?autoplay=1&rel=0';
    if (titleEl) titleEl.textContent = video.title;
    if (viewsEl) viewsEl.textContent = `👁️ ${this.formatNumber(video.views)} lượt xem`;
    if (qualityEl) qualityEl.textContent = video.quality;
    if (descEl) descEl.textContent = video.desc;
  }

  bindEvents() {
    // Search Filter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.videos = CARTOON_VIDEOS.filter(v => v.title.toLowerCase().includes(query));
        this.renderPlaylist();
      });
    }

    // Sort Selector
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'views') {
          this.videos.sort((a, b) => b.views - a.views);
        } else if (val === 'latest') {
          this.videos.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        this.renderPlaylist();
      });
    }
  }

  formatNumber(num) {
    return num.toLocaleString('vi-VN');
  }

  escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cartoonApp = new CartoonApp();
});
