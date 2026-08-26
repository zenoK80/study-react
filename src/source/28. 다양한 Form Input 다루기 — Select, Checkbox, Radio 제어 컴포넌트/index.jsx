// form-controls-select-checkbox-radio.jsx
// -------------------------------------------------------------
// 28. 다양한 Form Input 다루기 — Select, Checkbox, Radio 제어 컴포넌트
// -------------------------------------------------------------
// 핵심 요약
// - Select/Checkbox/Radio 모두 “제어 컴포넌트” 패턴을 따른다.
//   value/checked ← state, onChange → setState 흐름이 기본 골격.
// - Checkbox의 다중 선택은 배열 state로 관리하고, 체크 여부에 따라
//   추가/제거한다. (prev => checked ? [...prev, v] : prev.filter(...))
// - Select 다중 선택은 e.target.selectedOptions를 Array로 변환해
//   값 배열을 갱신한다.
// - Radio는 같은 name을 공유하고, “현재 값 === 라디오의 value”로 checked를 결정한다.
// -------------------------------------------------------------

import React, { useState } from "react";

/* -----------------------------------------------------------
 * 섹션 1. Select — 단일 선택 제어 컴포넌트
 * ---------------------------------------------------------*/
function FavoriteFruit() {
  const [fruit, setFruit] = useState("apple"); // 초기값이 곧 초기 선택 옵션

  return (
    <div style={{ marginBottom: 24 }}>
      <label>
        좋아하는 과일:&nbsp;
        <select value={fruit} onChange={(e) => setFruit(e.target.value)}>
          <option value="apple">사과</option>
          <option value="banana">바나나</option>
          <option value="cherry">체리</option>
        </select>
      </label>
      <p>선택한 과일: {fruit}</p>
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 2. Checkbox — 불리언 제어 컴포넌트
 * ---------------------------------------------------------*/
function NewsletterSignup() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div style={{ marginBottom: 24 }}>
      <label>
        <input
          type="checkbox"
          checked={isSubscribed}
          onChange={(e) => setIsSubscribed(e.target.checked)}
        />
        &nbsp;뉴스레터 구독하기
      </label>
      <p>{isSubscribed ? "구독 중입니다." : "구독하지 않았습니다."}</p>
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 3. Radio — 단일 선택(동일 name) 제어 컴포넌트
 * ---------------------------------------------------------*/
function GenderSelect() {
  const [gender, setGender] = useState("male");

  return (
    <div style={{ marginBottom: 24 }}>
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={(e) => setGender(e.target.value)}
        />
        &nbsp;남성
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={(e) => setGender(e.target.value)}
        />
        &nbsp;여성
      </label>
      <p>선택한 성별: {gender}</p>
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 4. 여러 Checkbox를 “배열”로 관리 + Select 다중 선택
 * ---------------------------------------------------------*/
function SkillsAndMultiSelect() {
  const [skills, setSkills] = useState([]);

  function handleSkillChange(e) {
    const { value, checked } = e.target;
    setSkills((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ margin: "8px 0" }}>여러 Checkbox를 배열로 관리</h4>
      <label>
        <input
          type="checkbox"
          value="react"
          checked={skills.includes("react")}
          onChange={handleSkillChange}
        />
        &nbsp;React
      </label>
      &nbsp;&nbsp;
      <label>
        <input
          type="checkbox"
          value="vue"
          checked={skills.includes("vue")}
          onChange={handleSkillChange}
        />
        &nbsp;Vue
      </label>
      &nbsp;&nbsp;
      <label>
        <input
          type="checkbox"
          value="svelte"
          checked={skills.includes("svelte")}
          onChange={handleSkillChange}
        />
        &nbsp;Svelte
      </label>

      <p style={{ marginTop: 8 }}>선택한 스킬: {skills.join(", ") || "없음"}</p>

      <h4 style={{ margin: "12px 0 6px" }}>Select 다중 선택 예시</h4>
      <select
        multiple
        value={skills}
        onChange={(e) =>
          setSkills([...e.target.selectedOptions].map((opt) => opt.value))
        }
        style={{ minWidth: 160, height: 86 }}
      >
        <option value="react">🧩 React</option>
        <option value="vue">🟢 Vue</option>
        <option value="svelte">🔥 Svelte</option>
      </select>
    </div>
  );
}

/* -----------------------------------------------------------
 * 섹션 5. 데모용 루트 컴포넌트
 * ---------------------------------------------------------*/
export default function App() {
  return (
    <div
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        lineHeight: 1.45,
        padding: 16,
      }}
    >
      <h2>28. 다양한 Form Input 다루기 — Select, Checkbox, Radio 제어 컴포넌트</h2>

      <h3>섹션 1. Select (단일 선택)</h3>
      <FavoriteFruit />

      <h3>섹션 2. Checkbox (불리언)</h3>
      <NewsletterSignup />

      <h3>섹션 3. Radio (동일 name의 단일 선택)</h3>
      <GenderSelect />

      <h3>섹션 4. 여러 Checkbox 배열 관리 + Select 다중 선택</h3>
      <SkillsAndMultiSelect />
    </div>
  );
}

/* -----------------------------------------------------------
 * 체크리스트
 * 1) Select/Checkbox/Radio 모두 “state ↔ value/checked”로 연결한다.
 * 2) Checkbox 다중 선택은 배열 state로, 체크 시 추가 · 해제 시 필터 제거.
 * 3) Select 다중 선택은 selectedOptions → [...].map(opt => opt.value).
 * 4) Radio는 동일 name을 공유하고 “현재 값 === value”로 checked를 결정.
 * ---------------------------------------------------------*/
