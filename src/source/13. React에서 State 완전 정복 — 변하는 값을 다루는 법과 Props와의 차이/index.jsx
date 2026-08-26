/* ======================================================
 🧩 1. Props의 기본 원리 — 부모가 자식에게 값 전달하기
====================================================== */
function Child({ message }) {
  // props로 전달받은 message를 출력
  return <h2>{message}</h2>;
}

function Parent() {
  // "안녕하세요"라는 문자열을 자식에게 전달
  return <Child message="안녕하세요" />;
}

/*
✅ Props는 "읽기 전용" 데이터다.
- 부모 컴포넌트 → 자식 컴포넌트로 데이터가 전달됨.
- 자식은 전달받은 값을 표시만 할 수 있고, 직접 수정은 불가능하다.
*/


/* ======================================================
 ⚙️ 2. State란? — 컴포넌트 안에서 ‘변하는 값’ 관리하기
====================================================== */
import { useState } from "react";

function Counter() {
  // count: 현재 값 / setCount: count를 바꾸는 함수
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
✅ useState 훅의 구조
- useState(초기값) → [현재값, 변경함수]
- 상태가 바뀌면 컴포넌트가 자동으로 다시 렌더링된다.
*/


/* ======================================================
 ❌ 3. State를 쓰지 않은 경우 — 화면이 안 바뀌는 이유
====================================================== */
function CounterWithoutState() {
  let count = 0; // 일반 변수 (React가 추적하지 않음)

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button
        onClick={() => {
          count = count + 1;
          console.log("현재 count:", count);
        }}
      >
        +1
      </button>
    </div>
  );
}

/*
🚫 문제점:
- count는 변경되어도 React는 다시 렌더링하지 않음.
- 즉, 화면에 보이는 숫자는 변하지 않는다.
*/


/* ======================================================
 🔁 4. State가 바뀔 때마다 컴포넌트가 ‘다시 그려진다’
====================================================== */
import { useState } from "react";

function ClickLogger() {
  const [count, setCount] = useState(0);
  console.log("컴포넌트 렌더링, 현재 count:", count);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
✅ setCount()로 상태를 바꾸면:
- React가 내부적으로 ‘다시 렌더링’을 예약.
- 새로운 count 값이 반영된 화면을 다시 그림.
*/


/* ======================================================
 🚫 5. Props는 수정 불가능한 값 (읽기 전용)
====================================================== */
function Example({ text }) {
  // text = "변경"; ❌ 이런 식으로 직접 바꿀 수 없음
  return <p>{text}</p>;
}

/*
✅ Props는 함수의 매개변수와 같음.
- “부모로부터 받은 값”이라, 내부에서 재할당 불가능.
*/


/* ======================================================
 🔹 6. useState 기본 형태와 초기값
====================================================== */
const [state, setState] = useState(initialValue);

/*
useState(0);        → 숫자형 state (0에서 시작)
useState("안녕");   → 문자열 state ("안녕"에서 시작)
*/


/* ======================================================
 🧱 7. Class형 컴포넌트에서의 State (이전 문법)
====================================================== */
class OldCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // 초기 상태
  }

  componentDidMount() {
    console.log("컴포넌트가 나타남");
  }

  componentDidUpdate() {
    console.log("컴포넌트가 업데이트됨");
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button
          onClick={() =>
            this.setState({ count: this.state.count + 1 })
          }
        >
          +1
        </button>
      </div>
    );
  }
}

/*
✅ React 16 이전에는 class 문법을 사용했음.
✅ 함수형 + useState는 더 간결하고 가독성이 좋아 현대 표준.
*/


/* ======================================================
 💬 8. Props vs State — 비교 정리 예시
====================================================== */
// ✅ Props 예시
function Greeting({ name }) {
  return <h1>안녕하세요, {name}!</h1>;
}

// ✅ State 예시
import { useState } from "react";

function Clicker() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      <p>
        {clicked
          ? "버튼을 눌렀습니다!"
          : "아직 버튼을 누르지 않았습니다."}
      </p>
      <button onClick={() => setClicked(true)}>눌러보세요</button>
    </div>
  );
}

/*
✅ Props vs State 정리표

| 구분 | Props | State |
|------|--------|--------|
| 관리 주체 | 부모 컴포넌트 | 해당 컴포넌트 자신 |
| 수정 가능성 | 읽기 전용 | 변경 가능 |
| 역할 | 외부에서 전달된 값 | 내부에서 변화하는 값 |
| 렌더링 트리거 | 부모가 변경될 때 | setState로 직접 변경될 때 |
*/


/* ======================================================
 🧮 9. 최종 예시 — React State 기본 패턴 복습
====================================================== */
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

/*
✅ 정리:
- Props는 "밖에서 들어온 값", State는 "안에서 변하는 값".
- State가 바뀌면 React는 새 화면을 자동으로 그려준다.
*/
