import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const Message = ({ type = "info", children }) => {
  return (
    <Alert>
      <AlertIcon status={type} />
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  );
};
export default Message;
