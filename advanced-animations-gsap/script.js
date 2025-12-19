// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Function to create animations only if user hasn't requested reduced motion
function createAnimation(target, vars, scrollTriggerVars = null) {
    if (prefersReducedMotion) {
        // Apply end state immediately without animation
        gsap.set(target, vars);
        return null;
    }
    
    if (scrollTriggerVars) {
        return gsap.to(target, {
            ...vars,
            scrollTrigger: scrollTriggerVars
        });
    }
    
    return gsap.to(target, vars);
}

// Initialize animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavbarAnimation();
    initHeroAnimations();
    initFeatureAnimations();
    initGalleryAnimations();
    initCounterAnimations();
    initContactAnimations();
    initFloatingCards();
    initSmoothScrolling();
});

// Navbar Animation
function initNavbarAnimation() {
    const navbar = document.querySelector('.navbar');
    
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {
            className: 'scrolled',
            targets: navbar
        },
        onEnter: () => {
            gsap.to(navbar, {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                duration: 0.3
            });
        },
        onLeaveBack: () => {
            gsap.to(navbar, {
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                duration: 0.3
            });
        }
    });
}

// Hero Section Timeline Animation
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate hero title lines
    const heroLines = document.querySelectorAll('.hero-line');
    heroLines.forEach((line, index) => {
        const words = line.textContent.trim();
        line.innerHTML = `<span style="display: inline-block;">${words}</span>`;
    });
    
    tl.from('.hero-line span', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    })
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4')
    .to('.cta-button', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.6');
    
    // CTA Button hover animation
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('mouseenter', () => {
        if (!prefersReducedMotion) {
            gsap.to(ctaButton, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion) {
            gsap.to(ctaButton, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    });
}

// Floating Cards Animation
function initFloatingCards() {
    if (prefersReducedMotion) return;
    
    const cards = document.querySelectorAll('.floating-card');
    
    cards.forEach((card, index) => {
        // Initial position animation
        gsap.from(card, {
            x: index % 2 === 0 ? -100 : 100,
            y: -100,
            opacity: 0,
            rotation: index * 10,
            duration: 1.5,
            delay: 0.5 + index * 0.2,
            ease: 'power3.out'
        });
        
        // Continuous floating animation
        gsap.to(card, {
            y: '+=30',
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 2 + index,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
        
        // Mouse parallax effect
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;
            
            gsap.to(card, {
                x: x * (index + 1),
                y: y * (index + 1),
                duration: 1,
                ease: 'power2.out'
            });
        });
    });
}

// Feature Cards Scroll Animation
function initFeatureAnimations() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        createAnimation(card, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1
        }, {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        });
        
        // Enhanced hover animation
        card.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion) {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(card.querySelector('.feature-icon'), {
                    scale: 1.2,
                    rotation: 360,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion) {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                gsap.to(card.querySelector('.feature-icon'), {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Initial state
    gsap.set(featureCards, {
        y: 50,
        opacity: 0
    });
}

// Gallery Stagger Animation with Scroll
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Stagger animation on scroll
    gsap.from(galleryItems, {
        opacity: 0,
        y: 100,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Individual item hover effects
    galleryItems.forEach(item => {
        const image = item.querySelector('.gallery-image');
        const number = item.querySelector('.gallery-number');
        
        item.addEventListener('mouseenter', () => {
            if (!prefersReducedMotion) {
                gsap.to(image, {
                    scale: 1.1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
                
                gsap.to(number, {
                    scale: 1.2,
                    color: 'rgba(255, 255, 255, 0.8)',
                    duration: 0.3
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!prefersReducedMotion) {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
                
                gsap.to(number, {
                    scale: 1,
                    color: 'rgba(255, 255, 255, 0.3)',
                    duration: 0.3
                });
            }
        });
    });
}

// Counter Animation with ScrollTrigger
function initCounterAnimations() {
    const counterNumbers = document.querySelectorAll('.counter-number');
    
    counterNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const obj = { val: 0 };
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                if (!prefersReducedMotion) {
                    gsap.to(obj, {
                        val: target,
                        duration: 2,
                        ease: 'power2.out',
                        onUpdate: () => {
                            counter.textContent = Math.ceil(obj.val);
                        }
                    });
                } else {
                    counter.textContent = target;
                }
            }
        });
    });
}

// Contact Button Shine Animation
function initContactAnimations() {
    const contactButton = document.querySelector('.contact-button');
    const buttonShine = document.querySelector('.button-shine');
    
    if (!prefersReducedMotion) {
        // Repeating shine animation
        gsap.to(buttonShine, {
            left: '100%',
            duration: 2,
            repeat: -1,
            repeatDelay: 3,
            ease: 'power2.inOut'
        });
    }
    
    // Scroll reveal animation
    gsap.from('.contact-section .section-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from('.contact-text', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.from(contactButton, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                if (!prefersReducedMotion) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                } else {
                    targetSection.scrollIntoView({ behavior: 'auto' });
                }
            }
        });
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        if (!prefersReducedMotion) {
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 });
                gsap.to(spans[1], { opacity: 0, duration: 0.3 });
                gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 });
            } else {
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { opacity: 1, duration: 0.3 });
                gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
            }
        }
    });
}

// Performance optimization: Pause animations when tab is hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});

// Console message
console.log('%c🎨 GSAP Advanced Animations', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cCreated for Codveda Technology Internship', 'font-size: 12px; color: #94a3b8;');