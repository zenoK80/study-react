// 1단계: 기본 구조 및 초기 상태(initialState) 설계하기
import { useReducer } from 'react';
const initialState = {
  items: [],
  totalQty: 0,
  totalPrice: 0
};

// 2단계: ADD_ITEM (상품 추가) 리듀서 로직 작성하기
// 3단계: REMOVE_ITEM (상품 삭제) 리듀서 로직 작성하기
function cartReducer(state, action){
  switch (action.type){
    case 'ADD_ITEM':{
      const newItem = action.payload;
      return {
        ...state,
        items: [...state.items, newItem],
        totalQty: state.totalQty + 1,
        totalPrice: state.totalPrice + newItem.price
      };
    }
    case 'REMOVE_ITEM':{
      const idToRemove = action.payload;
      const itemToRemove = state.items.find(item => item.id === idToRemove);
      if (!itemToRemove) return state;
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

// 4단계: UI 구성 및 dispatch 연결하기 (ShoppingCart.jsx), 리듀서 사용할 컴포넌트 만들기
export default function ShoppingCart(){
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const handleAddItem = () => {
    const sampleProducts = [
      { name:'사과', price: 2000},
      { name:'포토', price: 5000},
      { name:'바나나', price: 3000},
      { name:'귤', price: 1500}
    ];

    const randomProduct = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];

    const newItem = {
      id: Date.now(),
      ...randomProduct
    };

    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

  return (
    <div>
      <button onClick={handleAddItem}>랜덤 상품 추가</button>
      <ul>
        {
          state.items.length === 0 ?
          (<li>장바구니가 비었습니다.</li>):
          (state.items.map(item =>(
            <li key={item.id}>
              <span>{item.name} ({item.price.toLocaleString()}원)</span>
              <button onClick={()=> dispatch({ type: 'REMOVE_ITEM', payload: item.id})}>삭제</button>
            </li>
          )))
        }
      </ul>
      <hr/>

      <div>
        <p>총 수량: {state.totalQty}개</p>
        <p>총 결제 금액: {state.totalPrice.toLocaleString()}</p>
      </div>
    </div>
  )
}

// 5단계: App.jsx에 연결하고 테스트하기
