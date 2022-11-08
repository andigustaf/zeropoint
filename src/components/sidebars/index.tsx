import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { User } from "../../types";
import SidebarContent from "./Content";

const Sidebar = ({
  variant,
  isOpen,
  onClose,
  user,
}: {
  variant: string;
  isOpen: boolean;
  onClose: any;
  user: User;
}) => {
  return variant == "sidebar" ? (
    <Flex
      pos="fixed"
      flexDir="column"
      w="250px"
      minH="100vh"
      boxShadow="md"
      justifyContent="space-between"
    >
      <SidebarContent user={user} />
    </Flex>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerBody px={0} justifyContent="space-between">
            <SidebarContent onClose={onClose} user={user} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
