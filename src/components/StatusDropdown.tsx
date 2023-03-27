import { Button, Dropdown, DropdownList, Option } from "@parte-ds/ui";
import { useState } from "react";

export const 할일_상태_옵션들: Option<any>[] = [
  { label: "전체", value: "전체" },
  { label: "시작전", value: "시작전" },
  { label: "진행중", value: "진행중" },
  { label: "완료", value: "완료" },
];

const StatusDropdown = ({
  onChange,
}: {
  onChange?: (변경된_상태: "전체" | "시작전" | "진행중" | "완료") => void;
}) => {
  const [선택된_옵션, 선택된_옵션_변경] = useState(할일_상태_옵션들[0]);

  return (
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
            onChange?.(option.value);
          }}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default StatusDropdown;
