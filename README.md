# 제주한라대학교 방송영상학과 포트폴리오 웹사이트

## 프로젝트 개요
- **프로젝트명**: HallaMediaSchool
- **목표**: 제주한라대학교 방송영상학과 학생들의 창의적인 작품을 소개하는 포트폴리오 웹사이트
- **주요 기능**:
  - 학생 작품 갤러리 (단편영화, 다큐멘터리, 뮤직비디오, 광고영상 등)
  - 카테고리별 작품 필터링
  - 반응형 디자인
  - 학과 소개 및 연락처 정보

## URLs
- **개발 서버**: https://3000-i1bkp21a962j1f4znsge2-6532622b.e2b.dev
- **Production**: https://hallamediaschool.pages.dev (배포 예정)
- **GitHub**: https://github.com/inbumsfamily/HallaMediaSchool

## 현재 완성된 기능
- ✅ 메인 홈페이지 UI/UX 디자인
- ✅ 작품 갤러리 섹션
- ✅ 카테고리별 필터링 기능
- ✅ 학과 소개 섹션
- ✅ 연락처 정보
- ✅ 반응형 디자인
- ✅ API 엔드포인트 (/api/works, /api/works/:id)
- ✅ 애니메이션 효과 (스크롤, 호버)

## API 엔드포인트
- `GET /` - 메인 홈페이지
- `GET /api/works` - 모든 작품 목록 조회
- `GET /api/works/:id` - 특정 작품 상세 정보 조회

## 데이터 구조
### Work Model
```javascript
{
  id: number,
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
  - Font Awesome (아이콘)
  - Vanilla JavaScript (인터랙션)
- **빌드 도구**: Vite
- **런타임**: Cloudflare Workers Edge Runtime

## 미구현 기능 (향후 개발 예정)
- [ ] 작품 상세 페이지
- [ ] 비디오 플레이어 통합
- [ ] 작품 업로드 기능 (관리자)
- [ ] 데이터베이스 연동 (Cloudflare D1)
- [ ] 검색 기능
- [ ] 좋아요/댓글 기능
- [ ] 학생 프로필 페이지
- [ ] 영문 버전 지원

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn
- Wrangler CLI

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
1. **데이터베이스 통합**: Cloudflare D1을 사용하여 작품 데이터 관리
2. **관리자 패널**: 작품 업로드 및 관리 기능 구현
3. **비디오 스트리밍**: 작품 비디오 재생 기능 추가
4. **사용자 인증**: 학생/교수 로그인 시스템
5. **SEO 최적화**: 메타 태그 및 구조화된 데이터 추가
6. **분석 도구**: 방문자 통계 및 작품 조회수 추적

## 배포 상태
- **플랫폼**: Cloudflare Pages
- **상태**: ✅ 개발 중
- **마지막 업데이트**: 2025-01-20

## 연락처
- **학과 사무실**: 064-741-1000
- **이메일**: media@chu.ac.kr
- **주소**: 제주특별자치도 제주시 한라대학로 38

## 라이선스
© 2024 제주한라대학교 방송영상학과. All rights reserved.