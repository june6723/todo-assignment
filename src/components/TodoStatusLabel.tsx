import { Badge } from "@parte-ds/ui";

const getColorByStatus = (status: any) => {
  switch (status) {
    case "시작전":
      return "YELLOW";
    case "진행중":
      return "GREEN";
    case "완료":
      return "BLUE";
    default:
      return "NEUTRAL";
  }
};

const TodoStatusLabel = ({ status }: any) => {
  return <Badge badgeColor={getColorByStatus(status)} text={status} />;
};
export default TodoStatusLabel;
