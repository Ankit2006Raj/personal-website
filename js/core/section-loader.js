/**
 * Section Loader - Dynamically loads HTML sections
 * This keeps index.html clean and modular
 */

class SectionLoader {
    constructor() {
        this.sections = [
            { id: 'hero-section', file: 'html/sections/hero.html' },
            { id: 'about-section', file: 'html/sections/about.html' },
            { id: 'projects-section', file: 'html/sections/projects.html' },
            { id: 'github-section', file: 'html/sections/github.html' },
            { id: 'experience-section', file: 'html/sections/experience.html' },
            { id: 'skills-section', file: 'html/sections/skills.html' },
            { id: 'certifications-section', file: 'html/sections/certifications.html' },
            { id: 'contact-section', file: 'html/sections/contact.html' },
            { id: 'footer-section', file: 'html/sections/footer.html' }
        ];
        this.loadedCount = 0;
    }

    /**
     * Load all sections
     */
    async loadAll() {
        try {
            const promises = this.sections.map(section => this.loadSection(section));
            await Promise.all(promises);
            console.log('✓ All sections loaded successfully');
            this.initializeAfterLoad();
        } catch (error) {
            console.error('Error loading sections:', error);
        }
    }

    /**
     * Load a single section
     */
    async loadSection(section) {
        try {
            const response = await fetch(section.file);
            if (!response.ok) {
                throw new Error(`Failed to load ${section.file}: ${response.status}`);
            }
            const html = await response.text();
            const container = document.getElementById(section.id);
            if (container) {
                container.innerHTML = html;
                this.loadedCount++;
                console.log(`✓ Loaded: ${section.file}`);
            } else {
                console.warn(`Container not found for: ${section.id}`);
            }
        } catch (error) {
            console.error(`Error loading ${section.file}:`, error);
        }
    }

    /**
     * Initialize scripts after all sections are loaded
     */
    initializeAfterLoad() {
        // Dispatch custom event to notify that sections are loaded
        const event = new CustomEvent('sectionsLoaded');
        document.dispatchEvent(event);

        // Re-initialize any scripts that depend on the loaded content
        if (typeof initializeAnimations === 'function') {
            initializeAnimations();
        }
        if (typeof initializeFilters === 'function') {
            initializeFilters();
        }
        if (typeof initializeCertificationsCarousel === 'function') {
            initializeCertificationsCarousel();
        }
        if (typeof initializeCertificateHandlers === 'function') {
            initializeCertificateHandlers();
        }
    }
}

// Initialize section loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new SectionLoader();
    loader.loadAll();
});
