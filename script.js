// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Unobserve to only animate once
        }
    });
}, observerOptions);

// Observe all elements with the 'hidden' class
document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic Text Effect in Hero Section
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const textArray = ["BCA Student.", "Web Developer.", "Tech Enthusiast."];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = textArray[textIndex];
            
            // We're preserving the 'I am a ' part and only changing the span
            if (isDeleting) {
                dynamicText.innerHTML = `I am a <span class="highlight">${currentText.substring(0, charIndex - 1)}</span>`;
                charIndex--;
            } else {
                dynamicText.innerHTML = `I am a <span class="highlight">${currentText.substring(0, charIndex + 1)}</span>`;
                charIndex++;
            }
            
            let typeSpeed = 100;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typeSpeed = 500; // Pause before typing new word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        // Start typing effect after a small delay
        setTimeout(type, 1500);
    }
});
