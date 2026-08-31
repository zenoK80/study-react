// src/components/StudyLayout.jsx

import Preview from "./Preview";
import CodeBlock from "./CodeBlock";

//----------------------------------------------------------------------------------
// [1] StudyLayout 함수형 컴포넌트 선언 및 내보내기
// 역할: 현재 선택된 실습의 제목, 실행 결과, 소스 코드를 순서대로 보여준다.
//----------------------------------------------------------------------------------
function StudyLayout({ currentLesson, LessonComponent, sourceCode }) {
  //--------------------------------------------------------------------------------
  // [2] 화면에 보여줄 실습 제목 만들기
  // 예: "01_TestMission" -> "01. TestMission"
  //--------------------------------------------------------------------------------
  const lessonTitle = currentLesson.title.replace("_", ". ");

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">{lessonTitle}</h2>
      <CodeBlock code={sourceCode} />
      <Preview>
        {LessonComponent ? <LessonComponent /> : <p>불러오는 중...</p>}
      </Preview>
    </section>
  );
}

export default StudyLayout;
