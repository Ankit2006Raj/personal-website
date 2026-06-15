/* ========================================
   PROJECTS FILTERING
   ======================================== */

// Project Tab Switching
const projectTabs = document.querySelectorAll('.project-tab');
const projectContainers = document.querySelectorAll('.projects-container');

if (projectTabs.length > 0) {
    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');

            // Update active tab
            projectTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding container
            projectContainers.forEach(container => {
                if (container.getAttribute('data-category') === category) {
                    container.classList.add('active');
                } else {
                    container.classList.remove('active');
                }
            });
        });
    });
}

// Animate project cards on scroll
const projectCardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card-compact').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    projectCardObserver.observe(card);
});
