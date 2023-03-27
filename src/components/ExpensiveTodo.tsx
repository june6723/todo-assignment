import { Box, Spinner } from "@parte-ds/ui";
import { useEffect, useState } from "react";
import Todo from "./Todo";

const ExpensiveTodo = (props: any) => {
  const { todo, ...rest } = props;

  const [계산_완료, 계산_완료_변경] = useState(false);

  useEffect(() => {
    계산_완료_변경(false);
    setTimeout(() => {
      계산_완료_변경(true);
    }, 1000);
  }, [...Object.values(todo), ...Object.values(rest)]);

  if (!계산_완료)
    return (
      <Box
        width={280}
        height={110}
        padding={16}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Box>
    );
  return (
    <>
      <Todo {...props} />
    </>
  );
};
export default ExpensiveTodo;
