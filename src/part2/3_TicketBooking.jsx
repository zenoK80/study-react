// 1단계: 액션 타입 상수화 및 초기 상태 정의
import { useReducer } from 'react';

// 1-1. 액션 타입 상수화
const ACTION_TYPES = {
  TOGGLE_SEAT: 'TOGGLE_SEAT',
  TOGGLE_VIP: 'TOGGLE_VIP'
};

// 1-2. 기본 설정값
const SEAT_PRICE = 15000;

// 1-3. 초기상태
const initialState = {
  // 선택된 좌석 번호 배열 예: ['A1', 'A2']
  selectedSeats: [],
  // VIP 등급 여부
  isVip: false,
  // 최종 결제 금액
  totalAmount: 0
}

// 2단계: TOGGLE_SEAT (좌석 선택/취소) 리듀서 로직 작성하기
// 3단계: TOGGLE_VIP (VIP 등급 전환) 작성하기

// 2-1. 계산을 도와주는 보조 함수 (VIP 20% 할인율 적용 -> 0.8)
function calculateTotal(seats, isVip) {
  const basePrice = seats.length * SEAT_PRICE;
  return isVip ? basePrice * 0.8 : basePrice; // [수정] 0.7 -> 0.8
}

// 2-2. 리듀서 함수 작성
function bookingReducer(state, action){
  switch(action.type){
    case ACTION_TYPES.TOGGLE_SEAT:{
      const seatNumber = action.payload;
      // [수정] SelectedSeats -> selectedSeats (대소문자 오타)
      const isAlreadySelected = state.selectedSeats.includes(seatNumber);

      let updatedSeats;

      if(isAlreadySelected){
        updatedSeats = state.selectedSeats.filter(seat => seat !== seatNumber);
      }else{
        if(state.selectedSeats.length >=4){
          alert('1인당 최대 4좌석까지만 예매 가능합니다');
          return state;
        }
        updatedSeats = [...state.selectedSeats, seatNumber];
      }

      return{
        ...state,
        selectedSeats: updatedSeats,
        totalAmount: calculateTotal(updatedSeats, state.isVip)
      };
    }

    case ACTION_TYPES.TOGGLE_VIP:{
      const updatedVip = !state.isVip;
      return{
        ...state,
        isVip: updatedVip,
        totalAmount: calculateTotal(state.selectedSeats, updatedVip)
      }
    }
    default:
      return state;
  }
}

// 4단계: UI 구성 및 dispatch 연결하기
export default function TicketBooking(){
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const seats = ['A1', 'A2', 'A3', 'A4', 'A5'];

  return(
    <div>
      <button onClick={()=> dispatch({type:ACTION_TYPES.TOGGLE_VIP})}>
        등급 전환 (현재: {state.isVip ? 'VIP' : '일반'})
      </button>

      <div>
        {seats.map(seat => {
          // [수정] SelectedSeats -> selectedSeats (대소문자 오타)
          const isSelected = state.selectedSeats.includes(seat);
          return (
            <button key={seat} onClick={() => dispatch({type:ACTION_TYPES.TOGGLE_SEAT, payload: seat})}>
              {seat}
            </button>
          )
        })}
      </div>

      <div>
        <p><strong>선택된 좌석:</strong> {state.selectedSeats.length > 0 ? state.selectedSeats.join(', ') : '없음'}</p>
        <p><strong>사용자 등급:</strong> {state.isVip ? 'VIP (20% 할인 적용 중)' : '일반'}</p>
        <h3>최종 결제 금액: {state.totalAmount.toLocaleString()}원</h3>
      </div>
    </div>
  )
}
