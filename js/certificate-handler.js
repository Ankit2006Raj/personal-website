/**
 * Certificate Handler - Manages certificate modal interactions
 */

document.addEventListener('DOMContentLoaded', function () {
    // Wait for sections to load
    document.addEventListener('sectionsLoaded', initializeCertificateHandlers);

    // Also initialize after a short delay as fallback
    setTimeout(initializeCertificateHandlers, 1500);
});

function initializeCertificateHandlers() {
    console.log('Initializing certificate handlers...');

    // Find all certificate slides with data-cert-path
    const certSlides = document.querySelectorAll('.cert-slide[data-cert-path]');

    if (certSlides.length === 0) {
        console.warn('No certificate slides found. Retrying in 1 second...');
        setTimeout(initializeCertificateHandlers, 1000);
        return;
    }

    console.log(`Found ${certSlides.length} certificate slides`);

    certSlides.forEach((slide, index) => {
        const certPath = slide.getAttribute('data-cert-path');

        if (certPath) {
            // Remove any existing click handlers
            slide.replaceWith(slide.cloneNode(true));
            const newSlide = document.querySelectorAll('.cert-slide[data-cert-path]')[index];

            // Add click handler
            newSlide.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                console.log('Certificate clicked:', certPath);

                // Call the modal function
                if (typeof openCertModal === 'function') {
                    openCertModal(certPath);
                } else {
                    console.error('openCertModal function not found');
                    // Fallback: open image in new tab
                    window.open(certPath, '_blank');
                }
            });

            // Add hover effect
            newSlide.style.cursor = 'pointer';

            // Also add click handler to the image inside
            const certImage = newSlide.querySelector('.cert-image-container img');
            if (certImage) {
                certImage.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (typeof openCertModal === 'function') {
                        openCertModal(certPath);
                    } else {
                        window.open(certPath, '_blank');
                    }
                });
            }
        }
    });

    console.log('✓ Certificate handlers initialized for', certSlides.length, 'certificates');
}

// Make function globally available
window.initializeCertificateHandlers = initializeCertificateHandlers;
