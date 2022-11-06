import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import DefaultLayout from "./DefaultLayout";
import ProtectedLayout from "./ProtectedLayout";

const IndexLayout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const pathname = router.pathname;

  if (["/login"].includes(pathname)) {
    return <DefaultLayout>{children}</DefaultLayout>;
  } else {
    return <ProtectedLayout>{children}</ProtectedLayout>;
  }
};

export default IndexLayout;
