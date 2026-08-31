# 05. Vite BASE_URL과 GitHub Pages 경로

## 왜 갑자기 BASE_URL이 필요한가?

로컬 개발 서버에서는 주소가 보통 이렇게 시작한다.

```text
/part1/01
```

하지만 GitHub Pages에 배포하면 저장소 이름이 앞에 붙는다.

```text
/study-react/part1/01
```

그래서 기존처럼 바로 `split("/")`을 하면 값이 밀린다.

```js
"/study-react/part1/01".split("/")
```

결과:

```js
["", "study-react", "part1", "01"]
```

이러면 `paths[1]`이 `"part1"`이 아니라 `"study-react"`가 된다.

## Vite의 base 설정

`vite.config.js`에 이렇게 적는다.

```js
export default defineConfig({
  plugins: [react()],
  base: "/study-react/",
});
```

뜻:

```text
이 앱은 GitHub Pages에서 /study-react/ 경로 아래에 올라간다.
```

## import.meta.env.BASE_URL

Vite는 `base` 값을 코드 안에서 쓸 수 있게 해준다.

```js
import.meta.env.BASE_URL
```

현재 설정에서는 값이 이렇게 나온다.

```js
"/study-react/"
```

## 왜 replace를 쓰나?

```js
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
```

`BASE_URL`은 끝에 `/`가 붙어 있다.

```text
/study-react/
```

주소에서 비교하거나 잘라내기 편하게 마지막 `/`를 제거한다.

```text
/study-react
```

## 전체 흐름

```js
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const pathname = window.location.pathname;
const routePath = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
const paths = routePath.split("/");
```

뜻:

```text
1. Vite base 경로를 가져온다.
2. 현재 브라우저 주소를 가져온다.
3. 주소가 base 경로로 시작하면 그 부분을 제거한다.
4. 남은 /part1/01을 split해서 part와 lesson을 꺼낸다.
```

## 내가 가져갈 깨달음

로컬에서는 `/part1/01`만 생각하면 된다.

GitHub Pages에서는 `/study-react/part1/01`처럼 저장소 이름이 앞에 붙는다.

그래서 Vite의 `base`와 `import.meta.env.BASE_URL`을 사용해서 앞부분을 보정해야 한다.
