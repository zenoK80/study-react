/* =========================================================
📘 41강. 스타일링 파트 개관 — React에서 CSS의 역할 이해하기
========================================================= */

/* ---------------------------------------------------------
1️⃣ 전통적인 CSS 적용 (App.css + App.js)
--------------------------------------------------------- */

/* App.css */
h1 {
  color: blue;
  text-align: center;
}

/* App.js */
import "./App.css";

export default function App() {
  return <h1>안녕하세요, React!</h1>;
}

/* ---------------------------------------------------------
2️⃣ CSS Module 적용 (Button.module.css + Button.js)
--------------------------------------------------------- */

/* Button.module.css */
.button {
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

/* Button.js */
import styles from "./Button.module.css";

export default function Button() {
  return <button className={styles.button}>클릭</button>;
}

/* ---------------------------------------------------------
3️⃣ styled-components 방식 (App.js 예시)
--------------------------------------------------------- */

// App.js
import styled from "styled-components";

const Title = styled.h1`
  color: purple;
  text-align: center;
`;

export default function App() {
  return <Title>안녕하세요, React!</Title>;
}

/* ---------------------------------------------------------
4️⃣ 인라인 스타일 적용
--------------------------------------------------------- */

export default function App() {
  return <h1 style={{ color: "red", fontSize: "20px" }}>인라인 스타일 예시</h1>;
}

/* ---------------------------------------------------------
5️⃣ Tailwind CSS 유틸리티 클래스 방식
--------------------------------------------------------- */

export default function App() {
  return <button className="bg-blue-500 text-white p-2 rounded">저장</button>;
}

/* ---------------------------------------------------------
6️⃣ React Icons 활용 예시
--------------------------------------------------------- */

import { FaBeer } from "react-icons/fa";

export default function App() {
  return <h1>한 잔 하실래요? <FaBeer /></h1>;
}

/* =========================================================
💡 핵심 요약

| 스타일 방식 | 주요 특징 | 장점 | 단점 |
|--------------|-------------|-------|------|
| 전통적 CSS | 전역 적용 | 익숙하고 단순 | 충돌 위험 |
| CSS Module | 파일 단위 스코프 | 클래스 충돌 방지 | 설정 필요 |
| styled-components | JS 내 선언 | 동적 props, 완전 캡슐화 | 빌드 시 성능 부하 |
| 인라인 스타일 | JSX 내 직접 선언 | 빠른 실험용 | 복잡한 CSS 불가 |
| Tailwind CSS | 유틸리티 클래스 조합 | 생산성 ↑ | 클래스 과다 시 가독성 ↓ |

========================================================= */
