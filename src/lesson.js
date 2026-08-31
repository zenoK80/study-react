// src/lesson.js

// ----------------------------------------------------------------------------
// [1] 실습 파일 목록
// ----------------------------------------------------------------------------
// lessonFiles 배열에는 실습 파일들의 기본 정보가 들어있다.
// App.jsx는 이 배열을 보고 사이드바 목록과 현재 선택된 실습 정보를 만든다.
export const lessonFiles = [
  // part1
  { part: "part1", lesson: "01", title: "01_TestMission", path: "./part1/01_TestMission.jsx" },
  { part: "part1", lesson: "02", title: "02_react_rendering_process", path: "./part1/02_react_rendering_process.jsx" },
  { part: "part1", lesson: "03", title: "03_Hello", path: "./part1/03_Hello.jsx" },
  { part: "part1", lesson: "04", title: "04_Greeting", path: "./part1/04_Greeting.jsx" },
  { part: "part1", lesson: "05", title: "05_ProfileHeader", path: "./part1/05_ProfileHeader.jsx" },
  { part: "part1", lesson: "06", title: "06_ChildrenPractice", path: "./part1/06_ChildrenPractice.jsx" },
  { part: "part1", lesson: "07", title: "07_ListRendering", path: "./part1/07_ListRendering.jsx" },

  // part2
  { part: "part2", lesson: "01", title: "01_Cafeteria", path: "./part2/01_Cafeteria.jsx" },
  { part: "part2", lesson: "02", title: "02_ShoppingCart", path: "./part2/02_ShoppingCart.jsx" },
  { part: "part2", lesson: "03", title: "03_TicketBooking", path: "./part2/03_TicketBooking.jsx" },

  // part3
  // { part: "part3", lesson: "01", title: "01_파일이름", path: "./part3/01_파일이름.jsx" },
];

// ----------------------------------------------------------------------------
// [2] 실습 파일을 React 컴포넌트로 불러오기
// ----------------------------------------------------------------------------
// import.meta.glob()는 Vite 기능이다.
// "./part*/*.jsx" 패턴에 맞는 파일들을 찾아서 객체로 만든다.
// 객체의 key는 파일 경로, value는 그 파일을 import하는 함수다.
const lessonComponentModules = import.meta.glob("./part*/*.jsx");

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
const lessonSourceModules = import.meta.glob("./part*/*.jsx", {
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
