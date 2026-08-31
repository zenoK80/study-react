//----------------------------------------------------------------------------------
// [미션] useReducer로 급식실 밥 재고 관리하기 - 2026.08.29(토)
// [학습목표] useReducer의 기본 동작 원리(state, dispatch, action, reducer) 이해
//----------------------------------------------------------------------------------

import React, { useReducer } from 'react';

//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. useReducer: 복잡한 상태 변경 로직을 컴포넌트 외부(reducer)로 분리하는 React Hook
// 2. dispatch({ type: '...' }): 상태 변경 요청(Action 객체)을 리듀서 함수에 전달
// 3. reducer(state, action): 이전 상태와 액션을 받아 새로운 상태를 반환하는 pure function
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// [1] 초기 상태(initialState) 정의
// - 역할: 컴포넌트 마운트 시 사용할 기본 상태 데이터 설정
//----------------------------------------------------------------------------------
const initialState = { rice: 10 };

//----------------------------------------------------------------------------------
// [2] cafeteriaReducer 리듀서 함수 (운영 매뉴얼)
// - 역할: 전달받은 action.type에 따라 상태 변경 방식을 결정
// - 원리: 기존 state를 직접 수정하지 않고 복사본(...state)을 만들어 새 객체 반환 (불변성)
//----------------------------------------------------------------------------------
function cafeteriaReducer(state, action) {
  switch (action.type) {
    case 'COOK_RICE':
      // 밥하기: 기존 밥 수량에 +10
      return { ...state, rice: state.rice + 10 };

    case 'SERVE_RICE':
      // 배식하기 예외 처리: 재고가 0 이하이면 상태 유지
      if (state.rice <= 0) {
        alert('밥이 부족합니다.');
        return state;
      }
      // 배식하기: 기존 밥 수량에서 -1
      return { ...state, rice: state.rice - 1 };

    default:
      // 알 수 없는 액션인 경우 기존 상태 유지
      return state;
  }
}

//----------------------------------------------------------------------------------
// [3] Cafeteria 메인 컴포넌트
// - 역할: useReducer 연결 및 UI 렌더링
//----------------------------------------------------------------------------------
export default function Cafeteria() {
  // useReducer 연결: [현재상태, 요청함수] = useReducer(리듀서함수, 초기값)
  const [state, dispatch] = useReducer(cafeteriaReducer, initialState);

  return (
    <div className="space-y-4">
      {/* -------------------------------------------------------------------------- */}
      {/* [4] UI 화면 구성 및 dispatch 연결                                          */}
      {/* - dispatch({ type: '...' }): 버튼 클릭 시 해당 액션을 리듀서로 보냄           */}
      {/* -------------------------------------------------------------------------- */}
      <div className="stats shadow bg-base-200">
        <div className="stat">
          <div className="stat-title">현재 밥 재고</div>
          <div className="stat-value text-primary">{state.rice}</div>
          <div className="stat-desc">useReducer 상태값</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={() => dispatch({ type: 'COOK_RICE' })}>밥하기 +10</button>
        <button className="btn btn-outline" onClick={() => dispatch({ type: 'SERVE_RICE' })}>배식하기 -1</button>
      </div>
    </div>
  );
}
//----------------------------------------------------------------------------------
