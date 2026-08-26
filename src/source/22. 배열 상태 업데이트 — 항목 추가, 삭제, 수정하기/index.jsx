// updating-array-state.jsx
// -------------------------------------------------------------
// 22. Updating Arrays — 배열 상태 업데이트: 항목 추가, 삭제, 수정하기
// -------------------------------------------------------------
// 핵심 요약
// - React에서 배열 상태를 직접 수정(push, splice 등)하면 참조가 그대로라 렌더링이 안됨 ❌
// - 항상 새로운 배열을 만들어 교체해야 React가 변화를 감지함 ✅
// - 추가: [...배열, 새값], 삭제: filter, 수정: map
// -------------------------------------------------------------

import React, { useState } from "react";

/* -----------------------------------------------------------
 * 섹션 1. 잘못된 예: push() 사용
 *   - 이미지: items.push("새 항목"); setItems(items);
 *   - 같은 참조이므로 React는 변경을 감지하지 못함
 * ---------------------------------------------------------*/

function BadPushExample() {
  const [items, setItems] = useState(["공부하기", "운동하기"]);

  function addItem() {
    items.push("청소하기"); // ❌ 기존 배열 직접 수정
    setItems(items); // 여전히 같은 참조
  }

  return (
    <div>
      <h3>❌ 잘못된 방식 (push)</h3>
      {items.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
      <button onClick={addItem}>항목 추가</button>
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 2. 올바른 예: 스프레드로 새 배열 생성
 *   - 이미지: setItems([...items, "새 항목"])
 *   - 새 배열을 만들어 참조가 달라지므로 정상 렌더링
 * ---------------------------------------------------------*/

function GoodPushExample() {
  const [items, setItems] = useState(["공부하기", "운동하기"]);

  function addItem() {
    setItems([...items, "청소하기"]); // ✅ 새 배열 생성
  }

  return (
    <div>
      <h3>✅ 올바른 방식 (스프레드)</h3>
      {items.map((item, i) => (
        <p key={i}>{item}</p>
      ))}
      <button onClick={addItem}>항목 추가</button>
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 3. 객체 배열 다루기 — filter로 삭제하기
 *   - 이미지: setTodos(todos.filter(todo => todo.id !== id))
 * ---------------------------------------------------------*/

function TodoRemoveExample() {
  const [todos, setTodos] = useState([
    { id: 1, text: "공부하기" },
    { id: 2, text: "운동하기" },
    { id: 3, text: "청소하기" },
  ]);

  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div>
      <h3>🗑️ filter로 삭제하기</h3>
      {todos.map((todo) => (
        <p key={todo.id}>
          {todo.text}{" "}
          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </p>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 4. 객체 배열 다루기 — map으로 수정하기
 *   - 이미지: setTodos(todos.map(todo => ...done: !todo.done))
 * ---------------------------------------------------------*/

function TodoToggleExample() {
  const [todos, setTodos] = useState([
    { id: 1, text: "공부하기", done: false },
    { id: 2, text: "운동하기", done: false },
  ]);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  return (
    <div>
      <h3>🔄 map으로 수정하기</h3>
      {todos.map((todo) => (
        <label key={todo.id} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => toggleTodo(todo.id)}
          />{" "}
          {todo.text}
        </label>
      ))}
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 5. 실제 예시: 장바구니 항목 추가하기
 *   - 이미지: setItems([...items, { id:2, name:"마우스", quantity:1 }])
 * ---------------------------------------------------------*/

function Cart() {
  const [items, setItems] = useState([{ id: 1, name: "노트북", quantity: 1 }]);

  function addItem() {
    setItems([...items, { id: 2, name: "마우스", quantity: 1 }]);
  }

  return (
    <div>
      <h3>🛒 장바구니 추가</h3>
      {items.map((item) => (
        <p key={item.id}>
          {item.name} — {item.quantity}개
        </p>
      ))}
      <button onClick={addItem}>상품 추가</button>
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 6. 데모용 루트 컴포넌트
 * ---------------------------------------------------------*/

export default function App() {
  return (
    <div
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        lineHeight: 1.4,
        padding: 16,
      }}
    >
      <h2>22. 배열 상태 업데이트 — 항목 추가, 삭제, 수정하기</h2>

      <h3>섹션 1. 잘못된 예 (push)</h3>
      <BadPushExample />

      <h3>섹션 2. 올바른 예 (스프레드)</h3>
      <GoodPushExample />

      <h3>섹션 3. filter로 삭제하기</h3>
      <TodoRemoveExample />

      <h3>섹션 4. map으로 수정하기</h3>
      <TodoToggleExample />

      <h3>섹션 5. 장바구니 항목 추가</h3>
      <Cart />
    </div>
  );
}

/* -----------------------------------------------------------
 * 1) 배열 직접 수정은 ❌
 *    - items.push(), splice(), sort() 등은 기존 배열을 변경
 * 2) 새 배열을 만들어 교체 ✅
 *    - 추가: [...배열, 새항목]
 *    - 삭제: 배열.filter(item => 조건)
 *    - 수정: 배열.map(item => 조건 ? 변경객체 : item)
 * 3) React는 “참조(reference)”가 달라질 때만 변경을 감지함
 * ---------------------------------------------------------*/
