// ------------------------------------------------------------------------------------------
// [JSX 문법과 트랜스파일 이해]
// https://zeno.it.kr/react/react_1/02_jsx-as-javascript
// ------------------------------------------------------------------------------------------
import { createElement } from "react";

// ------------------------------------------------------------------------------------------
// [A] JSX와 createElement() 비교
// ------------------------------------------------------------------------------------------
// 내용: 같은 제목을 두 가지 방식으로 만든다.
// - createElement는 React가 제공하는 함수다.
// - createElement(태그, 속성 객체, 자식 내용) 형태로 사용한다.
// - JSX는 빌드 도구가 JavaScript 코드로 변환한다.
// - 현대 JSX 변환은 보통 jsx/jsxs 함수를 사용한다.
//   여기서는 createElement와 비교하여 같은 화면을 표현할 수 있음을 확인한다.
// 결과: 같은 모양의 제목이 두 번 나타난다.
// ------------------------------------------------------------------------------------------
function CompareJsx(){
  const jsxTitle = <h4 className="font-bold">안녕하세요</h4>;
  const jsTitle = createElement("h4",{className:"font-bold"},"안녕하세요");

  return(
    <div>
      {jsxTitle}
      {jsTitle}
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// [B] JSX를 변수에 저장하기
// ------------------------------------------------------------------------------------------
// 내용: JSX를 변수에 저장한 뒤 다른 JSX 안에 넣는다.
// - title에는 문자열이 아니라 React 엘리먼트가 들어간다.
// - React 엘리먼트는 화면에 무엇을 보여줄지 설명하는 객체다.
// - 실제 DOM 요소 자체는 아니다.
// 결과: 상품 목록이라는 제목과 설명이 나타난다.
// ------------------------------------------------------------------------------------------
function JsxVariable(){
  const title = <h4 className="font-bold">상품 목록</h4>;
  const description = <p>키보드와 마우스를 판매합니다.</p>;

  Return(
    <div>
      {title}
      {description}
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// [C] {} 안에서 JavaScript 표현식 사용하기
// ------------------------------------------------------------------------------------------
// 내용: 변수, 계산식, 함수 호출의 결과를 화면에 표시한다.
// - 표현식: 값을 만들어내는 코드. 예: name, price * quantity, getMessage()
// - JSX의 {}는 JavaScript 표현식을 넣는 자리다.
// - toLocaleString("ko-KR"): 숫자를 한국어 기준의 문자열로 바꾼다.
// 결과: Keyboard / 35,000원 / 2개 / 70,000원이 나타난다.
// ------------------------------------------------------------------------------------------
function JsxExpressions(){
  const name = "Keyboard";
  const price = 35000;
  const quantity = 2;

  function getMessage(){
    return "주문 가능한 상품입니다.";
  }

  return(
    <div>
      <p>상품: {name}</p>
      <p>가격: {price.toLocaleString("ko-KR")}원</p>
      <p>수량: {quantity}개</p>
      <p>합계: {(price * quantity).toLocaleString("ko-KR")}원</p>
      <p>{getMessage()}</p>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// [D] if문과 삼항 연산자 비교
// ------------------------------------------------------------------------------------------
// 내용: 같은 조건을 if문과 삼항 연산자로 각각 처리한다.
// - if문은 JSX의 {} 안에 직접 넣을 수 없다.
// - if문은 return 위에서 실행하고, 결과를 변수에 저장해서 사용한다.
// - 삼항 연산자는 값을 만드는 표현식이므로 {} 안에 넣을 수 있다.
// 결과: isSoldOut이 false면 두 줄 모두 구매 가능으로 표시된다.
// 실습: isSoldOut을 true로 바꾸고 저장해 본다.
// ------------------------------------------------------------------------------------------
function ExpressionAndStatement(){
  const isSoldOut = false;
  let message;
  if(isSoldOut){
    message ="품절";
  }else{
    message="구매가능";
  }

  return(
    <div>
      <p>if문 결과: {message}</p>
      <p>삼항 연산자 결과: {isSoldOut ? "품절" : "구매 가능"}</p>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// [E] JSX 속성과 작성 규칙
// ------------------------------------------------------------------------------------------
// 내용: className, htmlFor, style, 닫는 태그를 작성한다.
// - className: HTML의 class에 해당한다.
// - htmlFor: label을 해당 id의 입력 요소와 연결한다.
// - style에는 문자열 대신 JavaScript 객체를 전달한다.
// - style={{ ... }}에서 바깥 {}는 표현식 자리, 안쪽 {}는 객체다.
// - backgroundColor처럼 CSS 속성 이름을 camelCase로 작성한다.
// - input, br처럼 자식이 없는 태그도 />로 닫는다.
// 결과: 이름 입력창과 배경색이 있는 문장이 나타난다.
// ------------------------------------------------------------------------------------------
function JsxAttributes(){
  return(
    <div className='space-y-3'>
      <label className="block font-bold" htmlFor="jsx-name">이름</label>
      <input id="jsx-name" clasName="input input-bordered w-full" defaultValue="Zeno"></input>
      <p style={{ backgroundColor: "#d1fae5", color: "#064e3b", padding: 12 }}></p>
      {/* JSX 안의 주석 */}
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// [F] div와 Fragment 비교
// ------------------------------------------------------------------------------------------
// 내용: 여러 요소를 div 또는 Fragment로 묶어서 반환한다.
// - <>...</>는 Fragment의 짧은 문법이다.
// - div는 실제 DOM 요소가 생긴다.
// - Fragment는 묶는 역할만 하고 별도의 DOM 요소를 만들지 않는다.
// 실습: 개발자 도구의 Elements에서 두 결과의 DOM 구조를 비교한다.
// ------------------------------------------------------------------------------------------
function WithDiv(){
  return (
    <div>
      <p>div로 묶은 첫 번째 문장</p>
      <p>div로 묶은 두 번째 문장</p>
    </div>
  );
}

function WithFragment(){
  return (
    <>
      <p>Fragment로 묶은 첫 번째 문장</p>
      <p>Fragment로 묶은 두 번째 문장</p>
    </>
  );
}

// ------------------------------------------------------------------------------------------
// [G] HTML처럼 생긴 문자열 출력
// ------------------------------------------------------------------------------------------
// 내용: 문자열과 실제 JSX 태그가 어떻게 다르게 표시되는지 확인한다.
// - {}에 넣은 문자열은 텍스트로 표시된다.
// - 문자열 안에 태그가 있어도 HTML로 해석해서 실행하지 않는다.
// 결과: 첫 줄에는 <strong> 태그 글자까지 보이고, 둘째 줄은 굵게 표시된다.
// ------------------------------------------------------------------------------------------
function TextAndJsx(){
  const text = "<strong>안녕하세요</strong>";

  return (
    <div>
      <p>{text}</p>
      <p><strong>안녕하세요</strong></p>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// [실습 화면 조립]
// ------------------------------------------------------------------------------------------
export default function JsxAsJavaScript(){
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-bold mb-3">A. JSX와 createElement</h3>
        <CompareJsx />
      </section>
      <hr />

      <section>
        <h3 className="text-xl font-bold mb-3">B. JSX를 변수에 저장</h3>
        <JsxVariable />
      </section>
      <hr />

      <section>
        <h3 className="text-xl font-bold mb-3">C. JavaScript 표현식</h3>
        <JsxExpressions />
      </section>
      <hr />

      <section>
        <h3 className="text-xl font-bold mb-3">D. 문장과 표현식</h3>
        <ExpressionAndStatement />
      </section>
      <hr />

      <section>
        <h3 className="text-xl font-bold mb-3">E. JSX 작성 규칙</h3>
        <JsxAttributes />
      </section>
      <hr />

      <section>
        <h3 className="text-xl font-bold mb-3">F. div와 Fragment</h3>
        <WithDiv />
        <WithFragment />
      </section>
      <hr />

      <section>
        <h3 className="text-xl font-bold mb-3">G. 문자열과 JSX</h3>
        <TextAndJsx />
      </section>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
// [마무리 정리]
// ------------------------------------------------------------------------------------------
// - JSX는 JavaScript 문법 확장이며, 브라우저 실행 전에 변환된다.
// - JSX로 만든 React 엘리먼트는 화면을 설명하는 객체다.
// - JSX의 {} 안에는 변수, 계산식, 함수 호출 같은 표현식을 넣는다.
// - if문은 {} 안에 직접 넣지 않고 JSX 바깥에서 사용한다.
// - Fragment는 추가 DOM 요소 없이 여러 요소를 묶는다.
// - {}에 넣은 문자열은 HTML이 아니라 텍스트로 표시된다.
// ------------------------------------------------------------------------------------------
