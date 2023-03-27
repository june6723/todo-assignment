import { Box, Spinner } from "@parte-ds/ui";
import { css } from "styled-components";

const Loading = () => {
  return (
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
  );
};
export default Loading;
