/* ========================================
   PORTFOLIO — Card Stacking JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ============ TYPING EFFECT ============
    const typedElement = document.getElementById('typedText');
    const words = [
        'Étudiant MMI',
        'Créatif',
        'Curieux'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typedElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 800);

    // ============ NAVBAR — Active section on scroll ============
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');

    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight / 3;

        cards.forEach(card => {
            const top = card.offsetTop;
            const bottom = top + card.offsetHeight;
            const id = card.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ============ MOBILE NAV ============
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // ============ SMOOTH SCROLL (sticky-safe) ============
    const allCards = [...document.querySelectorAll('.card')];

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetCard = document.getElementById(targetId);

            if (targetCard) {
                // Compute position by summing heights of all cards before target
                let scrollPos = 0;
                for (const card of allCards) {
                    if (card === targetCard) break;
                    scrollPos += card.offsetHeight;
                }
                window.scrollTo({ top: scrollPos, behavior: 'smooth' });
            }
        });
    });

    // ============ REVEAL ON SCROLL ============
    // Add reveal-item class to elements inside cards 2, 3, 4
    document.querySelectorAll('.card-2 .card-label, .card-2 .section-heading, .card-2 .project-tile').forEach(el => el.classList.add('reveal-item'));
    document.querySelectorAll('.card-3 .card-label, .card-3 .section-heading, .card-3 .skill-row, .card-3 .about-block').forEach(el => el.classList.add('reveal-item'));
    document.querySelectorAll('.card-4 .card-label, .card-4 .section-heading, .card-4 .contact-info, .card-4 .contact-form').forEach(el => el.classList.add('reveal-item'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

    // ============ MAGNETIC BUTTONS (Desktop) ============
    if (window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ============ FORM HANDLING ============
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Build the mailto link
            const mailtoLink = `mailto:sevilla.maxens@gmail.com?subject=Contact depuis le portfolio&body=Nom : ${encodeURIComponent(name)}%0AEmail : ${encodeURIComponent(email)}%0A%0AMessage :%0A${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;

            const btn = form.querySelector('.btn-send');
            const originalText = btn.textContent;
            btn.textContent = 'Ouverture du client mail... ✓';
            btn.style.background = '#10b981';
            btn.style.color = 'white';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
                form.reset();
            }, 3000);
        });
    }

});
