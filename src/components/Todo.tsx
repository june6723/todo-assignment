import {
  Box,
  Button,
  Card,
  Heading,
  Paragraph,
  Textarea,
  TextInput,
} from "@parte-ds/ui";
import { useState } from "react";
import TodoStatusLabel from "./TodoStatusLabel";

const 다음_상태_구하기 = (현재_상태: any) => {
  switch (현재_상태) {
    case "시작전":
      return "진행중";
    case "진행중":
      return "완료";
    case "완료":
      return "완료";
  }
};

const Todo = ({ todo, onEdit, onEditStatus, onDelete }: any) => {
  const { 제목, 내용, 상태, id } = todo;
  const [수정모드, 수정모드_변경] = useState(false);

  const [제목_입력, 제목_입력_변경] = useState(제목);
  const [내용_입력, 내용_입력_변경] = useState(내용);

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
          {수정모드 ? (
            <TextInput
              value={제목_입력}
              onChange={(e) => {
                제목_입력_변경(e.target.value);
              }}
            />
          ) : (
            <Heading size={500}>{제목}</Heading>
          )}
          <TodoStatusLabel status={상태} />
        </Box>
        {수정모드 ? (
          <Textarea
            value={내용_입력}
            onChange={(e) => {
              내용_입력_변경(e.target.value);
            }}
          />
        ) : (
          <Paragraph size={300}>{내용}</Paragraph>
        )}
      </Box>
      {상태 !== "완료" && !수정모드 && (
        <Box
          display="flex"
          marginTop={8}
          justifyContent="flex-end"
          alignItems="center"
          gap={4}
        >
          <Button variant="secondary" onClick={() => 수정모드_변경(true)}>
            수정
          </Button>
          <Button variant="error" onClick={() => onDelete?.(id)}>
            삭제
          </Button>
          <Button
            variant="primary"
            onClick={() => onEditStatus?.(id, 다음_상태_구하기(상태))}
          >
            다음
          </Button>
        </Box>
      )}
      {수정모드 && (
        <Box
          display="flex"
          marginTop={8}
          justifyContent="flex-end"
          alignItems="center"
          gap={4}
        >
          <Button variant="secondary" onClick={() => 수정모드_변경(false)}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onEdit?.({ ...todo, 제목: 제목_입력, 내용: 내용_입력 });
              수정모드_변경(false);
            }}
          >
            완료
          </Button>
        </Box>
      )}
    </Card>
  );
};
export default Todo;
