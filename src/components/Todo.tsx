import { Box, Button, Card, Heading, Paragraph } from "@parte-ds/ui";
import TodoStatusLabel from "./TodoStatusLabel";

const Todo = ({ todo }: any) => {
  const { 제목, 내용, 상태 } = todo;
  return (
    <Card
      padding={8}
      paddingLeft={16}
      paddingRight={16}
      style={{ width: "280px" }}
    >
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={4}
        >
          <Heading size={500}>{제목}</Heading>
          <TodoStatusLabel status={상태} />
        </Box>
        <Paragraph size={300}>{내용}</Paragraph>
      </Box>

      <Box
        display="flex"
        marginTop={8}
        justifyContent="flex-end"
        alignItems="center"
        gap={4}
      >
        <Button
          variant="error"
          onClick={() => {
            // 4-1번 문제
            // 삭제하는 기능을 추가해주세요
            // 인라인 함수, 함수 선언, props로 받기 등
            // 본인이 생각했을때 좋은 방법으로 구현 해주세요.
          }}
        >
          삭제
        </Button>
        {상태 !== "완료" && (
          <Button
            variant="primary"
            onClick={() => {
              // 4-2번 문제
              // 다음 상태로 변경하는 기능을 추가해주세요
              // 인라인 함수, 함수 선언, props로 받기 등
              // 본인이 생각했을때 좋은 방법으로 구현 해주세요.
              // "시작전" 상태라면 "진행중"
              // "진행중" 상태라면 "완료" 상태로 변경해주시면 됩니다
            }}
          >
            다음
          </Button>
        )}
      </Box>
    </Card>
  );
};
export default Todo;
