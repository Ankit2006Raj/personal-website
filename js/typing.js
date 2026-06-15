/* ========================================
   TYPING ANIMATION
   ======================================== */

const phrases = [
    'AI & Machine Learning Engineer',
    'Full-Stack Developer',
    'UI/UX Designer',
    'Machine Learning Engineer'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingText = null;

function typeEffect() {
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
}

// Initialize typing effect after sections are loaded
function initializeTypingEffect() {
    typingText = document.getElementById('typingText');
    if (typingText) {
        typeEffect();
    }
}

// Start typing effect when sections are loaded
document.addEventListener('sectionsLoaded', initializeTypingEffect);

// Fallback: Also try on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeTypingEffect, 100);
});

