# 02. JSX는 값이라 변수에 담을 수 있다

## 오늘 배운 핵심

JSX는 화면에 바로 쓰는 태그처럼 보이지만, 실제로는 자바스크립트 값이다.

그래서 긴 JSX를 변수에 담아두고, `return` 안에서는 변수 이름만 사용할 수 있다.

## 읽기 힘든 JSX

아래처럼 삼항 연산자 안에 JSX를 바로 넣으면 코드가 길어져서 읽기 힘들 수 있다.

```jsx
<main>
  {currentLesson ? (
    <section>
      <h2>{currentLesson.title}</h2>
      <p>part: {currentLesson.part}</p>
      <p>lesson: {currentLesson.lesson}</p>
      <p>path: {currentLesson.path}</p>
    </section>
  ) : (
    <section>
      <h2>실습을 찾을 수 없습니다.</h2>
      <p>현재 주소: {pathname}</p>
    </section>
  )}
</main>
```

## JSX를 변수로 분리하기

JSX는 값이기 때문에 변수에 담을 수 있다.

```jsx
const selectedLessonView = currentLesson && (
  <section>
    <h2>{currentLesson.title}</h2>
    <p>part: {currentLesson.part}</p>
    <p>lesson: {currentLesson.lesson}</p>
    <p>path: {currentLesson.path}</p>
  </section>
);

const notFoundView = (
  <section>
    <h2>실습을 찾을 수 없습니다.</h2>
    <p>현재 주소: {pathname}</p>
  </section>
);
```

그러면 `return` 안에서는 이렇게 짧게 쓸 수 있다.

```jsx
<main>
  {currentLesson ? selectedLessonView : notFoundView}
</main>
```

## 왜 가능한가?

JSX는 HTML 문자열이 아니라 React element 객체로 변환되는 값이다.

그래서 아래처럼 생각할 수 있다.

```jsx
const message = "hello";
const number = 10;
const view = <h1>Hello</h1>;
```

`message`, `number`처럼 `view`도 변수에 담긴 값이다.

## currentLesson && JSX

아래 코드는 `currentLesson`이 있을 때만 JSX를 만든다.

```jsx
const selectedLessonView = currentLesson && (
  <section>
    <h2>{currentLesson.title}</h2>
  </section>
);
```

`&&`는 React에서 조건부 렌더링에 자주 쓰인다.

```jsx
{isLogin && <p>로그인 중입니다.</p>}
```

뜻은 다음과 같다.

```text
isLogin이 true면 <p>...</p>를 보여준다.
isLogin이 false면 아무것도 보여주지 않는다.
```

## 내가 가져갈 깨달음

JSX는 변수에 담을 수 있는 자바스크립트 값이다.

`return` 안이 너무 복잡하면 JSX를 위에서 변수로 빼고, `return` 안에서는 변수 이름만 넣어도 된다.

단, 변수 안에서 `currentLesson.title`처럼 객체 값을 사용할 때는 `currentLesson`이 실제로 있는지 먼저 확인해야 한다.
