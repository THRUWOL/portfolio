/* ============================================
   CONFIGURATION CONSTANTS
   ============================================ */
const CONFIG = {
    // Scroll thresholds (pixels)
    SCROLL_THRESHOLD: 900,              // Показ кнопки "наверх" после прохождения Hero
    HEADER_SCROLL_THRESHOLD: 50,        // Порог для тени хедера
    HEADER_HEIGHT: 70,
    ACTIVE_SECTION_OFFSET: 100,         // Смещение для определения активной секции

    SELECTORS: {
        EMAIL_LINK: 'emailLink',
        MOBILE_MENU_BTN: 'mobile-menu-btn',
        NAV_LINKS: 'nav-links',
        HAMBURGER: 'hamburger',
        NAV_ACTIONS: 'nav-actions',
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
        POSITION: 'Java Backend Developer',
        RESUME_URL: 'a7f3e9d2_resume.pdf'
    },

    // File versions for cache busting
    VERSION: '1.0.0'
};

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
    const navLinks = document.querySelector(`.${CONFIG.SELECTORS.NAV_LINKS}`);
    const hamburger = document.querySelector(`.${CONFIG.SELECTORS.HAMBURGER}`);
    const navActions = document.querySelector(`.${CONFIG.SELECTORS.NAV_ACTIONS}`);
    const overlay = document.getElementById('mobileOverlay');

    function closeMobileMenu() {
        if (navLinks) navLinks.classList.remove(CONFIG.CLASSES.ACTIVE);
        if (hamburger) hamburger.classList.remove(CONFIG.CLASSES.ACTIVE);
        if (navActions) navActions.classList.remove(CONFIG.CLASSES.ACTIVE);
        if (overlay) overlay.classList.remove(CONFIG.CLASSES.ACTIVE);
        document.body.style.overflow = '';
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#' || !href.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                closeMobileMenu();
            }
        });
    });
}

/* ============================================
   FOOTER — одна точка правды для контактов (CONFIG.CONTACT)
   ============================================ */
function initFooterContacts() {
    const telegramLink = document.getElementById('telegramLink');
    const emailLink = document.getElementById('emailLink');
    const emailText = document.getElementById('emailLinkText');
    const resumeLink = document.getElementById('resumeLink');
    const c = CONFIG.CONTACT;
    if (telegramLink) telegramLink.href = c.TELEGRAM;
    if (emailLink) emailLink.href = 'mailto:' + c.EMAIL;
    if (emailText) emailText.textContent = c.EMAIL;
    if (resumeLink && c.RESUME_URL) resumeLink.href = c.RESUME_URL;
    const heroResume = document.getElementById('heroResumeLink');
    if (heroResume && c.RESUME_URL) heroResume.href = c.RESUME_URL;
}

/* ============================================
   RESUME DOWNLOAD — микро-фидбек
   ============================================ */
function initResumeFeedback() {
    const resumeLink = document.getElementById('resumeLink');
    if (!resumeLink) return;
    const textEl = resumeLink.querySelector('.resume-link-text');
    const defaultText = resumeLink.dataset.resumeText || 'Скачать резюме (PDF)';
    resumeLink.addEventListener('click', () => {
        if (!textEl) return;
        textEl.textContent = 'Скачивание…';
        setTimeout(() => { textEl.textContent = defaultText; }, 2500);
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
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"PostgreSQL"</span>, <span class="string">"AI/ML"</span>', delay: 2100 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;);', delay: 2400 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setExperience</span>(<span class="string">"3+ года"</span>);', delay: 2700 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Open for freelance opportunities</span>', delay: 3000 },
    { text: '&nbsp;&nbsp;}', delay: 3300 },
    { text: '}', delay: 3600 }
];

function typeCode() {
    const typewriterContainer = document.getElementById(CONFIG.SELECTORS.TYPEWRITER_CODE);
    if (!typewriterContainer || typewriterContainer.dataset.animated === 'true') return;
    const skeleton = document.getElementById('codeSkeleton');
    if (skeleton) skeleton.remove();
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
   LEARNING — карусель: одна карточка, автолистание, пауза при наведении
   ============================================ */
function initLearnCarousel() {
    const carousel = document.querySelector('.learn-carousel[data-carousel]');
    if (!carousel) return;
    const viewport = carousel.querySelector('.learn-carousel-viewport');
    const track = carousel.querySelector('.learn-carousel-track');
    const items = Array.from(carousel.querySelectorAll('[data-carousel-item]'));
    const total = items.length;
    if (!viewport || !track || total === 0) return;

    const dotsContainer = carousel.querySelector('#learnCarouselDots');

    let currentIndex = 0;
    const AUTO_PLAY_MS = 4500;
    let autoPlayId = null;
    const TRANSITION_DURATION = 0.4;
    function getW() { return viewport.offsetWidth; }

    function updateLayout() {
        const w = getW();
        track.style.width = total * w + 'px';
        items.forEach((el) => {
            el.style.flex = `0 0 ${w}px`;
            el.style.minWidth = '0';
        });
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * w}px)`;
        requestAnimationFrame(() => { track.style.transition = ''; });
    }

    function updateCardStates() {
        items.forEach((el, i) => {
            el.classList.toggle('is-center', i === currentIndex);
            el.classList.remove('is-prev', 'is-next');
        });
    }

    function updateDots() {
        if (!dotsContainer) return;
        const dots = dotsContainer.querySelectorAll('.learn-carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('is-active', i === currentIndex);
            dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
        });
    }

    function goTo(index, moveFocus) {
        currentIndex = (index + total) % total;
        const w = getW();
        track.style.transition = `transform ${TRANSITION_DURATION}s var(--ease-out-expo)`;
        track.style.transform = `translateX(-${currentIndex * w}px)`;
        updateCardStates();
        updateDots();
        if (moveFocus && items[currentIndex]) {
            items[currentIndex].setAttribute('tabindex', '-1');
            items[currentIndex].focus({ preventScroll: true });
        }
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayId = setInterval(() => {
            goTo(currentIndex + 1);
        }, AUTO_PLAY_MS);
    }

    function stopAutoPlay() {
        if (autoPlayId != null) {
            clearInterval(autoPlayId);
            autoPlayId = null;
        }
    }

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    if (dotsContainer) {
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'learn-carousel-dot' + (i === 0 ? ' is-active' : '');
            dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
            dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
            dot.addEventListener('click', () => goTo(i, true));
            dotsContainer.appendChild(dot);
        }
    }

    /* Свайп с тянущим следом за пальцем */
    let touchStartX = 0;
    let isDragging = false;
    const SWIPE_MIN = 40;
    viewport.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
        track.style.transition = 'none';
    }, { passive: true });
    viewport.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const w = getW();
        const dx = e.touches[0].clientX - touchStartX;
        const base = -currentIndex * w;
        let next = base + dx;
        const min = -((total - 1) * w);
        next = Math.max(min, Math.min(0, next));
        track.style.transform = `translateX(${next}px)`;
    }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        const w = getW();
        track.style.transition = `transform ${TRANSITION_DURATION}s var(--ease-out-expo)`;
        if (Math.abs(diff) > SWIPE_MIN) {
            if (diff > 0) goTo(currentIndex + 1, false);
            else goTo(currentIndex - 1, false);
        } else {
            track.style.transform = `translateX(-${currentIndex * w}px)`;
        }
        startAutoPlay();
    }, { passive: true });

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(updateLayout) : null;
    if (ro) ro.observe(viewport);
    window.addEventListener('resize', updateLayout);

    updateLayout();
    updateCardStates();
    updateDots();
    goTo(0);
    startAutoPlay();
}

/* Скелетон логотипов обучения: показывать fallback до загрузки img */
function initLearningLogos() {
    document.querySelectorAll('.learn-logo').forEach(logo => {
        const img = logo.querySelector('.learn-logo-img');
        const fallback = logo.querySelector('.learn-logo-fallback');
        if (!img || !fallback) return;
        if (img.complete && img.naturalWidth > 0) {
            logo.classList.add('img-loaded');
            return;
        }
        img.addEventListener('load', () => logo.classList.add('img-loaded'));
        img.addEventListener('error', () => {
            fallback.classList.add('is-visible');
            logo.classList.add('img-loaded');
        });
    });
}

function initLearnCards() {
    const container = document.querySelector('.learn-carousel') || document.querySelector('.learn-cards-grid');
    if (!container || container.hasAttribute('data-carousel')) return;
    const cards = container.querySelectorAll('[data-learn]');
    cards.forEach(card => {
        const head = card.querySelector('.learn-card-head');
        if (!head || head.tagName !== 'BUTTON') return;
        head.addEventListener('click', () => {
            const wasOpen = card.classList.contains('is-open');
            cards.forEach((other) => {
                other.classList.remove('is-open');
                const otherHead = other.querySelector('.learn-card-head');
                if (otherHead) otherHead.setAttribute('aria-expanded', 'false');
            });
            if (!wasOpen) {
                card.classList.add('is-open');
                head.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navLinks = document.querySelector(`.${CONFIG.SELECTORS.NAV_LINKS}`);
            const hamburger = document.querySelector(`.${CONFIG.SELECTORS.HAMBURGER}`);
            const navActions = document.querySelector(`.${CONFIG.SELECTORS.NAV_ACTIONS}`);
            if (navLinks) navLinks.classList.remove(CONFIG.CLASSES.ACTIVE);
            if (hamburger) hamburger.classList.remove(CONFIG.CLASSES.ACTIVE);
            if (navActions) navActions.classList.remove(CONFIG.CLASSES.ACTIVE);

            const openCard = document.querySelector('.learn-card.is-open');
            if (openCard) {
                const head = openCard.querySelector('.learn-card-head');
                if (head && head.tagName === 'BUTTON') {
                    openCard.classList.remove('is-open');
                    head.setAttribute('aria-expanded', 'false');
                }
            }
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
    console.log('%c👋 Привет, разработчик!', 'color: #c8ff00; font-size: 20px; font-weight: bold;');
    console.log('%cСайт собран в духе дерзких студий. CSS: /css/, JS: /js/main.js', 'color: #a1a1aa; font-size: 14px;');
    console.log('%c☕ Java 21 | 🌱 Spring Boot | 🤖 AI/ML', 'color: #f97316; font-size: 14px;');
}

/* ============================================
   INITIALIZATION
   ============================================ */
function init() {
    initFooterContacts();
    initMobileMenu();
    initSmoothScroll();
    initEmailCopy();
    initResumeFeedback();
    initLearnCarousel();
    initLearningLogos();
    initLearnCards();
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
