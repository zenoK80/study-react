// -------------------------------------------------------------------------------------
// [미션] 비즈니스 규칙이 담긴 스마트 티켓 예매 시스템
// -------------------------------------------------------------------------------------
// - useReducer로 선택 좌석, 회원 등급, 결제 금액을 함께 관리한다.
// - 좌석은 최대 4개까지만 선택할 수 있다.
// - VIP 회원에게는 20% 할인을 적용한다.
// - action 타입을 상수로 만들어 오타를 방지한다.
// -------------------------------------------------------------------------------------
// 배우고자 하는 것:
// Guard Clause로 잘못된 상태 변경을 막는 방법
// reducer에서 복잡한 상태 변경 규칙을 관리하는 방법
// playload로 선택한 좌석 정보를 전달하는 방법
// UI와 상태 변경 로직을 분리하는 방법
// -------------------------------------------------------------------------------------
import { useReducer } from 'react';

// -------------------------------------------------------------------------------------
// [1] 액션타입
// -------------------------------------------------------------------------------------
const ACTION_TYPES = {
  TOGGLE_SEAT:"TOGGLE_SEAT",
  TOGGLE_VIP:"TOGGLE_VIP",
}

const SEAT_PRICE = 15000;
const seats = ["A1","A2","A3","A4","A5"];

const initialState = {
  selectedSeats: [],
  isVIP: false,
  totalAmount:0,
}
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [2] 결제 금액 계산 함수
// -------------------------------------------------------------------------------------
// - 선택된 좌석 수에 좌석 가격을 곱한다.
// - VIP 회원이면 계산된 금액의 80%만 받는다.
// -------------------------------------------------------------------------------------
function calculateTotal(selectedSeats,isVIP){
  const originalAmount = selectedSeats.length * SEAT_PRICE;
  return isVIP ? originalAmount * 0.8 : originalAmount;
}
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [3] 티켓 예매 reducer
// -------------------------------------------------------------------------------------
// - TOGGLE_SEAT: 좌석을 선택하거나 취소한다.
// - TOGGLE_VIP : 일반 회원 <-> VIP 회원
// -------------------------------------------------------------------------------------
function ticketReducer(state,action){
  switch(action.type){
    case ACTION_TYPES.TOGGLE_SEAT:{
      const seat = action.payload;
      const isSelected = state.selectedSeats.includes(seat);
      if(!isSelected && state.selectedSeats.length >= 4){
        alert("좌석은 4개까지 가능합니다.");
        return state;
      }
      const nextSeats = isSelected ? state.selectedSeats.filter(selectedSeat => selectedSeat !== seat) : [...state.selectedSeats, seat];
      return {...state,selectedSeats:nextSeats,totalAmount:calculateTotal(nextSeats,state.isVIP)}
    };
    case ACTION_TYPES.TOGGLE_VIP:{
      const nextIsVIP = !state.isVIP;
      return{
        ...state,
        isVIP:nextIsVIP,
        totalAmount:calculateTotal(state.selectedSeats,nextIsVIP),
      }
    }
    default: return state;
  }
}
// -------------------------------------------------------------------------------------
export default function TicketBooking(){
  const [state,dispatch] = useReducer(ticketReducer,initialState);
  return(
    <section>
      <h2>티켓 예매 시스템</h2>
      <button onClick={()=>dispatch({type:ACTION_TYPES.TOGGLE_VIP})}>등급전환:{state.isVIP ? "VIP" : "일반"}</button>
      <h3>좌석 선택 (최대 4석)</h3>
      <div>
        {seats.map(seat=>{
          const isSelected = state.selectedSeats.includes(seat);
          return(
            <button key={seat} onClick={()=>dispatch({type:ACTION_TYPES.TOGGLE_SEAT,payload:seat})}>
              {seat} {isSelected && "선택됨"}
            </button>
          )
        })}
      </div>

      <p>선택된 좌석: {state.selectedSeats.length > 0 ? state.selectedSeats.join(",") : "없음"}</p>
      <p>사용자 등급: {state.isVIP ? "VIP (20% 할인)" : "일반"}</p>
      <p>최종 결제 금액: {state.totalAmount.toLocaleString("kr")}원</p>
    </section>
  )
}

// -------------------------------------------------------------------------------------
// [마무리 정리]
// -------------------------------------------------------------------------------------
// - Guard Clause는 잘못된 조건이면 현재 상태를 반환하여 변경을 막는다.
// - includes()는 배열에 특정 값이 들어 있는지 검사한다.
// - filter()는 선택을 취소한 좌석을 제외한 새 배열을 만든다.
// - 전개 연산자는 기존 좌석 배열에 새로운 좌석을 추가한다.
// - action 상수를 사용하면 액션 이름의 오타를 줄일 수 있다.
// - reducer에 상태 변경 규칙을 모으면 컴포넌트는 dispatch에 집중할 수 있다.
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [용어 정리]
// -------------------------------------------------------------------------------------
// - Guard Clause: 잘못된 조건을 먼저 검사하고 함수를 즉시 종료하는 방어 코드
// - includes(): 배열 안에 특정 값이 있는지 확인하여 true 또는 false를 반환하는 메서드
// - filter(): 조건에 맞는 요소만 모아 새로운 배열을 만드는 메서드
// - 전개 연산자(...): 기존 배열이나 객체의 값을 펼쳐서 새로운 배열이나 객체에 복사하는 문법
// - action 상수: action.type에 사용할 문자열을 미리 변수로 정의한 것
// - reducer: 현재 state와 action을 받아 새로운 state를 반환하는 함수
// - dispatch: 실행할 action을 reducer에 전달하는 함수
// - payload: 상태 변경에 필요한 추가 데이터를 action에 담아 전달하는 속성
// -------------------------------------------------------------------------------------

