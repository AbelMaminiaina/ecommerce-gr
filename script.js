// ===== E-SHOP JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ===== HERO SLIDER =====
    const heroIndicators = document.querySelectorAll('.hero .indicator');
    let currentSlide = 0;

    if (heroIndicators && heroIndicators.length > 0) {
        heroIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                if (heroIndicators[currentSlide]) {
                    heroIndicators[currentSlide].classList.remove('active');
                }
                currentSlide = index;
                if (heroIndicators[currentSlide]) {
                    heroIndicators[currentSlide].classList.add('active');
                }
            });
        });

        // Auto-slide for hero (optional)
        setInterval(() => {
            if (heroIndicators[currentSlide]) {
                heroIndicators[currentSlide].classList.remove('active');
            }
            currentSlide = (currentSlide + 1) % heroIndicators.length;
            if (heroIndicators[currentSlide]) {
                heroIndicators[currentSlide].classList.add('active');
            }
        }, 5000);
    }

    // ===== PRODUCT TABS =====
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Add filtering logic here if needed
        });
    });

    // ===== REVIEWS CAROUSEL =====
    const reviewsTrack = document.querySelector('.reviews-track');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentReview = 0;

    function updateCarousel(index) {
        carouselDots.forEach(dot => dot.classList.remove('active'));
        carouselDots[index].classList.add('active');
    }

    if (carouselDots.length > 0) {
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentReview = index;
                updateCarousel(currentReview);
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentReview = (currentReview - 1 + carouselDots.length) % carouselDots.length;
                updateCarousel(currentReview);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentReview = (currentReview + 1) % carouselDots.length;
                updateCarousel(currentReview);
            });
        }
    }

    // ===== WISHLIST BUTTON - Style Etsy =====
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const icon = this.querySelector('i');

            // Toggle between far (outline) and fas (filled)
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
            this.classList.toggle('active');
        });
    });

    // ===== PRODUCTS CAROUSEL =====
    const productsTrack = document.querySelector('.products-track');
    const carouselNavNext = document.querySelector('.carousel-nav-next');
    const carouselNavPrev = document.querySelector('.carousel-nav-prev');
    const scrollAmount = 200;

    if (carouselNavNext && productsTrack) {
        carouselNavNext.addEventListener('click', function() {
            productsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    if (carouselNavPrev && productsTrack) {
        carouselNavPrev.addEventListener('click', function() {
            productsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // ===== NEWSLETTER FORM =====
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const email = input.value;

            if (email && email.includes('@')) {
                input.value = '';
                alert('Merci pour votre inscription !');
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '';
        }

        lastScroll = currentScroll;
    });

    // ===== PRODUCT CARD CLICK =====
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking wishlist button
            if (!e.target.closest('.wishlist-btn')) {
                console.log('Navigate to product page');
            }
        });
    });

    // ===== SEARCH BAR FOCUS =====
    const searchInput = document.querySelector('.search-bar input');

    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2)';
        });

        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '';
        });
    }

    // ===== LAZY LOAD ANIMATION =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in effect
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

});
