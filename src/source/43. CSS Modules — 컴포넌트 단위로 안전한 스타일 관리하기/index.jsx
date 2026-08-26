# 43강 CSS Modules 데모 — “한 파일에” 모든 가상 파일 모아보기

────────────────────────────────────────────────────────────────────────
📄 package.json (참고: styled 라이브러리 없이 CRA/Vite 기본 CSS Modules로 동작)
────────────────────────────────────────────────────────────────────────
{
  "name": "css-modules-demo",
  "private": true,
  "version": "0.0.1",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}

────────────────────────────────────────────────────────────────────────
📄 src/components/Button.module.css
────────────────────────────────────────────────────────────────────────
.button {
  background-color: green;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

────────────────────────────────────────────────────────────────────────
📄 src/components/Button.js
────────────────────────────────────────────────────────────────────────
import styles from "./Button.module.css";

export default function Button({ children }) {
  return <button className={styles.button}>{children}</button>;
}

────────────────────────────────────────────────────────────────────────
📄 src/components/Header.css   # 전역 CSS(충돌을 보여주기 위한 예시)
────────────────────────────────────────────────────────────────────────
.button {
  color: red;
}

────────────────────────────────────────────────────────────────────────
📄 src/components/Footer.css   # 전역 CSS(뒤에 불리면 덮어쓰기 됨)
────────────────────────────────────────────────────────────────────────
.button {
  color: blue;
}

────────────────────────────────────────────────────────────────────────
📄 src/App.global.js
# 전역 CSS의 ‘덮어쓰기/충돌’ 데모용 App
# Header.css 와 Footer.css 둘 다 import하면, 나중에 import된 규칙이 이깁니다.
# 아래 예시에선 Footer.css가 마지막이라 모든 .button 글자색이 파랑이 됩니다.
────────────────────────────────────────────────────────────────────────
import "./components/Header.css";
import "./components/Footer.css";

export default function App() {
  return (
    <div>
      <button className="button">로그인</button>
      <button className="button">회원가입</button>
    </div>
  );
}

────────────────────────────────────────────────────────────────────────
📄 src/App.modules.js
# CSS Modules의 ‘파일별/컴포넌트별 캡슐화’ 데모용 App
# Button.module.css 는 빌드 시 button___A1b2 처럼 고유 클래스명으로 변환되어
# 다른 파일의 .button 과 충돌하지 않습니다.
────────────────────────────────────────────────────────────────────────
import Button from "./components/Button";
import "./components/Header.css";
import "./components/Footer.css";

export default function App() {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      {/* 전역 CSS의 .button 규칙과 무관하게, 모듈의 고유 클래스가 적용됨 */}
      <Button>클릭(모듈 스타일)</Button>

      {/* 전역 CSS 규칙이 필요한 경우는 className으로 직접 사용 */}
      <button className="button">전역 .button (충돌 데모용)</button>
    </div>
  );
}

────────────────────────────────────────────────────────────────────────
📄 src/main.jsx  (Vite 기준; CRA면 index.js에 동일하게 작성)
────────────────────────────────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
// 원하는 데모를 선택해서 import 하세요.
// import App from "./App.global";   // 전역 CSS 충돌 데모
import App from "./App.modules";     // CSS Modules 데모

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

────────────────────────────────────────────────────────────────────────
📄 index.html (Vite 기본 템플릿 예시)
────────────────────────────────────────────────────────────────────────
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Modules Demo</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

────────────────────────────────────────────────────────────────────────
🔎 빌드 후 클래스 변환이 어떻게 보이나요?
────────────────────────────────────────────────────────────────────────
# Button.module.css 의 .button 은 빌드 시 대략 아래처럼 바뀝니다.
# <button class="button___3Gh7x">클릭</button>
# → 그래서 Header.css/Footer.css 의 전역 .button 과 ‘이름이 같아도’ 충돌하지 않습니다.
