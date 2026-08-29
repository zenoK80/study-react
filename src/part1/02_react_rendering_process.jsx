import React, { useState, useEffect } from "react";

export default function ReactRenderingProcess() {
  const [count, setCount] = useState(0);

  // 1초마다 count가 증가하는 작은 실험 (Virtual DOM 동작 확인용)
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 1️⃣ JSX와 React.createElement 생성 확인
  const jsxElement = <h1>Hello JSX</h1>;
  const createElementResult = React.createElement("h1", null, "Hello JSX");

  console.log("JSX 변환 결과 (JSX):", jsxElement);
  console.log("createElement 변환 결과:", createElementResult);

  return (
    <div>
      <h2>🟩 React는 화면을 어떻게 그리고 바꿀까?</h2>

      {/* 1️⃣ JSX는 설계도, Babel은 번역기 */}
      <section>
        <h3>1. JSX & Babel</h3>
        <p>JSX는 자바스크립트 안에서 UI를 표현하는 문법이며, Babel이 React.createElement로 번역합니다.</p>
        <p>콘솔창(F12)을 확인하면 두 객체가 동일한 React Element 구조임을 알 수 있습니다.</p>
        {jsxElement}
        {createElementResult}
      </section>

      {/* 2️⃣ Virtual DOM — 초안 비교 및 부분 업데이트 */}
      <section>
        <h3>2. Virtual DOM 실험</h3>
        <p>1초마다 전체 화면을 고치지 않고, 바뀐 수치 텍스트만 선택적으로 덮어씁니다.</p>
        <h1>Count: {count}</h1>
      </section>

      {/* 3️⃣ ReactDOM */}
      <section>
        <h3>3. ReactDOM</h3>
        <p>React(설계사)가 만든 가상 DOM을 전달받아 실제 브라우저 화면에 그리는 시공팀 역할을 합니다.</p>
      </section>

      {/* 4️⃣ Fiber */}
      <section>
        <h3>4. Fiber Engine</h3>
        <p>렌더링 작업의 우선순위를 조절하여, 사용자 클릭이나 입력 반응이 멈추지 않고 부드럽게 처리되도록 합니다.</p>
      </section>

      {/* 5️⃣ React Ecosystem */}
      <section>
        <h3>5. React Ecosystem</h3>
        <p>React는 UI 전담입니다. 라우팅(React Router), 상태 관리(Zustand, Redux) 등을 앱처럼 조합하여 사용합니다.</p>
      </section>
    </div>
  );
}
