// 📘 37강. FakeStoreAPI 연동 실습 — useEffect로 외부 데이터 가져오기
// -----------------------------------------------------------------------------
// 목표
// - 마운트 시점에 한 번, 외부 API(FakeStoreAPI)에서 상품 목록을 받아와 렌더링합니다.
// - 로딩/에러/데이터 3가지 상태를 명확히 분기합니다.
// - useEffect 안에서 async 함수를 “정의 후 호출”하는 올바른 패턴을 사용합니다.
//
// 참고 API: https://fakestoreapi.com/products
// 응답 예시(배열):
// [
//   {
//     "id": 1,
//     "title": "string",
//     "price": 0.1,
//     "description": "string",
//     "category": "string",
//     "image": "http://example.com"
//   },
//   ...
// ]

import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  // ---------------------------------------------------------------------------
  // ✅ 상태 구성
  // products: 상품 목록 데이터
  // loading : 로딩 여부(초기 true → 성공/실패 시 false)
  // error   : 에러 메시지 문자열(정상일 때 null)
  const [products, setProducts] = useState([]);   // 상품 목록 상태
  const [loading, setLoading] = useState(true);   // 로딩 여부 상태
  const [error, setError] = useState(null);       // 에러 상태

  // ---------------------------------------------------------------------------
  // ✅ 마운트 시 한 번만 실행되는 이펙트
  // - 의존성 배열을 []로 두면 컴포넌트가 처음 화면에 그려진 뒤 한 번만 실행됩니다.
  // - 이 안에서 async 함수를 정의하고 즉시 호출하는 패턴을 사용합니다.
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);   // axios는 파싱된 JSON을 res.data로 제공합니다.
        setLoading(false);
      } catch (err) {
        setError("상품을 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // ---------------------------------------------------------------------------
  // ✅ 상태별 렌더링 분기
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // ---------------------------------------------------------------------------
  // ✅ 데이터 렌더링
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <img src={p.image} alt={p.title} width="50" />
          <span>{p.title} - ${p.price}</span>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;

/* 🔎 확장 팁
1) 요청 취소:
   - 사용자가 화면을 빠르게 이동하거나 언마운트될 때 진행 중인 요청을 취소하려면
     AbortController(axios의 cancel 토큰 또는 signal 옵션)를 사용하세요.

2) 로딩 UX:
   - 스켈레톤 UI, 스피너 등을 사용하면 체감 품질이 좋아집니다.

3) 에러 상세:
   - setError(err.response?.data?.message ?? "문제가 발생했습니다."); 처럼
     서버가 내려준 에러 메시지를 노출하는 것도 방법입니다.
*/
