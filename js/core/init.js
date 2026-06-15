/* ========================================
   INITIALIZATION & LOADER
   ======================================== */

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Console Messages
console.log('%c Portfolio Loaded Successfully! ', 'background: linear-gradient(135deg, #00d9ff 0%, #a855f7 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Built with ❤️ by Ankit Raj', 'color: #00d9ff; font-size: 14px;');
