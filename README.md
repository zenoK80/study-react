# React 학습 정리
https://zenok80.github.io/study-react/

```text
📁 study-react/
├── 📄 index.html              # React 앱이 들어갈 HTML 진입점
├── 📄 vite.config.js          # Vite 설정 및 GitHub Pages base 경로 설정
├── 📄 package.json            # 실행 스크립트와 의존성 관리
├── 📁 .github/workflows/      # GitHub Actions 배포 설정
│   └── 📄 deploy.yml          # GitHub Pages 자동 배포 workflow
├── 📁 src/
│   ├── 📄 main.jsx            # React 앱 시작점
│   ├── 📄 App.jsx             # URL 기준으로 현재 실습을 선택하고 화면 구성
│   ├── 📄 lesson.js           # part별 JSX 실습 파일 목록 및 동적 import 관리
│   ├── 📁 components/         # 학습 사이트 공통 화면 컴포넌트
│   │   ├── 📄 StudyLayout.jsx # Preview와 Source Code를 배치하는 레이아웃
│   │   ├── 📄 Preview.jsx     # 현재 JSX 실습 실행 결과 영역
│   │   └── 📄 CodeBlock.jsx   # 현재 JSX 실습 소스 코드 출력 영역
│   ├── 📁 insight/            # 알게 된 사실들 정리
│   ├── 📁 part1/              # 인프런: React 기초 & 렌더링 원리 미션
│   ├── 📁 part2/              # 인프런: 심화 훅 & 상태 관리 패턴 미션
│   └── 📁 part3/              # 인프런: 실무 라이브러리 미션
│   ├── 📁 basic/              # zeno.it.kr 기초
│   ├── 📁 intermediate/       # zeno.it.kr 중급
│   └── 📁 advanced/           # zeno.it.kr 고급
└── 📁 dist/                   # npm run build 결과물
```
# 기초
## Part 1. React 기초 & 렌더링 원리
* `2026.08.29` **01_**: JSX와 React.createElement 동작 원리 및 가상 DOM 비교
* `2026.08.29` **02_**: useState/useEffect 타이머를 활용한 가상 DOM 부분 업데이트
* `2026.08.29` **03_**: 첫 컴포넌트 만들기, 파스칼케이스 규칙, Fragment(<>...</>) 사용법
* `2026.08.29` **04_**: Props 전달 기초 및 매개변수 구조 분해 할당
* `2026.08.29` **05_**: 부품 컴포넌트(Emoji, Title 등) 조립 및 Props 재분배
* `2026.08.29` **06_**: children props 활용법 및 Card 래퍼 컴포넌트 패턴
* `2026.08.29` **07_**: map/filter 체이닝, 고유 key 부여, 화살표 함수 반환 규칙 및 다중 검색 필터
* `2026.09.04` **08_**: React 이벤트 처리 실습 — 클릭된 리스트 항목의 이름과 인덱스 출력하기


## basic. React 기본기와 컴포넌트 모델
* `2026.09.04` **01_**: React는 무엇을 해결하는가

---

# 중급
## Part 2. 심화 훅 & 상태 관리 패턴
* `2026.08.29` **01_**: useReducer 기초, dispatch와 action을 활용한 밥 재고 관리
* `2026.08.29` **02_**: 객체/배열 상태의 불변성 유지, 장바구니 추가/삭제 및 총액 자동 계산
* `2026.08.29` **03_**: 액션 상수화, 좌석 선택 토글(최대 4개) 및 VIP 할인율 적용 로직

## intermediate. 상태 설계와 컴포넌트 패턴

---

# 고급
## Part 3. 실무 라이브러리

## advanced. 서버 상태와 실전 애플리케이션








