import {
  Box,
  Button,
  Card,
  Heading,
  Textarea,
  TextInput,
  toaster,
} from "@parte-ds/ui";
import { useState } from "react";

const TodoForm = ({ refresh }: any) => {
  const [제목, 제목_변경] = useState("");
  const [내용, 내용_변경] = useState("");

  const resetInputs = () => {
    제목_변경("");
    내용_변경("");
  };

  const onAdd = () => {
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
    }).then(() => {
      resetInputs();
      refresh?.();
    });
  };
  return (
    <Card display="flex" flexDirection="column" gap={8} padding={24}>
      <Heading size={500}>할일을 추가해보세요!</Heading>
      <TextInput
        label="제목"
        required
        value={제목}
        onChange={(e) => {
          제목_변경(e.target.value);
        }}
      />
      <Textarea
        label="내용"
        value={내용}
        onChange={(e) => {
          내용_변경(e.target.value);
        }}
      />
      <Box flex="1" marginTop={8}>
        <Button fullWidth variant="primary" onClick={onAdd}>
          추가하기
        </Button>
      </Box>
    </Card>
  );
};
export default TodoForm;
