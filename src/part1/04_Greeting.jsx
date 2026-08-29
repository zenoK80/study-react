// [미션] Props로 인사 메시지 바꾸기 - 2026.08.29(토)
// [학습목표] Props를 전달받아 컴포넌트의 출력 결과를 동적으로 변경한다.

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default Greeting;
