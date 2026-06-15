/* ========================================
   ABOUT SECTION - ANIMATIONS & INTERACTIONS
   Premium JavaScript Enhancements
   ======================================== */

// Initialize About Section Animations
document.addEventListener('DOMContentLoaded', () => {
    initAboutAnimations();
    initCounterAnimations();
    initCardHoverEffects();
    initScrollReveal();
});

// Main Animation Initialization
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about-premium');
    if (!aboutSection) return;

    // Observe section entry
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                animateElements();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(aboutSection);
}

// Animate Elements on Scroll
function animateElements() {
    const elements = document.querySelectorAll('.glass-card, .about-hero-card, .about-cta');

    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }, index * 100);
    });
}

// Counter Animations for Stats
function initCounterAnimations() {
    const counters = document.querySelectorAll('.metric-value, .cert-number');

    const animateCounter = (element) => {
        const target = parseFloat(element.textContent);
        const isDecimal = element.textContent.includes('.');
        const isPercentage = element.textContent.includes('%');
        const hasPlus = element.textContent.includes('+');

        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            let displayValue = isDecimal ? current.toFixed(2) : Math.floor(current);
            if (isPercentage) displayValue += '%';
            if (hasPlus && current >= target) displayValue += '+';

            element.textContent = displayValue;
        }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Card Hover Effects with Parallax
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.glass-card, .expertise-card, .stat-item, .timeline-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.expertise-card, .stat-item, .timeline-item, .achievement-badge');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        element.style.transition = 'all 0.5s ease';
        revealObserver.observe(element);
    });
}

// Tech Tag Interaction
document.addEventListener('DOMContentLoaded', () => {
    const techTags = document.querySelectorAll('.tech-tags span, .interest-tag');

    techTags.forEach(tag => {
        tag.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Smooth Scroll for CTA Buttons
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .view-all-link');

    ctaButtons.forEach(button => {
        if (button.getAttribute('href')?.startsWith('#')) {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });
});

// Floating Animation for Hero Card Glow
function initFloatingGlow() {
    const glow = document.querySelector('.hero-card-glow');
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        glowX += (mouseX - glowX) * 0.05;
        glowY += (mouseY - glowY) * 0.05;

        if (glow) {
            glow.style.transform = `translate(${glowX * 0.02}px, ${glowY * 0.02}px)`;
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize floating glow effect
document.addEventListener('DOMContentLoaded', initFloatingGlow);

// Badge Pulse Animation
function initBadgePulse() {
    const badges = document.querySelectorAll('.badge-premium, .hero-badge');

    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function () {
            this.style.animation = 'pulse 0.5s ease';
        });

        badge.addEventListener('animationend', function () {
            this.style.animation = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', initBadgePulse);

// Typing Effect for Career Text (Optional Enhancement)
function initTypingEffect() {
    const careerText = document.querySelector('.career-text');
    if (!careerText) return;

    const originalText = careerText.textContent;
    careerText.textContent = '';
    let index = 0;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && index === 0) {
                const typeInterval = setInterval(() => {
                    if (index < originalText.length) {
                        careerText.textContent += originalText.charAt(index);
                        index++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 30);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(careerText);
}

// Uncomment to enable typing effect
// document.addEventListener('DOMContentLoaded', initTypingEffect);

// Performance Optimization: Debounce Scroll Events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth transitions on scroll
window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    const aboutSection = document.querySelector('.about-premium');

    if (aboutSection) {
        const parallaxElements = aboutSection.querySelectorAll('.hero-card-glow');
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
}, 10));

// Console Log for Debugging
console.log('About Section Animations Initialized ✨');
