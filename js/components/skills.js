/* ========================================
   SKILLS FILTERING
   ======================================== */

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

// Animate chips on scroll with progress bars
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
