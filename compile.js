const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'index.template.html');
const outputPath = path.join(__dirname, 'index.html');

// Create index.template.html from index.html if it doesn't exist
if (!fs.existsSync(templatePath)) {
    console.log('Creating index.template.html from current index.html...');
    fs.copyFileSync(outputPath, templatePath);
}

const sections = [
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

let template = fs.readFileSync(templatePath, 'utf8');

sections.forEach(section => {
    const sectionPath = path.join(__dirname, section.file);
    if (fs.existsSync(sectionPath)) {
        const sectionContent = fs.readFileSync(sectionPath, 'utf8');
        const target = `<div id="${section.id}"></div>`;
        const replacement = `<div id="${section.id}">\n${sectionContent}\n</div>`;
        template = template.replace(target, replacement);
        console.log(`✓ Compiled section: ${section.id}`);
    } else {
        console.warn(`⚠ Warning: Section file not found: ${section.file}`);
    }
});

// Replace dynamic section loader with static dispatcher script
const loaderTag = '<script src="./js/core/section-loader.js" defer></script>';
const staticDispatcher = `<!-- Section loader removed (compiled statically) -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Static Compilation: Dispatching sectionsLoaded event');
            document.dispatchEvent(new CustomEvent('sectionsLoaded'));
        });
    </script>`;

if (template.includes(loaderTag)) {
    template = template.replace(loaderTag, staticDispatcher);
} else if (!template.includes('sectionsLoaded')) {
    // Add fallback dispatcher inside head or body
    template = template.replace('</head>', `${staticDispatcher}\n</head>`);
}

fs.writeFileSync(outputPath, template, 'utf8');
console.log('✓ Compiled production index.html successfully!');
