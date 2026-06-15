/* ========================================
   PROJECT & SKILL FILTERS
   ======================================== */

function initializeFilters() {
    // Project Tab Switching
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectContainers = document.querySelectorAll('.projects-container');
    const sliderPill = document.querySelector('.tabs-slider-pill');

    function updateSlider(activeTab) {
        if (sliderPill && activeTab) {
            sliderPill.style.width = `${activeTab.offsetWidth}px`;
            sliderPill.style.left = `${activeTab.offsetLeft}px`;
        }
    }

    if (projectTabs.length > 0) {
        // Initial load positioning
        const initialActive = document.querySelector('.project-tab.active');
        if (initialActive) {
            setTimeout(() => updateSlider(initialActive), 150);
        }

        projectTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');

                // Update active tab
                projectTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                updateSlider(tab);

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

        // Resize support
        window.addEventListener('resize', () => {
            const currentActive = document.querySelector('.project-tab.active');
            updateSlider(currentActive);
        });
    }

    // Skills Tab Filtering
    const skillTabsMini = document.querySelectorAll('.tab-mini');
    const skillCardsMini = document.querySelectorAll('.skill-card-mini');

    if (skillTabsMini.length > 0) {
        skillTabsMini.forEach(tab => {
            tab.addEventListener('click', () => {
                const selectedTab = tab.getAttribute('data-tab');

                // Update active tab
                skillTabsMini.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Filter skill cards
                skillCardsMini.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (selectedTab === 'all') {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    } else if (cardCategory === selectedTab || cardCategory === 'all') {
                        card.classList.remove('hidden');
                        card.style.display = 'block';
                    } else {
                        card.classList.add('hidden');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Initialize filters after sections are loaded
document.addEventListener('sectionsLoaded', initializeFilters);

// Fallback: Also try on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeFilters, 100);
});

