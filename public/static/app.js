// Load works from API
async function loadWorks(category = 'all', containerId = 'works-grid') {
    try {
        const response = await fetch('/api/works');
        const works = await response.json();
        
        const grid = document.getElementById(containerId);
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const filteredWorks = category === 'all' 
            ? works 
            : works.filter(work => work.category === category);
        
        filteredWorks.forEach(work => {
            const card = document.createElement('div');
            card.className = 'work-card card-orange rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300';
            card.innerHTML = `
                <div class="relative">
                    <img src="${work.thumbnail}" alt="${work.title}" class="w-full h-48 object-cover">
                    <span class="absolute top-4 right-4 category-badge px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                        ${work.category}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2 text-white">${work.title}</h3>
                    <p class="text-gray-300 mb-4 leading-relaxed">${work.description}</p>
                    <div class="flex justify-between items-center mb-4">
                        <div class="text-sm text-gray-400">
                            <i class="fas fa-user mr-2 text-brand-orange"></i>
                            ${work.author}
                        </div>
                        <div class="text-sm text-gray-400">
                            <i class="fas fa-calendar mr-2 text-brand-orange"></i>
                            ${work.year}
                        </div>
                    </div>
                    <button class="w-full btn-orange text-white py-3 rounded-lg font-bold uppercase tracking-wide text-sm" onclick="viewWork(${work.id})">
                        <i class="fas fa-play mr-2"></i>
                        WATCH NOW
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading works:', error);
    }
}

// View individual work (placeholder)
function viewWork(workId) {
    // TODO: Implement work detail view
    alert(`작품 ID: ${workId} 상세 보기 기능은 곧 추가될 예정입니다.`);
}

// Category filter functionality
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('btn-orange', 'text-white');
                btn.classList.add('card-orange', 'text-gray-300');
            });
            
            // Add active class to clicked button
            e.target.classList.remove('card-orange', 'text-gray-300');
            e.target.classList.add('btn-orange', 'text-white');
            
            // Load filtered works
            const category = e.target.dataset.category;
            loadWorks(category);
        });
    });
}

// Contact form submission
function setupContactForm() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
            contactForm.reset();
        });
    }
}

// Mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
    }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Page-specific initialization
function initPage() {
    const currentPath = window.location.pathname;
    
    switch(currentPath) {
        case '/':
            // Home page
            loadWorks('all', 'home-works-grid');
            break;
        case '/works':
            // Works page
            loadWorks();
            setupCategoryFilters();
            break;
        case '/contact':
            // Contact page
            setupContactForm();
            break;
        default:
            // Other pages
            break;
    }
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize scroll animations
function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupSmoothScroll();
    initScrollAnimations();
    initPage();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
    initPage();
});