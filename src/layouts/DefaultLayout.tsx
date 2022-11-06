import { Box } from "@chakra-ui/react";

const DefaultLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Box as="main">{children}</Box>
    </>
  );
};

export default DefaultLayout;
