/*
 * 📘 React 기본 문법 정리 – Props와 Children, List 렌더링
 * 각 코드 블록은 수업 예제 순서대로 정리되었습니다.
 * 작성자: (예: Chulsoo)
 */

// ------------------------------------------------------
// 1️⃣ 기본 props 전달 – 부모 → 자식
// ------------------------------------------------------
function Child({ user }) {
  return <h2>Welcome, {user}</h2>;
}

function Parent() {
  return <Child user="Chulsoo" />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Parent />);
// 결과: <h2>Welcome, Chulsoo</h2>
// → 부모 컴포넌트가 props로 문자열을 전달하고, 자식이 표시함.


// ------------------------------------------------------
// 2️⃣ 여러 개의 props 전달 – 객체에서 구조 분해
// ------------------------------------------------------
function Profile({ name, age }) {
  return <p>{name}님의 나이는 {age}살입니다.</p>;
}

function Parent() {
  const user = { name: "Chulsoo", age: 20 };
  return <Profile name={user.name} age={user.age} />;
}

root.render(<Parent />);
// 결과: <p>Chulsoo님의 나이는 20살입니다.</p>
// → props를 객체에서 꺼내 구조분해할당으로 전달.


// ------------------------------------------------------
// 3️⃣ children 기본 개념 – 태그 안의 내용을 전달
// ------------------------------------------------------
// HTML 태그 안에도 자식이 들어가듯이, 컴포넌트에도 children이 들어올 수 있음.
<div>HTML 태그 안의 내용</div>

function Box({ children }) {
  return <div>{children}</div>;
}

// Box 안의 내용이 children으로 전달됨
root.render(
  <Box>
    <h1>Child1</h1>
    <h1>Child2</h1>
    <h1>Child3</h1>
  </Box>
);
// 결과: <div><h1>Child1</h1><h1>Child2</h1><h1>Child3</h1></div>


// ------------------------------------------------------
// 4️⃣ children + className 활용 – Panel 컴포넌트
// ------------------------------------------------------
function Panel({ children }) {
  return <div className="panel">{children}</div>;
}

root.render(
  <Panel>
    <p>공지사항입니다.</p>
    <button>확인</button>
  </Panel>
);
// 결과: <div class="panel"><p>공지사항입니다.</p><button>확인</button></div>


// ------------------------------------------------------
// 5️⃣ children으로 여러 엘리먼트를 감싸는 Card 컴포넌트
// ------------------------------------------------------
function Card({ children }) {
  return <div className="card">{children}</div>;
}

root.render(
  <Card>
    <h3>React 공부하기</h3>
    <ul>
      <li>단방향 데이터 흐름</li>
      <li>children</li>
      <li>key</li>
    </ul>
  </Card>
);
// → children으로 전달된 JSX 전체를 감싸서 카드 형태로 표현.


// ------------------------------------------------------
// 6️⃣ 배열 렌더링 – map() 사용
// ------------------------------------------------------
const messages = ["안녕하세요", "오늘도 화이팅", "React 공부 중입니다"];

function MessagePanel() {
  return (
    <Panel>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </Panel>
  );
}

root.render(<MessagePanel />);
// → 배열의 각 요소를 JSX로 변환하여 렌더링.
//   key는 React가 각 항목을 식별할 수 있도록 하는 고유값.


// ------------------------------------------------------
// 7️⃣ 단순 리스트 렌더링 – key에 index 사용
// ------------------------------------------------------
const items = ["사과", "바나나", "체리"];

function ItemList() {
  return (
    <ul>
      {items.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

root.render(<ItemList />);
// → 단순한 배열일 때 index를 key로 사용 가능 (단, 재정렬 시엔 비추천)


// ------------------------------------------------------
// 8️⃣ 고유 key로 리스트 렌더링 – uuid 활용
// ------------------------------------------------------
import { v4 as uuidv4 } from 'uuid';

const users = [
  { id: uuidv4(), name: "Kim" },
  { id: uuidv4(), name: "Lee" },
  { id: uuidv4(), name: "Park" }
];

function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

root.render(<UserList />);
// → key에는 uuid 등 고유값 사용이 가장 이상적.


// ------------------------------------------------------
// 9️⃣ 조건부 렌더링 + filter() + map() – 특정 상품만 출력
// ------------------------------------------------------
import { v4 as uuidv4 } from 'uuid';

const products = [
  { id: uuidv4(), name: "Keyboard", price: 30000 },
  { id: uuidv4(), name: "Mouse", price: 15000 },
  { id: uuidv4(), name: "Monitor", price: 220000 }
];

function CheapProductList() {
  const cheap = products.filter(p => p.price < 50000);
  return (
    <ul>
      {cheap.map(p => (
        <li key={p.id}>
          {p.name} – {p.price.toLocaleString()}원
        </li>
      ))}
    </ul>
  );
}

root.render(<CheapProductList />);
// → filter()로 조건을 걸고, map()으로 반복 렌더링.
//   숫자는 toLocaleString()으로 천 단위 콤마 표시.
