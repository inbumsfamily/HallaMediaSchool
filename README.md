# 제주한라대학교 방송영상학과 포트폴리오 웹사이트

## 프로젝트 개요
- **프로젝트명**: HallaMediaSchool
- **목표**: 제주한라대학교 방송영상학과 학생들의 창의적인 작품을 소개하는 포트폴리올 웹사이트
- **디자인 컨셉**: **EMPOWERING • DYNAMIC • DIVERSE • CREATIVE • COLLABORATIVE**
- **컬러 테마**: 강렬한 오렌지 그라데이션 + 블랙 베이스
- **스타일**: 현대적이고 역동적인 미디어 산업 컨셉

## URLs
- **개발 서버**: https://3000-i5nnt5pvf85is9tdmair8-6532622b.e2b.dev/
- **Production**: https://hallamediaschool.pages.dev ✅ 배포 완료
- **GitHub**: https://github.com/inbumsfamily/HallaMediaSchool

## 🎨 새로운 디자인 시스템

### 색상 팔레트
- **Primary Orange**: #ea580c (Brand Orange)
- **Secondary Orange**: #fb923c (Brand Orange Light)  
- **Dark Orange**: #c2410c (Brand Orange Dark)
- **Background**: Black (#000000)
- **Text**: White (#ffffff) / Gray (#9ca3af)

### 타이포그래피
- **폰트**: Inter (Google Fonts)
- **스타일**: 굵고 대담한 대문자 강조
- **특징**: 넓은 자간 (letter-spacing) 사용

### 핵심 키워드
- **EMPOWERING** - 역량 강화
- **DYNAMIC** - 역동적 
- **DIVERSE** - 다양성
- **CREATIVE** - 창의성
- **COLLABORATIVE** - 협업

## 현재 완성된 기능
- ✅ **새로운 브랜드 디자인** - 오렌지 테마 + 검정 배경
- ✅ **메인 홈페이지** - 임팩트 있는 히어로 섹션
- ✅ **반응형 네비게이션** - 모바일 친화적 메뉴
- ✅ **작품 갤러리** - 6개 샘플 작품 카드
- ✅ **카테고리 필터링** - 실시간 작품 필터링
- ✅ **학과소개 페이지** - 상세 정보 및 시설 소개
- ✅ **교수진 페이지** - 6명 교수진 프로필
- ✅ **교육과정 페이지** - 4년 커리큘럼 구성
- ✅ **연락처 페이지** - 문의 폼 및 위치 정보
- ✅ **애니메이션 효과** - 호버, 스케일, 그라데이션

## 페이지 구성

### 🏠 홈페이지 (`/`)
- **Hero Section**: 강렬한 오렌지 그라데이션 배경
- **Latest Works**: 최신 3개 작품 미리보기
- **Statistics**: 재학생, 수상작품, 연간제작, 취업률
- **Program Preview**: 학과소개, 교수진, 교육과정 요약

### 🎬 작품 페이지 (`/works`)  
- **카테고리 필터**: 전체/단편영화/다큐멘터리/뮤직비디오/광고영상/실험영상
- **작품 그리드**: 카드 스타일의 작품 갤러리
- **인터랙션**: 호버 효과 및 스케일 애니메이션

### 🎓 학과소개 페이지 (`/about`)
- **비전 소개**: 미래 미디어 인재 양성
- **핵심 특징**: 5가지 주요 특장점
- **교육 목표**: 창의성, 기술전문성, 산업연계
- **시설 소개**: HD 스튜디오, 편집실, 녹음실, 컴퓨터실

### 👨‍🏫 교수진 페이지 (`/faculty`)
- **6명 교수진**: 각자 전문 분야별 소개
- **상세 정보**: 학력, 경력, 전문분야
- **컬러 카드**: 교수별 고유 테마 색상

### 📚 교육과정 페이지 (`/curriculum`)
- **4년 체계**: 기초 → 전공기초 → 전공심화 → 포트폴리오
- **전공 트랙**: 영상제작, 방송제작, 포스트프로덕션  
- **학년별 구성**: 색상별 구분 및 상세 교과목

### 📞 연락처 페이지 (`/contact`)
- **연락 정보**: 주소, 전화, 이메일, 운영시간
- **문의 양식**: 실용적인 온라인 문의 폼
- **교통 안내**: 대중교통 및 자가용 이용법

## API 엔드포인트
- `GET /` - 메인 홈페이지
- `GET /works` - 학생 작품 페이지
- `GET /about` - 학과소개 페이지  
- `GET /faculty` - 교수진 페이지
- `GET /curriculum` - 교육과정 페이지
- `GET /contact` - 연락처 페이지
- `GET /api/works` - 모든 작품 목록 조회 (JSON)
- `GET /api/works/:id` - 특정 작품 상세 정보 조회 (JSON)

## 데이터 구조
### Work Model
```javascript
{
  id: number,           // 작품 ID
  title: string,        // 작품 제목
  author: string,       // 제작자 이름
  category: string,     // 카테고리 (단편영화, 다큐멘터리 등)
  thumbnail: string,    // 썸네일 이미지 URL
  description: string,  // 작품 설명
  year: number         // 제작 연도
}
```

## 기술 스택
- **프레임워크**: Hono (Cloudflare Workers)
- **호스팅**: Cloudflare Pages
- **프론트엔드**: 
  - TailwindCSS (스타일링)
  - Inter Font (타이포그래피)
  - Font Awesome (아이콘)
  - Vanilla JavaScript (인터랙션)
- **빌드 도구**: Vite
- **프로세스 관리**: PM2
- **런타임**: Cloudflare Workers Edge Runtime

## 미구현 기능 (향후 개발 예정)
- [ ] 작품 상세 페이지 (개별 작품 전용 페이지)
- [ ] 비디오 플레이어 통합 (실제 영상 재생)
- [ ] 작품 업로드 기능 (관리자 패널)
- [ ] 데이터베이스 연동 (Cloudflare D1)
- [ ] 검색 기능 (제목/작가/카테고리)
- [ ] 좋아요/댓글 시스템
- [ ] 학생 프로필 페이지
- [ ] 영문 버전 지원
- [ ] 실시간 지도 연동

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn
- Wrangler CLI
- PM2 (프로세스 관리)

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (로컬)
npm run dev

# 빌드
npm run build

# PM2로 실행 (sandbox)
pm2 start ecosystem.config.cjs

# 프로덕션 배포
npm run deploy
```

## 추천 다음 단계
1. **비디오 플레이어**: 실제 영상 재생 기능 추가
2. **데이터베이스 통합**: Cloudflare D1을 사용하여 작품 데이터 관리
3. **관리자 패널**: 작품 업로드 및 관리 시스템
4. **사용자 인증**: 학생/교수 로그인 시스템
5. **SEO 최적화**: 메타 태그 및 구조화된 데이터
6. **분석 도구**: Google Analytics 연동
7. **성능 최적화**: 이미지 최적화 및 CDN 활용

## 배포 상태
- **플랫폼**: Cloudflare Pages
- **상태**: ✅ 배포 완료
- **배포 URL**: https://hallamediaschool.pages.dev
- **디자인**: 🎨 새로운 오렌지 테마 적용 완료
- **마지막 업데이트**: 2025-01-20

## 연락처
- **학과 사무실**: 064-741-1000
- **이메일**: media@chu.ac.kr
- **주소**: 제주특별자치도 제주시 한라대학로 38

## 라이선스
© 2024 제주한라대학교 방송영상학과. All rights reserved.

---

**EMPOWERING • DYNAMIC • DIVERSE • CREATIVE • COLLABORATIVE**