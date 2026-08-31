//----------------------------------------------------------------------------------
// [미션] map과 filter로 리스트를 효율적으로 렌더링하기 - 2026.08.29(토)
// [학습목표] 배열의 map/filter 체이닝, 안정적인 key 부여, 빈 데이터(Empty UI) 처리 학습
//----------------------------------------------------------------------------------

import React from 'react';

//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. map & filter: filter로 조건 선별 후 map으로 JSX 요소 변환 (체이닝)
// 2. 고유 key: React Virtual DOM이 변경점을 효율적으로 추적하기 위한 고유 식별자(id)
// 3. 무결성 & Empty UI: 옵셔널 체이닝(?.)과 삼항 연산자로 데이터 부재 시 예외 처리
// 4. 화살표 함수 반환: 즉시 반환 () 과 블록 반환 { return ... } 문법 차이
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// [1] ListRendering 메인 컴포넌트
// - 역할: 조건별 데이터 렌더링 실습(과일 목록, 가격 필터, 반환 규칙, 다중 조건)
// - 원리: 원본 배열을 가공하여 조건에 맞는 JSX 리스트(<ol>/<ul>)로 반환
//----------------------------------------------------------------------------------
export default function ListRendering(){
  // 1단계 - 과일 목록 배열 정의
  const fruits = ['사과','바나나','체리'];
  const emptyFruits = [];

  // 2단계 - 상품 목록 배열 정의
  const products = [
    { id: 1, name: 'Mouse', price: 15000 },
    { id: 2, name: 'Keyboard', price: 35000 },
    { id: 3, name: 'Monitor', price: 200000 }
  ];

  // 4단계 - 다중 조건 필터용 검색 조건
  const searchQuery = "o"; // 검색어 (알파벳 'o')
  const maxPrice = 20000;  // 최대 가격 (2만원)

  //--------------------------------------------------------------------------------
  // [4단계 다중 조건 필터링 함수 상세 설명]
  // 1. (products ?? []): 'Null 병합 연산자'
  //    -> products가 null이나 undefined여도 튕기지 않게 빈 배열([])을 대신 써서 에러 방지
  // 2. .filter(p => ...): 배열을 하나씩 순회하며 조건이 true인 요소만 모아서 새 배열을 만듦
  // 3. p.name.toLowerCase(): 상품 이름('Mouse')을 소문자('mouse')로 변환 (대소문자 무시 검색용)
  // 4. .includes(searchQuery.toLowerCase()): 소문자로 만든 이름에 검색어('o')가 포함되어 있는지 검사 (true/false)
  // 5. && p.price < maxPrice: 'AND 연산자' -> 이름 조건과 가격 조건(2만원 미만)이 둘 다 참이어야 합격!
  //--------------------------------------------------------------------------------
  const filteredProducts = (products ?? []).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) && p.price < maxPrice);

  return(
    <div className="space-y-6">
      {/* [1] 1단계: 과일 목록 & Empty UI                                            */}
      {/* - .map(): 배열 요소 하나하나를 <li> 태그로 1:1 조작/변환                       */}
      {/* - 삼항 연산자 (조건 ? 참 : 거짓): fruits.length가 0보다 크면 목록, 아니면 문구 출력 */}
      <section className="rounded-box border border-base-300 bg-base-200 p-4">
      <h3 className="font-bold mb-3">A. 과일 목록</h3>
      {
        fruits.length > 0
        ? (<ul className="list-disc pl-5">{fruits.map((fruit, index) => <li key={index}>{fruit}</li>)}</ul>)
        : (<p className="alert">과일이 없습니다.</p>)
      }
      </section>

      {/* [2] 2단계: 2만원 미만 상품 필터링 (체이닝)                                 */}
      {/* - .filter().map(): 2만원 미만 상품을 먼저 거른 뒤(.filter), 화면 요소로 변환(.map) */}
      {/* - p.price.toLocaleString(): 숫자 15000을 보기 쉽게 '15,000' 천단위 쉼표 포맷팅 */}
      <section className="rounded-box border border-base-300 bg-base-200 p-4">
      <h3 className="font-bold mb-3">B. 2만원 미만 상품</h3>
      {
        products.filter(p => p.price < 20000).length > 0
        ? (<ul className="list-disc pl-5">{products.filter(p => p.price < 20000).map(p => <li key={p.id}>{p.name} - {p.price.toLocaleString()}원</li>)}</ul>)
        : (<p className="alert">조건에 맞는 상품이 없습니다.</p>)
      }
      </section>


      {/* [3] 3단계: 반환 규칙 비교 (즉시 반환 vs 블록 반환)                         */}
      {/* - 차이점 설명:                                                            */}
      {/*   1) p => <li ...>: 중괄호{} 없이 화살표(=>) 바로 뒤에 쓰면 무조건 '즉시 반환(return)'됨 */}
      {/*   2) p => { return <li ...>; }: 중괄호{}를 열면 '코드 블록'이 되므로, return을 직접 써줘야 반환됨 */}
      {/*      (만약 중괄호{} 안에서 return을 빼먹으면 아무것도 안 그려지고 undefined 나옴!) */}
      <section className="rounded-box border border-base-300 bg-base-200 p-4">
      <h3 className="font-bold mb-3">C. 반환 규칙 비교</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm opacity-70 mb-2">즉시 반환</p>
          <ul className="list-disc pl-5">{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
        </div>

        <div>
          <p className="text-sm opacity-70 mb-2">블록 반환</p>
          <ul className="list-disc pl-5">{products.map(p => { return <li key={p.id}>{p.name}</li>; })}</ul>
        </div>
      </div>
      </section>

      {/* [4] 4단계: 다중 조건 필터 결과 출력                                       */}
      {/* - 미리 만들어둔 filteredProducts 배열을 순회해서 렌더링                    */}
      <section className="rounded-box border border-base-300 bg-base-200 p-4">
      <h3 className="font-bold mb-3">D. 다중 조건 필터</h3>
      {
        filteredProducts.length > 0
        ? (<ul className="list-disc pl-5">{filteredProducts.map(p => <li key={p.id}>{p.name} - {p.price.toLocaleString()}원</li>)}</ul>)
        : (<p className="alert">조건에 맞는 상품이 없습니다.</p>)
      }
      </section>
    </div>
  )
}
//----------------------------------------------------------------------------------
