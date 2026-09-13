// -------------------------------------------------------------------------------------
// [미션] 데이터 동기화를 해결한 프로 쇼핑 카트
// -------------------------------------------------------------------------------------
// - useReducer로 상품 목록, 총금액, 총수량을 함께 관리한다.
// - 상품 추가와 삭제에 필요한 데이터를 payload로 전달한다.
// - 하나의 action에서 관련된 상태를 동시에 변경한다.
// -------------------------------------------------------------------------------------
// - action : 어떤 일이 발생했는지 설명하는 객체
// - action.type : 실행할 상태 변경 규칙의 이름
// - action.payload : 상태 변경에 필요한 추가 데이터
// - dispatch : action을 reducer에 전달하는 함수
// - 불변성 : 기존 객체와 배열을 직접 수정하지 않고 새 값으로 반환하는 원칙
// - useReducer : 복잡한 상태 업데이트 로직을 컴포넌트 외부 함수(reducer)로 분리해 관리하는 Hook
// - React Hook : 클래스형 컴포넌트 없이 함수형 컴포넌트에서 상태와 생명주기 기능을 사용하게 해주는 특별한 함수
// - 과거 함수형 컴포넌트 : 상태 관리와 생명주기 메서드 사용이 불가능해 UI만 그리는 용도로 사용됨
// - 과거 클래스형 컴포넌트 : 과거에 상태 관리와 생명주기 메서드(componentDidMount 등)를 쓰기 위해 필수였던 컴포넌트 형태
// - 생명주기(Lifecycle) : 컴포넌트가 화면에 나타나고(마운트), 변경되고(업데이트), 사라지는(언마운트) 전체 과정
// - useEffect : 함수형 컴포넌트에서 클래스형의 3대 생명주기 기능을 대체하여 부수 효과를 처리하는 Hook
// - 의존성 배열 : useEffect의 두 번째 인자로, 배열 안의 값이 변할 때만 효과를 재실행하도록 지정하는 배열
// - 빈 의존성 배열([]) : 컴포넌트가 화면에 처음 나타날 때(마운트) 딱 한 번만 로직을 실행하겠다는 의미
// - clean-up 함수 : useEffect 내부에서 return하는 함수로, 컴포넌트가 사라질 때(언마운트) 뒷정리를 하는 역할
// -------------------------------------------------------------------------------------
import { useReducer } from "react";

// [1]초기상태
const initialState = { items:[], totalPrice:0, totalQty:0}

// [2]장바구니 Reducer
function cartReducer(state,action){
  switch (action.type){
    // ---------------------------------------------------------------------------------
    // [상품 추가]
    // - payload로 전달받은 상품을 새로운 items 배열에 추가한다.
    // - 상품 목록, 총금액, 총수량을 하나의 return에서 함께 변경한다.
    // ---------------------------------------------------------------------------------
    case "ADD_ITEM":
      return{
        ...state,
        items:[...state.items,action.payload],
        totalPrice:state.totalPrice + action.payload.price,
        totalQty:state.totalQty + 1
      }
    // ---------------------------------------------------------------------------------
    // [상품 삭제]
    // - payload.id와 같은 상품을 찾는다.
    // - filter로 해당 상품을 제외한 새로운 배열을 만든다.
    // - 삭제한 상품 가격과 수량을 함께 차감한다.
    // ---------------------------------------------------------------------------------
    case "REMOVE_ITEM":{
      const targetItem = state.items.find(item => item.id === action.payload.id);
      if(!targetItem) return state;
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      return{
        ...state,
        items:newItems,
        totalPrice:state.totalPrice - targetItem.price,
        totalQty: state.totalQty - 1
      };
    }

    default:
      return state;
  }
}

// [3]ShoppingCart 컴포넌트
export default function ShoppingCart(){
  // - useReducer 1번째 인자 (reducer) : action에 따라 상태를 어떻게 바꿀지 정의한 함수
  // - useReducer 2번째 인자 (initialState) : 컴포넌트가 처음 렌더링될 때 가질 시작 상태 값
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function handleAddProduct(){
    const productList = [
      { name:"사과",price:2000 },
      { name:"포도",price:5000 },
      { name:"당근",price:1500 }
    ];

    // - Math.random() : 0 이상 1 미만의 난수(무작위 실수)를 생성하는 함수 (예: 0.1234, 0.8976)
    // - Math.floor() : 소수점 이하를 내림하여 가장 가까운 정수로 만들어주는 함수 (예: 3.9 -> 3)
    const randomIndex = Math.floor( Math.random() * productList.length );

    const selectedProduct = productList[randomIndex];

    const newItem = { ...selectedProduct, id: Date.now()};

    dispatch( { type:"ADD_ITEM", payload: newItem } );
  }

  return(
    <section>
      <h2>쇼핑카트</h2>
      <button onClick={handleAddProduct}>랜덤 상품 추가하기</button>
      <ul>
        {state.items.map(item =>
          <li key={item.id}>
            <span>{item.name} ({item.price.toLocaleString()}원)</span>
            <button onClick={() => dispatch({type:"REMOVE_ITEM", payload: {id:item.id}})}>삭제</button>
          </li>
        )}
      </ul>
      <p>총 수량:{state.totalQty}개</p>
      <p>총 결제 금액: {state.totalPrice.toLocaleString()}원</p>
    </section>
  );
}
// -------------------------------------------------------------------------------------
// [동작 흐름]
// -------------------------------------------------------------------------------------
// 상품 추가버튼 클릭
// handleAddProduct 실행
// 새 상품 객체 생성
// dispatch({type:"ADD_ITEM", payload: newItem})
// cartReducer가 ADD_ITEM 규칙 실행
// 목록, 총금액, 총수량을 함께 변경
// ShoppingCart 컴포넌트 리렌더링
// -------------------------------------------------------------------------------------
// 삭제 버튼 클릭
// 삭제할 상품 id를 payload에 넣어 dispatch
// find로 삭제할 상품과 가격을 찾고 filter로 삭제된 상품을 제외한 새 배열 생성
// 목록 , 총금액, 총수량을 함께 변경
// ShoppingCart 컴포넌트 리렌더링
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [마무리 정리]
// -------------------------------------------------------------------------------------
// - action.type은 어떤 상태 변경을 실행할지 알려준다.
// - action.payload는 상태 변경에 필요한 데이터를 전달한다.
// - find()는 조건에 맞는 첫 번째 요소를 찾는다.
// - filter()는 조건에 맞는 요소들로 새로운 배열을 만든다.
// - ...state는 기존 상태 객체를 복사한다.
// - ...state.items는 기존 상품들을 새로운 배열에 복사한다.
// - reducer에서 관련 상태를 함께 변경하면 데이터 불일치를 줄일 수 있다.
// -------------------------------------------------------------------------------------
// - state.items.map() : 배열의 각 요소를 순회하며 JSX(HTML 형태의 코드)로 변환해 화면에 목록을 렌더링하는 함수
// - key 속성 : React가 리스트의 어떤 아이템이 변경, 추가, 삭제되었는지 식별하여 효율적으로 화면을 갱신하게 돕는 고유 식별자
// - Date.now() : 1970년 1월 1일 이후 현재까지 경과한 시간을 밀리초(ms) 단위 숫자로 반환하여 고유한 ID 생성에 자주 쓰이는 함수
// - state.items.find() : 배열 안에서 조건에 만족하는 '첫 번째 요소 자체'를 찾아 반환하며, 존재하지 않으면 undefined를 반환하는 함수
// - ...state (전개 연산자) : 기존 객체의 모든 프로퍼티를 그대로 복사하여 새로운 객체를 만들 때 사용하는 문법
// - switch/default문 : 전달받은 action.type이 어떤 case에도 해당하지 않을 때, 현재 상태(state)를 그대로 유지하여 반환하는 안전장치
// -------------------------------------------------------------------------------------
// 왜 하필 1970년 1월 1일이 기준이지?
// - 1970년대 초 유닉스(Unix) 개발자들이 시간 계산을 편하게 하려고 임의로 정한 '컴퓨터 전용 시간의 시작점(Unix Epoch)'
// - Epoch : 역사나 시간 계산에서 새롭게 시작되는 '기준점' 또는 '새로운 시대의 시작'을 뜻하는 단어
