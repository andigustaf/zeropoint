import {Box, Icon, Text} from "@chakra-ui/react";
import {Menu} from "./navigation";
import NextLink from "next/link";

interface Props {
    item: Menu;
    isActive: boolean;
}

const NavItem = ({item, isActive}: Props) => {
    return (
        <NextLink href={item.url!}>
            <Box
                w="full"
                p={3}
                display="flex"
                alignItems="center"
                color={isActive ? "primary.50" : "primary.500"}
                rounded={isActive ? "lg" : "none"}
                boxShadow={isActive ? "none" : "none"}
                bg={isActive ? "primary.5" : "transparent"}
                cursor="pointer"
                _hover={{
                    bg: isActive ? "primary.5" : "basic.20",
                    rounded: 'lg'
                }}
            >
                <Icon as={item.icon} fontWeight={isActive ? 'semibold' : 'regular'} fontSize={16}/>
                <Text fontWeight={isActive ? 'semibold' : 'regular'} ml={4} fontSize={16}>
                    {item.title}
                </Text>
            </Box>
        </NextLink>
    );
};

export default NavItem;
