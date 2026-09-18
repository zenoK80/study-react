// -------------------------------------------------------------------------------------
// [미션] map과 filter로 리스트 렌더링하기
// -------------------------------------------------------------------------------------
// 내용:
// - map으로 배열 데이터를 JSX 목록으로 변환한다.
// - filter로 조건에 맞는 항목만 선택한다.
// - 각 항목에 고유한 key를 지정한다.
// - 배열이 비어 있을 때 Empty UI를 출력한다.
//
// 배우고자 하는 것:
// - map과 filter
// - 화살표 함수의 즉시 반환과 블록 반환
// - React 리스트의 key
// - 빈 배열과 null/undefined 처리
// -------------------------------------------------------------------------------------

const fruits = ["사과","바나나","체리"];
const products = [
  { id: 1, name: "Keyboard", price: 30000 },
  { id: 2, name: "Mouse", price: 15000 },
  { id: 3, name: "Monitor", price: 220000 },
];

// -------------------------------------------------------------------------------------
// [1]
// -------------------------------------------------------------------------------------
// - items ?? []는 items가 null 또는 undefined이면 빈 배열을 사용한다.
// - map은 배열의 각 요소를 li JSX로 변환한다.
// -------------------------------------------------------------------------------------
function FruitLits({items}){
  const safeItems = items ?? [];
  if(safeItems.length === 0){
    return <p>표시할 과일이 없습니다.</p>
  }

  return(
    <ul>
      {safeItems.map(fruit =>(<li key={fruit}>{fruit}</li>))}
    </ul>
  )
}
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [2]
// -------------------------------------------------------------------------------------
function CheapProducts({items, max = 20000}){
  const safeItems = items ?? [];
  const cheapProducts = safeItems.filter(product=>{
    return product.price < max;
  });

  if(cheapProducts.length === 0){
    return <p>조건에 맞는 팡숨이 없습니다.</p>
  }

  return(
    <ul>
      {cheapProducts.map(product =>(<li key={product.id}>{product.name} - {product.price.toLocaleString()}원</li>))}
    </ul>
  )
}
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [3]
// -------------------------------------------------------------------------------------
function ReturnRuleDemo(){
  const immediateList = products.map(product => (<li key={`immediate-${product.id}`}>{product.name}</li>))
  const blockList = products.map(product => { return(<li key={`block-${product.id}`}>{product.name}</li>)})

  return(
    <section>
      <h3>즉시 반환</h3>
      <ul>{immediateList}</ul>
      <h3>블록과 return</h3>
      <ul>{blockList}</ul>
    </section>
  );
}
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [4] ProductSearch 컴포넌트
// -------------------------------------------------------------------------------------
// - 상품 이름에 query가 포함되고 maxPrice 이하인 상품만 선택한다.
// - toLowerCase()로 영문 대소문자를 무시한다.
// -------------------------------------------------------------------------------------
function ProductSearch({items,query,maxPrice}){
  const safeItems = items ?? [];
  const lowerQuery = query.toLowerCase();

  const result = safeItems.filter(product=>{
    const nameMatches = product.name.toLowerCase().includes(lowerQuery);
    const priceMatches = product.price <= maxPrice;
    return nameMatches && priceMatches;
  });

  if(result.length === 0){
    return <p>검색 결과가 없습니다.</p>
  }

  return(
    <ul>
      {result.map(product=>(<li key={product.id}>{product.name} - {product.price.toLocaleString()}원</li>))}
    </ul>
  )
}
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [5] 대표 컴포넌트
// -------------------------------------------------------------------------------------
export default function ListRenderingPractice(){
  return (
    <div>
      <h2>A. 과일 목록</h2>
      <FruitList items={fruits} />

      <h2>A. 빈 배열</h2>
      <FruitList items={[]} />

      <h2>B. 2만원 미만 상품</h2>
      <CheapProducts items={products} max={20000} />

      <h2>C. 반환 규칙 비교</h2>
      <ReturnRuleDemo />

      <h2>D. 다중 조건 필터</h2>
      <ProductSearch
        items={products}
        query="o"
        maxPrice={20000}
      />
    </div>
  );
}
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [용어 정리]
// -------------------------------------------------------------------------------------
// - map(): 배열의 각 요소를 다른 값으로 바꿔 새로운 배열을 만든다.
// - filter(): 조건이 true인 요소만 모아 새로운 배열을 만든다.
// - key: React가 각 리스트 항목을 구별할 때 사용하는 고유값이다.
// - includes(): 문자열이나 배열에 특정 값이 포함됐는지 검사한다.
// - toLocaleString(): 숫자를 천 단위 쉼표가 포함된 문자열로 변환한다.

// - JSX의 {}: JSX 안에서 JavaScript 값이나 표현식을 사용할 때 쓴다.
//   예: <p>{product.name}</p>

// - {product.name} - {product.price.toLocaleString()}원:
//   product.name과 변환된 price 사이에 "-" 문자를 출력한다.
//   뺄셈이 아니므로 계산되지 않는다.
//   예: Mouse - 15,000원

// - 뺄셈하려면 하나의 {} 안에서 - 연산자를 사용해야 한다.
//   예: <p>{product.price - discount}원</p>
//
// - ??: 왼쪽 값이 null 또는 undefined일 때만 오른쪽 값을 사용한다.
//   예: items ?? []

// - ||: 왼쪽 값이 falsy이면 오른쪽 값을 사용한다.
//   falsy: false, 0, "", null, undefined, NaN
//   예: value || "기본값"

// - ?.: 값이 null 또는 undefined일 수 있을 때 안전하게 속성에 접근한다.
//   값이 없으면 오류를 내지 않고 undefined를 반환한다.
//   예: product?.price

// - ??, ||, ?. 차이:
//   ??: null 또는 undefined일 때 기본값을 선택
//   ||: 왼쪽 값이 falsy일 때 기본값을 선택
//   ?.: null 또는 undefined일 수 있는 값의 속성에 안전하게 접근

// - const safeItems = items ?? [];:
//   items가 null 또는 undefined여도 빈 배열을 대신 사용하게 한다.
//   빈 배열에는 map()과 filter()를 사용할 수 있으므로 오류를 방지한다.

// - `${}`: 백틱(``)으로 만든 템플릿 리터럴 안에 JavaScript 값을 넣는 문법이다.
//   예: `${product.name} - ${product.price}원`

// - JSX의 {}와 템플릿 리터럴의 ${}는 서로 다른 문법이다.
//   JSX: <p>{product.name}</p>
//   JavaScript 문자열: `${product.name}입니다.`

// - JSX 안에서 템플릿 리터럴을 사용하면 바깥에 {}가 한 번 더 필요하다.
//   예: <p>{`${product.name} - ${product.price.toLocaleString()}원`}</p>
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// [마무리 정리]
// -------------------------------------------------------------------------------------
// - 배열을 화면에 출력할 때 map으로 JSX 배열을 만든다.
// - 조건에 맞는 데이터만 출력할 때 filter와 map을 연결한다.
// - key에는 가능하면 index가 아닌 고유한 id를 사용한다.
// - 배열이 비어 있을 때는 별도의 안내 화면을 출력할 수 있다.
// -------------------------------------------------------------------------------------
