// Load works from API
async function loadWorks(category = 'all') {
    try {
        const response = await fetch('/api/works');
        const works = await response.json();
        
        const grid = document.getElementById('works-grid');
        grid.innerHTML = '';
        
        const filteredWorks = category === 'all' 
            ? works 
            : works.filter(work => work.category === category);
        
        filteredWorks.forEach(work => {
            const card = document.createElement('div');
            card.className = 'work-card bg-white rounded-xl shadow-lg overflow-hidden';
            card.innerHTML = `
                <div class="relative">
                    <img src="${work.thumbnail}" alt="${work.title}" class="w-full h-48 object-cover">
                    <span class="absolute top-4 right-4 category-badge px-3 py-1 rounded-full text-sm font-medium">
                        ${work.category}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${work.title}</h3>
                    <p class="text-gray-600 mb-3">${work.description}</p>
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-500">
                            <i class="fas fa-user mr-1"></i>
                            ${work.author}
                        </div>
                        <div class="text-sm text-gray-500">
                            <i class="fas fa-calendar mr-1"></i>
                            ${work.year}
                        </div>
                    </div>
                    <button class="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                        <i class="fas fa-play mr-2"></i>
                        작품 보기
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading works:', error);
    }
}

// Category filter functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load all works initially
    loadWorks();
    
    // Add click handlers to category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-purple-600', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            // Add active class to clicked button
            e.target.classList.remove('bg-white', 'text-gray-700');
            e.target.classList.add('bg-purple-600', 'text-white');
            
            // Load filtered works
            const category = e.target.dataset.category;
            loadWorks(category);
        });
    });
    
    // Smooth scroll for navigation links
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
    
    // Hero button actions
    const heroButtons = document.querySelectorAll('section.bg-white button');
    if (heroButtons[0]) {
        heroButtons[0].addEventListener('click', () => {
            document.getElementById('works').scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (heroButtons[1]) {
        heroButtons[1].addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

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

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});