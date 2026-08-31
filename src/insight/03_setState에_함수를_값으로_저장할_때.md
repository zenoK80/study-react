# 03. setState에 함수를 값으로 저장할 때

## 오늘 배운 핵심

React 컴포넌트는 함수다.

```jsx
function TestMission() {
  return <div>Hello</div>;
}
```

그래서 동적으로 불러온 컴포넌트도 결국 함수 값이다.

```js
const component = await loadLessonComponent(currentLesson.path);
```

이때 `component` 안에는 `TestMission` 같은 함수가 들어있다.

## 그냥 setState(component)를 하면 헷갈릴 수 있다

React의 state setter는 함수를 받으면 특별하게 처리한다.

```js
setLessonComponent(component);
```

React는 이걸 이렇게 생각할 수 있다.

```text
이 함수로 이전 state를 받아서 다음 state를 계산하라는 뜻인가?
```

즉 함수 자체를 값으로 저장하려는 의도와 다르게 React가 그 함수를 실행하려고 할 수 있다.

## 그래서 한 번 감싼다

```js
setLessonComponent(() => component);
```

뜻은 다음과 같다.

```text
component를 지금 실행하지 말고,
component 함수 자체를 state 값으로 저장해라.
```

여기서 바깥쪽 `() => component`는 React에게 넘기는 updater 함수이고, 그 함수가 돌려주는 값이 실제 state 값이 된다.

## 문자열은 그냥 저장하면 된다

소스 코드는 함수가 아니라 문자열이다.

```js
const source = await loadLessonSource(currentLesson.path);
```

그래서 그냥 넣으면 된다.

```js
setSourceCode(source);
```

문자열은 React가 실행하려고 하지 않는다.

## 내가 가져갈 깨달음

state에 저장하려는 값이 함수라면 그냥 넣지 말고 한 번 감싼다.

```js
setLessonComponent(() => component);
```

state에 저장하려는 값이 문자열, 숫자, 객체 같은 일반 값이면 그냥 넣어도 된다.

```js
setSourceCode(source);
```
