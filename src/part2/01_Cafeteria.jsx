// 1.임포트하기
import React from 'react';
import { useReducer } from 'react';

// 2.초기 상태 만들기
const initialState = { rice:10 };

// 3.리듀서 함수(운영 매뉴얼) 만들기
function cafeteriaReducer(state, action){
  switch (action.type) {
    case 'COOK_RICE':
      return { ...state, rice: state.rice + 10 };

    case 'SERVE_RICE':
      if(state.rice <= 0){
        alert('밥이 부족합니다.');
        return state;
      }
      return { ...state, rice: state.rice - 1};

    default:
      return state;
  }
}

// 4. 컴포넌트 선언 및 useReducer 연결하기.
// 5. UI(화면 및 버튼)완성하기
export default function Cafeteria(){
  const [state, dispatch] = useReducer(cafeteriaReducer, initialState);

  return (
    <div>
      <p>현재 밥 재고: {state.rice}</p>
      <button onClick={() => dispatch({type:'COOK_RICE'})}>밥하기 +10</button>
      <button onClick={() => dispatch({type:'SERVE_RICE'})}>배식하기 -1</button>
    </div>
  )
}
