/* ========================================
   MODAL FUNCTIONALITY
   ======================================== */

// Certificate Modal Functions
function openCertModal(certPath) {
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('certModalImage');
    const downloadBtn = document.getElementById('certDownloadBtn');

    if (modal && modalImage) {
        modalImage.src = certPath;
        if (downloadBtn) {
            downloadBtn.href = certPath;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function showAllCertificates() {
    const galleryModal = document.getElementById('certGalleryModal');
    if (galleryModal) {
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertGallery() {
    const galleryModal = document.getElementById('certGalleryModal');
    if (galleryModal) {
        galleryModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modals on outside click
window.onclick = function (event) {
    const certModal = document.getElementById('certModal');
    const galleryModal = document.getElementById('certGalleryModal');

    if (event.target === certModal) {
        closeCertModal();
    }
    if (event.target === galleryModal) {
        closeCertGallery();
    }
}

// Close modals on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertModal();
        closeCertGallery();
    }
});

// Make functions globally available
window.openCertModal = openCertModal;
window.closeCertModal = closeCertModal;
window.showAllCertificates = showAllCertificates;
window.closeCertGallery = closeCertGallery;
