import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { cors } from 'hono/cors'

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

// Main page
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>제주한라대학교 방송영상학과 | Works</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Noto Sans KR', sans-serif; }
        .work-card {
            transition: all 0.3s ease;
        }
        .work-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .category-badge {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.9);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="gradient-bg text-white">
        <div class="container mx-auto px-4 py-8">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold mb-2">
                        <i class="fas fa-video mr-3"></i>
                        제주한라대학교 방송영상학과
                    </h1>
                    <p class="text-lg opacity-90">학생들의 창의적인 작품들을 만나보세요</p>
                </div>
                <nav class="hidden md:flex space-x-6">
                    <a href="#works" class="hover:text-purple-200 transition">작품</a>
                    <a href="#about" class="hover:text-purple-200 transition">소개</a>
                    <a href="#contact" class="hover:text-purple-200 transition">연락처</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-white py-16">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">
                창의적인 영상 콘텐츠의 새로운 지평
            </h2>
            <p class="text-xl text-gray-600 mb-8">
                제주한라대학교 방송영상학과 학생들이 만들어가는 미디어의 미래
            </p>
            <div class="flex justify-center space-x-4">
                <button class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                    <i class="fas fa-play mr-2"></i>
                    작품 둘러보기
                </button>
                <button class="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition">
                    <i class="fas fa-info-circle mr-2"></i>
                    학과 소개
                </button>
            </div>
        </div>
    </section>

    <!-- Categories -->
    <section class="py-8 bg-gray-100">
        <div class="container mx-auto px-4">
            <div class="flex flex-wrap justify-center gap-3" id="categories">
                <button class="category-btn px-4 py-2 rounded-full bg-purple-600 text-white" data-category="all">
                    전체
                </button>
                <button class="category-btn px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-purple-100" data-category="단편영화">
                    단편영화
                </button>
                <button class="category-btn px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-purple-100" data-category="다큐멘터리">
                    다큐멘터리
                </button>
                <button class="category-btn px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-purple-100" data-category="뮤직비디오">
                    뮤직비디오
                </button>
                <button class="category-btn px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-purple-100" data-category="광고영상">
                    광고영상
                </button>
                <button class="category-btn px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-purple-100" data-category="실험영상">
                    실험영상
                </button>
            </div>
        </div>
    </section>

    <!-- Works Grid -->
    <section id="works" class="py-16 bg-gray-50">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
                <i class="fas fa-film mr-3"></i>
                학생 작품
            </h2>
            <div id="works-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Works will be loaded here via JavaScript -->
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
                <i class="fas fa-graduation-cap mr-3"></i>
                학과 소개
            </h2>
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 class="text-2xl font-semibold mb-4">미래 미디어를 선도하는 인재 양성</h3>
                    <p class="text-gray-600 mb-4">
                        제주한라대학교 방송영상학과는 급변하는 미디어 환경에 대응하는 창의적이고 
                        전문적인 영상 콘텐츠 제작자를 양성합니다.
                    </p>
                    <p class="text-gray-600 mb-4">
                        최신 장비와 시설을 갖춘 실습실에서 이론과 실무를 겸비한 교육을 제공하며, 
                        학생들의 창의적인 아이디어가 현실이 되는 곳입니다.
                    </p>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <i class="fas fa-check-circle text-purple-600 mr-2"></i>
                            <span>전문 스튜디오 및 편집실 완비</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check-circle text-purple-600 mr-2"></i>
                            <span>산학협력을 통한 실무 경험</span>
                        </li>
                        <li class="flex items-center">
                            <i class="fas fa-check-circle text-purple-600 mr-2"></i>
                            <span>다양한 공모전 및 영화제 참여</span>
                        </li>
                    </ul>
                </div>
                <div class="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl">
                    <div class="grid grid-cols-2 gap-4 text-center">
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-users text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold">200+</h4>
                            <p class="text-sm text-gray-600">재학생</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-trophy text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold">50+</h4>
                            <p class="text-sm text-gray-600">수상 작품</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-video text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold">100+</h4>
                            <p class="text-sm text-gray-600">연간 제작</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl">
                            <i class="fas fa-briefcase text-3xl text-purple-600 mb-2"></i>
                            <h4 class="font-semibold">85%</h4>
                            <p class="text-sm text-gray-600">취업률</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
                <i class="fas fa-envelope mr-3"></i>
                연락처
            </h2>
            <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 class="font-semibold mb-2">
                            <i class="fas fa-map-marker-alt mr-2 text-purple-600"></i>
                            주소
                        </h3>
                        <p class="text-gray-600">제주특별자치도 제주시 한라대학로 38</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-2">
                            <i class="fas fa-phone mr-2 text-purple-600"></i>
                            전화
                        </h3>
                        <p class="text-gray-600">064-741-1000</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-2">
                            <i class="fas fa-envelope mr-2 text-purple-600"></i>
                            이메일
                        </h3>
                        <p class="text-gray-600">media@chu.ac.kr</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-2">
                            <i class="fas fa-clock mr-2 text-purple-600"></i>
                            운영시간
                        </h3>
                        <p class="text-gray-600">평일 09:00 - 18:00</p>
                    </div>
                </div>
                <div class="mt-6 pt-6 border-t">
                    <div class="flex justify-center space-x-4">
                        <a href="#" class="text-2xl text-gray-600 hover:text-purple-600 transition">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" class="text-2xl text-gray-600 hover:text-purple-600 transition">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="text-2xl text-gray-600 hover:text-purple-600 transition">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="gradient-bg text-white py-8">
        <div class="container mx-auto px-4 text-center">
            <p class="mb-2">© 2024 제주한라대학교 방송영상학과. All rights reserved.</p>
            <p class="text-sm opacity-75">Created with ❤️ by Media Department Students</p>
        </div>
    </footer>

    <script src="/static/app.js"></script>
</body>
</html>`)
})

export default app