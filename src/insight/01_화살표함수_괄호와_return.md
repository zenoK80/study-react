# 01. 화살표 함수에서 괄호와 return 이해하기

## 오늘 배운 핵심

화살표 함수에서 `()`를 쓰면 바로 return 되는 것처럼 보였지만, 정확히는 `()`가 return을 만드는 것이 아니다.

핵심은 `{}`를 쓰느냐 안 쓰느냐다.

```js
const add = x => x + 1;
```

이 코드는 오른쪽에 `x + 1`이라는 표현식이 바로 오기 때문에 자동으로 return 된다.

```js
const add = x => (x + 1);
```

이 코드도 똑같이 자동 return 된다. 여기서 `()`는 return을 시키는 문법이 아니라, 표현식을 보기 좋게 묶는 괄호다.

## 중괄호를 쓰면 return이 필요하다

```js
const add = x => {
  return x + 1;
};
```

`{}`를 쓰면 함수 본문이 된다. 함수 본문 안에서는 여러 문장을 쓸 수 있지만, 값을 돌려주려면 `return`을 직접 써야 한다.

아래 코드는 return이 없기 때문에 결과가 `undefined`가 된다.

```js
const add = x => {
  x + 1;
};
```

## JSX에서 자주 보는 형태

React에서 목록을 만들 때 이런 코드를 자주 본다.

```jsx
{lessonFiles.map(lesson => (
  <li key={`${lesson.part}-${lesson.lesson}`}>
    {lesson.part} / {lesson.lesson} / {lesson.title}
  </li>
))}
```

여기서 `lesson => (...)`의 `()`는 JSX를 여러 줄로 보기 좋게 묶는 역할이다.

실제로는 이런 뜻이다.

```text
lesson 하나를 받아서
<li>...</li>라는 JSX 값을 바로 반환한다.
```

같은 코드를 `{}`와 `return`으로 쓰면 이렇게 된다.

```jsx
{lessonFiles.map(lesson => {
  return (
    <li key={`${lesson.part}-${lesson.lesson}`}>
      {lesson.part} / {lesson.lesson} / {lesson.title}
    </li>
  );
})}
```

## 표현식과 문장

표현식은 값이 되는 코드다.

```js
x + 1
"hello"
user.name
<li>Hello</li>
```

문장은 동작을 지시하는 코드다.

```js
const x = 1;
if (x > 0) {}
for (;;) {}
return x;
```

화살표 함수에서 오른쪽에 표현식이 바로 오면 자동 return 된다.

```js
x => x + 1
```

오른쪽에 `{}` 블록이 오면 직접 return 해야 한다.

```js
x => {
  return x + 1;
}
```

## 내가 가져갈 깨달음

`()`가 return을 시키는 것이 아니다.

화살표 함수에서 `{}`를 안 쓰고 표현식을 바로 쓰면 자동 return 된다.

JSX에서 `lesson => (...)`처럼 쓰는 이유는 JSX가 여러 줄이라서 하나의 반환값처럼 보기 좋게 묶기 위해서다.
