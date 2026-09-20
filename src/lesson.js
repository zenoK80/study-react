// src/lesson.js

// ----------------------------------------------------------------------------
// [1] 실습 파일 목록
// ----------------------------------------------------------------------------
// lessonFiles 배열에는 실습 파일들의 기본 정보가 들어있다.
// App.jsx는 이 배열을 보고 사이드바 목록과 현재 선택된 실습 정보를 만든다.
export const lessonFiles = [
  // part1
  { part: "part1", lesson: "01", title: "01_React의 탄생과 JSX의 진짜 얼굴", path: "./part1/01_.jsx" },
  { part: "part1", lesson: "02", title: "02_React는 화면을 어떻게 그리고 바꿀까", path: "./part1/02_.jsx" },
  { part: "part1", lesson: "03", title: "03_나만의 첫 함수형 컴포넌트 만들기", path: "./part1/03_.jsx" },
  { part: "part1", lesson: "04", title: "04_Props로 인사 메시지 바꾸기", path: "./part1/04_.jsx" },
  { part: "part1", lesson: "05", title: "05_Props 구조 분해와 컴포넌트 합성 실습", path: "./part1/05_.jsx" },
  { part: "part1", lesson: "06", title: "06_children과 단방향 데이터 흐름 실습", path: "./part1/06_.jsx" },
  { part: "part1", lesson: "07", title: "07_map과 filter로 리스트를 효율적으로 렌더링하기", path: "./part1/07_.jsx" },
  { part: "part1", lesson: "08", title: "08_React 이벤트 처리 실습", path: "./part1/08_.jsx" },
  { part: "part1", lesson: "09", title: "09_React에서 State의 힘 느껴보기", path: "./part1/09_.jsx" },
  { part: "part1", lesson: "09", title: "10_이벤트와 State 결합", path: "./part1/09_.jsx" },

  // part2
  { part: "part2", lesson: "01", title: "01_급식실 재고 관리 시스템 구현", path: "./part2/01_.jsx" },
  { part: "part2", lesson: "02", title: "02_프로 쇼핑 카트", path: "./part2/02_.jsx" },
  { part: "part2", lesson: "03", title: "03_비즈니스 규칙이 담긴 스마트 티켓 예매 시스템", path: "./part2/03_.jsx" },

  // part3
  { part: "part3", lesson: "01", title: "01_타입스크립트", path: "./part3/01_.tsx" },
  { part: "part3", lesson: "02", title: "02_TypeScript 타입 실습", path: "./part3/02_.tsx" },
  { part: "part3", lesson: "03", title: "03_제네릭과 extends로 재사용 가능한 컴포넌트 만들기", path: "./part3/03_.tsx" },

];

// ----------------------------------------------------------------------------
// [2] 실습 파일을 React 컴포넌트로 불러오기
// ----------------------------------------------------------------------------
// import.meta.glob()는 Vite 기능이다.
// "./part*/*.jsx" 패턴에 맞는 파일들을 찾아서 객체로 만든다.
// 객체의 key는 파일 경로, value는 그 파일을 import하는 함수다.
const lessonComponentModules = import.meta.glob("./{part*,basic,intermediate,advanced}/*.{jsx,tsx}");

export async function loadLessonComponent(path) {
  // path 예시: "./part1/01_TestMission.jsx"
  // lessonComponentModules 객체에서 path에 맞는 import 함수를 꺼낸다.
  const importComponent = lessonComponentModules[path];

  // 해당 path의 파일을 못 찾으면 null 반환.
  if (!importComponent) { return null; }

  // import 함수를 실행해서 JSX 파일을 실제 모듈로 불러온다.
  const module = await importComponent();

  // JSX 파일의 export default 컴포넌트를 반환한다.
  return module.default;
}

// ----------------------------------------------------------------------------
// [3] 실습 파일을 소스 코드 문자열로 불러오기
// ----------------------------------------------------------------------------
// ?raw를 사용하면 JSX 파일을 실행하지 않고 파일 내용 자체를 문자열로 가져온다.
// import: "default"는 raw 문자열을 바로 기본값으로 받겠다는 뜻이다.
const lessonSourceModules = import.meta.glob("./{part*,basic,intermediate,advanced}/*.{jsx,tsx}", {
  query: "?raw",
  import: "default",
});

export async function loadLessonSource(path) {
  // path 예시: "./part1/01_TestMission.jsx"
  // lessonSourceModules 객체에서 path에 맞는 source import 함수를 꺼낸다.
  const importSource = lessonSourceModules[path];

  // 해당 path의 파일을 못 찾으면 빈 문자열 반환.
  if (!importSource) { return ""; }

  // import 함수를 실행해서 JSX 파일 원본 코드를 문자열로 불러온다.
  const source = await importSource();

  // 불러온 소스 코드 문자열을 반환한다.
  return source;
}
