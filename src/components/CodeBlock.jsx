// src/components/CodeBlock.jsx

import { useEffect } from "react";
import { useRef } from "react";

//----------------------------------------------------------------------------------
// [1] CodeBlock 함수형 컴포넌트 선언 및 내보내기
// 역할: 전달받은 소스 코드 문자열을 <pre><code> 형태로 보여준다.
//----------------------------------------------------------------------------------
function CodeBlock({ code }) {
  //--------------------------------------------------------------------------------
  // [2] 실제 <code> DOM 요소를 기억하기 위한 ref 생성
  //--------------------------------------------------------------------------------
  const codeRef = useRef(null);

  //--------------------------------------------------------------------------------
  // [3] code가 바뀔 때마다 highlight.js 문법 색상 다시 적용
  //--------------------------------------------------------------------------------
  useEffect(() => {
    if (!window.hljs) { return; }
    if (!codeRef.current) { return; }

    // highlight.js는 이미 처리한 code 태그를 다시 처리하지 않으므로 표시를 지운다.
    codeRef.current.removeAttribute("data-highlighted");
    window.hljs.highlightElement(codeRef.current);
  }, [code]);

  return (
    <section>
      <h3 className="text-xl font-bold mb-3">Source Code</h3>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-0">
          <pre className="overflow-x-auto mb-0 rounded-box p-3 text-sm md:p-4 md:text-base">
            <code ref={codeRef} className="language-javascript">{code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

export default CodeBlock;
