// ========================================
// CERTIFICATIONS CAROUSEL & FILTERING
// ========================================

let originalSlides = [];
let isCarouselPaused = false;
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    // Check if sections loaded, if so initialize, else wait for the section loader event
    const eventHandler = () => {
        if (document.getElementById('certCarousel')) {
            initializeCertificationsSystem();
            document.removeEventListener('sectionsLoaded', eventHandler);
        }
    };
    
    document.addEventListener('sectionsLoaded', eventHandler);
    
    // Fallback if sectionsLoaded already fired
    setTimeout(() => {
        if (document.getElementById('certCarousel') && originalSlides.length === 0) {
            initializeCertificationsSystem();
        }
    }, 1000);
});

function initializeCertificationsSystem() {
    const track = document.getElementById('certCarousel');
    if (!track) return;
    
    console.log('Certifications system initializing... 🎓');
    
    // Save original slide references (non-duplicated)
    originalSlides = Array.from(track.children);
    
    // Initialize filter listeners
    initCertFilters();
    
    // Load default view (all slides duplicated)
    applyFilter('all');
    
    // Set up certificate click events
    initCertificateClickHandlers();
    
    // Set up modal background clicks
    initModalCloseHandlers();
}

function initCertFilters() {
    const filterButtons = document.querySelectorAll('.cert-filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            if (!category || category === currentFilter) return;
            
            // Toggle active styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply filter
            applyFilter(category);
        });
    });
}

function applyFilter(category) {
    const track = document.getElementById('certCarousel');
    if (!track) return;
    
    currentFilter = category;
    
    // Clear track
    track.innerHTML = '';
    
    // Filter matching slides
    const filteredSlides = originalSlides.filter(slide => {
        const slideCat = slide.getAttribute('data-category');
        return category === 'all' || slideCat === category;
    });
    
    // Append matching slides
    filteredSlides.forEach(slide => {
        // Clone original to avoid moving DOM nodes
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Duplicate for infinite scrolling track (requires minimum width to scroll nicely)
    if (filteredSlides.length > 0) {
        // If there are very few items, duplicate multiple times to avoid blank space gaps
        const repeatCount = filteredSlides.length < 5 ? Math.ceil(10 / filteredSlides.length) : 2;
        
        for (let r = 1; r < repeatCount; r++) {
            filteredSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                track.appendChild(clone);
            });
        }
    }
    
    // Force CSS animation refresh/reflow
    track.style.animation = 'none';
    track.offsetHeight; // trigger reflow
    
    // Adjust speed based on card count
    const speed = Math.max(30, filteredSlides.length * 6);
    track.style.animation = `scroll-left ${speed}s linear infinite`;
    
    // Apply pause status
    if (isCarouselPaused) {
        track.style.animationPlayState = 'paused';
    } else {
        track.style.animationPlayState = 'running';
    }
}

// Click to zoom certificate
function initCertificateClickHandlers() {
    const track = document.getElementById('certCarousel');
    if (!track) return;
    
    // Remove old listeners by using event delegation directly on the track
    track.addEventListener('click', (e) => {
        const slide = e.target.closest('.cert-slide');
        if (slide) {
            const path = slide.getAttribute('data-cert-path');
            if (path) {
                openCertModal(path);
            }
        }
    });
}

// Pause/Play controls
function toggleCarousel() {
    const track = document.getElementById('certCarousel');
    const pauseBtn = document.getElementById('pauseBtn');
    if (!track || !pauseBtn) return;
    
    isCarouselPaused = !isCarouselPaused;
    
    if (isCarouselPaused) {
        track.style.animationPlayState = 'paused';
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume Scrolling';
    } else {
        track.style.animationPlayState = 'running';
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Scrolling';
    }
}

// Modal zoom handler
function openCertModal(certPath) {
    console.log('Zooming certificate image:', certPath);
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImage');
    const downloadBtn = document.getElementById('certDownloadBtn');
    
    if (modal && modalImg && downloadBtn) {
        modalImg.src = certPath;
        downloadBtn.href = certPath;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        const modalImg = document.getElementById('certModalImage');
        if (modalImg) {
            setTimeout(() => {
                modalImg.src = '';
            }, 300);
        }
    }
}

function initModalCloseHandlers() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                closeCertModal();
            }
        });
    }
}

// Key bindings
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
    }
});

// Global bindings
window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;
window.toggleCarousel = toggleCarousel;
window.initializeCertificationsCarousel = initializeCertificationsSystem; // backward compatibility
