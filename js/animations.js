/* ========================================
   SCROLL ANIMATIONS & OBSERVERS
   ======================================== */

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.stat-card, .project-card, .skill-category, .hire-card, .timeline-item, .project-card-compact').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Animated Counter
function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

// Animate skill chips on scroll
const chipObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chips = entry.target.querySelectorAll('.chip');
            chips.forEach((chip, index) => {
                const levelText = chip.querySelector('.lvl')?.textContent;
                if (levelText) {
                    const progress = parseInt(levelText);
                    setTimeout(() => {
                        chip.style.setProperty('--progress', progress + '%');
                        chip.classList.add('animated');
                    }, index * 100);
                }
            });
            chipObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe all skill cards
document.querySelectorAll('.skill-card-mini').forEach(card => {
    chipObserver.observe(card);
});

// Animate skill cards on scroll
const skillCardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card-mini').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease ${index * 0.05}s`;
    skillCardObserver.observe(card);
});

// Animate stats on scroll
const statsBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.stat-box, .stat-project').forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(15px)';
    stat.style.transition = `all 0.4s ease ${index * 0.1}s`;
    statsBoxObserver.observe(stat);
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}
