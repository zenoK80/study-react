//----------------------------------------------------------------------------------
// [미션] useReducer로 영화 예매 및 할인 시스템 구현하기 - 2026.08.29(토)
// [학습목표] 액션 타입 상수화 및 순수 보조 함수를 활용한 비즈니스 로직 계산 처리
//----------------------------------------------------------------------------------

import React, { useReducer } from 'react';

//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. ACTION_TYPES: 오타로 인한 버그 방지를 위해 액션 이름을 객체 상수로 관리
// 2. 보조 함수(calculateTotal): 가격 계산 로직을 분리해 리듀서 내부 가독성 향상
// 3. 토글(Toggle) 로직: 배열의 includes와 filter/전개 연산자로 선택/해제 교체
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// [1] 액션 타입 상수화 및 기본값 설정
//----------------------------------------------------------------------------------
const ACTION_TYPES = {
  TOGGLE_SEAT: 'TOGGLE_SEAT',
  TOGGLE_VIP: 'TOGGLE_VIP'
};

const SEAT_PRICE = 15000;

//----------------------------------------------------------------------------------
// [2] 초기 상태 정의
//----------------------------------------------------------------------------------
const initialState = {
  selectedSeats: [], // 선택된 좌석 목록 (예: ['A1', 'A2'])
  isVip: false,        // VIP 여부
  totalAmount: 0     // 최종 결제 금액
};

//----------------------------------------------------------------------------------
// [3] 결제 금액 계산 보조 함수 (VIP 20% 할인 적용 -> 0.8)
//----------------------------------------------------------------------------------
function calculateTotal(seats, isVip) {
  const basePrice = seats.length * SEAT_PRICE;
  return isVip ? basePrice * 0.8 : basePrice;
}

//----------------------------------------------------------------------------------
// [4] bookingReducer 리듀서 함수
//----------------------------------------------------------------------------------
function bookingReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.TOGGLE_SEAT: {
      const seatNumber = action.payload;
      const isAlreadySelected = state.selectedSeats.includes(seatNumber);

      let updatedSeats;

      if (isAlreadySelected) {
        // 이미 선택된 좌석이면 제거 (취소)
        updatedSeats = state.selectedSeats.filter(seat => seat !== seatNumber);
      } else {
        // 최대 4좌석 선택 제한 예외 처리
        if (state.selectedSeats.length >= 4) {
          alert('1인당 최대 4좌석까지만 예매 가능합니다');
          return state;
        }
        // 미선택 좌석이면 추가
        updatedSeats = [...state.selectedSeats, seatNumber];
      }

      return {
        ...state,
        selectedSeats: updatedSeats,
        totalAmount: calculateTotal(updatedSeats, state.isVip)
      };
    }

    case ACTION_TYPES.TOGGLE_VIP: {
      const updatedVip = !state.isVip;
      return {
        ...state,
        isVip: updatedVip,
        totalAmount: calculateTotal(state.selectedSeats, updatedVip)
      };
    }

    default:
      return state;
  }
}

//----------------------------------------------------------------------------------
// [5] TicketBooking 메인 컴포넌트
//----------------------------------------------------------------------------------
export default function TicketBooking() {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const seats = ['A1', 'A2', 'A3', 'A4', 'A5'];

  return (
    <div className="space-y-5">
      {/* VIP 등급 전환 버튼 */}
      <button className={state.isVip ? "btn btn-warning" : "btn btn-outline"} onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_VIP })}>
        등급 전환 (현재: {state.isVip ? 'VIP' : '일반'})
      </button>

      {/* 좌석 선택 버튼 리스트 */}
      <div className="flex flex-wrap gap-2">
        {seats.map(seat => {
          const isSelected = state.selectedSeats.includes(seat);
          return (
            <button
              key={seat}
              className={isSelected ? "btn btn-success" : "btn btn-outline"}
              onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_SEAT, payload: seat })}
            >
              {seat}
            </button>
          );
        })}
      </div>

      {/* 결제 정보 출력 영역 */}
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <p><strong>선택된 좌석:</strong> {state.selectedSeats.length > 0 ? state.selectedSeats.join(', ') : '없음'}</p>
          <p><strong>사용자 등급:</strong> {state.isVip ? 'VIP (20% 할인 적용 중)' : '일반'}</p>
          <h3 className="text-2xl font-bold">최종 결제 금액: {state.totalAmount.toLocaleString()}원</h3>
        </div>
      </div>
    </div>
  );
}
//----------------------------------------------------------------------------------
