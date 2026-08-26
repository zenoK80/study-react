// 📘 38강. 요청 취소와 에러 처리 고도화 — 안정적인 데이터 패칭을 위한 필수 패턴
// -----------------------------------------------------------------------------
// 포함:
//  A) AbortController + axios로 진행 중 요청 취소 (기본형)
//  B) 취소/타임아웃/404/5xx/기타로 에러 메시지 세분화 (확장형)
//  C) axios 인스턴스(apiClient) 모듈화 예시
//
// 핵심 요약
// - 매 useEffect 실행마다 AbortController를 새로 만들고, cleanup에서 abort() 호출.
// - axios v1+: { signal: controller.signal } 로 취소 연동.
// - 취소 시 AxiosError.code === "ERR_CANCELED" (구버전 호환: axios.isCancel(err)).

import React, { useEffect, useState } from "react";
import axios from "axios";

// -----------------------------------------------------------------------------
// C) axios 인스턴스 모듈화 예시 (원래는 src/services/apiClient.js 로 분리 권장)
export const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com", // 모든 요청의 기본 주소
  timeout: 8000,                       // 8초 초과 시 AxiosError(code: "ECONNABORTED")
  headers: {
    "Content-Type": "application/json", // JSON 형식으로 주고받음
  },
});

// -----------------------------------------------------------------------------
// A) 요청 취소 (기본형) — 취소 여부만 분기
function ProductsWithCancelBasic() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // 이 실행 사이클 전용 컨트롤러

    async function fetchProducts() {
      try {
        const res = await apiClient.get("/products", {
          signal: controller.signal, // AbortController와 연결
        });
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        // 취소는 정상 종료로 간주 (로그만)
        if (err?.code === "ERR_CANCELED" || axios.isCancel?.(err)) {
          console.log("요청이 취소되었습니다.");
        } else {
          setError("상품을 불러오는 데 실패했습니다.");
        }
        setLoading(false);
      }
    }

    fetchProducts();

    // cleanup: 다음 렌더 전/언마운트 시 진행 중 요청 취소
    return () => controller.abort();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

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

// -----------------------------------------------------------------------------
// B) 요청 취소 + 에러 세분화 (확장형)
//  - 취소: ERR_CANCELED / axios.isCancel
//  - 타임아웃: ECONNABORTED
//  - 404, 5xx, 기타
function ProductsWithCancelAndErrors() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const res = await apiClient.get("/products", {
          signal: controller.signal,
        });
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        if (err?.code === "ERR_CANCELED" || axios.isCancel?.(err)) {
          setError("요청이 취소되었습니다.");
        } else if (err?.code === "ECONNABORTED") {
          setError("요청 시간이 초과되었습니다. 다시 시도해 주세요.");
        } else if (err?.response?.status === 404) {
          setError("상품을 찾을 수 없습니다.");
        } else if (err?.response?.status >= 500) {
          setError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
        setLoading(false);
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;

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

// -----------------------------------------------------------------------------
// 데모 컨테이너 — 두 컴포넌트를 한 화면에서 비교 시연
export default function Lesson38CancelAndErrors() {
  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui", padding: 16 }}>
      <h2>38강. 요청 취소와 에러 처리 고도화 — 안정적인 데이터 패칭</h2>

      <h3>기본형: 취소만 처리</h3>
      <ProductsWithCancelBasic />

      <hr style={{ margin: "24px 0", opacity: 0.2 }} />

      <h3>확장형: 취소 + 에러 세분화</h3>
      <ProductsWithCancelAndErrors />
    </div>
  );
}

export { ProductsWithCancelBasic, ProductsWithCancelAndErrors };
