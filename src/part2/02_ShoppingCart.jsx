//----------------------------------------------------------------------------------
// [미션] useReducer로 장바구니 불변성 관리하기 - 2026.08.29(토)
// [학습목표] 복합 객체/배열 상태의 불변성을 유지하며 추가/삭제 및 합계 자동 계산 구현
//----------------------------------------------------------------------------------

import React, { useReducer } from 'react';

//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 상태 불변성: 배열/객체 상태 변경 시 전개 연산자(...)를 사용해 새 참조 생성
// 2. payload: 액션 수행에 필요한 실제 데이터(상품 객체, ID 등)를 담아 보내는 화물
// 3. Array.prototype.find/filter: 원본 변경 없이 조건 검색 및 항목 제거 처리
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// [1] 초기 상태(initialState) 설계
// - 역할: 장바구니 품목 배열, 총 수량, 총 가격 데이터 관리
//----------------------------------------------------------------------------------
const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0
};

//----------------------------------------------------------------------------------
// [2] cartReducer 리듀서 함수
// - 역할: ADD_ITEM(추가), REMOVE_ITEM(삭제) 액션별 상태 업데이트 및 총액 계산
//----------------------------------------------------------------------------------
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload; // 전달받은 새 상품 객체
      return {
        ...state,
        items: [...state.items, newItem], // 새 배열 생성 (불변성 유지)
        totalQty: state.totalQty + 1,
        totalPrice: state.totalPrice + newItem.price
      };
    }
    case 'REMOVE_ITEM': {
      const idToRemove = action.payload; // 삭제할 상품의 ID
      const itemToRemove = state.items.find(item => item.id === idToRemove);

      // 예외 처리: 해당 상품이 없으면 상태 변경 없음
      if (!itemToRemove) return state;

      // 선택한 ID를 제외한 새 배열 생성
      const updatedItems = state.items.filter(item => item.id !== idToRemove);
      return {
        ...state,
        items: updatedItems,
        totalQty: state.totalQty - 1,
        totalPrice: state.totalPrice - itemToRemove.price
      };
    }
    default:
      return state;
  }
}

//----------------------------------------------------------------------------------
// [3] ShoppingCart 메인 컴포넌트
//----------------------------------------------------------------------------------
export default function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // [4] 랜덤 상품 추가 핸들러 함수
  const handleAddItem = () => {
    const sampleProducts = [
      { name: '사과', price: 2000 },
      { name: '포도', price: 5000 },
      { name: '바나나', price: 3000 },
      { name: '귤', price: 1500 }
    ];

    // 무작위 상품 선택 및 고유 ID(Date.now()) 부여
    const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
    const newItem = {
      id: Date.now(),
      ...randomProduct
    };

    // ADD_ITEM 액션 호출 (payload로 생성된 상품 객체 전달)
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  return (
    <div>
      {/* -------------------------------------------------------------------------- */}
      {/* [5] UI 구성 및 액션 바인딩                                                  */}
      {/* -------------------------------------------------------------------------- */}
      <button onClick={handleAddItem}>랜덤 상품 추가</button>

      <ul>
        {state.items.length === 0 ? (
          <li>장바구니가 비었습니다.</li>
        ) : (
          state.items.map(item => (
            <li key={item.id}>
              <span>{item.name} ({item.price.toLocaleString()}원)</span>
              <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                삭제
              </button>
            </li>
          ))
        )}
      </ul>

      <hr />

      <div>
        <p>총 수량: {state.totalQty}개</p>
        <p>총 결제 금액: {state.totalPrice.toLocaleString()}원</p>
      </div>
    </div>
  );
}
//----------------------------------------------------------------------------------
