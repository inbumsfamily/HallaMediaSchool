# HallaMediaSchool 웹사이트

## 🎨 프로젝트 개요
**완전히 새로워진 제주한라대학교 방송영상학과 웹사이트**
- **디자인 컨셉**: EMPOWERING • DYNAMIC • DIVERSE • CREATIVE • COLLABORATIVE
- **색상 테마**: 강렬한 오렌지 그라디언트 (#ea580c, #fb923c) + 검정 배경
- **스타일**: 대담하고 현대적인 타이포그래피, 드라마틱한 애니메이션 효과
- **기술 스택**: Hono + TypeScript + Tailwind CSS + Cloudflare Pages

## 🌟 완료된 기능

### ✅ 홈페이지 (EMPOWERING)
- 강렬한 히어로 섹션 with 오렌지 그라디언트 배경
- 핵심 가치 및 성과 지표 (졸업생 500명+, 취업률 95% 등)
- 최신 학생 작품 하이라이트
- 입학 안내 Call-to-Action

### ✅ 학생 작품 페이지 (DYNAMIC)
- 카테고리별 작품 필터링 (전체, 방송, 영화, 광고, 다큐멘터리)
- 동적 작품 카드 with 호버 애니메이션
- 새로운 오렌지/블랙 컬러 스키마
- 반응형 그리드 레이아웃

### ✅ 학과 소개 페이지 (EMPOWERING)
- "EMPOWERING FUTURE CREATORS" 메인 테마
- 교육 목표 및 핵심 역량 섹션
- 성공 지표 및 시설 정보
- 미래 지향적 교육 철학 강조

### ✅ 교수진 페이지 (DYNAMIC)
- "DYNAMIC EXPERT FACULTY" 컨셉
- 6명 교수진 프로필 with 전문 분야 태그
- 연구 성과 통계 (논문 150편+, 프로젝트 50개+ 등)
- 산업 전문가 경력 강조

### ✅ 교육과정 페이지 (CREATIVE)
- "CREATIVE INNOVATIVE CURRICULUM" 테마
- 4년 로드맵 체계적 제시
- 이론과 실습의 균형잡힌 커리큘럼
- 창의적 사고 개발 중심

### ✅ 연락처 페이지 (COLLABORATIVE)
- "COLLABORATIVE CONNECT WITH US" 컨셉
- 학과 정보 및 연락처 통합 제공
- 상담 예약 및 문의 시스템
- 협력적 교육 철학 반영

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary Orange**: #ea580c (brand-orange)
- **Light Orange**: #fb923c (brand-orange-light)  
- **Dark Orange**: #c2410c (brand-orange-dark)
- **Background**: Black (#000000)
- **Text**: White (#ffffff), Gray variants

### 타이포그래피
- **Font Family**: Inter (Google Fonts)
- **Hero Text**: 6xl-8xl, font-black, uppercase, tracking-wider
- **Section Headers**: 3xl-5xl, font-bold, uppercase
- **Body Text**: xl-lg, leading-relaxed

### 애니메이션 효과
- **Hover Transforms**: scale(1.05), border color transitions
- **Hero Animations**: hover:scale-105 with duration-500
- **Card Effects**: gradient backgrounds, border highlights
- **Transition Duration**: 300ms standard

## 📱 반응형 디자인
- **Desktop**: 최적화된 와이드 레이아웃
- **Tablet**: md: breakpoint 대응 
- **Mobile**: 모바일 우선 responsive grid

## 🚀 배포 상태
- **플랫폼**: Cloudflare Pages
- **상태**: ✅ 활성 상태
- **개발 서버**: http://localhost:3000
- **프로덕션**: 배포 준비 완료

## 📂 프로젝트 구조
```
webapp/
├── src/
│   └── index.tsx          # 메인 Hono 애플리케이션 (모든 페이지 포함)
├── public/
│   └── static/
│       ├── app.js         # 프론트엔드 JavaScript
│       └── styles.css     # 커스텀 CSS
├── ecosystem.config.cjs   # PM2 설정
├── package.json          # 의존성 및 스크립트
├── wrangler.jsonc        # Cloudflare 설정
└── README.md             # 프로젝트 문서
```

## 🛠️ 개발 명령어
```bash
# 개발 서버 시작
cd /home/user/webapp && pm2 start ecosystem.config.cjs

# 빌드
npm run build

# 배포
npm run deploy

# 포트 정리
fuser -k 3000/tcp 2>/dev/null || true

# 서버 테스트
curl http://localhost:3000
```

## 🎯 사용자 가이드
1. **메인 페이지**: 학과 소개 및 주요 정보 한눈에 보기
2. **학생 작품**: 카테고리별 우수 작품 탐색
3. **학과 소개**: 교육 철학 및 시설 정보
4. **교수진**: 전문가 프로필 및 연구 성과
5. **교육과정**: 4년 커리큘럼 로드맵
6. **연락처**: 입학 상담 및 문의

## 📊 주요 성과 지표
- **졸업생**: 500명+ 배출
- **취업률**: 95% 달성
- **산업체 연계**: 주요 방송사/영화사 파트너십
- **국제 수상**: 25개+ 국제 어워드
- **현장 실습**: 100% 참여율

## 🔄 최근 업데이트
- **2024.08.20**: 전체 사이트 디자인 시스템 대대적 개편
- **컨셉 테마**: EMPOWERING/DYNAMIC/CREATIVE/COLLABORATIVE 적용
- **색상 시스템**: 오렌지 그라디언트 + 블랙 배경으로 완전 변경
- **타이포그래피**: 대담하고 현대적인 폰트 시스템 도입
- **애니메이션**: 호버 효과 및 트랜지션 대폭 강화

---
**제주한라대학교 방송영상학과 - 미래를 창조하는 크리에이터 양성의 요람**