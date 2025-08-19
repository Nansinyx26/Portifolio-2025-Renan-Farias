// ===== MODERN DARK PORTFOLIO JAVASCRIPT - VERSÃO MELHORADA =====

// ===== VARIABLES AND CONSTANTS =====
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.getElementById('theme-toggle');
const header = document.querySelector('header');
const typingText = document.getElementById('typing-text');

// Typing animation texts
const texts = [
    'Desenvolvedor Junior & Especialista em Tecnologias Maker',
    ' Conhecimento em uso de IA com ChatGPT e Claude',
    'Criando Soluções Inovadoras com Tecnologia',
    'Prototipagem e Impressão 3D',
    'Transformando Ideias em Realidade'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    try {
        // Initialize all components
        initMobileMenu();
        initSmoothScrolling();
        initScrollEffects();
        initTypingAnimation();
        initIntersectionObserver();
        initThemeToggle();
        initLoadingScreen();
        initKeyboardNavigation();
        initPerformanceOptimizations();
        initErrorHandling();
        initAnalytics();
        initAnimationOrders();
        createEnhancedParticles();

        console.log('Portfolio inicializado com sucesso!');
    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
}

// ===== ANIMATION ORDERS =====
function initAnimationOrders() {
    // Skill cards animation order
    document.querySelectorAll('.skill-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });

    // Project cards animation order
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });

    // Timeline items animation order
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.setProperty('--timeline-order', index);
            // Set slide direction based on position
            const slideDirection = item.classList.contains('right') ? '30px' : '-30px';
            content.style.setProperty('--slide-direction', slideDirection);
        }
    });
}

// ===== ENHANCED PARTICLES =====
function createEnhancedParticles() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    // Create additional particles dynamically with enhanced properties
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const delay = Math.random() * 8;
        const size = Math.random() * 3 + 2; // 2px to 5px

        particle.style.setProperty('--x', x + '%');
        particle.style.setProperty('--y', y + '%');
        particle.style.setProperty('--delay', delay + 's');
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Add random colors occasionally
        if (Math.random() > 0.7) {
            const colors = ['#6366f1', '#f59e0b', '#10b981'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
            particle.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}33`;
        }

        heroBackground.appendChild(particle);
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav')) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileToggle.classList.toggle('active');

    // Add animation class for smooth transition
    if (navLinks.classList.contains('active')) {
        navLinks.style.animation = 'slideDown 0.3s ease forwards';
    } else {
        navLinks.style.animation = 'slideUp 0.3s ease forwards';
    }
}

function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('active');
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        // Enhanced smooth scroll with easing
        smoothScrollTo(targetPosition, 1000);
        closeMobileMenu();
    }
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    let lastScrollTop = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Header scroll effects
    if (header) {
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const speed = 0.5;
        heroBackground.style.transform = `translateY(${scrollTop * speed}px)`;
    }

    // Update active navigation link
    updateActiveNavLink();

    // Progress indicator (optional)
    updateScrollProgress();
}

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Update custom progress bar if it exists
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// ===== ENHANCED TYPING ANIMATION =====
function initTypingAnimation() {
    if (typingText) {
        typeText();
    }
}

function typeText() {
    const currentText = texts[textIndex];
    const currentChar = currentText.substring(0, charIndex);

    typingText.textContent = currentChar;

    if (!isDeleting && charIndex < currentText.length) {
        charIndex++;
        setTimeout(typeText, Math.random() * 50 + 80); // Variable speed for more natural typing
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeText, Math.random() * 30 + 30);
    } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 1500);
        setTimeout(typeText, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeText, 800);
    }
}

// ===== ENHANCED INTERSECTION OBSERVER =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger specific animations based on element type
                if (entry.target.classList.contains('skill-card')) {
                    triggerSkillCardAnimation(entry.target);
                } else if (entry.target.classList.contains('project-card')) {
                    triggerProjectCardAnimation(entry.target);
                } else if (entry.target.classList.contains('timeline-content')) {
                    triggerTimelineAnimation(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-content').forEach(content => {
        observer.observe(content);
    });
}

function triggerSkillCardAnimation(card) {
    card.style.animation = 'slideInUp 0.8s ease forwards';

    // Animate skill tags individually
    const tags = card.querySelectorAll('.skill-tag');
    tags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animation = 'fadeInScale 0.4s ease forwards';
        }, index * 100);
    });
}

function triggerProjectCardAnimation(card) {
    card.style.animation = 'projectSlideIn 0.8s ease forwards';

    // Animate tech tags
    const techTags = card.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.animation = 'fadeInScale 0.3s ease forwards';
        }, 400 + index * 50);
    });
}

function triggerTimelineAnimation(content) {
    content.style.animation = 'timelineSlide 0.8s ease forwards';
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        } else {
            // Default to dark theme
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Add transition class for smooth theme change
    document.documentElement.style.transition = 'all 0.3s ease';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Remove transition after change
    setTimeout(() => {
        document.documentElement.style.transition = '';
    }, 300);

    // Show notification
    showNotification(`Tema ${newTheme === 'light' ? 'claro' : 'escuro'} ativado!`, 'success');
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

        // Add rotation animation
        icon.style.animation = 'spin 0.5s ease';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    }
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);

    // Show success message
    showNotification('Mensagem enviada com sucesso!', 'success');
}

// ===== ENHANCED NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? 'var(--success-color)' : 'var(--primary-color)',
        color: 'white',
        borderRadius: '10px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 500);
        }

        // Trigger animations
        document.body.classList.add('loaded');

        // Initialize particles after load
        setTimeout(createEnhancedParticles, 500);
    });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            closeMobileMenu();
        }

        // Arrow keys for navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            navigateWithArrows(e.key === 'ArrowDown');
        }

        // T key for theme toggle
        if (e.key.toLowerCase() === 't' && e.ctrlKey) {
            e.preventDefault();
            toggleTheme();
        }
    });
}

function navigateWithArrows(isDown) {
    const sections = document.querySelectorAll('section[id]');
    const currentSection = getCurrentSection();
    const currentIndex = Array.from(sections).findIndex(section =>
        section.getAttribute('id') === currentSection
    );

    let targetIndex;
    if (isDown) {
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
        targetIndex = Math.max(currentIndex - 1, 0);
    }

    const targetSection = sections[targetIndex];
    if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        smoothScrollTo(targetPosition, 800);
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section.getAttribute('id');
        }
    });

    return current || 'home';
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    const criticalImages = [
        'profile-img.jpg',
        // Add other critical images here
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // Optimize scroll performance
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate positions after resize
            updateActiveNavLink();
        }, 250);
    });
}

// ===== ERROR HANDLING =====
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        showNotification('Ocorreu um erro inesperado. Recarregue a página.', 'error');
    });

    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        showNotification('Erro de conexão. Verifique sua internet.', 'warning');
    });
}

// ===== ANALYTICS =====
function initAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID');
    }

    // Track scroll depth
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 100];
    let trackedMilestones = [];

    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );

        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;

            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.includes(milestone)) {
                    trackedMilestones.push(milestone);

                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'scroll_depth', {
                            event_category: 'engagement',
                            event_label: `${milestone}%`,
                            value: milestone
                        });
                    }
                }
            });
        }
    }, 100));

    // Track button clicks
    document.querySelectorAll('.btn, .project-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.textContent.trim();
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'button',
                    event_label: action
                });
            }
        });
    });
}

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
    // Add hover effects to cards
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Add glow effect
            e.target.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.3)';
        });

        card.addEventListener('mouseleave', (e) => {
            // Remove glow effect
            e.target.style.boxShadow = '';
        });
    });

    // Add click effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== SCROLL TO TOP BUTTON =====
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';

    Object.assign(scrollToTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        backgroundColor: 'var(--primary-color)',
        color: 'var(--bg-primary)',
        border: 'none',
        borderRadius: '50%',
        fontSize: '1.2rem',
        cursor: 'pointer',
        zIndex: '1000',
        opacity: '0',
        transform: 'scale(0.8)',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--shadow-glow)'
    });

    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollTo(0, 800);
    });

    document.body.appendChild(scrollToTopBtn);

    // Show/hide on scroll
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    }, 100));
}

// ===== EASTER EGG =====
function initEasterEgg() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function triggerEasterEgg() {
    // Rainbow theme
    document.documentElement.style.setProperty('--primary-color', '#ff6b6b');
    document.documentElement.style.setProperty('--secondary-color', '#4ecdc4');
    document.documentElement.style.setProperty('--accent-color', '#45b7d1');

    // Add rainbow animation
    document.body.style.animation = 'rainbow 2s ease infinite';

    showNotification('🎉 Easter Egg Ativado! Modo Arco-íris!', 'success');

    // Reset after 5 seconds
    setTimeout(() => {
        location.reload();
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== INITIALIZE ALL FUNCTIONS =====
function initializeApp() {
    try {
        initMobileMenu();
        initSmoothScrolling();
        initScrollEffects();
        initTypingAnimation();
        initIntersectionObserver();
        initThemeToggle();
        initLoadingScreen();
        initKeyboardNavigation();
        initPerformanceOptimizations();
        initErrorHandling();
        initAnalytics();
        initAnimationOrders();
        initInteractiveElements();
        initScrollToTop();
        initEasterEgg();

        console.log('Portfolio inicializado com sucesso!');

        // Show welcome message
        setTimeout(() => {
            showNotification('Portfolio carregado com sucesso! 🚀', 'success');
        }, 1000);

    } catch (error) {
        console.error('Erro na inicialização:', error);
        showNotification('Erro ao inicializar. Recarregue a página.', 'error');
    }
}

// ===== ADDITIONAL CSS ANIMATIONS (injected via JS) =====
function injectAdditionalCSS() {
    const additionalCSS = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
        
        .notification {
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 3px;
            transition: background 0.2s ease;
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalCSS;
    document.head.appendChild(styleSheet);
}

// Initialize additional CSS when DOM loads
document.addEventListener('DOMContentLoaded', injectAdditionalCSS);

// ===== FINAL SETUP =====
// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}