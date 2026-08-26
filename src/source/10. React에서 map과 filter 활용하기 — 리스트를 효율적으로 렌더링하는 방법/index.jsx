/*
 * 📘 React 배열 렌더링 실습 – filter()와 map() 완전 정복
 * 주제: 배열 데이터를 조건에 맞게 필터링하고, JSX로 렌더링하기
 * 작성자: (예: Chulsoo)
 * ------------------------------------------------------------
 * filter()  → 조건에 맞는 데이터만 추려냄
 * map()     → 각 항목을 새로운 형태로 변환 (JSX 생성)
 */

// ------------------------------------------------------
// 1️⃣ 기본 JavaScript 예제: filter() + map() 동작 이해
// ------------------------------------------------------
const fruits = [
  { name: "사과", price: 1200 },
  { name: "바나나", price: 800 },
  { name: "체리", price: 2500 }
];

// filter: 조건에 맞는 값만 추려냄 (가격이 2000원 미만)
const cheapFruits = fruits.filter(fruit => fruit.price < 2000);

// map: 각 항목을 새로운 형태(이름만)로 변환
const fruitNames = cheapFruits.map(fruit => fruit.name);

console.log(cheapFruits);
// 결과: [{ name: "사과", price: 1200 }, { name: "바나나", price: 800 }]

console.log(fruitNames);
// 결과: ["사과", "바나나"]
// → filter로 조건에 맞는 배열을 만든 후, map으로 원하는 형태만 추출


// ------------------------------------------------------
// 2️⃣ React에서 map()을 이용해 리스트 렌더링하기
// ------------------------------------------------------
const fruits2 = ["사과", "바나나", "체리"];

function FruitList() {
  return (
    <ul>
      {fruits2.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FruitList />);
// → 배열의 각 요소를 <li>로 감싸 렌더링
// → key 속성은 React가 각 항목을 구분하는 식별자 역할을 함


// ------------------------------------------------------
// 3️⃣ map() 문법 주의사항 – return 생략 시 주의
// ------------------------------------------------------

// ✅ 올바른 예시 (표현식 바로 반환)
{
  fruits2.map(fruit => <li>{fruit}</li>);
}

// ❌ 잘못된 예시 (블록 {} 사용 시 return 생략하면 오류)
{
  fruits2.map(fruit => {
    <li>{fruit}</li>;
  });
}
// → 블록을 사용했다면 반드시 return을 명시해야 함!
//   return이 없으면 map이 undefined를 반환하므로 화면에 아무것도 안 나옴.


// ------------------------------------------------------
// 4️⃣ return 명시 버전 (블록 문법을 쓸 때 올바른 형태)
// ------------------------------------------------------
{
  fruits2.map(fruit => {
    return <li>{fruit}</li>;
  });
}
// → 블록({})을 쓰면 반드시 return을 명시해야 한다는 점을 강조!


// ------------------------------------------------------
// 5️⃣ 응용: filter() + map() 함께 사용하여 조건부 렌더링
// ------------------------------------------------------
const products = [
  { id: 1, name: "Keyboard", price: 30000 },
  { id: 2, name: "Mouse", price: 15000 },
  { id: 3, name: "Monitor", price: 220000 }
];

function CheapProducts() {
  return (
    <ul>
      {products
        // 2만원 미만인 제품만 필터링
        .filter(p => p.price < 20000)
        // 필터된 제품을 li 태그로 변환
        .map(p => (
          <li key={p.id}>
            {p.name} – {p.price.toLocaleString()}원
          </li>
        ))}
    </ul>
  );
}

root.render(<CheapProducts />);
// 결과: 
// <ul>
//   <li>Mouse – 15,000원</li>
// </ul>
// → filter로 걸러낸 뒤 map으로 JSX 생성.
//   toLocaleString()으로 숫자를 1,000 단위로 보기 좋게 표시.
