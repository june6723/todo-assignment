import { ActionRefreshIcon } from "@parte-ds/icons";
import { Box, Heading, IconButton, toaster } from "@parte-ds/ui";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import StatusDropdown from "./components/StatusDropdown";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

function App() {
  const [할일_목록, 할일_목록_변경] = useState<any[]>([]);
  const [준비중, 준비중_변경] = useState(true);

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

  // 1번 문제
  const 새로운_할일을_추가 = (제목: string, 내용: string) => {
    if (!제목) {
      toaster.notify({
        status: "warning",
        title: "경고",
        description: "제목은 필수로 입력해야 합니다",
      });
      return;
    }
    // 새로 생성된 할일을 추가 해주세요!
  };

  // 2번 문제
  const 할일_상태필터가_변경되었을때 = (
    변경된_필터: "전체" | "시작전" | "진행중" | "완료"
  ) => {
    toaster.notify({
      status: "info",
      title: "변경된 상태",
      description: 변경된_필터,
    });
    // 변경된 상태필터에 해당하는 할일만 보여지도록 구현해주세요!
  };

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
            <TodoForm onAdd={새로운_할일을_추가} />
            <StatusDropdown onChange={할일_상태필터가_변경되었을때} />
          </Box>
          <Box display="flex" flexDirection="column" gap={8}>
            {준비중 ? (
              <Loading />
            ) : (
              할일_목록.map((할일) => <Todo key={할일.id} todo={할일} />)
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
