/**
 * ========================================
 * FOOTER COMPONENT - INTERACTIVE FUNCTIONALITY
 * Back to Top Button & Smooth Scroll Behavior
 * ========================================
 */

(function () {
    'use strict';

    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        // Show/Hide button based on scroll position
        function toggleBackToTopButton() {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollPosition > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Smooth scroll to top
        function scrollToTop(e) {
            e.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Event Listeners
        window.addEventListener('scroll', toggleBackToTopButton);
        backToTopBtn.addEventListener('click', scrollToTop);

        // Initial check
        toggleBackToTopButton();
    }

    // ===== FOOTER LINK SMOOTH SCROLL =====
    const footerLinks = document.querySelectorAll('.footer-links-list a[href^="#"]');

    footerLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== FOOTER ANIMATIONS ON SCROLL =====
    function initFooterAnimations() {
        const footerElements = document.querySelectorAll('.footer-col, .footer-brand-col, .cta-content');

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        footerElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Initialize animations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterAnimations);
    } else {
        initFooterAnimations();
    }

    // ===== SOCIAL ICON RIPPLE EFFECT =====
    const socialIcons = document.querySelectorAll('.social-icon-premium');

    socialIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ===== FOOTER YEAR AUTO-UPDATE =====
    const copyrightYear = document.querySelector('.footer-copyright p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2024', currentYear);
    }

    // ===== CONSOLE EASTER EGG =====
    console.log('%c👋 Hey there, curious developer!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Built with passion by Ankit Raj', 'color: #a855f7; font-size: 14px;');
    console.log('%c💼 Looking for AI/ML opportunities!', 'color: #00d9ff; font-size: 14px;');
    console.log('%c📧 ankit9905163014@gmail.com', 'color: #ffffff; font-size: 12px;');

})();
