import { ActionRefreshIcon } from "@parte-ds/icons";
import {
  Box,
  Button,
  Dropdown,
  DropdownList,
  Heading,
  IconButton,
  Option,
  Spinner,
  toaster,
} from "@parte-ds/ui";
import { memo, useCallback, useEffect, useState } from "react";
import { css } from "styled-components";
import ExpensiveTodo from "./components/ExpensiveTodo";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

const 할일_상태_옵션들: Option<any>[] = [
  { label: "전체", value: "전체" },
  { label: "시작전", value: "시작전" },
  { label: "진행중", value: "진행중" },
  { label: "완료", value: "완료" },
];

const MemoizedExpensiveTodo = memo(ExpensiveTodo);
function App() {
  const [할일_목록, 할일_목록_변경] = useState<any[]>([]);
  const [준비중, 준비중_변경] = useState(true);

  const [선택된_옵션, 선택된_옵션_변경] = useState(할일_상태_옵션들[0]);
  const 보여줄_할일_목록 = 할일_목록.filter(({ 상태 }) => {
    if (선택된_옵션.value === "전체") return true;
    return 상태 === 선택된_옵션.value;
  });

  const 할일_가져오기 = () => {
    준비중_변경(true);
    fetch("/todos", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        할일_목록_변경(data);
        준비중_변경(false);
      });
  };

  useEffect(() => {
    할일_가져오기();
  }, []);

  const onAdd = (제목: any, 내용: any) => {
    if (!제목) {
      toaster.notify({
        status: "warning",
        title: "경고",
        description: "제목은 필수로 입력해야 합니다",
      });
      return;
    }
    fetch("/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 제목, 내용 }),
    })
      .then((res) => res.json())
      .then((todo) => {
        할일_목록_변경((prev) => [...prev, todo]);
      });
  };

  const onEdit = useCallback((변경된_할일: any) => {
    fetch(`/todo/${변경된_할일.id}`, {
      method: "PUT",
      body: JSON.stringify({
        제목: 변경된_할일.제목,
        내용: 변경된_할일.내용,
      }),
    })
      .then((res) => res.json())
      .then((todo) => {
        할일_목록_변경((prev) => {
          const targetIndex = prev.findIndex(
            (할일) => 할일.id === 변경된_할일.id
          );
          const newList = [...prev];
          newList[targetIndex] = todo;
          return newList;
        });
      });
  }, []);

  const onEditStatus = useCallback((id: number, 변경할_상태: any) => {
    fetch(`/todo/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: 변경할_상태,
    })
      .then((res) => res.json())
      .then((todo) => {
        할일_목록_변경((prev) => {
          const targetIndex = prev.findIndex((할일) => 할일.id === id);
          const newList = [...prev];
          newList[targetIndex] = todo;
          return newList;
        });
      });
  }, []);

  const onDelete = useCallback((id: number) => {
    fetch(`/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      // .then(할일_가져오기);
      .then(() => {
        할일_목록_변경((prev) => {
          const targetIndex = prev.findIndex((할일) => 할일.id === id);
          const newList = [...prev];
          newList.splice(targetIndex, 1);
          return newList;
        });
      });
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={12}>
      <Box
        padding={36}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        gap={32}
      >
        <Box display="flex" gap={8} alignItems="center">
          <Heading size={900}>할일 목록</Heading>
          <IconButton
            Icon={<ActionRefreshIcon size={16} />}
            variant="secondary"
            size={28}
            onClick={할일_가져오기}
          />
        </Box>
        <Box display="flex" gap={24}>
          <Box display="flex" flexDirection="column" gap={8}>
            <TodoForm onAdd={onAdd} />
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="secondary">{선택된_옵션.label}</Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <DropdownList
                  options={할일_상태_옵션들}
                  value={선택된_옵션}
                  onSelect={(option) => {
                    선택된_옵션_변경(option);
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Box>

          <Box display="flex" flexDirection="column" gap={8}>
            {준비중 ? (
              <Box
                display="flex"
                justifyContent="center"
                marginTop={48}
                overrideStyles={css`
                  min-width: 280px;
                `}
              >
                <Spinner size={48} />
              </Box>
            ) : (
              보여줄_할일_목록.map((할일) => (
                <MemoizedExpensiveTodo
                  key={할일.id}
                  todo={할일}
                  onEdit={onEdit}
                  onEditStatus={onEditStatus}
                  onDelete={onDelete}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
