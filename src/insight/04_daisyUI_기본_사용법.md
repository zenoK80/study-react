# 04. daisyUI 기본 사용법

## daisyUI가 하는 일

daisyUI는 Tailwind CSS 위에서 동작하는 UI 클래스 모음이다.

직접 CSS를 길게 작성하지 않아도, HTML/JSX 태그에 정해진 className을 붙이면 버튼, 카드, 메뉴, alert 같은 UI를 빠르게 만들 수 있다.

```jsx
<button className="btn btn-primary">저장</button>
```

위 코드는 daisyUI가 제공하는 버튼 스타일을 사용한다.

## 기본 사용 방식

React에서는 HTML의 `class` 대신 `className`을 쓴다.

```jsx
<div className="card bg-base-100 shadow-sm">
  <div className="card-body">
    <h2 className="card-title">제목</h2>
    <p>내용</p>
  </div>
</div>
```

## 자주 쓰는 클래스

### 버튼

```jsx
<button className="btn">기본 버튼</button>
<button className="btn btn-primary">중요 버튼</button>
<button className="btn btn-outline">테두리 버튼</button>
<button className="btn btn-error">삭제 버튼</button>
```

### 카드

```jsx
<div className="card bg-base-100 shadow-sm">
  <div className="card-body">
    <h2 className="card-title">카드 제목</h2>
    <p>카드 내용</p>
  </div>
</div>
```

### 알림

```jsx
<div className="alert alert-info">
  <span>안내 메시지</span>
</div>
```

```jsx
<div className="alert alert-success">
  <span>성공 메시지</span>
</div>
```

### 상태 숫자

```jsx
<div className="stats shadow bg-base-200">
  <div className="stat">
    <div className="stat-title">현재 값</div>
    <div className="stat-value text-primary">10</div>
    <div className="stat-desc">설명</div>
  </div>
</div>
```

### 세로 메뉴

```jsx
<ul className="menu bg-base-200 rounded-box">
  <li><a>01. Hello</a></li>
  <li><a>02. Props</a></li>
</ul>
```

### 레이아웃 여백

```jsx
<div className="p-4">안쪽 여백</div>
<div className="mb-4">아래 여백</div>
<div className="space-y-4">자식 요소 사이 세로 간격</div>
<div className="flex gap-2">가로 배치와 간격</div>
```

## 현재 React Study에서 쓰는 방식

Preview 영역에서는 실습 컴포넌트가 실제 화면처럼 보이도록 daisyUI className을 붙인다.

```jsx
<button className="btn btn-primary">밥하기 +10</button>
```

```jsx
<div className="card bg-base-200 shadow-sm">
  <div className="card-body">
    <p>내용</p>
  </div>
</div>
```

## props가 필요한 컴포넌트는 어떻게 보여줄까?

현재 학습 사이트는 선택한 실습 파일을 이렇게 실행한다.

```jsx
<LessonComponent />
```

그래서 외부에서 props를 넘기지 않는다.

만약 실습 컴포넌트가 props를 필요로 하면, 실습 파일 안에서 예시 props를 넣어주는 래퍼 컴포넌트를 default export로 만들면 좋다.

```jsx
function Profile({ name, children }) {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h3 className="card-title">Profile</h3>
        <p>Name: {name}</p>
        {children}
      </div>
    </div>
  );
}

export default function ChildrenPractice() {
  return (
    <Profile name="React Learner">
      <p>children으로 전달된 내용입니다.</p>
    </Profile>
  );
}
```

이렇게 하면 학습 사이트는 여전히 `<LessonComponent />`만 실행하지만, 실습 파일 내부에서 props 예시까지 보여줄 수 있다.

## 내가 가져갈 깨달음

daisyUI는 `className`으로 쓰는 UI 클래스 모음이다.

버튼은 `btn`, 카드는 `card`, 알림은 `alert`, 메뉴는 `menu`, 상태 숫자는 `stats`를 먼저 기억하면 된다.

props가 필요한 실습은 외부 App.jsx에서 억지로 props를 넘기기보다, 실습 파일 안에 예시 실행용 default 컴포넌트를 만들어 보여주는 방식이 깔끔하다.
