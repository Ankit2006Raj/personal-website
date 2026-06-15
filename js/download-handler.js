/**
 * Download Handler - Ensures resume downloads work properly
 */

document.addEventListener('DOMContentLoaded', function () {
    // Wait for sections to load
    document.addEventListener('sectionsLoaded', initializeDownloadHandlers);

    // Also initialize after a short delay as fallback
    setTimeout(initializeDownloadHandlers, 1000);
});

function initializeDownloadHandlers() {
    // Find all download resume links
    const downloadLinks = document.querySelectorAll('a[download*="Resume"], a[href*="Ankit Resum.pdf"]');

    downloadLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const downloadName = this.getAttribute('download') || 'Ankit_Raj_Resume.pdf';

            // Try to download using fetch and blob (works better in some browsers)
            if (href && href.includes('.pdf')) {
                e.preventDefault();

                fetch(href)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('File not found');
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        // Create a temporary URL for the blob
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = downloadName;

                        // Append to body, click, and remove
                        document.body.appendChild(a);
                        a.click();

                        // Clean up
                        setTimeout(() => {
                            window.URL.revokeObjectURL(url);
                            document.body.removeChild(a);
                        }, 100);
                    })
                    .catch(error => {
                        console.error('Download failed:', error);
                        // Fallback: open in new tab
                        window.open(href, '_blank');
                    });
            }
        });
    });

    console.log('✓ Download handlers initialized');
}
