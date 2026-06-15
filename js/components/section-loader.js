/**
 * Section Loader - Dynamically loads HTML sections
 * This allows for modular HTML structure
 */

class SectionLoader {
    constructor() {
        this.sections = [
            { id: 'loader-section', file: 'html/sections/loader.html' },
            { id: 'navigation-section', file: 'html/sections/navigation.html' },
            { id: 'hero-section', file: 'html/sections/hero.html' },
            { id: 'about-section', file: 'html/sections/about.html' },
            { id: 'projects-section', file: 'html/sections/projects.html' },
            { id: 'experience-section', file: 'html/sections/experience.html' },
            { id: 'skills-section', file: 'html/sections/skills.html' },
            { id: 'certifications-section', file: 'html/sections/certifications.html' },
            { id: 'contact-section', file: 'html/sections/contact.html' },
            { id: 'footer-section', file: 'html/sections/footer.html' }
        ];
    }

    async loadSection(section) {
        try {
            const response = await fetch(section.file);
            if (!response.ok) {
                console.warn(`Failed to load ${section.file}`);
                return null;
            }
            const html = await response.text();
            return { id: section.id, html };
        } catch (error) {
            console.error(`Error loading ${section.file}:`, error);
            return null;
        }
    }

    async loadAllSections() {
        const promises = this.sections.map(section => this.loadSection(section));
        const results = await Promise.all(promises);

        results.forEach(result => {
            if (result && result.html) {
                const container = document.getElementById(result.id);
                if (container) {
                    container.innerHTML = result.html;
                }
            }
        });

        // Trigger custom event when all sections are loaded
        document.dispatchEvent(new CustomEvent('sectionsLoaded'));
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAllSections());
        } else {
            this.loadAllSections();
        }
    }
}

// Initialize section loader
const sectionLoader = new SectionLoader();
sectionLoader.init();
