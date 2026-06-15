/* ========================================
   CONTACT FORM HANDLING
   ======================================== */

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };

            // Create mailto link with form data
            const mailtoLink = `mailto:ankit9905163014@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            )}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            showSuccessMessage();

            // Reset form after short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
});

// Success Message Function
function showSuccessMessage() {
    const submitBtn = document.querySelector('.btn-submit');
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Message Sent!</span>';
    submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

    setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
    }, 3000);
}

// Form Input Animations
document.addEventListener('DOMContentLoaded', function () {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        // Remove focus animation
        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Contact Item Click Analytics (Optional)
document.addEventListener('DOMContentLoaded', function () {
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        item.addEventListener('click', function () {
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});
