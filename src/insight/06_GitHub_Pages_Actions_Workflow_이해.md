# 06. GitHub Pages, GitHub Actions, workflow 이해하기

## GitHub Pages가 뭐냐?

GitHub Pages는 GitHub 저장소에 있는 정적 파일을 웹사이트로 보여주는 기능이다.

예를 들어 저장소가 아래처럼 있으면:

```text
https://github.com/zenoK80/study-react
```

GitHub Pages 주소는 보통 이렇게 된다.

```text
https://zenok80.github.io/study-react/
```

## 그냥 git push 하면 자동으로 사이트가 되나?

아니다.

`git push`는 코드를 GitHub 저장소에 올리는 동작이다.

하지만 Vite React 프로젝트는 브라우저가 바로 실행할 수 있는 최종 파일이 `src/App.jsx`가 아니다.

먼저 빌드를 해야 한다.

```bash
npm run build
```

그러면 `dist` 폴더가 생긴다.

```text
src/
  App.jsx
  lesson.js

빌드 후

dist/
  index.html
  assets/...
```

GitHub Pages에 올라가야 하는 것은 `src`가 아니라 `dist`다.

## GitHub Actions가 뭐냐?

GitHub Actions는 GitHub 안에서 명령어를 자동으로 실행해주는 기능이다.

예를 들어 이런 일을 자동으로 시킬 수 있다.

```text
main 브랜치에 push됨
  ↓
npm ci 실행
  ↓
npm run build 실행
  ↓
dist 폴더 생성
  ↓
GitHub Pages에 배포
```

즉 내 컴퓨터에서 매번 수동으로 배포하지 않게 해주는 자동 실행 도구다.

## workflow가 뭐냐?

workflow는 GitHub Actions에게 시킬 작업 순서표다.

파일 위치는 보통 이렇게 둔다.

```text
.github/workflows/deploy.yml
```

뜻:

```text
.github
= GitHub 관련 설정 폴더

workflows
= GitHub Actions 작업 파일들을 모아두는 폴더

deploy.yml
= 배포 작업 순서가 적힌 파일
```

## yml이 뭐냐?

`.yml`은 YAML 파일이다.

설정 파일을 적을 때 자주 쓰는 형식이다.

들여쓰기로 구조를 구분한다.

```yaml
name: Deploy React Study

on:
  push:
    branches: ["main"]
```

위 코드는 이런 뜻이다.

```text
이 workflow 이름은 Deploy React Study다.
main 브랜치에 push되면 실행한다.
```

## deploy.yml 전체 흐름

```yaml
name: Deploy React Study to GitHub Pages
```

GitHub Actions 화면에 보이는 workflow 이름이다.

```yaml
on:
  push:
    branches: ["main"]

  workflow_dispatch:
```

실행 조건이다.

```text
main 브랜치에 push되면 자동 실행
GitHub Actions 화면에서 수동 실행도 가능
```

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

GitHub Pages 배포에 필요한 권한이다.

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
```

저장소 코드를 GitHub Actions 실행 환경으로 가져온다.

```yaml
  - name: Setup Node
    uses: actions/setup-node@v4
    with:
      node-version: 22
      cache: npm
```

React/Vite 빌드에 필요한 Node.js를 준비한다.

```yaml
  - name: Install dependencies
    run: npm ci
```

`package-lock.json` 기준으로 라이브러리를 설치한다.

```yaml
  - name: Build
    run: npm run build
```

Vite 빌드를 실행해서 `dist` 폴더를 만든다.

```yaml
  - name: Copy SPA fallback
    run: cp dist/index.html dist/404.html
```

`/part1/01` 같은 주소로 직접 들어갔을 때 404가 나는 문제를 줄이기 위해 `404.html`을 만든다.

```yaml
  - name: Upload artifact
    uses: actions/upload-pages-artifact@v3
    with:
      path: ./dist
```

빌드 결과물인 `dist` 폴더를 GitHub Pages 배포 대상으로 올린다.

```yaml
  - name: Deploy to GitHub Pages
    uses: actions/deploy-pages@v4
```

올린 `dist`를 실제 Pages 사이트로 배포한다.

## 안 하는 방법은 없나?

있긴 하다.

하지만 더 귀찮다.

방법 1:

```text
npm run build를 직접 실행
dist 폴더를 gh-pages 브랜치에 직접 올림
```

방법 2:

```text
gh-pages 패키지를 설치
npm run deploy 같은 명령어로 dist를 배포
```

방법 3:

```text
GitHub Actions로 자동 배포
```

Vite React 프로젝트는 방법 3이 제일 편하다.

한 번만 `.github/workflows/deploy.yml`을 만들어두면 다음부터는 그냥 `git push`만 해도 GitHub가 알아서 빌드하고 배포한다.

## Pages 화면의 Jekyll Configure는 뭐냐?

GitHub Pages Jekyll은 Markdown 중심의 정적 블로그/문서 사이트를 만들 때 쓰는 방식이다.

예를 들면 이런 저장소에 어울린다.

```text
README.md
docs/*.md
_config.yml
```

Jekyll은 GitHub Pages에서 오래전부터 지원하던 정적 사이트 생성기다.

하지만 지금 React Study는 Vite React 앱이다.

```text
src/App.jsx
src/lesson.js
src/part1/*.jsx
```

이런 파일은 Jekyll이 직접 실행해서 사이트로 만들어주지 않는다.

그래서 지금 프로젝트에서는 `GitHub Pages Jekyll`의 Configure를 누르지 않는다.

## Pages 화면의 Static HTML Configure는 뭐냐?

Static HTML은 빌드 과정이 필요 없는 정적 HTML 파일을 바로 배포할 때 쓰는 방식이다.

예를 들면 이런 프로젝트에 어울린다.

```text
index.html
style.css
main.js
```

이런 파일들이 이미 브라우저가 바로 읽을 수 있는 최종 결과물이라면 Static HTML로 충분하다.

하지만 Vite React 프로젝트는 `npm run build`가 필요하다.

```text
React/Vite 코드
  ↓
npm run build
  ↓
dist 폴더
  ↓
GitHub Pages 배포
```

그래서 지금 프로젝트에서는 `Static HTML` Configure도 누르지 않는다.

## 지금 프로젝트에서 선택해야 하는 것

GitHub Pages 설정 화면에서는 Source를 `GitHub Actions`로 둔다.

```text
Settings
  ↓
Pages
  ↓
Source: GitHub Actions
```

그리고 직접 Configure 버튼을 누르는 대신, 저장소에 있는 workflow 파일이 배포를 담당한다.

```text
.github/workflows/deploy.yml
```

## 내가 가져갈 깨달음

`git push`는 코드를 저장소에 올리는 일이다.

`npm run build`는 React/Vite 코드를 브라우저가 읽을 수 있는 정적 파일로 바꾸는 일이다.

`GitHub Pages`는 그 정적 파일을 웹사이트로 보여주는 기능이다.

`GitHub Actions`는 GitHub 안에서 `npm ci`, `npm run build`, 배포 명령을 자동으로 실행해주는 기능이다.

`.github/workflows/deploy.yml`은 그 자동 실행 순서를 적어둔 파일이다.
