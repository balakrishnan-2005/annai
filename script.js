// Main JavaScript for Annai Enterprises Website

document.addEventListener('DOMContentLoaded', function () {
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainNav.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close mobile menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ========== UPDATE CURRENT YEAR IN FOOTER ==========
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#currentYear');

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // ========== SET ACTIVE NAV LINK ==========
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('#mainNav a');

        window.addEventListener('scroll', function () {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setActiveNavLink();

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle anchor links that start with #
            if (href === '#') return;

            // Check if it's an anchor link on the same page
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(href);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== HERO CAROUSEL ==========
    if (document.querySelector('.heroSwiper')) {
        const heroSwiper = new Swiper('.heroSwiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 800,
        });

        // Pause autoplay on hover
        const heroCarousel = document.querySelector('.hero-carousel');
        if (heroCarousel) {
            heroCarousel.addEventListener('mouseenter', function () {
                heroSwiper.autoplay.stop();
            });

            heroCarousel.addEventListener('mouseleave', function () {
                heroSwiper.autoplay.start();
            });
        }
    }

    // ========== QUICK CONTACT FORM ==========
    const quickContactForm = document.getElementById('quickContactForm');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;

            const whatsappMessage = `அன்னை எண்டர்பிரைசஸ் - விரைவான செய்தி%0A%0Aபெயர்: ${name}%0Aதொலைபேசி: ${phone}%0A%0Aசெய்தி: ${message}%0A%0Aதயவு செய்து தொடர்பு கொள்ளவும்.`;
            window.open(`https://wa.me/919150188404?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

            // Reset form
            this.reset();

            // Show success message
            alert('உங்கள் செய்தி அனுப்பப்பட்டது! WhatsApp மூலம் தொடர்பு கொள்ளப்படும்.');
        });
    }

    // ========== ANIMATION ON SCROLL ==========
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .review-card, .category-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // Initialize animations
    animateOnScroll();

    // ========== WHATSAPP ORDER FUNCTION ==========
    window.orderOnWhatsApp = function (productName) {
        const phoneNumber = "9150188404";
        const message = productName ?
            `அன்னை எண்டர்பிரைசஸ் - ${productName} ஆர்டர் செய்ய விரும்புகிறேன். தயவு செய்து தொடர்பு கொள்ளுங்கள்.` :
            `அன்னை எண்டர்பிரைசஸ் பொருட்களை ஆர்டர் செய்ய விரும்புகிறேன். தயவு செய்து தொடர்பு கொள்ளுங்கள்.`;

        window.open(`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // ========== LOADING ANIMATION ==========
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');

        // Hide loading spinner if exists
        const loadingSpinner = document.querySelector('.loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    });

    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 30px;
        background-color: var(--red);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 99;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('mouseenter', function () {
        this.style.backgroundColor = 'var(--dark-red)';
        this.style.transform = 'translateY(-3px)';
    });

    backToTopButton.addEventListener('mouseleave', function () {
        this.style.backgroundColor = 'var(--red)';
        this.style.transform = 'translateY(0)';
    });
});