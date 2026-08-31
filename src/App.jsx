import { useEffect } from "react";
import { useState } from "react";

import { lessonFiles } from "./lesson";
import { loadLessonComponent } from "./lesson";
import { loadLessonSource } from "./lesson";

import StudyLayout from "./components/StudyLayout";

function App() {
  //----------------------------------------------------------------------------------
  // [1] Vite base 경로와 현재 브라우저 주소 읽기
  // 로컬 주소 예시: /part1/01
  // GitHub Pages 주소 예시: /study-react/part1/01
  //----------------------------------------------------------------------------------
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = window.location.pathname;

  //----------------------------------------------------------------------------------
  // [2] GitHub Pages에서 붙는 base 경로 제거
  // 이유: /study-react/part1/01에서 /study-react를 빼야 part1과 01을 정확히 읽을 수 있음
  // 결과 예시: /study-react/part1/01 -> /part1/01
  //----------------------------------------------------------------------------------
  const routePath = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;

  //----------------------------------------------------------------------------------
  // [3] "/" 기준으로 주소를 잘라 part와 lesson 번호로 분리
  // 예: "/part1/01" -> ["", "part1", "01"]
  //----------------------------------------------------------------------------------
  const paths = routePath.split("/");

  const part = paths[1] || "part1";
  const lesson = paths[2] || "01";

  //----------------------------------------------------------------------------------
  // [4] lessonFiles 배열에서 현재 주소와 일치하는 실습 하나 찾기
  //----------------------------------------------------------------------------------
  const currentLesson = lessonFiles.find(lessonItem => {
    return lessonItem.part === part && lessonItem.lesson === lesson;
  });

  //----------------------------------------------------------------------------------
  // [5] 현재 실행할 컴포넌트와 소스 코드를 state에 저장
  //----------------------------------------------------------------------------------
  const [LessonComponent, setLessonComponent] = useState(null);
  const [sourceCode, setSourceCode] = useState("");

  //----------------------------------------------------------------------------------
  // [6] currentLesson이 바뀔 때마다 해당 JSX 파일을 컴포넌트와 문자열로 불러오기
  //----------------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      if (!currentLesson) {
        setLessonComponent(null);
        setSourceCode("");
        return;
      }

      const component = await loadLessonComponent(currentLesson.path);
      const source = await loadLessonSource(currentLesson.path);

      // React 컴포넌트는 함수이므로, 함수 자체를 state에 저장하려고 한 번 감싼다.
      setLessonComponent(() => component);
      setSourceCode(source);
    }

    load();
  }, [currentLesson]);

  //----------------------------------------------------------------------------------
  // [7] 현재 실습을 찾았을 때 오른쪽 content에 보여줄 화면
  //----------------------------------------------------------------------------------
  const selectedLessonView = currentLesson && (
    <StudyLayout currentLesson={currentLesson} LessonComponent={LessonComponent} sourceCode={sourceCode} />
  );

  //----------------------------------------------------------------------------------
  // [8] 현재 실습을 못 찾았을 때 보여줄 화면
  //----------------------------------------------------------------------------------
  const notFoundView = (
    <section className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">실습을 찾을 수 없습니다.</h2>
        <p className="opacity-70">현재 주소: {pathname}</p>
      </div>
    </section>
  );

  //----------------------------------------------------------------------------------
  // [9] 사이드바에서 part별로 실습 목록을 구분해서 보여줄 화면 만들기
  //----------------------------------------------------------------------------------
  const sidebarView = ["part1", "part2", "part3"].map(partName => {
    const partLessons = lessonFiles.filter(lessonItem => {
      return lessonItem.part === partName;
    });

    if (partLessons.length === 0) { return null; }

    return (
      <li key={partName}>
        <h2 className="menu-title text-base-content font-bold mt-3">{partName}</h2>

        <ul>
          {partLessons.map(lessonItem => (
            <li key={`${lessonItem.part}-${lessonItem.lesson}`}>
              <a
                className={currentLesson === lessonItem ? "active" : ""}
                href={`${import.meta.env.BASE_URL}${lessonItem.part}/${lessonItem.lesson}`}
              >
                {lessonItem.lesson}. {lessonItem.title.replace(`${lessonItem.lesson}_`, "")}
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  });

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-toggle" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <main className="min-h-screen p-8">
          {currentLesson ? selectedLessonView : notFoundView}
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="sidebar-toggle" className="drawer-overlay"></label>

        <aside className="bg-base-200 min-h-full w-72">
          <div className="p-5">
            <h1 className="text-xl font-bold">React Study</h1>
            <p className="text-sm opacity-60 mt-1">JSX Practice</p>
          </div>

          <ul className="menu w-full">
            {sidebarView}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default App;
