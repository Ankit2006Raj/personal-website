/**
 * Technical Stack — Modern Skills Grid Animations
 * =============================================================
 * Implements performance-optimized scroll-reveal animations
 * with staggered card transitions and smooth hover animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    const initSkillsReveal = () => {
        const cards = document.querySelectorAll('.skills-card-modern');
        const grid = document.querySelector('.skills-grid-modern');
        if (!grid || cards.length === 0) return;

        // Configure initial states for animation (hidden and pushed down)
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(25px)';
            card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        // Intersection Observer options
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger reveal animations for the 8 category cards
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 75); // 75ms stagger delay per card
                    });
                    
                    // Disconnect observer once grid is animated
                    observer.unobserve(entry.target);
                    observer.disconnect();
                }
            });
        }, observerOptions);

        // Start observing the grid container
        observer.observe(grid);
    };

    // Support both dynamic section loading and compiled static binding
    if (document.querySelector('.skills-grid-modern')) {
        initSkillsReveal();
    } else {
        document.addEventListener('sectionsLoaded', initSkillsReveal);
    }
});
