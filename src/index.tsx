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
                        'brand-blue': '#4C88FF',
                        'brand-blue-light': '#6A9DFF', 
                        'brand-blue-dark': '#3366CC',
                        'brand-gray': '#202020',
                        'brand-gray-light': '#B0B0B0'
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
            background: #202020;
            color: #fff;
        }
        .work-card {
            transition: all 0.4s ease;
            border: 1px solid rgba(76, 136, 255, 0.2);
        }
        .work-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 40px rgba(76, 136, 255, 0.3);
            border-color: #4C88FF;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #4C88FF 0%, #6A9DFF 50%, #87CEEB 100%);
        }
        .gradient-bg-dark {
            background: linear-gradient(135deg, #202020 0%, #404040 50%, #606060 100%);
        }
        .category-badge {
            background: linear-gradient(135deg, #4C88FF, #6A9DFF);
            color: white;
        }
        .nav-active {
            color: #4C88FF !important;
            border-bottom: 3px solid #4C88FF;
            font-weight: 600;
        }
        .hero-text {
            background: linear-gradient(135deg, #4C88FF, #6A9DFF, #87CEEB);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .section-bg-blue {
            background: linear-gradient(135deg, #4C88FF 0%, #6A9DFF 100%);
        }
        .card-blue {
            background: linear-gradient(135deg, rgba(76, 136, 255, 0.1), rgba(106, 157, 255, 0.1));
            border: 1px solid rgba(76, 136, 255, 0.3);
        }
        .btn-blue {
            background: linear-gradient(135deg, #4C88FF, #6A9DFF);
            transition: all 0.3s ease;
        }
        .btn-blue:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(76, 136, 255, 0.4);
        }
        .text-brand {
            color: #4C88FF;
        }
    </style>
</head>
<body class="bg-brand-gray text-white font-brand">
    <!-- Header -->
    <header class="gradient-bg-dark border-b border-brand-blue">
        <div class="container mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
                <div>
                    <a href="/" class="block">
                        <h1 class="text-xl md:text-2xl font-bold mb-1 text-white">
                            <span class="text-brand-blue">HALLA</span> MEDIA SCHOOL
                        </h1>
                        <p class="text-xs md:text-sm text-gray-300 uppercase tracking-wider font-medium">
                            <span class="hero-text">EMPOWERING</span> • 
                            <span class="hero-text">DYNAMIC</span> • 
                            <span class="hero-text">CREATIVE</span>
                        </p>
                    </a>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="hover:text-brand-blue transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'home' ? 'nav-active' : 'text-gray-300'}">HOME</a>
                    <a href="/works" class="hover:text-brand-blue transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'works' ? 'nav-active' : 'text-gray-300'}">WORKS</a>
                    <a href="/about" class="hover:text-brand-blue transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'about' ? 'nav-active' : 'text-gray-300'}">ABOUT</a>
                    <a href="/faculty" class="hover:text-brand-blue transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'faculty' ? 'nav-active' : 'text-gray-300'}">FACULTY</a>
                    <a href="/curriculum" class="hover:text-brand-blue transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'curriculum' ? 'nav-active' : 'text-gray-300'}">CURRICULUM</a>
                    <a href="/contact" class="hover:text-brand-blue transition pb-2 text-sm font-semibold uppercase tracking-wide ${activePage === 'contact' ? 'nav-active' : 'text-gray-300'}">CONTACT</a>
                </nav>
                <!-- Mobile menu button -->
                <button class="md:hidden text-brand-blue" id="mobile-menu-btn">
                    <i class="fas fa-bars text-xl"></i>
                </button>
            </div>
            <!-- Mobile menu -->
            <nav class="md:hidden mt-6 space-y-3 hidden border-t border-brand-blue pt-4" id="mobile-menu">
                <a href="/" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-blue transition ${activePage === 'home' ? 'text-brand-blue' : 'text-gray-300'}">HOME</a>
                <a href="/works" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-blue transition ${activePage === 'works' ? 'text-brand-blue' : 'text-gray-300'}">WORKS</a>
                <a href="/about" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-blue transition ${activePage === 'about' ? 'text-brand-blue' : 'text-gray-300'}">ABOUT</a>
                <a href="/faculty" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-blue transition ${activePage === 'faculty' ? 'text-brand-blue' : 'text-gray-300'}">FACULTY</a>
                <a href="/curriculum" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-blue transition ${activePage === 'curriculum' ? 'text-brand-blue' : 'text-gray-300'}">CURRICULUM</a>
                <a href="/contact" class="block py-2 text-sm font-semibold uppercase tracking-wide hover:text-brand-blue transition ${activePage === 'contact' ? 'text-brand-blue' : 'text-gray-300'}">CONTACT</a>
            </nav>
        </div>
    </header>

    ${content}

    <!-- Footer -->
    <footer class="bg-brand-gray py-16">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Main Footer Content -->
            <div class="text-center mb-12">
                <h2 class="text-4xl md:text-6xl font-black uppercase tracking-wider text-white mb-6">
                    <span class="text-brand-blue">HALLA</span> MEDIA SCHOOL
                </h2>
                <p class="text-xl md:text-2xl text-white font-light mb-8 max-w-4xl mx-auto leading-relaxed">
                    Tell us about your project.<br>
                    Let's collaborate and create great media content.
                </p>
            </div>

            <!-- Contact Info -->
            <div class="grid md:grid-cols-2 gap-12 mb-16">
                <div class="text-center md:text-left">
                    <h3 class="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Contact Info</h3>
                    <div class="space-y-4">
                        <p class="text-lg text-white">
                            <i class="fas fa-map-marker-alt text-brand-blue mr-3"></i>
                            제주시 한라대학로 38, 제주한라대학교
                        </p>
                        <p class="text-lg text-white">
                            <i class="fas fa-phone text-brand-blue mr-3"></i>
                            +82 1600 2995
                        </p>
                        <p class="text-lg text-white">
                            <i class="fas fa-envelope text-brand-blue mr-3"></i>
                            media@chu.ac.kr
                        </p>
                    </div>
                </div>
                
                <div class="text-center md:text-right">
                    <h3 class="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
                    <div class="space-y-4">
                        <div><a href="/works" class="text-lg text-white hover:text-brand-blue transition duration-300">Student Works</a></div>
                        <div><a href="/faculty" class="text-lg text-white hover:text-brand-blue transition duration-300">Faculty</a></div>
                        <div><a href="/curriculum" class="text-lg text-white hover:text-brand-blue transition duration-300">Curriculum</a></div>
                        <div><a href="/contact" class="text-lg text-white hover:text-brand-blue transition duration-300">Contact</a></div>
                    </div>
                </div>
            </div>

            <!-- Social Links -->
            <div class="text-center mb-12">
                <div class="flex justify-center space-x-6">
                    <a href="#" class="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-brand-blue transition duration-300 group">
                        <i class="fab fa-instagram text-2xl text-black group-hover:text-white"></i>
                    </a>
                    <a href="#" class="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-brand-blue transition duration-300 group">
                        <i class="fab fa-youtube text-2xl text-black group-hover:text-white"></i>
                    </a>
                    <a href="#" class="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-brand-blue transition duration-300 group">
                        <i class="fab fa-facebook text-2xl text-black group-hover:text-white"></i>
                    </a>
                    <a href="#" class="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-brand-blue transition duration-300 group">
                        <i class="fab fa-linkedin text-2xl text-black group-hover:text-white"></i>
                    </a>
                </div>
            </div>

            <!-- Bottom Copyright -->
            <div class="border-t border-gray-800 pt-8 text-center">
                <p class="text-white text-sm mb-4">
                    © HALLA MEDIA SCHOOL KOREA CO. All rights reserved.
                </p>
                <p class="text-brand-blue text-lg font-bold uppercase tracking-wider">
                    EMPOWERING • DYNAMIC • CREATIVE • COLLABORATIVE
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
    <section class="bg-brand-gray py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-gray-900 to-brand-gray opacity-50"></div>
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
                    <a href="/works" class="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide transition duration-300">
                        <i class="fas fa-play mr-3"></i>
                        EXPLORE WORKS
                    </a>
                    <a href="/about" class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-black transition duration-300">
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
    <section class="py-20 bg-brand-gray">
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
                <a href="/works" class="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wide inline-block transition duration-300">
                    <i class="fas fa-arrow-right mr-3"></i>
                    VIEW ALL WORKS
                </a>
            </div>
        </div>
    </section>

    <!-- Quick Stats -->
    <section class="py-20 bg-gradient-to-r from-gray-900 to-brand-gray">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-black mb-4 text-white">
                    BY THE <span class="hero-text">NUMBERS</span>
                </h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-users text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">200+</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">재학생</p>
                </div>
                <div class="card-blue p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-trophy text-4xl text-brand-blue mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">50+</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">수상 작품</p>
                </div>
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-video text-4xl text-gray-400 mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">100+</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">연간 제작</p>
                </div>
                <div class="card-blue p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300">
                    <i class="fas fa-briefcase text-4xl text-brand-blue mb-4"></i>
                    <h3 class="text-3xl font-black text-white mb-2">85%</h3>
                    <p class="text-gray-400 uppercase tracking-wide font-medium">취업률</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Quick Info -->
    <section class="py-20 bg-brand-gray">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-black mb-4">
                    <span class="hero-text">DISCOVER</span> <span class="text-white">OUR PROGRAMS</span>
                </h2>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-graduation-cap text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4 text-white uppercase tracking-wider">
                        ABOUT US
                    </h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        미래 미디어를 선도하는 창의적이고 혁신적인 인재를 양성하는 전문 교육기관입니다.
                    </p>
                    <a href="/about" class="text-gray-300 hover:text-white transition font-semibold uppercase tracking-wider">
                        LEARN MORE <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="card-blue p-8 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-chalkboard-teacher text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4 text-brand-blue uppercase tracking-wider">
                        FACULTY
                    </h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        산업 최전선에서 활동하고 있는 전문가들이 여러분의 창의적 능력을 발휘하도록 지도합니다.
                    </p>
                    <a href="/faculty" class="text-brand-blue hover:text-brand-blue-light transition font-semibold uppercase tracking-wider">
                        MEET FACULTY <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl hover:scale-105 transition-transform duration-300">
                    <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                        <i class="fas fa-book text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-4 text-white uppercase tracking-wider">
                        CURRICULUM
                    </h3>
                    <p class="text-gray-300 mb-6 leading-relaxed">
                        이론과 실무를 겸비한 차별화된 교육과정으로 미디어 전문가로 성장할 수 있습니다.
                    </p>
                    <a href="/curriculum" class="text-gray-300 hover:text-white transition font-semibold uppercase tracking-wider">
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
                    card.className = 'work-card card-blue rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300';
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
                                    <i class="fas fa-user mr-2 text-brand-blue"></i>
                                    \${work.author}
                                </div>
                                <div class="text-sm text-gray-400">
                                    <i class="fas fa-calendar mr-2 text-brand-blue"></i>
                                    \${work.year}
                                </div>
                            </div>
                            <button class="w-full btn-blue text-white py-2 rounded-lg font-semibold uppercase tracking-wide text-sm" onclick="viewWork(\${work.id})">
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
    <!-- Hero Section -->
    <section class="bg-brand-gray py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-brand-gray opacity-30"></div>
        <div class="container mx-auto px-4 text-center relative z-10">
            <div class="max-w-5xl mx-auto">
                <h1 class="text-6xl md:text-8xl font-black mb-8 leading-tight">
                    <span class="text-white">DYNAMIC</span><br>
                    <span class="hero-text">STUDENT WORKS</span>
                </h1>
                <p class="text-xl md:text-2xl text-white opacity-90 mb-12 leading-relaxed max-w-3xl mx-auto">
                    창의적 비전과 혁신적 기술이 만나는 곳<br>
                    <span class="text-yellow-300 font-bold">미래 미디어를 만들어가는 우리의 이야기</span>
                </p>
            </div>
        </div>
        <!-- Decorative elements -->
        <div class="absolute top-20 left-20 w-24 h-24 border-4 border-white opacity-20 rotate-45 animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-20 h-20 border-4 border-yellow-300 opacity-30 rotate-12 animate-bounce"></div>
        <div class="absolute top-1/2 left-10 w-12 h-12 bg-white opacity-20 rounded-full animate-ping"></div>
        <div class="absolute bottom-32 left-1/3 w-8 h-8 bg-yellow-300 opacity-40 rounded-full"></div>
    </section>

    <!-- Category Filters -->
    <section class="py-16 bg-brand-gray">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-black mb-4 text-white">
                    EXPLORE BY <span class="hero-text">CATEGORY</span>
                </h2>
                <p class="text-gray-400 text-lg">다양한 장르의 창의적 작품들을 만나보세요</p>
            </div>
            
            <div class="flex flex-wrap justify-center gap-4 mb-8" id="categories">
                <button class="category-btn bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl text-white font-black uppercase tracking-wider text-lg" data-category="all">
                    <i class="fas fa-globe mr-3"></i>ALL WORKS
                </button>
                <button class="category-btn bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl text-gray-300 font-black uppercase tracking-wider text-lg hover:text-white transition duration-300" data-category="단편영화">
                    <i class="fas fa-film mr-3"></i>SHORT FILMS
                </button>
                <button class="category-btn card-blue px-8 py-4 rounded-xl text-gray-300 font-black uppercase tracking-wider text-lg hover:bg-brand-blue hover:text-white transition duration-300" data-category="다큐멘터리">
                    <i class="fas fa-video mr-3"></i>DOCUMENTARIES
                </button>
                <button class="category-btn bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl text-gray-300 font-black uppercase tracking-wider text-lg hover:text-white transition duration-300" data-category="뮤직비디오">
                    <i class="fas fa-music mr-3"></i>MUSIC VIDEOS
                </button>
                <button class="category-btn card-blue px-8 py-4 rounded-xl text-gray-300 font-black uppercase tracking-wider text-lg hover:bg-brand-blue hover:text-white transition duration-300" data-category="광고영상">
                    <i class="fas fa-bullhorn mr-3"></i>COMMERCIALS
                </button>
                <button class="category-btn bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-xl text-gray-300 font-black uppercase tracking-wider text-lg hover:text-white transition duration-300" data-category="실험영상">
                    <i class="fas fa-flask mr-3"></i>EXPERIMENTAL
                </button>
            </div>
        </div>
    </section>

    <!-- Works Grid -->
    <section class="py-20 bg-gradient-to-b from-black via-gray-900 to-brand-gray">
        <div class="container mx-auto px-4">
            <div id="works-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Works will be loaded here via JavaScript -->
            </div>
            
            <!-- Load More Section -->
            <div class="text-center mt-16">
                <div class="bg-gradient-to-r from-gray-800 to-gray-600 p-1 rounded-xl inline-block">
                    <div class="bg-brand-gray px-8 py-4 rounded-lg">
                        <h3 class="text-white font-bold text-lg mb-2">MORE CREATIVE WORKS</h3>
                        <p class="text-gray-400 mb-4">더 많은 작품들이 공개 예정입니다</p>
                        <button class="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold uppercase tracking-wide">
                            COMING SOON
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-brand-gray via-gray-800 to-brand-gray">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                CREATE YOUR OWN
            </h2>
            <p class="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
                당신도 이런 명작들을 만들 수 있습니다. 지금 시작하세요!
            </p>
            <div class="flex justify-center space-x-6 flex-wrap gap-4">
                <a href="/about" class="bg-brand-gray text-white px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-gray-900 transition duration-300">
                    <i class="fas fa-info-circle mr-3"></i>
                    LEARN MORE
                </a>
                <a href="/contact" class="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-lg uppercase tracking-wide hover:bg-brand-gray hover:text-white transition duration-300">
                    <i class="fas fa-envelope mr-3"></i>
                    CONTACT US
                </a>
            </div>
        </div>
    </section>
  `;
  
  return c.html(getLayout('DYNAMIC WORKS', content, 'works'));
});

// About page
app.get('/about', (c) => {
  const content = `
    <!-- Hero Section -->
    <section class="bg-brand-gray py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-brand-gray opacity-20"></div>
        <div class="container mx-auto px-4 text-center relative z-10">
            <div class="max-w-5xl mx-auto">
                <h1 class="text-6xl md:text-8xl font-black mb-8 leading-tight">
                    <span class="hero-text">EMPOWERING</span><br>
                    <span class="text-white">FUTURE CREATORS</span>
                </h1>
                <p class="text-xl md:text-2xl text-white opacity-90 mb-12 leading-relaxed max-w-3xl mx-auto">
                    미래 미디어를 선도하는 창의적 인재로<br>
                    <span class="text-yellow-300 font-bold">당신의 꿈을 현실로 만들어보세요</span>
                </p>
            </div>
        </div>
        <!-- Power symbols -->
        <div class="absolute top-16 left-16 w-20 h-20 border-4 border-yellow-300 opacity-30 rotate-45 animate-pulse"></div>
        <div class="absolute bottom-16 right-16 w-24 h-24 border-4 border-white opacity-20 rotate-12 animate-bounce"></div>
        <div class="absolute top-1/3 right-20 w-16 h-16 bg-yellow-300 opacity-20 rounded-full animate-ping"></div>
        <div class="absolute bottom-1/3 left-20 w-12 h-12 bg-white opacity-30 clip-path-triangle"></div>
    </section>

    <!-- Vision Section -->
    <section class="py-20 bg-brand-gray">
        <div class="container mx-auto px-4">
            <div class="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 class="text-4xl md:text-5xl font-black mb-8">
                        <span class="hero-text">OUR VISION</span>
                    </h2>
                    <div class="space-y-6">
                        <p class="text-xl text-gray-300 leading-relaxed">
                            제주한라대학교 방송영상학과는 <span class="text-brand-blue font-bold">급변하는 미디어 환경</span>에 대응하는 창의적이고 전문적인 영상 콘텐츠 제작자를 양성합니다.
                        </p>
                        <p class="text-xl text-gray-300 leading-relaxed">
                            최신 장비와 시설을 갖춘 실습실에서 <span class="text-yellow-300 font-bold">이론과 실무를 겸비한 교육</span>을 제공하며, 학생들의 창의적인 아이디어가 현실이 되는 곳입니다.
                        </p>
                    </div>
                    
                    <div class="mt-12">
                        <h3 class="text-2xl font-black mb-6 text-white uppercase tracking-wider">CORE STRENGTHS</h3>
                        <div class="space-y-4">
                            <div class="flex items-start group">
                                <div class="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <i class="fas fa-rocket text-white text-lg"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold text-lg mb-1">최첨단 스튜디오 및 편집실 완비</h4>
                                    <p class="text-gray-400">전문가 수준의 장비와 환경에서 실무 경험 제공</p>
                                </div>
                            </div>
                            <div class="flex items-start group">
                                <div class="w-12 h-12 bg-gradient-to-r from-brand-blue to-yellow-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <i class="fas fa-handshake text-white text-lg"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold text-lg mb-1">산학협력을 통한 실무 경험 제공</h4>
                                    <p class="text-gray-400">업계 최전선과 직접 연결되는 프로젝트 경험</p>
                                </div>
                            </div>
                            <div class="flex items-start group">
                                <div class="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <i class="fas fa-trophy text-white text-lg"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold text-lg mb-1">다양한 공모전 및 영화제 참여 지원</h4>
                                    <p class="text-gray-400">국내외 대회 지원으로 전문성 인정 및 경력 쌓기</p>
                                </div>
                            </div>
                            <div class="flex items-start group">
                                <div class="w-12 h-12 bg-gradient-to-r from-brand-blue to-yellow-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <i class="fas fa-user-graduate text-white text-lg"></i>
                                </div>
                                <div>
                                    <h4 class="text-white font-bold text-lg mb-1">개인별 맞춤형 포트폴리오 관리</h4>
                                    <p class="text-gray-400">전문 커리어 컨설팅과 취업 로드맵 제공</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Stats Section -->
                <div class="relative">
                    <div class="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-1 rounded-2xl">
                        <div class="bg-brand-gray p-8 rounded-xl">
                            <h3 class="text-3xl font-black text-center text-white mb-8">
                                SUCCESS <span class="hero-text">METRICS</span>
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div class="text-center group hover:scale-105 transition-transform duration-300">
                                    <div class="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i class="fas fa-users text-3xl text-white"></i>
                                    </div>
                                    <h4 class="text-4xl font-black text-white mb-2">200+</h4>
                                    <p class="text-gray-400 uppercase tracking-wider font-semibold">재학생</p>
                                </div>
                                <div class="text-center group hover:scale-105 transition-transform duration-300">
                                    <div class="w-20 h-20 bg-gradient-to-r from-brand-blue to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i class="fas fa-trophy text-3xl text-white"></i>
                                    </div>
                                    <h4 class="text-4xl font-black text-white mb-2">50+</h4>
                                    <p class="text-gray-400 uppercase tracking-wider font-semibold">수상 작품</p>
                                </div>
                                <div class="text-center group hover:scale-105 transition-transform duration-300">
                                    <div class="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i class="fas fa-video text-3xl text-white"></i>
                                    </div>
                                    <h4 class="text-4xl font-black text-white mb-2">100+</h4>
                                    <p class="text-gray-400 uppercase tracking-wider font-semibold">연간 제작</p>
                                </div>
                                <div class="text-center group hover:scale-105 transition-transform duration-300">
                                    <div class="w-20 h-20 bg-gradient-to-r from-brand-blue to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <i class="fas fa-briefcase text-3xl text-white"></i>
                                    </div>
                                    <h4 class="text-4xl font-black text-white mb-2">85%</h4>
                                    <p class="text-gray-400 uppercase tracking-wider font-semibold">취업률</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Education Goals -->
    <section class="py-20 bg-gradient-to-b from-black to-gray-900">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black mb-6">
                    <span class="hero-text">EDUCATION GOALS</span>
                </h2>
                <p class="text-gray-400 text-xl max-w-3xl mx-auto">미래를 이끌어갈 미디어 전문가 양성을 위한 3대 고도</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300 group">
                    <div class="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                        <i class="fas fa-lightbulb text-3xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-black mb-4 text-white uppercase tracking-wider">창의성 개발</h3>
                    <p class="text-gray-300 leading-relaxed">독창적인 아이디어와 창의적 사고를 바탕으로 한 <span class="text-white font-semibold">혁신적 콘텐츠 제작 능력</span> 함양</p>
                </div>
                <div class="card-blue p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300 group">
                    <div class="w-20 h-20 bg-gradient-to-r from-brand-blue to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                        <i class="fas fa-cogs text-3xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-black mb-4 text-brand-blue uppercase tracking-wider">기술적 전문성</h3>
                    <p class="text-gray-300 leading-relaxed">최신 방송영상 제작 기술과 장비 활용 능력을 갖춘 <span class="text-white font-semibold">전문가 양성</span></p>
                </div>
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl text-center hover:scale-105 transition-transform duration-300 group">
                    <div class="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                        <i class="fas fa-handshake text-3xl text-white"></i>
                    </div>
                    <h3 class="text-2xl font-black mb-4 text-white uppercase tracking-wider">산업 연계</h3>
                    <p class="text-gray-300 leading-relaxed">현장 실무 경험을 통한 미디어 산업계 <span class="text-white font-semibold">즉시 투입 가능한 인재</span> 육성</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Facilities -->
    <section class="py-20 bg-brand-gray">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black mb-6">
                    <span class="hero-text">STATE-OF-THE-ART</span> <span class="text-white">FACILITIES</span>
                </h2>
                <p class="text-gray-400 text-xl">전문가 수준의 시설과 장비로 창의력을 현실로</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="group">
                    <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl text-center hover:scale-105 transition-all duration-300">
                        <div class="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                            <i class="fas fa-tv text-2xl text-white"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-white uppercase tracking-wide">HD STUDIO</h3>
                        <p class="text-gray-400 text-sm leading-relaxed">전문 방송용 카메라와 조명 시설로 고품질 콘텐츠 제작</p>
                    </div>
                </div>
                <div class="group">
                    <div class="card-blue p-8 rounded-xl text-center hover:scale-105 transition-all duration-300">
                        <div class="w-16 h-16 bg-gradient-to-r from-brand-blue to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                            <i class="fas fa-cut text-2xl text-white"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-white uppercase tracking-wide">EDIT SUITE</h3>
                        <p class="text-gray-400 text-sm leading-relaxed">Avid, Premiere Pro 등 전문 편집 소프트웨어와 고사양 장비</p>
                    </div>
                </div>
                <div class="group">
                    <div class="bg-gradient-to-br from-gray-900 to-brand-gray border border-gray-700 p-8 rounded-xl text-center hover:scale-105 transition-all duration-300">
                        <div class="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                            <i class="fas fa-microphone text-2xl text-white"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-white uppercase tracking-wide">SOUND STUDIO</h3>
                        <p class="text-gray-400 text-sm leading-relaxed">고품질 오디오 레코딩 및 후시녹음 전용 시설</p>
                    </div>
                </div>
                <div class="group">
                    <div class="card-blue p-8 rounded-xl text-center hover:scale-105 transition-all duration-300">
                        <div class="w-16 h-16 bg-gradient-to-r from-brand-blue to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                            <i class="fas fa-desktop text-2xl text-white"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3 text-white uppercase tracking-wide">COMPUTER LAB</h3>
                        <p class="text-gray-400 text-sm leading-relaxed">고사양 워크스테이션과 그래픽 소프트웨어 완비</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-r from-brand-gray via-gray-800 to-brand-gray">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                YOUR CREATIVE JOURNEY STARTS HERE
            </h2>
            <p class="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
                미래를 만들어갈 창의적 인재가 되는 여정, 지금 시작하세요!
            </p>
            <div class="flex justify-center space-x-6 flex-wrap gap-4">
                <a href="/works" class="bg-brand-gray text-white px-8 py-4 font-bold text-lg uppercase tracking-wide hover:bg-gray-900 transition duration-300 transform hover:scale-105">
                    VIEW STUDENT WORKS
                </a>
                <a href="/contact" class="border-2 border-white text-white px-8 py-4 font-bold text-lg uppercase tracking-wide hover:bg-white hover:text-brand-blue transition duration-300 transform hover:scale-105">
                    GET IN TOUCH
                </a>
            </div>
        </div>
    </section>
  `;
  
  return c.html(getLayout('EMPOWERING EDUCATION', content, 'about'));
});

// Faculty page
app.get('/faculty', (c) => {
  const content = `
<div class="min-h-screen bg-brand-gray text-white">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-brand-gray via-gray-800 to-brand-gray py-20">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <h1 class="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 transform hover:scale-105 transition-transform duration-500">
                DYNAMIC
            </h1>
            <h2 class="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
                EXPERT FACULTY
            </h2>
            <p class="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                역동적인 미디어 산업을 이끄는 전문가들과 함께<br>
                미래의 크리에이터를 양성합니다
            </p>
        </div>
    </div>

    <!-- Faculty Grid -->
    <div class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Faculty Card 1 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-gray-600 rounded-lg p-6 transform hover:scale-105 hover:border-gray-500 transition-all duration-300">
                    <div class="bg-gradient-to-br from-gray-700 to-gray-600 w-full h-48 rounded mb-6 flex items-center justify-center">
                        <span class="text-4xl font-black text-white">KIM</span>
                    </div>
                    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2 text-white">김영진 교수</h3>
                    <div class="bg-gray-700 text-white px-4 py-2 inline-block font-bold uppercase text-sm mb-4">
                        영상제작 전공
                    </div>
                    <div class="space-y-2 text-gray-300">
                        <p class="font-semibold">• 서울대학교 영상학과 박사</p>
                        <p class="font-semibold">• 전 KBS 다큐멘터리 PD (15년 경력)</p>
                        <p class="font-semibold">• 다큐멘터리 제작 전문가</p>
                    </div>
                    <div class="mt-6 flex space-x-2">
                        <span class="bg-gray-800 text-gray-300 px-3 py-1 text-sm font-bold uppercase">#다큐멘터리</span>
                        <span class="bg-gray-800 text-gray-300 px-3 py-1 text-sm font-bold uppercase">#스토리텔링</span>
                    </div>
                </div>

                <!-- Faculty Card 2 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-brand-blue rounded-lg p-6 transform hover:scale-105 hover:border-brand-blue-light transition-all duration-300">
                    <div class="bg-gradient-to-br from-brand-blue to-brand-blue-light w-full h-48 rounded mb-6 flex items-center justify-center">
                        <span class="text-4xl font-black text-white">PARK</span>
                    </div>
                    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2 text-brand-blue-light">박민수 교수</h3>
                    <div class="bg-brand-blue text-black px-4 py-2 inline-block font-bold uppercase text-sm mb-4">
                        영상편집 전공
                    </div>
                    <div class="space-y-2 text-gray-300">
                        <p class="font-semibold">• 한국예술종합학교 영상원 석사</p>
                        <p class="font-semibold">• 영화 <기생충> 편집 참여</p>
                        <p class="font-semibold">• 포스트 프로덕션 전문가</p>
                    </div>
                    <div class="mt-6 flex space-x-2">
                        <span class="bg-gray-800 text-brand-blue px-3 py-1 text-sm font-bold uppercase">#편집</span>
                        <span class="bg-gray-800 text-brand-blue px-3 py-1 text-sm font-bold uppercase">#포스트</span>
                    </div>
                </div>

                <!-- Faculty Card 3 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-gray-600 rounded-lg p-6 transform hover:scale-105 hover:border-gray-500 transition-all duration-300">
                    <div class="bg-gradient-to-br from-gray-700 to-gray-600 w-full h-48 rounded mb-6 flex items-center justify-center">
                        <span class="text-4xl font-black text-white">LEE</span>
                    </div>
                    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2 text-white">이수현 교수</h3>
                    <div class="bg-gray-700 text-white px-4 py-2 inline-block font-bold uppercase text-sm mb-4">
                        방송기술 전공
                    </div>
                    <div class="space-y-2 text-gray-300">
                        <p class="font-semibold">• KAIST 전자공학과 박사</p>
                        <p class="font-semibold">• 전 삼성전자 미디어솔루션센터 수석연구원</p>
                        <p class="font-semibold">• 방송 시스템 기술 전문가</p>
                    </div>
                    <div class="mt-6 flex space-x-2">
                        <span class="bg-gray-800 text-gray-300 px-3 py-1 text-sm font-bold uppercase">#방송기술</span>
                        <span class="bg-gray-800 text-gray-300 px-3 py-1 text-sm font-bold uppercase">#시스템</span>
                    </div>
                </div>

                <!-- Faculty Card 4 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-brand-blue rounded-lg p-6 transform hover:scale-105 hover:border-brand-blue-light transition-all duration-300">
                    <div class="bg-gradient-to-br from-brand-blue to-brand-blue-light w-full h-48 rounded mb-6 flex items-center justify-center">
                        <span class="text-4xl font-black text-white">JUNG</span>
                    </div>
                    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2 text-brand-blue-light">정미영 교수</h3>
                    <div class="bg-brand-blue text-black px-4 py-2 inline-block font-bold uppercase text-sm mb-4">
                        미디어 콘텐츠
                    </div>
                    <div class="space-y-2 text-gray-300">
                        <p class="font-semibold">• 연세대학교 신문방송학과 박사</p>
                        <p class="font-semibold">• 전 CJ ENM 콘텐츠사업부 이사</p>
                        <p class="font-semibold">• 콘텐츠 기획 전문가</p>
                    </div>
                    <div class="mt-6 flex space-x-2">
                        <span class="bg-gray-800 text-brand-blue px-3 py-1 text-sm font-bold uppercase">#콘텐츠기획</span>
                        <span class="bg-gray-800 text-brand-blue px-3 py-1 text-sm font-bold uppercase">#뉴미디어</span>
                    </div>
                </div>

                <!-- Faculty Card 5 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-gray-600 rounded-lg p-6 transform hover:scale-105 hover:border-gray-500 transition-all duration-300">
                    <div class="bg-gradient-to-br from-gray-700 to-gray-600 w-full h-48 rounded mb-6 flex items-center justify-center">
                        <span class="text-4xl font-black text-white">KANG</span>
                    </div>
                    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2 text-white">강동혁 교수</h3>
                    <div class="bg-gray-700 text-white px-4 py-2 inline-block font-bold uppercase text-sm mb-4">
                        사운드 디자인
                    </div>
                    <div class="space-y-2 text-gray-300">
                        <p class="font-semibold">• 버클리 음대 음향학과 석사</p>
                        <p class="font-semibold">• 할리우드 영화 음향 감독 (10년 경력)</p>
                        <p class="font-semibold">• 음향 제작 전문가</p>
                    </div>
                    <div class="mt-6 flex space-x-2">
                        <span class="bg-gray-800 text-gray-300 px-3 py-1 text-sm font-bold uppercase">#사운드</span>
                        <span class="bg-gray-800 text-gray-300 px-3 py-1 text-sm font-bold uppercase">#음향</span>
                    </div>
                </div>

                <!-- Faculty Card 6 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-brand-blue rounded-lg p-6 transform hover:scale-105 hover:border-brand-blue-light transition-all duration-300">
                    <div class="bg-gradient-to-br from-brand-blue to-brand-blue-light w-full h-48 rounded mb-6 flex items-center justify-center">
                        <span class="text-4xl font-black text-white">CHOI</span>
                    </div>
                    <h3 class="text-2xl font-bold uppercase tracking-wider mb-2 text-brand-blue-light">최은지 교수</h3>
                    <div class="bg-brand-blue text-black px-4 py-2 inline-block font-bold uppercase text-sm mb-4">
                        애니메이션 전공
                    </div>
                    <div class="space-y-2 text-gray-300">
                        <p class="font-semibold">• 홍익대학교 애니메이션학과 박사</p>
                        <p class="font-semibold">• 전 픽사 애니메이션 스튜디오 아티스트</p>
                        <p class="font-semibold">• 3D 애니메이션 전문가</p>
                    </div>
                    <div class="mt-6 flex space-x-2">
                        <span class="bg-gray-800 text-brand-blue px-3 py-1 text-sm font-bold uppercase">#애니메이션</span>
                        <span class="bg-gray-800 text-brand-blue px-3 py-1 text-sm font-bold uppercase">#3D</span>
                    </div>
                </div>
            </div>

            <!-- Research & Achievement -->
            <div class="mt-20 bg-gradient-to-r from-gray-900 to-brand-gray py-20 px-8 rounded-lg">
                <h2 class="text-5xl font-black uppercase tracking-wider text-center mb-16 text-white">
                    RESEARCH & ACHIEVEMENT
                </h2>
                <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div class="text-center">
                        <div class="text-4xl font-black text-gray-400 mb-2">150+</div>
                        <div class="text-xl font-bold uppercase tracking-wider text-white">연구 논문</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-black text-brand-blue mb-2">50+</div>
                        <div class="text-xl font-bold uppercase tracking-wider text-white">산업체 프로젝트</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-black text-gray-400 mb-2">25+</div>
                        <div class="text-xl font-bold uppercase tracking-wider text-white">국제 수상</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-black text-brand-blue mb-2">1000+</div>
                        <div class="text-xl font-bold uppercase tracking-wider text-white">졸업생 네트워크</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-brand-gray via-gray-800 to-brand-gray p-8 text-center">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-white mb-4 tracking-wider">MEET OUR EXPERTS</h2>
            <p class="text-white text-xl mb-6">전문가들과 직접 만나보세요</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/contact" class="bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                    교수 상담 예약
                </a>
                <a href="/about" class="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300">
                    학과 소개
                </a>
            </div>
        </div>
    </div>
</div>
`;
  
  return c.html(getLayout('교수진', content, 'faculty'));
});

// Curriculum page - CREATIVE 컨셉
app.get('/curriculum', (c) => {
  const content = `
<div class="min-h-screen bg-brand-gray text-white">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-brand-gray via-gray-800 to-brand-gray py-20">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <h1 class="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 transform hover:scale-105 transition-transform duration-500">
                CREATIVE
            </h1>
            <h2 class="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
                INNOVATIVE CURRICULUM
            </h2>
            <p class="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                창의적 사고를 키우는 혁신적인 교육과정으로<br>
                미래 미디어 산업의 리더를 양성합니다
            </p>
        </div>
    </div>

    <!-- Curriculum Overview -->
    <div class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-5xl font-black uppercase tracking-wider text-white mb-8">
                    4-YEAR ROADMAP
                </h2>
                <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                    체계적인 4년 과정을 통해 이론과 실습을 균형있게 배우며, 창의적인 미디어 전문가로 성장합니다
                </p>
            </div>

            <!-- Year Grid -->
            <div class="grid md:grid-cols-2 gap-12">
                <!-- Year 1 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-gray-600 rounded-lg p-8">
                    <h3 class="text-3xl font-bold text-white mb-6 uppercase tracking-wider">1학년 - 기초과정</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">방송영상학개론</h4>
                            <p class="text-gray-300 text-sm">미디어 산업의 기본 이해</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">디지털미디어의이해</h4>
                            <p class="text-gray-300 text-sm">디지털 기술 기초 학습</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">영상기초실습</h4>
                            <p class="text-gray-300 text-sm">카메라 및 편집 기초 실습</p>
                        </div>
                    </div>
                </div>

                <!-- Year 2 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-brand-blue rounded-lg p-8">
                    <h3 class="text-3xl font-bold text-brand-blue-light mb-6 uppercase tracking-wider">2학년 - 심화과정</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">영상제작실습</h4>
                            <p class="text-gray-300 text-sm">프로젝트 기반 영상 제작</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">방송기술론</h4>
                            <p class="text-gray-300 text-sm">방송 시스템 기술 이해</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">편집디자인</h4>
                            <p class="text-gray-300 text-sm">고급 편집 기법 학습</p>
                        </div>
                    </div>
                </div>

                <!-- Year 3 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-gray-600 rounded-lg p-8">
                    <h3 class="text-3xl font-bold text-white mb-6 uppercase tracking-wider">3학년 - 전문과정</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">콘텐츠기획론</h4>
                            <p class="text-gray-300 text-sm">창의적 콘텐츠 기획 능력</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">다큐멘터리제작</h4>
                            <p class="text-gray-300 text-sm">다큐멘터리 제작 실무</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">VR/AR콘텐츠제작</h4>
                            <p class="text-gray-300 text-sm">신기술 활용 콘텐츠 제작</p>
                        </div>
                    </div>
                </div>

                <!-- Year 4 -->
                <div class="bg-gradient-to-br from-gray-900 to-brand-gray border-2 border-brand-blue rounded-lg p-8">
                    <h3 class="text-3xl font-bold text-brand-blue-light mb-6 uppercase tracking-wider">4학년 - 실무과정</h3>
                    <div class="space-y-4">
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">졸업작품제작</h4>
                            <p class="text-gray-300 text-sm">개인 포트폴리오 완성</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">현장실습</h4>
                            <p class="text-gray-300 text-sm">방송사/제작사 인턴십</p>
                        </div>
                        <div class="bg-gray-800 p-4 rounded">
                            <h4 class="text-lg font-bold text-white mb-2">캡스톤디자인</h4>
                            <p class="text-gray-300 text-sm">산업체 연계 프로젝트</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Specialization Areas -->
            <div class="mt-20 text-center">
                <h2 class="text-4xl font-black uppercase tracking-wider text-white mb-12">
                    SPECIALIZATION TRACKS
                </h2>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-8 rounded-lg">
                        <h3 class="text-2xl font-bold mb-4">방송 트랙</h3>
                        <ul class="space-y-2 text-left">
                            <li>• 방송 PD</li>
                            <li>• 아나운서</li>
                            <li>• 방송 기술</li>
                        </ul>
                    </div>
                    <div class="bg-brand-blue text-black p-8 rounded-lg">
                        <h3 class="text-2xl font-bold mb-4">영상 트랙</h3>
                        <ul class="space-y-2 text-left">
                            <li>• 영화감독</li>
                            <li>• 영상편집</li>
                            <li>• VFX/CGI</li>
                        </ul>
                    </div>
                    <div class="bg-gradient-to-br from-gray-800 to-gray-700 text-white p-8 rounded-lg">
                        <h3 class="text-2xl font-bold mb-4">뉴미디어 트랙</h3>
                        <ul class="space-y-2 text-left">
                            <li>• 유튜브 크리에이터</li>
                            <li>• VR/AR 콘텐츠</li>
                            <li>• 모션 그래픽</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-brand-gray via-gray-800 to-brand-gray p-8 text-center">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-white mb-4 tracking-wider">START YOUR CREATIVE JOURNEY</h2>
            <p class="text-white text-xl mb-6">창의적인 교육과정으로 미래를 만들어가세요</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/contact" class="bg-white text-brand-blue px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                    입학 상담
                </a>
                <a href="/works" class="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-brand-blue transform hover:scale-105 transition-all duration-300">
                    학생 작품 보기
                </a>
            </div>
        </div>
    </div>
`;
  
  return c.html(getLayout('교육과정', content, 'curriculum'));
});

// Contact page - COLLABORATIVE 컨셉
app.get('/contact', (c) => {
  const content = `
<div class="min-h-screen bg-brand-gray text-white">
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-brand-gray via-gray-800 to-brand-gray py-20">
        <div class="max-w-6xl mx-auto px-4 text-center">
            <h1 class="text-6xl md:text-8xl font-black uppercase tracking-wider mb-6 transform hover:scale-105 transition-transform duration-500">
                COLLABORATIVE
            </h1>
            <h2 class="text-3xl md:text-4xl font-bold uppercase tracking-wider mb-4">
                CONNECT WITH US
            </h2>
            <p class="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                함께 만들어가는 미래의 미디어 교육<br>
                당신의 꿈을 현실로 만들어드립니다
            </p>
        </div>
    </div>

    <!-- Contact Grid -->
    <div class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
            <div class="grid lg:grid-cols-2 gap-16">
                <!-- Contact Information -->
                <div class="space-y-8">
                    <h2 class="text-4xl font-black uppercase tracking-wider text-white mb-8">
                        GET IN TOUCH
                    </h2>
                    
                    <!-- Contact Cards -->
                    <div class="space-y-8">
                        <div class="bg-gradient-to-r from-gray-900 to-brand-gray border-2 border-gray-600 rounded-lg p-6">
                            <h3 class="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
                                <i class="fas fa-map-marker-alt mr-3"></i>Location
                            </h3>
                            <p class="text-lg text-white leading-relaxed">
                                제주특별자치도 제주시 한라대학로 38<br>
                                제주한라대학교 방송영상학과
                            </p>
                        </div>

                        <div class="bg-gradient-to-r from-gray-900 to-brand-gray border-2 border-brand-blue rounded-lg p-6">
                            <h3 class="text-2xl font-bold text-brand-blue-light mb-4 uppercase tracking-wider">
                                <i class="fas fa-phone mr-3"></i>Phone
                            </h3>
                            <p class="text-lg text-white">
                                +82 1600 2995<br>
                                학과 사무실: 064-741-1234
                            </p>
                        </div>

                        <div class="bg-gradient-to-r from-gray-900 to-brand-gray border-2 border-gray-600 rounded-lg p-6">
                            <h3 class="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
                                <i class="fas fa-envelope mr-3"></i>Email
                            </h3>
                            <p class="text-lg text-white">
                                media@chu.ac.kr<br>
                                입학 문의: admissions@chu.ac.kr
                            </p>
                        </div>

                        <div class="bg-gradient-to-r from-gray-900 to-brand-gray border-2 border-brand-blue rounded-lg p-6">
                            <h3 class="text-2xl font-bold text-brand-blue-light mb-4 uppercase tracking-wider">
                                <i class="fas fa-clock mr-3"></i>Office Hours
                            </h3>
                            <p class="text-lg text-white">
                                월-금: 09:00 - 18:00<br>
                                토: 09:00 - 12:00<br>
                                일요일 및 공휴일 휴무
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Inquiry Form -->
                <div class="space-y-8">
                    <h2 class="text-4xl font-black uppercase tracking-wider text-white mb-8">
                        Send Message
                    </h2>
                    
                    <form class="space-y-6">
                        <div>
                            <input type="text" placeholder="Your Name" 
                                   class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white text-lg focus:border-brand-blue focus:outline-none transition-colors">
                        </div>
                        <div>
                            <input type="email" placeholder="Your Email" 
                                   class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white text-lg focus:border-brand-blue focus:outline-none transition-colors">
                        </div>
                        <div>
                            <input type="text" placeholder="Subject" 
                                   class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white text-lg focus:border-brand-blue focus:outline-none transition-colors">
                        </div>
                        <div>
                            <textarea placeholder="Your Message" rows="6"
                                      class="w-full px-6 py-4 bg-gray-900 border-2 border-gray-700 rounded-lg text-white text-lg focus:border-brand-blue focus:outline-none transition-colors resize-none"></textarea>
                        </div>
                        <button type="submit" 
                                class="w-full bg-gradient-to-r from-gray-800 to-gray-700 text-white py-4 px-8 font-bold uppercase tracking-wider hover:from-gray-700 hover:to-gray-600 transition-all duration-300 transform hover:scale-105">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>

            <!-- Partnership Section -->
            <div class="mt-20 text-center">
                <h2 class="text-5xl font-black uppercase tracking-wider text-white mb-12">
                    Industry Partners
                </h2>
                <div class="grid md:grid-cols-4 gap-8">
                    <div class="bg-white p-6 rounded-lg">
                        <h3 class="text-xl font-bold text-black mb-2">KBS</h3>
                        <p class="text-gray-600">한국방송공사</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg">
                        <h3 class="text-xl font-bold text-black mb-2">SBS</h3>
                        <p class="text-gray-600">에스비에스</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg">
                        <h3 class="text-xl font-bold text-black mb-2">MBC</h3>
                        <p class="text-gray-600">문화방송</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg">
                        <h3 class="text-xl font-bold text-black mb-2">CJ ENM</h3>
                        <p class="text-gray-600">콘텐츠 그룹</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Call to Action -->
    <div class="bg-gradient-to-r from-brand-gray via-gray-800 to-brand-gray p-8 text-center">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-white mb-4 tracking-wider">LET'S COLLABORATE</h2>
            <p class="text-white text-xl mb-6">함께 만들어가는 미래의 미디어 교육</p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="/about" class="bg-white text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                    학과 소개
                </a>
                <a href="/curriculum" class="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-300">
                    교육과정 보기
                </a>
            </div>
        </div>
    </div>
`;
  
  return c.html(getLayout('연락처', content, 'contact'));
});

export default app