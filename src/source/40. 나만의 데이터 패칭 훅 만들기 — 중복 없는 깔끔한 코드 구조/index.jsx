// 📘 40강. 나만의 데이터 패칭 훅 만들기 — 중복 없는 깔끔한 코드 구조
// -----------------------------------------------------------------------------
// 1) axios 인스턴스(apiClient)  2) 공용 훅 useFetch(url)  3) 예제 컴포넌트 ProductList
// 실무 포인트
// - 매 요청마다 AbortController.signal을 전달하고 cleanup에서 abort() 호출
// - 로딩/성공/실패 상태를 훅 내부에서 표준화 → 컴포넌트는 UI에만 집중
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import axios from "axios";

// -----------------------------------------------------------------------------
// 0) axios 인스턴스 — 모든 요청에 공통 설정을 적용
//    (실무에서는 /src/services/apiClient.js 로 분리 권장)
const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

// -----------------------------------------------------------------------------
// 1) 공용 훅: useFetch(url)
//    - data: 서버에서 받아온 응답 데이터
//    - error: 실패 시 사용자에게 보여줄 에러 메시지(문자열)
//    - loading: 현재 로딩 중인지 여부
//
//    동작 요약
//    - 마운트/URL 변경 시: AbortController 생성 → 요청 시작 → 상태 갱신
//    - 언마운트/URL 변경 전: cleanup에서 abort()로 진행 중 요청 취소
function useFetch(url) {
  const [data, setData] = useState(null);     // 서버 응답 데이터
  const [error, setError] = useState(null);   // 사용자 표시용 에러 메시지
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    const controller = new AbortController(); // 이번 사이클의 취소 토큰

    // effect가 시작될 때마다 '새 요청'으로 간주
    setLoading(true);
    setError(null);

    apiClient
      .get(url, { signal: controller.signal })
      .then((res) => {
        setData(res.data);   // 성공: 데이터 저장
        setError(null);      // 이전 에러가 있었다면 초기화
      })
      .catch((err) => {
        // 취소는 정상 흐름이므로 UI 에러로 노출하지 않음
        const isCanceled =
          err?.code === "ERR_CANCELED" || err?.name === "CanceledError";
        if (!isCanceled) {
          // 사람이 읽기 쉬운 메시지로 변환
          if (err?.code === "ECONNABORTED") {
            setError("요청 시간이 초과되었습니다. 다시 시도해 주세요.");
          } else if (err?.response?.status === 404) {
            setError("데이터를 찾을 수 없습니다.");
          } else if (err?.response?.status >= 500) {
            setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
          } else {
            setError("알 수 없는 오류가 발생했습니다.");
          }
        }
      })
      .finally(() => {
        // 성공/실패/취소에 상관없이 로딩 종료
        setLoading(false);
      });

    // cleanup: 다음 렌더 직전/언마운트 시 진행 중 요청 취소
    return () => controller.abort();
  }, [url]); // URL이 바뀌면 새로 요청

  // 훅의 반환값: 컴포넌트는 이 상태만 사용하면 됨
  return { data, error, loading };
}

// -----------------------------------------------------------------------------
// 2) 예제 컴포넌트: ProductList
//    - fakestoreapi의 /products를 호출해 목록을 렌더링
function ProductList() {
  // data를 products라는 로컬 이름으로 사용
  const { data: products, error, loading } = useFetch("/products");

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>에러 발생: {error}</p>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <img src={p.image} alt={p.title} width="50" />
          <span>{p.title} - ${p.price}</span>
        </li>
      ))}
    </ul>
  );
}

// 데모용 default export
export default ProductList;

// 개별 사용을 위한 named export
export { useFetch, apiClient };
