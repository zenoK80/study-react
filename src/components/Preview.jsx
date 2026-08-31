// src/components/Preview.jsx

//----------------------------------------------------------------------------------
// [1] Preview 함수형 컴포넌트 선언 및 내보내기
// 역할: 실습 컴포넌트가 실제로 렌더링되는 영역을 카드 형태로 감싸준다.
//----------------------------------------------------------------------------------
function Preview({ children }) {
  return (
    <section className="mb-6">
      <h3 className="text-xl font-bold mb-3">Preview</h3>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body study-preview">
          {children}
        </div>
      </div>
    </section>
  );
}

export default Preview;
