/**
 * Psicóloga A. Teodoro — Landing Page Interactions
 * Dynamic header, premium mobile menu drawer, scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. STICKY HEADER & ACTIVE SECTION STYLING
    // ==========================================
    const header = document.getElementById('header');
    const heroSection = document.getElementById('hero');

    // Add a flag to see if hero is currently active, so header can adapt style
    const updateHeaderStyle = () => {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 500;
        
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
            // If scroll is still inside Hero section, we can make header adjust typography if needed,
            // but standard 'scrolled' class applies a blur and solid light background.
            header.classList.remove('hero-active');
        } else {
            header.classList.remove('scrolled');
            // When at the very top, hero section is active and we want header transparent with white text
            header.classList.add('hero-active');
        }
    };

    // Run on start and attach to scroll listener
    updateHeaderStyle();
    window.addEventListener('scroll', updateHeaderStyle);

    // ==========================================
    // 2. MOBILE DRAWER NAVIGATION MENU
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    const toggleMenu = () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isOpen);
        mobileMenu.classList.toggle('active');
        
        // Prevent body from scrolling while menu is open
        if (!isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Close menu when a link inside mobile drawer is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==========================================
    // 3. INTERSECTION OBSERVER FOR SCROLL REVEAL
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Once animated, stop observing this item
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            root: null, // viewport
            threshold: 0.15, // 15% element visible
            rootMargin: '0px 0px -50px 0px' // offset bottom triggers slightly earlier
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('reveal-active');
        });
    }

    // ==========================================
    // 4. SUBTLE PARALLAX ON HERO IMAGE
    // ==========================================
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768 && heroSection) {
            const depth = window.pageYOffset * 0.4;
            // Shift background image positions slightly relative to depth
            heroSection.style.backgroundPositionY = `calc(50% + ${depth}px)`;
        }
    });

    // ==========================================
    // 5. ENHANCE VISUAL DYNAMICS (Sequential Card Delay)
    // ==========================================
    // Add sequential delay classes to atuação cards to make them reveal progressively
    const atuacaoCards = document.querySelectorAll('.atuacao-card');
    atuacaoCards.forEach((card, index) => {
        const delayClass = `delay-${((index % 4) + 1) * 100}`;
        card.classList.add(delayClass);
    });

    // Add sequential delay classes to differentials
    const diferencialItems = document.querySelectorAll('.diferencial-item');
    diferencialItems.forEach((item, index) => {
        const delayClass = `delay-${((index % 3) + 1) * 100}`;
        item.classList.add(delayClass);
    });

    // Add float effects to background deco borders
    const borderDecos = document.querySelectorAll('.image-border-deco');
    borderDecos.forEach(deco => {
        deco.classList.add('float-effect');
    });
});
