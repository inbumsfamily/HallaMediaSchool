import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

// Common layout template function
function getLayout(title: string, content: string, activePage: string = 'home') {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title} | 제주한라대학교 방송영상학과</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'brand-orange': '#ea580c',
                        'brand-orange-light': '#fb923c',
                        'brand-orange-dark': '#c2410c',
                        'brand-gray': '#1f2937',
                        'brand-gray-light': '#374151'
                    },
                    fontFamily: {
                        'brand': ['Inter', 'sans-serif']
                    }
                }
            }
        }
    </script>
    <style>
        body { 
            font-family: 'Inter', sans-serif;
            background: #000;
            color: #fff;
        }
        .work-card {
            transition: all 0.4s ease;
            border: 1px solid rgba(234, 88, 12, 0.2);
        }
        .work-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(234, 88, 12, 0.3);
            border-color: #ea580c;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #ea580c 0%, #fb923c 50%, #fdba74 100%);
        }
        .gradient-bg-dark {
            background: linear-gradient(135deg, #000 0%, #1f2937 50%, #374151 100%);
        }
        .category-badge {
            background: linear-gradient(135deg, #ea580c, #fb923c);
            color: white;
        }
        .nav-active {
            color: #fb923c !important;
            border-bottom: 3px solid #fb923c;
            font-weight: 600;
        }
        .hero-text {
            background: linear-gradient(135deg, #ea580c, #fb923c, #fdba74);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .section-bg-orange {
            background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);
        }
        .card-orange {
            background: linear-gradient(135deg, rgba(234, 88, 12, 0.1), rgba(251, 146, 60, 0.1));
            border: 1px solid rgba(234, 88, 12, 0.3);
        }
        .btn-orange {
            background: linear-gradient(135deg, #ea580c, #fb923c);
            transition: all 0.3s ease;
        }
        .btn-orange:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(234, 88, 12, 0.4);
        }
        .text-brand {
            color: #fb923c;
        }
    </style>
</head>
<body class="bg-black text-white font-brand">
    <!-- Header -->
    <header class="gradient-bg-dark border-b border-brand-orange">
        <div class="container mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <a href="/" class="block">
                        <h1 class="text-xl md:text-2xl font-bold mb-1 text-white">
                            <span class="text-brand-orange">HALLA</span> MEDIA SCHOOL
                        </h1>
                        <p class="text-xs md:text-sm text-gray-300 uppercase tracking-wider font-medium">
                            <span class="hero-text">EMPOWERING</span> • 
                            <span class="hero-text">DYNAMIC</span> • 
                            <span class="hero-text">CREATIVE</span>
                        </p>
                    </a>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="hover:text-brand-orange transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'home' ? 'nav-active' : 'text-gray-300'}">HOME</a>
                    <a href="/works" class="hover:text-brand-orange transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'works' ? 'nav-active' : 'text-gray-300'}">WORKS</a>
                    <a href="/about" class="hover:text-brand-orange transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'about' ? 'nav-active' : 'text-gray-300'}">ABOUT</a>
                    <a href="/faculty" class="hover:text-brand-orange transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'faculty' ? 'nav-active' : 'text-gray-300'}">FACULTY</a>
                    <a href="/curriculum" class="hover:text-brand-orange transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'curriculum' ? 'nav-active' : 'text-gray-300'}">CURRICULUM</a>
                    <a href="/contact" class="hover:text-brand-orange transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'contact' ? 'nav-active' : 'text-gray-300'}">CONTACT</a>
                </nav>
                <!-- Mobile menu button -->
                <button class="md:hidden text-brand-orange" id="mobile-menu-btn">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
            <!-- Mobile menu -->
            <nav class="md:hidden mt-6 space-y-3 hidden border-t border-brand-orange pt-4" id="mobile-menu">
                <a href="/" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-orange transition ${activePage === 'home' ? 'text-brand-orange' : 'text-gray-300'}">HOME</a>
                <a href="/works" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-orange transition ${activePage === 'works' ? 'text-brand-orange' : 'text-gray-300'}">WORKS</a>
                <a href="/about" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-orange transition ${activePage === 'about' ? 'text-brand-orange' : 'text-gray-300'}">ABOUT</a>
                <a href="/faculty" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-orange transition ${activePage === 'faculty' ? 'text-brand-orange' : 'text-gray-300'}">FACULTY</a>
                <a href="/curriculum" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-orange transition ${activePage === 'curriculum' ? 'text-brand-orange' : 'text-gray-300'}">CURRICULUM</a>
                <a href="/contact" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-orange transition ${activePage === 'contact' ? 'text-brand-orange' : 'text-gray-300'}">CONTACT</a>
            </nav>
        </div>
    </header>

    ${content}

    <!-- Footer -->
    <footer class="gradient-bg-dark border-t border-brand-orange py-12">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">
                        <span class="text-brand-orange">HALLA</span> MEDIA SCHOOL
                    </h3>
                    <p class="text-gray-400 mb-4 leading-relaxed">
                        창의적이고 혁신적인 미디어 콘텐츠를 만들어가는 미래의 크리에이터를 양성합니다.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center hover:bg-brand-orange-light transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center hover:bg-brand-orange-light transition">
                            <i class="fab fa-youtube"></i>
                        </a>
                        <a href="#" class="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center hover:bg-brand-orange-light transition">
                            <i class="fab fa-facebook"></i>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="text-sm font-bold uppercase tracking-wider text-brand-orange mb-4">바로가기</h4>
                    <ul class="space-y-2 text-sm">
                        <li><a href="/works" class="text-gray-400 hover:text-brand-orange transition">STUDENT WORKS</a></li>
                        <li><a href="/about" class="text-gray-400 hover:text-brand-orange transition">ABOUT US</a></li>
                        <li><a href="/faculty" class="text-gray-400 hover:text-brand-orange transition">FACULTY</a></li>
                        <li><a href="/curriculum" class="text-gray-400 hover:text-brand-orange transition">CURRICULUM</a></li>
                        <li><a href="/contact" class="text-gray-400 hover:text-brand-orange transition">CONTACT</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-sm font-bold uppercase tracking-wider text-brand-orange mb-4">연락처</h4>
                    <div class="space-y-2 text-sm text-gray-400">
                        <p><i class="fas fa-map-marker-alt text-brand-orange mr-2"></i>제주시 한라대학로 38</p>
                        <p><i class="fas fa-phone text-brand-orange mr-2"></i>064-741-1000</p>
                        <p><i class="fas fa-envelope text-brand-orange mr-2"></i>media@chu.ac.kr</p>
                    </div>
                </div>
            </div>
            <div class="border-t border-brand-orange mt-8 pt-8 text-center">
                <p class="text-gray-400 text-sm">© 2024 제주한라대학교 방송영상학과. All rights reserved.</p>
                <p class="text-brand-orange text-xs mt-2 font-semibold uppercase tracking-wider">
                    EMPOWERING • DYNAMIC • DIVERSE • CREATIVE • COLLABORATIVE
                </p>
            </div>
        </div>
    </footer>

    <script src="/static/app.js"></script>
    <script>
        // Mobile menu toggle
        document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            menu?.classList.toggle('hidden');
        });
    </script>
</body>
</html>`
}

const app = new Hono()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Sample works data
const works = [
  {
    id: 1,
    title: '도시의 밤',
    author: '김민지',
    category: '단편영화',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400',
    description: '도시의 밤거리를 배경으로 한 감성적인 단편 영화',
    year: 2024
  },
  {
    id: 2,
    title: '제주의 사계',
    author: '이준호',
    category: '다큐멘터리',
    thumbnail: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400',
    description: '제주도의 아름다운 사계절을 담은 다큐멘터리',
    year: 2024
  },
  {
    id: 3,
    title: '청춘 스케치',
    author: '박서연',
    category: '뮤직비디오',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    description: '청춘의 열정을 담은 감각적인 뮤직비디오',
    year: 2024
  },
  {
    id: 4,
    title: '커피 한 잔의 여유',
    author: '최동현',
    category: '광고영상',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    description: '일상 속 작은 행복을 담은 감성 광고',
    year: 2023
  },
  {
    id: 5,
    title: '바다의 목소리',
    author: '정수아',
    category: '실험영상',
    thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
    description: '제주 바다의 소리와 영상을 실험적으로 표현한 작품',
    year: 2023
  },
  {
    id: 6,
    title: '할망의 이야기',
    author: '강태웅',
    category: '다큐멘터리',
    thumbnail: 'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=400',
    description: '제주 해녀 할머니의 삶을 담은 휴먼 다큐멘터리',
    year: 2023
  }
]

// API Routes
app.get('/api/works', (c) => {
  return c.json(works)
})

app.get('/api/works/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const work = works.find(w => w.id === id)
  if (!work) {
    return c.json({ error: 'Work not found' }, 404)
  }
  return c.json(work)
})

// Home page
app.get('/', (c) => {
  const content = `
    <!-- Hero Section -->
    <section class="section-bg-orange py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-black opacity-20"></div>
        <div class="container mx-auto px-4 text-center relative z-10">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight">
                    <span class="text-white">EMPOWERING</span><br>
                    <span class="text-white opacity-90">DYNAMIC &</span><br>
                    <span class="text-white opacity-80">DIVERSE</span><br>
                    <span class="hero-text">CREATIVE</span>
                </h1>
                <h2 class="text-2xl md:text-3xl font-bold text-white mb-8 tracking-wide">
                    COLLABORATIVE MEDIA EDUCATION
                </h2>
                <p class="text-lg md:text-xl text-white opacity-90 mb-12 leading-relaxed max-w-2xl mx-auto">
                    제주한라대학교 방송영상학과에서 미래 미디어 산업을 이끌어갈 창의적 인재로 성장하세요
                </p>
                <div class="flex justify-center space-x-6 flex-wrap gap-4">
                    <a href="/works" class="btn-orange text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide">
                        <i class="fas fa-play mr-3"></i>
                        EXPLORE WORKS
                    </a>
                    <a href="/about" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-brand-orange transition duration-300">
                        <i class="fas fa-info-circle mr-3"></i>
                        LEARN MORE
                    </a>
                </div>
            </div>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-10 left-10 w-20 h-20 border-2 border-white opacity-20 rotate-45"></div>
        <div class="absolute bottom-10 right-10 w-16 h-16 border-2 border-white opacity-20 rotate-12"></div>
        <div class="absolute top-1/2 right-20 w-8 h-8 bg-white opacity-20 rounded-full"></div>
    </section>

    <!-- Latest Works Preview -->
    <section class="py-20 bg-black">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black mb-4">
                    <span class="hero-text">LATEST WORKS</span>
                </h2>
                <p class="text-gray-400 text-lg max-w-2xl mx-auto">
                    우리 학생들의 창의적이고 혁신적인 작품들을 만나보세요
                </p>
            </div>
            <div id="home-works-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <!-- Latest works will be loaded here -->
            </div>
            <div class="text-center">
                <a href="/works" class="btn-orange text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide inline-block">
                    <i class="fas fa-arrow-right mr-3"></i>
                    VIEW ALL WORKS
                </a>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-black mb-4 text-white">
                    BY THE <span class="hero-text">NUMBERS</span>
                </h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="card-orange p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-users text-4xl text-brand-orange mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">200+</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">재학생</p>
                </div>
                <div class="card-orange p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-trophy text-4xl text-brand-orange mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">50+</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">수상 작품</p>
                </div>
                <div class="card-orange p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-video text-4xl text-brand-orange mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">100+</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">연간 제작</p>
                </div>
                <div class="card-orange p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-briefcase text-4xl text-brand-orange mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">85%</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">취업률</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Info -->
    <section class="py-20 bg-black">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-black mb-4">
                    <span class="hero-text">DISCOVER</span> <span class="text-white">OUR PROGRAMS</span>
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="card-orange p-8 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-graduation-cap text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4 text-brand-orange uppercase tracking-wider">
                        ABOUT US
                    </h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        미래 미디어를 선도하는 창의적이고 혁신적인 인재를 양성하는 전문 교육기관입니다.
                    </p>
                    <a href="/about" class="text-brand-orange hover:text-brand-orange-light transition font-semibold uppercase tracking-wider">
                        LEARN MORE <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="card-orange p-8 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-chalkboard-teacher text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4 text-brand-orange uppercase tracking-wider">
                        FACULTY
                    </h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        산업 최전선에서 활동하고 있는 전문가들이 여러분의 창의적 능력을 발휘하도록 지도합니다.
                    </p>
                    <a href="/faculty" class="text-brand-orange hover:text-brand-orange-light transition font-semibold uppercase tracking-wider">
                        MEET FACULTY <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="card-orange p-8 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-book text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4 text-brand-orange uppercase tracking-wider">
                        CURRICULUM
                    </h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        이론과 실무를 겸비한 차별화된 교육과정으로 미디어 전문가로 성장할 수 있습니다.
                    </p>
                    <a href="/curriculum" class="text-brand-orange hover:text-brand-orange-light transition font-semibold uppercase tracking-wider">
                        VIEW CURRICULUM <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <script>
        // Load latest 3 works for home page
        async function loadHomeWorks() {
            try {
                const response = await fetch('/api/works');
                const works = await response.json();
                
                const grid = document.getElementById('home-works-grid');
                grid.innerHTML = '';
                
                // Show only first 3 works
                const latestWorks = works.slice(0, 3);
                
                latestWorks.forEach(work => {
                    const card = document.createElement('div');
                    card.className = 'work-card card-orange rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300';
                    card.innerHTML = \`
                        <div class="relative">
                            <img src="\${work.thumbnail}" alt="\${work.title}" class="w-full h-48 object-cover">
                            <span class="absolute top-4 right-4 category-badge px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                \${work.category}
                            </span>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold mb-2 text-white">\${work.title}</h3>
                            <p class="text-gray-300 mb-4 leading-relaxed">\${work.description}</p>
                            <div class="flex justify-between items-center mb-4">
                                <div class="text-sm text-gray-400">
                                    <i class="fas fa-user mr-2 text-brand-orange"></i>
                                    \${work.author}
                                </div>
                                <div class="text-sm text-gray-400">
                                    <i class="fas fa-calendar mr-2 text-brand-orange"></i>
                                    \${work.year}
                                </div>
                            </div>
                            <button class="w-full btn-orange text-white py-2 rounded-lg font-semibold uppercase tracking-wide text-sm" onclick="viewWork(\${work.id})">
                                <i class="fas fa-play mr-2"></i>
                                WATCH NOW
                            </button>
                        </div>
                    \`;
                    grid.appendChild(card);
                });
            } catch (error) {
                console.error('Error loading works:', error);
            }
        }
        
        // Load works when page loads
        document.addEventListener('DOMContentLoaded', loadHomeWorks);
    </script>
  `;
  
  return c.html(getLayout('홈', content, 'home'));
})

// Works page
app.get('/works', (c) => {
  const content = `
    <section class="py-20 bg-black">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h1 class="text-5xl md:text-6xl font-black mb-6">
                    <span class="hero-text">STUDENT WORKS</span>
                </h1>
                <p class="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    우리 학과 학생들의 <span class="text-brand-orange font-semibold">창의적이고 혁신적인</span> 영상 작품들을 만나보세요
                </p>
            </div>
            
            <div class="flex flex-wrap justify-center gap-4 mb-16" id="categories">
                <button class="category-btn btn-orange px-6 py-3 rounded-full text-white font-bold uppercase tracking-wide" data-category="all">
                    ALL WORKS
                </button>
                <button class="category-btn card-orange px-6 py-3 rounded-full text-gray-300 font-bold uppercase tracking-wide hover:bg-brand-orange hover:text-white transition" data-category="단편영화">
                    FILMS
                </button>
                <button class="category-btn card-orange px-6 py-3 rounded-full text-gray-300 font-bold uppercase tracking-wide hover:bg-brand-orange hover:text-white transition" data-category="다큐멘터리">
                    DOCUMENTARIES
                </button>
                <button class="category-btn card-orange px-6 py-3 rounded-full text-gray-300 font-bold uppercase tracking-wide hover:bg-brand-orange hover:text-white transition" data-category="뮤직비디오">
                    MUSIC VIDEOS
                </button>
                <button class="category-btn card-orange px-6 py-3 rounded-full text-gray-300 font-bold uppercase tracking-wide hover:bg-brand-orange hover:text-white transition" data-category="광고영상">
                    COMMERCIALS
                </button>
                <button class="category-btn card-orange px-6 py-3 rounded-full text-gray-300 font-bold uppercase tracking-wide hover:bg-brand-orange hover:text-white transition" data-category="실험영상">
                    EXPERIMENTAL
                </button>
            </div>
        </div>
    </section>

    <section class="py-20 bg-gradient-to-b from-black to-gray-900">
        <div class="container mx-auto px-4">
            <div id="works-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Works will be loaded here via JavaScript -->
            </div>
        </div>
    </section>
  `;
  
  return c.html(getLayout('작품', content, 'works'));
});

// About page
app.get('/about', (c) => {
  const content = `
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">
                <i class="fas fa-graduation-cap mr-3"></i>
                학과 소개
            </h1>
            
            <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                    <h2 class="text-3xl font-semibold mb-6 text-purple-600">미래 미디어를 선도하는 인재 양성</h2>
                    <p class="text-gray-600 mb-4 text-lg leading-relaxed">
                        제주한라대학교 방송영상학과는 급변하는 미디어 환경에 대응하는 창의적이고 
                        전문적인 영상 콘텐츠 제작자를 양성합니다.
                    </p>
                    <p class="text-gray-600 mb-6 text-lg leading-relaxed">
                        최신 장비와 시설을 갖춘 실습실에서 이론과 실무를 겸비한 교육을 제공하며, 
                        학생들의 창의적인 아이디어가 현실이 되는 곳입니다.
                    </p>
                    
                    <h3 class="text-xl font-semibold mb-4 text-gray-800">주요 특징</h3>
                    <ul class="space-y-3">
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                            <span class="text-gray-600">최첨단 스튜디오 및 편집실 완비</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                            <span class="text-gray-600">산학협력을 통한 실무 경험 제공</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                            <span class="text-gray-600">다양한 공모전 및 영화제 참여 지원</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                            <span class="text-gray-600">개인별 맞춤형 포트폴리오 관리</span>
                        </li>
                        <li class="flex items-start">
                            <i class="fas fa-check-circle text-purple-600 mr-3 mt-1"></i>
                            <span class="text-gray-600">미디어 업계 현직 전문가 특강</span>
                        </li>
                    </ul>
                </div>
                <div class="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl">
                    <div class="grid grid-cols-2 gap-4 text-center">
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-users text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold text-2xl">200+</h4>
                            <p class="text-sm text-gray-600">재학생</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-trophy text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold text-2xl">50+</h4>
                            <p class="text-sm text-gray-600">수상 작품</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-video text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold text-2xl">100+</h4>
                            <p class="text-sm text-gray-600">연간 제작</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-briefcase text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold text-2xl">85%</h4>
                            <p class="text-sm text-gray-600">취업률</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">교육 목표</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                    <i class="fas fa-lightbulb text-4xl text-purple-600 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">창의성 개발</h3>
                    <p class="text-gray-600">독창적인 아이디어와 창의적 사고를 바탕으로 한 콘텐츠 제작 능력 함양</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                    <i class="fas fa-cogs text-4xl text-blue-600 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">기술적 전문성</h3>
                    <p class="text-gray-600">최신 방송영상 제작 기술과 장비 활용 능력을 갖춘 전문가 양성</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-lg text-center">
                    <i class="fas fa-handshake text-4xl text-green-600 mb-4"></i>
                    <h3 class="text-xl font-semibold mb-4">산업 연계</h3>
                    <p class="text-gray-600">현장 실무 경험을 통한 미디어 산업계 즉시 투입 가능한 인재 육성</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">주요 시설</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                    <i class="fas fa-tv text-3xl text-purple-600 mb-3"></i>
                    <h3 class="font-semibold mb-2">HD 스튜디오</h3>
                    <p class="text-sm text-gray-600">전문 방송용 카메라와 조명 시설</p>
                </div>
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <i class="fas fa-cut text-3xl text-blue-600 mb-3"></i>
                    <h3 class="font-semibold mb-2">편집실</h3>
                    <p class="text-sm text-gray-600">Avid, Premiere Pro 등 전문 편집 소프트웨어</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <i class="fas fa-microphone text-3xl text-green-600 mb-3"></i>
                    <h3 class="font-semibold mb-2">녹음실</h3>
                    <p class="text-sm text-gray-600">고품질 오디오 레코딩 및 후시녹음 시설</p>
                </div>
                <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl">
                    <i class="fas fa-desktop text-3xl text-yellow-600 mb-3"></i>
                    <h3 class="font-semibold mb-2">컴퓨터실</h3>
                    <p class="text-sm text-gray-600">고사양 워크스테이션과 그래픽 소프트웨어</p>
                </div>
            </div>
        </div>
    </section>
  `;
  
  return c.html(getLayout('학과소개', content, 'about'));
});

// Faculty page
app.get('/faculty', (c) => {
  const content = `
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">
                <i class="fas fa-chalkboard-teacher mr-3"></i>
                교수진
            </h1>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- 교수진 1 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-br from-purple-100 to-pink-100 p-6 text-center">
                        <div class="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-purple-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800">김영진 교수</h3>
                        <p class="text-purple-600 font-medium">학과장 / 영상제작 전공</p>
                    </div>
                    <div class="p-6">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">전문 분야</h4>
                            <p class="text-gray-600 text-sm">다큐멘터리 제작, 영상 스토리텔링</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">학력</h4>
                            <p class="text-gray-600 text-sm">서울대학교 영상학과 박사</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">주요 경력</h4>
                            <p class="text-gray-600 text-sm">KBS 다큐멘터리 PD 15년 경력</p>
                        </div>
                    </div>
                </div>

                <!-- 교수진 2 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-br from-blue-100 to-purple-100 p-6 text-center">
                        <div class="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-blue-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800">박민수 교수</h3>
                        <p class="text-blue-600 font-medium">영상편집 전공</p>
                    </div>
                    <div class="p-6">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">전문 분야</h4>
                            <p class="text-gray-600 text-sm">포스트 프로덕션, 디지털 영상편집</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">학력</h4>
                            <p class="text-gray-600 text-sm">한국예술종합학교 영상원 석사</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">주요 경력</h4>
                            <p class="text-gray-600 text-sm">영화 <기생충> 편집 참여</p>
                        </div>
                    </div>
                </div>

                <!-- 교수진 3 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-br from-green-100 to-blue-100 p-6 text-center">
                        <div class="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-green-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800">이수현 교수</h3>
                        <p class="text-green-600 font-medium">방송기술 전공</p>
                    </div>
                    <div class="p-6">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">전문 분야</h4>
                            <p class="text-gray-600 text-sm">방송 시스템, 디지털 미디어 기술</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">학력</h4>
                            <p class="text-gray-600 text-sm">KAIST 전자공학과 박사</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">주요 경력</h4>
                            <p class="text-gray-600 text-sm">삼성전자 미디어솔루션센터 수석연구원</p>
                        </div>
                    </div>
                </div>

                <!-- 교수진 4 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-br from-yellow-100 to-green-100 p-6 text-center">
                        <div class="w-24 h-24 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-yellow-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800">정미영 교수</h3>
                        <p class="text-yellow-600 font-medium">미디어 콘텐츠 전공</p>
                    </div>
                    <div class="p-6">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">전문 분야</h4>
                            <p class="text-gray-600 text-sm">콘텐츠 기획, 뉴미디어 콘텐츠</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">학력</h4>
                            <p class="text-gray-600 text-sm">연세대학교 신문방송학과 박사</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">주요 경력</h4>
                            <p class="text-gray-600 text-sm">CJ ENM 콘텐츠사업부 이사</p>
                        </div>
                    </div>
                </div>

                <!-- 교수진 5 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-br from-pink-100 to-purple-100 p-6 text-center">
                        <div class="w-24 h-24 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-pink-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800">강동혁 교수</h3>
                        <p class="text-pink-600 font-medium">사운드 디자인 전공</p>
                    </div>
                    <div class="p-6">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">전문 분야</h4>
                            <p class="text-gray-600 text-sm">음향 제작, 사운드 이펙트</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">학력</h4>
                            <p class="text-gray-600 text-sm">버클리 음대 음향학과 석사</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">주요 경력</h4>
                            <p class="text-gray-600 text-sm">할리우드 영화 음향 감독 10년</p>
                        </div>
                    </div>
                </div>

                <!-- 교수진 6 -->
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-br from-indigo-100 to-pink-100 p-6 text-center">
                        <div class="w-24 h-24 bg-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-indigo-600"></i>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-800">최은지 교수</h3>
                        <p class="text-indigo-600 font-medium">애니메이션 전공</p>
                    </div>
                    <div class="p-6">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">전문 분야</h4>
                            <p class="text-gray-600 text-sm">3D 애니메이션, 모션 그래픽</p>
                        </div>
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">학력</h4>
                            <p class="text-gray-600 text-sm">홍익대학교 애니메이션학과 박사</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-gray-800 mb-2">주요 경력</h4>
                            <p class="text-gray-600 text-sm">픽사 애니메이션 스튜디오 근무</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;
  
  return c.html(getLayout('교수진', content, 'faculty'));
});

// Curriculum page
app.get('/curriculum', (c) => {
  const content = `
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">
                <i class="fas fa-book mr-3"></i>
                교육과정
            </h1>
            
            <div class="max-w-4xl mx-auto">
                <!-- 1학년 -->
                <div class="mb-12">
                    <h2 class="text-2xl font-semibold text-purple-600 mb-6 flex items-center">
                        <i class="fas fa-seedling mr-3"></i>
                        1학년 - 기초 과정
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-purple-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">1학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">방송영상학개론</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">디지털미디어의이해</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">영상기초실습</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">커뮤니케이션개론</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bg-purple-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">2학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">영상제작기초</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">사진촬영및실습</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">방송제작론</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-purple-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">미디어글쓰기</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 2학년 -->
                <div class="mb-12">
                    <h2 class="text-2xl font-semibold text-blue-600 mb-6 flex items-center">
                        <i class="fas fa-leaf mr-3"></i>
                        2학년 - 전공 기초
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-blue-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">1학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">비디오편집실습</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">방송장비및운용</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">스토리텔링</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">라디오제작실습</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bg-blue-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">2학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">TV프로그램제작</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">음향제작및실습</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">광고영상제작</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-blue-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">미디어법규</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 3학년 -->
                <div class="mb-12">
                    <h2 class="text-2xl font-semibold text-green-600 mb-6 flex items-center">
                        <i class="fas fa-tree mr-3"></i>
                        3학년 - 전공 심화
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-green-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">1학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">다큐멘터리제작</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">3D애니메이션</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">방송기술론</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">뉴미디어콘텐츠</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bg-green-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">2학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">단편영화제작</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">모션그래픽</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">방송연출론</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-green-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">디지털컬러보정</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 4학년 -->
                <div class="mb-12">
                    <h2 class="text-2xl font-semibold text-orange-600 mb-6 flex items-center">
                        <i class="fas fa-crown mr-3"></i>
                        4학년 - 포트폴리오 완성
                    </h2>
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="bg-orange-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">1학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">졸업작품기획</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">현장실습</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">포트폴리오제작</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">미디어창업론</span>
                                </li>
                            </ul>
                        </div>
                        <div class="bg-orange-50 p-6 rounded-xl">
                            <h3 class="font-semibold text-gray-800 mb-4">2학기</h3>
                            <ul class="space-y-2">
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">졸업작품제작</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">캡스톤디자인</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">취업포트폴리오</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="fas fa-dot-circle text-orange-500 mr-2 text-xs"></i>
                                    <span class="text-gray-700">졸업작품발표</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">전공 트랙</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <div class="text-center mb-6">
                        <i class="fas fa-video text-4xl text-purple-600 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-800">영상제작 트랙</h3>
                    </div>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-2"></i>
                            <span class="text-gray-600">영화 제작</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-2"></i>
                            <span class="text-gray-600">다큐멘터리 제작</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-2"></i>
                            <span class="text-gray-600">뮤직비디오 제작</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-purple-500 mr-2"></i>
                            <span class="text-gray-600">광고영상 제작</span>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <div class="text-center mb-6">
                        <i class="fas fa-tv text-4xl text-blue-600 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-800">방송제작 트랙</h3>
                    </div>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-2"></i>
                            <span class="text-gray-600">TV 프로그램 제작</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-2"></i>
                            <span class="text-gray-600">라디오 프로그램 제작</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-2"></i>
                            <span class="text-gray-600">인터넷 방송</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-blue-500 mr-2"></i>
                            <span class="text-gray-600">1인 미디어</span>
                        </li>
                    </ul>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <div class="text-center mb-6">
                        <i class="fas fa-magic text-4xl text-green-600 mb-4"></i>
                        <h3 class="text-xl font-semibold text-gray-800">포스트프로덕션 트랙</h3>
                    </div>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span class="text-gray-600">영상 편집</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span class="text-gray-600">VFX/CGI</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span class="text-gray-600">모션 그래픽</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span class="text-gray-600">사운드 디자인</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  `;
  
  return c.html(getLayout('교육과정', content, 'curriculum'));
});

// Contact page
app.get('/contact', (c) => {
  const content = `
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">
                <i class="fas fa-envelope mr-3"></i>
                연락처
            </h1>
            
            <div class="grid lg:grid-cols-2 gap-12">
                <!-- Contact Information -->
                <div>
                    <h2 class="text-2xl font-semibold text-gray-800 mb-6">학과 정보</h2>
                    <div class="space-y-6">
                        <div class="flex items-start">
                            <i class="fas fa-map-marker-alt text-2xl text-purple-600 mr-4 mt-1"></i>
                            <div>
                                <h3 class="font-semibold text-gray-800 mb-2">주소</h3>
                                <p class="text-gray-600">제주특별자치도 제주시 한라대학로 38</p>
                                <p class="text-gray-600">제주한라대학교 방송영상학과</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <i class="fas fa-phone text-2xl text-blue-600 mr-4 mt-1"></i>
                            <div>
                                <h3 class="font-semibold text-gray-800 mb-2">전화번호</h3>
                                <p class="text-gray-600">대표전화: 064-741-1000</p>
                                <p class="text-gray-600">학과사무실: 064-741-1234</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <i class="fas fa-envelope text-2xl text-green-600 mr-4 mt-1"></i>
                            <div>
                                <h3 class="font-semibold text-gray-800 mb-2">이메일</h3>
                                <p class="text-gray-600">학과 대표: media@chu.ac.kr</p>
                                <p class="text-gray-600">입학 문의: admissions@chu.ac.kr</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <i class="fas fa-clock text-2xl text-yellow-600 mr-4 mt-1"></i>
                            <div>
                                <h3 class="font-semibold text-gray-800 mb-2">운영시간</h3>
                                <p class="text-gray-600">평일: 09:00 - 18:00</p>
                                <p class="text-gray-600">점심시간: 12:00 - 13:00</p>
                                <p class="text-gray-600 text-sm">* 주말 및 공휴일 휴무</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Social Media -->
                    <div class="mt-8">
                        <h3 class="text-xl font-semibold text-gray-800 mb-4">SNS</h3>
                        <div class="flex space-x-4">
                            <a href="#" class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                                <i class="fab fa-facebook text-xl"></i>
                            </a>
                            <a href="#" class="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                                <i class="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition">
                                <i class="fab fa-youtube text-xl"></i>
                            </a>
                            <a href="#" class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition">
                                <i class="fab fa-blog text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- Contact Form -->
                <div class="bg-gray-50 p-8 rounded-xl">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-6">문의하기</h2>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">이름</label>
                            <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="이름을 입력하세요">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                            <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="이메일을 입력하세요">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                            <input type="tel" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="전화번호를 입력하세요">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">문의 유형</label>
                            <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                                <option>입학 문의</option>
                                <option>교육과정 문의</option>
                                <option>시설 견학 문의</option>
                                <option>기타</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
                            <textarea rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="문의하실 내용을 자세히 작성해주세요"></textarea>
                        </div>
                        
                        <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-medium">
                            <i class="fas fa-paper-plane mr-2"></i>
                            문의 보내기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">찾아오시는 길</h2>
            <div class="grid lg:grid-cols-2 gap-12">
                <div class="bg-white p-6 rounded-xl">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">대중교통</h3>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <i class="fas fa-bus text-blue-600 mr-3 mt-1"></i>
                            <div>
                                <h4 class="font-medium text-gray-800">버스</h4>
                                <p class="text-gray-600 text-sm">제주시외버스터미널에서 720번, 730번 버스 이용</p>
                                <p class="text-gray-600 text-sm">한라대학교 정류장 하차 (약 20분 소요)</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <i class="fas fa-taxi text-yellow-600 mr-3 mt-1"></i>
                            <div>
                                <h4 class="font-medium text-gray-800">택시</h4>
                                <p class="text-gray-600 text-sm">제주공항에서 약 15분 (요금: 약 8,000원)</p>
                                <p class="text-gray-600 text-sm">제주시내에서 약 10분 (요금: 약 5,000원)</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-xl">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">자가용</h3>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <i class="fas fa-car text-green-600 mr-3 mt-1"></i>
                            <div>
                                <h4 class="font-medium text-gray-800">주차 안내</h4>
                                <p class="text-gray-600 text-sm">교내 주차장 이용 가능 (무료)</p>
                                <p class="text-gray-600 text-sm">방문자 주차장: 본관 앞 주차장 이용</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <i class="fas fa-map-signs text-purple-600 mr-3 mt-1"></i>
                            <div>
                                <h4 class="font-medium text-gray-800">길찾기</h4>
                                <p class="text-gray-600 text-sm">네비게이션: "제주한라대학교" 검색</p>
                                <p class="text-gray-600 text-sm">주소: 제주시 한라대학로 38</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Map placeholder -->
            <div class="mt-12 bg-gray-200 h-96 rounded-xl flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-map text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-500">캠퍼스 지도</p>
                    <p class="text-sm text-gray-400">실제 지도는 Google Maps나 네이버 지도를 연동하여 표시됩니다</p>
                </div>
            </div>
        </div>
    </section>
  `;
  
  return c.html(getLayout('연락처', content, 'contact'));
});

export default app