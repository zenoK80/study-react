import React from 'react';

export default function TestMission() {
  // 1. JSX 문법 방식
  const el1 = <h1>Hello JSX!</h1>;

  // 2. Babel이 변환해주는 React.createElement 방식
  const el2 = React.createElement("h1", null, "Hello JSX!");

  // F12 콘솔창에서 둘의 구조가 똑같은 Virtual DOM 객체인지 확인
  console.log("JSX 변환 결과 (el1):", el1);
  console.log("createElement 결과 (el2):", el2);

  return (
    <div>
      <h2>Mission #1 테스트 영역</h2>
      <p>개발자 도구(F12) 콘솔을 확인해 보세요!</p>

      {/* 화면에 렌더링 */}
      <div>{el1}</div>
      <div>{el2}</div>
    </div>
  );
}
