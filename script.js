// main.js

document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initFadeInAnimations();
    createScrollToTopButton();
    initContactForm();
    initTypingEffect();
});

/* -----------------------
   MOBILE NAVIGATION
----------------------- */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/* -----------------------
   SMOOTH SCROLLING
----------------------- */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* -----------------------
   NAVBAR SCROLL EFFECT
----------------------- */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

/* -----------------------
   FADE-IN ANIMATIONS
----------------------- */
function initFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.project-card, .section-title, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* -----------------------
   SCROLL TO TOP BUTTON
----------------------- */
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        width: 50px; height: 50px; border-radius: 50%;
        background: #2563eb; color: white; border: none;
        font-size: 1.2rem; cursor: pointer; display: none;
        z-index: 1000; transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseenter', () => {
        button.style.background = '#1d4ed8';
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.background = '#2563eb';
        button.style.transform = 'scale(1)';
    });
}

/* -----------------------
   CONTACT FORM HANDLING
----------------------- */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Send message via EmailJS
        emailjs.sendForm('service_lwuj9e5', 'template_8fp22u3', this)
            .then(() => alert('Message sent!'))
            .catch(err => alert('Failed to send. Error: ' + JSON.stringify(err)));
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* -----------------------
   TYPING EFFECT
----------------------- */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 1000);
}

function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
            }
