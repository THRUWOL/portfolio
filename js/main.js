/* ============================================
   CONFIGURATION CONSTANTS
   ============================================ */
const CONFIG = {
    // Scroll thresholds (pixels)
    SCROLL_THRESHOLD: 500,              // Показ кнопки "наверх" после этого значения
    HEADER_SCROLL_THRESHOLD: 50,        // Порог для тени хедера
    HEADER_HEIGHT: 70,
    ACTIVE_SECTION_OFFSET: 100,         // Смещение для определения активной секции

    STORAGE_KEYS: {
        THEME: 'theme'
    },
    THEMES: {
        DARK: 'dark',
        LIGHT: 'light'
    },
    SELECTORS: {
        EMAIL_LINK: 'emailLink',
        THEME_TOGGLE: 'themeToggle',
        MOBILE_MENU_BTN: 'mobile-menu-btn',
        NAV_LINKS: 'nav-links',
        HAMBURGER: 'hamburger',
        NAV_ACTIONS: 'nav-actions',
        READING_PROGRESS: 'readingProgress',
        BACK_TO_TOP: 'backToTop',
        TYPEWRITER_CODE: 'typewriterCode'
    },
    CLASSES: {
        ACTIVE: 'active',
        VISIBLE: 'visible',
        SCROLLED: 'scrolled',
        COPIED: 'copied'
    },

    // ============================================
    // CONTACT INFORMATION (update in one place)
    // ============================================
    CONTACT: {
        EMAIL: 'yarosh.nv@yandex.ru',
        TELEGRAM: 'https://t.me/YaroshNikita',
        GITHUB: 'https://github.com/yarosh-nv',
        PHONE: '+7-978-853-28-36',
        NAME: 'Ярош Никита',
        POSITION: 'Java Backend Developer'
    },

    // File versions for cache busting
    VERSION: '1.0.0'
};

/* ============================================
   THEME TOGGLE
   ============================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById(CONFIG.SELECTORS.THEME_TOGGLE);
    const htmlElement = document.documentElement;

    if (!themeToggle) return;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || CONFIG.THEMES.DARK;
    htmlElement.setAttribute('data-theme', savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === CONFIG.THEMES.DARK ? CONFIG.THEMES.LIGHT : CONFIG.THEMES.DARK;

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, newTheme);

        // Add transition class for smooth theme change
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector(`.${CONFIG.SELECTORS.MOBILE_MENU_BTN}`);
    const navLinks = document.querySelector(`.${CONFIG.SELECTORS.NAV_LINKS}`);
    const hamburger = document.querySelector(`.${CONFIG.SELECTORS.HAMBURGER}`);
    const navActions = document.querySelector(`.${CONFIG.SELECTORS.NAV_ACTIONS}`);
    const overlay = document.getElementById('mobileOverlay');

    if (!mobileMenuBtn) return;

    function toggleMenu() {
        navLinks.classList.toggle(CONFIG.CLASSES.ACTIVE);
        hamburger.classList.toggle(CONFIG.CLASSES.ACTIVE);
        navActions.classList.toggle(CONFIG.CLASSES.ACTIVE);
        overlay.classList.toggle(CONFIG.CLASSES.ACTIVE);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains(CONFIG.CLASSES.ACTIVE) ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            navLinks.classList.remove(CONFIG.CLASSES.ACTIVE);
            hamburger.classList.remove(CONFIG.CLASSES.ACTIVE);
            navActions.classList.remove(CONFIG.CLASSES.ACTIVE);
            overlay.classList.remove(CONFIG.CLASSES.ACTIVE);
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll(`.${CONFIG.SELECTORS.NAV_LINKS} a`).forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove(CONFIG.CLASSES.ACTIVE);
            hamburger.classList.remove(CONFIG.CLASSES.ACTIVE);
            navActions.classList.remove(CONFIG.CLASSES.ACTIVE);
            overlay.classList.remove(CONFIG.CLASSES.ACTIVE);
            document.body.style.overflow = '';
        });
    });
}

/* ============================================
   ACTIVE SECTION INDICATOR
   ============================================ */
function setActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinksItems.length) return;

    const scrollPos = window.scrollY + CONFIG.ACTIVE_SECTION_OFFSET;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove(CONFIG.CLASSES.ACTIVE);
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add(CONFIG.CLASSES.ACTIVE);
                }
            });
        }
    });
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or external link
            if (href === '#' || !href.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/* ============================================
   EMAIL COPY FUNCTIONALITY
   ============================================ */
function initEmailCopy() {
    const emailLink = document.getElementById(CONFIG.SELECTORS.EMAIL_LINK);

    if (!emailLink) {
        console.warn('Email link element not found');
        return;
    }

    emailLink.addEventListener('click', function(e) {
        e.preventDefault();

        navigator.clipboard.writeText(CONFIG.CONTACT.EMAIL).then(() => {
            this.classList.add(CONFIG.CLASSES.COPIED);
            setTimeout(() => {
                this.classList.remove(CONFIG.CLASSES.COPIED);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });
}

/* ============================================
   FADE-IN ANIMATION ON SCROLL
   ============================================ */
function initFadeInAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(CONFIG.CLASSES.VISIBLE);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/* ============================================
   READING PROGRESS BAR
   ============================================ */
function updateReadingProgress() {
    const readingProgress = document.getElementById(CONFIG.SELECTORS.READING_PROGRESS);
    if (!readingProgress) return;

    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    readingProgress.style.width = scrolled + '%';
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
function initBackToTop() {
    const backToTop = document.getElementById(CONFIG.SELECTORS.BACK_TO_TOP);
    if (!backToTop) return;

    function toggleBackToTop() {
        if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
            backToTop.classList.add(CONFIG.CLASSES.VISIBLE);
        } else {
            backToTop.classList.remove(CONFIG.CLASSES.VISIBLE);
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
}

/* ============================================
   TYPEWRITER EFFECT FOR CODE BLOCK
   ============================================ */
const CODE_LINES = [
    { text: '<span class="keyword">public class</span> <span class="class">Developer</span> {', delay: 0 },
    { text: '&nbsp;&nbsp;<span class="keyword">public static void</span> <span class="method">main</span>(String[] args) {', delay: 300 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="class">Developer</span> nikita = <span class="keyword">new</span> <span class="class">Developer</span>();', delay: 600 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setName</span>(<span class="string">"Ярош Никита"</span>);', delay: 900 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setAge</span>(<span class="number">23</span>);', delay: 1200 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setStack</span>(', delay: 1500 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"Java 21"</span>, <span class="string">"Spring Boot"</span>,', delay: 1800 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"PostgreSQL"</span>, <span class="string"><span class="string">"AI/ML"</span>', delay: 2100 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;);', delay: 2400 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setExperience</span>(<span class="string">"3+ года"</span>);', delay: 2700 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Open for freelance opportunities</span>', delay: 3000 },
    { text: '&nbsp;&nbsp;}', delay: 3300 },
    { text: '}', delay: 3600 }
];

function typeCode() {
    const typewriterContainer = document.getElementById(CONFIG.SELECTORS.TYPEWRITER_CODE);
    if (!typewriterContainer || typewriterContainer.dataset.animated === 'true') return;
    
    typewriterContainer.dataset.animated = 'true';
    typewriterContainer.innerHTML = '';

    CODE_LINES.forEach((line, lineIndex) => {
        setTimeout(() => {
            const lineElement = document.createElement('span');
            lineElement.className = 'code-line';
            typewriterContainer.appendChild(lineElement);

            // Add cursor to current line
            if (lineIndex === CODE_LINES.length - 1) {
                lineElement.classList.add('typing-cursor');
            }

            // Type character by character
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = line.text;
            const htmlContent = tempDiv.innerHTML;

            // For HTML content, we need to insert the full HTML at once
            // but animate the visibility
            let currentHtml = '';
            const htmlTags = htmlContent.match(/<[^>]*>[^<]*<\/[^>]*>|<[^>]*>|[^<]+/g) || [htmlContent];

            let tagIndex = 0;
            const typeTag = () => {
                if (tagIndex < htmlTags.length) {
                    currentHtml += htmlTags[tagIndex];
                    lineElement.innerHTML = currentHtml;
                    tagIndex++;
                    setTimeout(typeTag, 30); // Fast typing speed
                } else {
                    // Remove cursor from previous line
                    const prevLine = typewriterContainer.children[lineIndex - 1];
                    if (prevLine) {
                        prevLine.classList.remove('typing-cursor');
                    }

                    // Add cursor to this line if it's the last one
                    if (lineIndex === CODE_LINES.length - 1) {
                        lineElement.classList.add('typing-cursor');
                    }
                }
            };

            typeTag();
        }, line.delay);
    });
}

function initTypewriter() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeCode();
            }
        });
    }, { threshold: 0.3 });

    heroObserver.observe(heroSection);
}

/* ============================================
   LAZY LOADING FOR IMAGES
   ============================================ */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');

    if (!lazyImages.length) return;

    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
        return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    img.onerror = () => img.classList.add('loaded');
                }

                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }

                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px 0px' });

    lazyImages.forEach(img => imageObserver.observe(img));
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            const navLinks = document.querySelector(`.${CONFIG.SELECTORS.NAV_LINKS}`);
            const hamburger = document.querySelector(`.${CONFIG.SELECTORS.HAMBURGER}`);
            const navActions = document.querySelector(`.${CONFIG.SELECTORS.NAV_ACTIONS}`);
            
            if (navLinks) navLinks.classList.remove(CONFIG.CLASSES.ACTIVE);
            if (hamburger) hamburger.classList.remove(CONFIG.CLASSES.ACTIVE);
            if (navActions) navActions.classList.remove(CONFIG.CLASSES.ACTIVE);
        }
    });
}

/* ============================================
   COMBINED SCROLL HANDLER
   ============================================ */
function handleScroll() {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > CONFIG.HEADER_SCROLL_THRESHOLD) {
            header.classList.add(CONFIG.CLASSES.SCROLLED);
        } else {
            header.classList.remove(CONFIG.CLASSES.SCROLLED);
        }
    }

    // Update reading progress
    updateReadingProgress();

    // Update active section
    setActiveSection();

    // Back to top button visibility
    const backToTop = document.getElementById(CONFIG.SELECTORS.BACK_TO_TOP);
    if (backToTop) {
        if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
            backToTop.classList.add(CONFIG.CLASSES.VISIBLE);
        } else {
            backToTop.classList.remove(CONFIG.CLASSES.VISIBLE);
        }
    }
}

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
function logEasterEgg() {
    console.log('%c👋 Привет, разработчик!', 'color: #6db33f; font-size: 20px; font-weight: bold;');
    console.log('%cИщешь код этого сайта? CSS в /css/style.css, JS в /js/main.js', 'color: #abb2bf; font-size: 14px;');
    console.log('%c☕ Java 21 | 🌱 Spring Boot | 🤖 AI/ML', 'color: #e76f00; font-size: 14px;');
    console.log('%c🌓 Попробуй переключить тему (кнопка справа в хедере)!', 'color: #569cd6; font-size: 14px;');
    console.log('%c📊 Progress bar сверху показывает сколько ты уже прочитал!', 'color: #4ec9b0; font-size: 14px;');
}

/* ============================================
   INITIALIZATION
   ============================================ */
function init() {
    // Initialize all modules
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initEmailCopy();
    initFadeInAnimation();
    initLazyLoading();
    initBackToTop();
    initTypewriter();
    initKeyboardNavigation();
    logEasterEgg();

    // Single scroll event listener for all scroll-based functionality
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call to set correct state on page load
    handleScroll();
    setActiveSection();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
