import { rest } from "msw";

const todos = [
  {
    id: 1,
    제목: "커피 주문하기",
    내용: "아이스 아메리카노 1잔, 카페 라떼 1잔",
    상태: "시작전",
  },
  {
    id: 2,
    제목: "운동 하기",
    내용: "푸쉬업 3세트, 스쿼트 3세트",
    상태: "진행중",
  },
  {
    id: 3,
    제목: "책 읽기",
    내용: "Javascript 딥다이브 1장 읽기",
    상태: "완료",
  },
];
let idCnt = 3;

export const handlers = [
  // 할일 목록
  rest.get("/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  // 할일 추가
  rest.post("/todo", async (req, res, ctx) => {
    try {
      const params = await req.json();
      const newTodo = { id: ++idCnt, ...params, 상태: "시작전" };
      todos.push(newTodo);
      return res(ctx.status(201), ctx.json(newTodo));
    } catch (error) {
      return res(ctx.status(500, "json parsing error"));
    }
  }),

  // 할일 수정
  rest.put("/todo/:id", async (req, res, ctx) => {
    const targetIndex = todos.findIndex(({ id }) => `${id}` === req.params.id);
    if (targetIndex < 0)
      return res(ctx.status(400, "해당 id를 가진 todo를 찾을 수 없습니다."));

    try {
      const params = await req.json();
      const updatedTodo = { ...todos[targetIndex], ...params };
      todos[targetIndex] = updatedTodo;
      return res(ctx.status(200), ctx.json(updatedTodo));
    } catch (error) {
      console.log(error);
      return res(ctx.status(500, "json parsing error"));
    }
  }),
  // 할일 상태 수정
  rest.put("/todo/:id/status", async (req, res, ctx) => {
    const targetIndex = todos.findIndex(({ id }) => `${id}` === req.params.id);
    if (targetIndex < 0)
      return res(ctx.status(400, "해당 id를 가진 todo를 찾을 수 없습니다."));

    try {
      const 변경한_상태 = await req.text();
      const updatedTodo = { ...todos[targetIndex], 상태: 변경한_상태 };
      todos[targetIndex] = updatedTodo;
      return res(ctx.status(200), ctx.json(updatedTodo));
    } catch (error) {
      console.log(error);
      return res(ctx.status(500, "json parsing error"));
    }
  }),

  // 할일 삭제
  rest.delete("/todo/:id", (req, res, ctx) => {
    const targetIndex = todos.findIndex(({ id }) => `${id}` === req.params.id);
    if (targetIndex < 0)
      return res(ctx.status(400, "해당 id를 가진 todo를 찾을 수 없습니다."));

    todos.splice(targetIndex, 1);
    return res(ctx.status(201));
  }),
];
