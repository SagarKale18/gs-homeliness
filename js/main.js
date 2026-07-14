// mobile nav toggle styling
  const style = document.createElement('style');
  style.textContent = `nav ul.open{display:flex !important;position:absolute;top:64px;left:0;right:0;background:#f6f1e7;flex-direction:column;padding:20px 32px;gap:18px;border-bottom:1px solid rgba(33,26,20,0.14);}`;
  document.head.appendChild(style);

  // scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- LIGHTBOX ---------- */
let currentImages = [];
let currentLabels = [];
let currentIndex = 0;

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');

function openLightbox(category, images, labels, startIndex) {
  currentImages = images;
  currentLabels = labels;
  currentIndex = startIndex || 0;
  updateLightbox();
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateLightbox() {
  lightboxImg.src = currentImages[currentIndex];
  lightboxImg.alt = currentLabels[currentIndex] || '';
  lightboxCaption.textContent = currentLabels[currentIndex] || '';
  lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateLightbox();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateLightbox();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// Attach click handlers to gallery frames
document.querySelectorAll('.g-frame').forEach(frame => {
  frame.addEventListener('click', () => {
    const images = JSON.parse(frame.dataset.images || '[]');
    const labels = JSON.parse(frame.dataset.labels || '[]');
    if (images.length > 0) {
      openLightbox(frame.dataset.category, images, labels, 0);
    }
  });
});