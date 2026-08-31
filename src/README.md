전체 작업 순서
1. 현재 React 앱이 어떻게 실행되는지 이해하기
   index.html → main.jsx → App.jsx → 화면
2. 지금 App.jsx의 문제 이해하기
   실습 파일을 전부 직접 import하고 있어서 파일이 많아지면 관리가 터짐.
3. lesson.js의 역할 정하기
   src/part1, src/part2 안의 JSX 파일들을 자동으로 찾는 파일로 만든다.
4. import.meta.glob() 이해하기
   Vite가 제공하는 “파일 자동 수집 기능”이다.
5. 실습 JSX 파일을 “실행용 컴포넌트”로 불러오기
   예: 01_TestMission.jsx를 React 컴포넌트로 import.
6. 같은 JSX 파일을 “소스 코드 문자열”로 불러오기
   ?raw를 붙이면 파일 내용을 문자열로 가져올 수 있다.
7. URL에서 현재 실습 번호 가져오기
   /part1/01이면 part1, 01을 뽑는다.
8. URL에 맞는 실습 파일 찾기
   part1 + 01에 해당하는 파일을 찾는다.
9. StudyLayout.jsx 만들기
   제목, 실행 결과, 소스 코드를 배치한다.
10. Preview.jsx 만들기
       실제 React 실행 결과 영역이다.
11. CodeBlock.jsx 만들기
       JSX 소스 코드를 그대로 보여주는 영역이다.
12. App.jsx 정리하기
       직접 import를 없애고 lesson.js에서 현재 실습 하나만 가져오게 한다.
13. 기본 스타일 정리하기
       실행 결과 박스, 코드 박스 보기 좋게 만든다.
14. 테스트하기
       /part1/01, /part1/02, /part2/01로 들어가서 제대로 바뀌는지 확인한다.
