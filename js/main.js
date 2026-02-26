/* ============================================
   THEME TOGGLE
   ============================================ */
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add transition class for smooth theme change
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navActions = document.querySelector('.nav-actions');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        navActions.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            navActions.classList.remove('active');
        });
    });
}

/* ============================================
   ACTIVE SECTION INDICATOR
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a');

function setActiveSection() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveSection);
setActiveSection(); // Run on page load

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
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

/* ============================================
   EMAIL COPY FUNCTIONALITY
   ============================================ */
const emailLink = document.getElementById('emailLink');

if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = 'yarosh.nv@yandex.ru';
        
        navigator.clipboard.writeText(email).then(() => {
            this.classList.add('copied');
            setTimeout(() => {
                this.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
        });
    });
}

/* ============================================
   FADE-IN ANIMATION ON SCROLL
   ============================================ */
const fadeElements = document.querySelectorAll('.fade-in');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

/* ============================================
   HEADER SCROLL EFFECT
   ============================================ */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ============================================
   READING PROGRESS BAR
   ============================================ */
const readingProgress = document.getElementById('readingProgress');

function updateReadingProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    readingProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateReadingProgress);
updateReadingProgress();

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
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

/* ============================================
   TYPEWRITER EFFECT FOR CODE BLOCK
   ============================================ */
const codeLines = [
    { text: '<span class="keyword">public class</span> <span class="class">Developer</span> {', delay: 0 },
    { text: '&nbsp;&nbsp;<span class="keyword">public static void</span> <span class="method">main</span>(String[] args) {', delay: 300 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="class">Developer</span> nikita = <span class="keyword">new</span> <span class="class">Developer</span>();', delay: 600 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setName</span>(<span class="string">"Ярош Никита"</span>);', delay: 900 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setAge</span>(<span class="number">23</span>);', delay: 1200 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setStack</span>(', delay: 1500 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"Java 21"</span>, <span class="string">"Spring Boot"</span>,', delay: 1800 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="string">"PostgreSQL"</span>, <span class="string">"Kafka"</span>, <span class="string">"AI/ML"</span>', delay: 2100 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;);', delay: 2400 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;nikita.<span class="method">setExperience</span>(<span class="string">"3+ года"</span>);', delay: 2700 },
    { text: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="comment">// Open for freelance opportunities</span>', delay: 3000 },
    { text: '&nbsp;&nbsp;}', delay: 3300 },
    { text: '}', delay: 3600 }
];

const typewriterContainer = document.getElementById('typewriterCode');
let hasAnimated = false;

function typeCode() {
    if (hasAnimated) return;
    hasAnimated = true;
    
    typewriterContainer.innerHTML = '';
    
    codeLines.forEach((line, lineIndex) => {
        setTimeout(() => {
            const lineElement = document.createElement('span');
            lineElement.className = 'code-line';
            typewriterContainer.appendChild(lineElement);
            
            // Add cursor to current line
            if (lineIndex === codeLines.length - 1) {
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
                    if (lineIndex === codeLines.length - 1) {
                        lineElement.classList.add('typing-cursor');
                    }
                }
            };
            
            typeTag();
        }, line.delay);
    });
}

// Start typing when the hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            typeCode();
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

/* ============================================
   CONSOLE EASTER EGG
   ============================================ */
console.log('%c👋 Привет, разработчик!', 'color: #6db33f; font-size: 20px; font-weight: bold;');
console.log('%cИщешь код этого сайта? CSS в /css/style.css, JS в /js/main.js', 'color: #abb2bf; font-size: 14px;');
console.log('%c☕ Java 21 | 🌱 Spring Boot | 🤖 AI/ML', 'color: #e76f00; font-size: 14px;');
console.log('%c🌓 Попробуй переключить тему (кнопка справа в хедере)!', 'color: #569cd6; font-size: 14px;');
console.log('%c📊 Progress bar сверху показывает сколько ты уже прочитал!', 'color: #4ec9b0; font-size: 14px;');
