// Main JavaScript functionality for the portfolio website

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillBars();
    initializeAnimations();
    initializeBackToTop();
    initializeSmoothScroll();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        // Header background opacity
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/**
 * Initialize skill progress bars animation
 */
function initializeSkillBars() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
}

/**
 * Initialize scroll animations for elements
 */
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll(`
        .hero-content,
        .about-content,
        .skill-category,
        .project-card,
        .timeline-item,
        .education-card,
        .contact-content
    `);
    
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });
}

/**
 * Initialize back to top button
 */
function initializeBackToTop() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initializeSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Lazy loading for images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Add keyboard navigation support
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Navigate through sections with arrow keys
        if (e.altKey) {
            const currentSection = getCurrentSection();
            const sectionsArray = Array.from(sections);
            const currentIndex = sectionsArray.indexOf(currentSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sectionsArray.length - 1) {
                e.preventDefault();
                sectionsArray[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                sectionsArray[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

/**
 * Get current section based on scroll position
 */
function getCurrentSection() {
    const scrollPos = window.scrollY + 200;
    let currentSection = sections[0];
    
    sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
            currentSection = section;
        }
    });
    
    return currentSection;
}

/**
 * Performance optimization: Throttle scroll events
 */
const throttledScroll = debounce(function() {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

/**
 * Handle prefers-reduced-motion
 */
function handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        document.body.classList.add('reduced-motion');
    }
}

// Initialize reduced motion handling
handleReducedMotion();

/**
 * Add loading state management
 */
function showLoading(element) {
    element.classList.add('loading');
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, content) {
    element.classList.remove('loading');
    element.innerHTML = content;
}

/**
 * Error handling wrapper
 */
function handleError(error, context) {
    console.error(`Error in ${context}:`, error);
    // Could integrate with error reporting service here
}

/**
 * Initialize error handling
 */
window.addEventListener('error', function(e) {
    handleError(e.error, 'Global error handler');
});

window.addEventListener('unhandledrejection', function(e) {
    handleError(e.reason, 'Unhandled promise rejection');
});

// Export functions for use in other modules
window.portfolioApp = {
    showLoading,
    hideLoading,
    handleError,
    debounce
};