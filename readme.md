# Todo App의 세부 기능구현

여러분은 Todo App 프로젝트에 프론트엔드 개발자로 참여하게 되었습니다.
현재 기획, 디자인, 서버의 API가 완료된 상태로서 Client 개발이 남아있습니다.

할일은 다음과 같은 프로퍼티를 가지고 있습니다.

```ts
{
  id: number;
  제목: string;
  내용: string;
  상태: string;
}
```

이번 Todo App에서 구현해야할 세부 기능은 아래와 같습니다

1. 새로운 할일을 추가합니다. **제목(필수값)**, **내용**을 사용자로부터 입력 받아 새로운 할일을 생성합니다.
2. 할일은 상태를 가지고 있습니다. `시작전`, `진행중`, `완료` 3가지 상태 중 하나를 가지며 Todo App에서는 3가지 상태중 하나를 선택하여 해당 상태에 해당하는 할일만 볼 수 있는 기능을 가지고 있습니다.
3. 할일은 1️⃣ 삭제 버튼을 통해 할일을 삭제 할 수 있습니다. 2️⃣ `다음` 버튼을 통해 할일의 상태값을 다음 상태값으로 변경할 수 있습니다.

디자인에 관련해서는 현재 사내의 디자인 시스템을 활용하여 개발하고 있기 때문에 스타일링에 관한 부분은 신경쓸 필요가 없습니다.

## 문제 목록

아래의 4개의 문제를 본인이 풀 수 있는 만큼 푸시면 됩니다!
기본적으로 서버 API 목록은 아래에 제공하고 있으며 제공되는 API를 활용하여 기능 구현을 해주시면 됩니다.

> 혹시나 비동기를 다루어 본적이 없어서 API 목록을 활용하여 개발하는게 힘드시다면 `App.tsx`의 state로만 구현해주세요.

- 제한 시간: 50분
- 현재 Todo App은 Typescript를 사용하고 있으나 any로 대부분 타입을 지정하고 있습니다. TS를 다루어 본적이 있으신 분이면 원하시는대로 타입을 정의하시고, TS를 다루어 보지 않은 분들이라면 그대로 두셔도 됩니다.
- 구글링, 사용하고 싶은 라이브러리 마음껏 사용 가능합니다. 특히 서버 호출 관련된 부분은 JS 네이티브인 Fetch API, Axios, react-query, RTK Query 등 본인이 사용하고 싶은 라이브러리로 구현하셔도 무방합니다.
- 모든 문제를 풀어야하는건 아닙니다. 자신이 구현 가능한 만큼 구현하시고 과제 이후 진행되는 면접에서 충분히 설명 해주시면 되니 너무 부담갖지 않으셔도 됩니다 😄

### 문제 1

`App.tsx` 에서 `새로운_할일을_추가` 함수에 새로운 할일을 추가하는 코드를 작성 해주세요.

### 문제 2

Todo App에서 TodoForm 아래에 할일 목록을 상태값에 따라 필터링 할 수 있는 드롭다운이 있습니다.
드롭다운의 onChange 함수는 필터를 사용자가 선택할때 호출되며 `전체`, `시작전`, `진행중`, `완료` 4가지 값중 하나를 함수의 파라미터로 하여 호출합니다.
`App.tsx` 에서 할일 목록을 선택된 필터값에 따라 보여지도록 구현해주세요.

### 문제 3

1. 삭제 기능을 구현하세요.
2. 다음 상태로 이동하는 기능을 구현하세요.

### 문제 4 (선택)

ExpensiveTodo는 기존 할일과 다르게 컴포넌트안에서 시간이 많이 걸리는 계산 로직이 포함되어 있습니다. 따라서 렌더링을 횟수를 줄이는게 UI/UX 적으로 유저에게 좋은 경험을 선사해 줄 수 있습니다.

Todo 컴포넌트를 ExpensiveTodo 컴포넌트로 변경하고 불필요한 렌더링을 줄일 수 있도록 최적화 시키세요.

## API 목록

### GET **/todos**

할일 목록 가져오기

- response

```json
[{
  "id": "number",
  "제목": "string",
  "내용": "string",
  "상태": "string",
}, ...]
```

### POST **/todo**

할일 생성하기

- Request Body

```json
{
  "제목": "string",
  "내용": "string"
}
```

- response

```json
{
  "id": "number",
  "제목": "string",
  "내용": "string",
  "상태": "string"
}
```

### PUT **/todo/:id/status**

할일 상태 변경

- Request Body

`시작전`, `진행중`, `완료` 셋 중의 하나의 string 값

- response

```json
{
  "id": "number",
  "제목": "string",
  "내용": "string",
  "상태": "string"
}
```

### DELETE **/todo/:id**