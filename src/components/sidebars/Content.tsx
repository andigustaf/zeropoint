import {Box, IconButton, Image, Text, VStack} from "@chakra-ui/react";
import {Menu, menus} from "./navigation";
import {FiLogOut} from "react-icons/fi";
import NavItem from "./NavItem";
import {useRouter} from "next/router";
import {useAuth} from "../../context/AuthContext";
import {User} from "../../types";

const Content = ({
                     user,
                     isOpen,
                     onClose,
                 }: {
    user: User;
    isOpen?: boolean;
    onClose?: any;
}) => {
    const {pathname} = useRouter();
    const {logout} = useAuth()
    return (
        <>
            <Box p={4}>
                <Image
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1NTguNTkgOTguNjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU1OC41OSA5OC42ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOm5vbmU7c3Ryb2tlOiNGRkZGRkY7c3Ryb2tlLXdpZHRoOjYuMzk0O3N0cm9rZS1taXRlcmxpbWl0OjEwO30KCS5zdDF7ZmlsbDojMTE1NUNDO30KCS5zdDJ7ZmlsbDojMTIxQ0M5O30KCS5zdDN7ZmlsbDojMTQ1RkUyO30KCS5zdDR7ZmlsbDojMDQwOTJEO30KCS5zdDV7ZmlsbDojQzBDN0QxO30KCS5zdDZ7ZmlsbDojODM4ODkyO30KCS5zdDd7ZmlsbDojRTBFNkVEO30KCS5zdDh7ZmlsbDojRjdGOUZBO30KCS5zdDl7ZmlsbDojRkZGRkZGO30KCS5zdDEwe2ZpbGw6IzE0MTQxNDtzdHJva2U6I0ZGRkZGRjtzdHJva2Utd2lkdGg6MjtzdHJva2UtbWl0ZXJsaW1pdDoxMDt9Cgkuc3QxMXtmaWxsOiMxNDE0MTQ7fQo8L3N0eWxlPgo8Zz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05NC40OCw0NC40bC02LjYtMTEuNDNINTguMDlMNTIuMjgsMjIuOWgyOS43OWwtNi42LTExLjQzYy0xLjc3LTMuMDYtNS4wMy00Ljk0LTguNTYtNC45NEgyOC44OQoJCQljLTEuNzcsMC0zLjQ2LDAuNDctNC45NCwxLjMyTDQ3LjksNDkuMzRoNDcuOUM5NS44LDQ3LjYzLDk1LjM2LDQ1LjkzLDk0LjQ4LDQ0LjR6Ii8+Cgk8L2c+Cgk8Zz4KCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDcuOSw0OS4zNGwtOS40NSwxNi4zN2gyNy4xOGwtNS44MSwxMC4wNkgzMi42NGwtOC42OSwxNS4wNWMxLjQ4LDAuODUsMy4xOCwxLjMyLDQuOTQsMS4zMmgzOC4wMgoJCQljMy41MywwLDYuOC0xLjg4LDguNTYtNC45NGwxOS4wMS0zMi45MmMwLjg4LTEuNTMsMS4zMi0zLjI0LDEuMzItNC45NEg0Ny45eiIvPgoJPC9nPgoJPGc+CgkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTQ3LjksNDkuMzRMMjMuOTUsNy44NmMtMS40OCwwLjg1LTIuNzQsMi4wOS0zLjYyLDMuNjJsLTMuNTYsNi4xNmwtMy4wMyw1LjI0bDI0LjcsNDIuODNMNDcuOSw0OS4zNHoiLz4KCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMS4zMiw0NC40Yy0xLjc3LDMuMDYtMS43Nyw2LjgzLDAsOS44OWwzLjU2LDYuMTZsMTUuNDUsMjYuNzZjMC44OCwxLjUzLDIuMTQsMi43NywzLjYyLDMuNjJsOC42OS0xNS4wNQoJCQlMNy45NCwzMi45NEwxLjMyLDQ0LjR6Ii8+Cgk8L2c+CjwvZz4KPGc+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTIyLjkxLDYwLjQzYzAuMTcsMi45OCwyLjI4LDUuODYsNi44Myw1Ljg2YzMuNDEsMCw1LjA4LTEuODQsNS4wOC0zLjc2YzAtMS41OC0xLjA1LTIuODktNC4yOS0zLjU5CgkJbC00Ljk5LTEuMTRjLTkuMjgtMi4wMS0xMi45NS03LjI2LTEyLjk1LTEzLjM5YzAtNy45Niw3LTE0LjQ0LDE2LjcyLTE0LjQ0YzEyLjYsMCwxNi45OCw3Ljg4LDE3LjQyLDEyLjk1bC0xMS4wMywyLjAxCgkJYy0wLjM1LTIuODktMi4xOS01LjM0LTYuMjEtNS4zNGMtMi41NCwwLTQuNzMsMS40OS00LjczLDMuNzZjMCwxLjg0LDEuNDksMi44OSwzLjQxLDMuMjRsNS43OCwxLjE0CgkJYzkuMDEsMS44NCwxMy4zOSw3LjI2LDEzLjM5LDEzLjY1YzAsNy40NC01LjY5LDE0LjctMTcuMzMsMTQuN2MtMTMuNjUsMC0xOC4wMy04Ljg0LTE4LjM4LTEzLjY1TDEyMi45MSw2MC40M3oiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0xNTYuOTUsNzQuNzl2LTQzLjVoMTIuNjl2NC45OWMyLjE5LTMuODUsNy43OS02LjMsMTIuNTItNi4zYzYuMjEsMCwxMC42OCwyLjU0LDEyLjg3LDYuODMKCQljMy40MS00LjksNy42MS02LjgzLDEzLjQ4LTYuODNjOC4yMywwLDE2LjEsNC44MSwxNi4xLDE2LjYzdjI4LjE4aC0xMi44N1Y0OS41OGMwLTQuMTEtMi4xOS03LjM1LTYuOTEtNy4zNXMtNy4yNiwzLjU5LTcuMjYsNy40NAoJCXYyNS4xMmgtMTMuMTNWNDkuNThjMC00LjExLTIuMTktNy4zNS03LTcuMzVjLTQuNjQsMC03LjE4LDMuNTktNy4xOCw3LjUzdjI1LjAzSDE1Ni45NXoiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0yNDYuNjYsNDkuNjdsMTAuMjQtMS41OGMyLjM2LTAuMzUsMy4xNS0xLjQ5LDMuMTUtMi45OGMwLTIuNTQtMi4xOS00LjczLTYuMzktNC43MwoJCWMtNC42NCwwLTcuMTgsMy4xNS03LjQ0LDYuMzlsLTExLjU1LTIuMzZjMC41My02LjIxLDYuMy0xNC40NCwxOS4wOC0xNC40NGMxNC4wOSwwLDE5LjI1LDcuODgsMTkuMjUsMTYuOHYyMS4yNwoJCWMwLDMuNDEsMC40NCw2LjMsMC41Myw2Ljc0aC0xMS45OWMtMC4wOS0wLjM1LTAuNDQtMS45My0wLjQ0LTQuOWMtMi4yOCwzLjY4LTYuNDgsNi4xMy0xMi4yNSw2LjEzYy05LjU0LDAtMTUuMDUtNi4zLTE1LjA1LTEzLjIyCgkJQzIzMy44LDU1LjA5LDIzOS40OSw1MC43MiwyNDYuNjYsNDkuNjd6IE0yNjAuMDYsNTcuNzJ2LTEuOTNsLTguMjMsMS4zMWMtMi44LDAuNDQtNC45LDEuNzUtNC45LDQuODFjMCwyLjI4LDEuNDksNC40Niw1LjE2LDQuNDYKCQlDMjU2LjAzLDY2LjM5LDI2MC4wNiw2NC40NiwyNjAuMDYsNTcuNzJ6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMzEyLjIyLDQ0LjQyYy0xLjQ5LTAuMzUtMi44OS0wLjQ0LTQuMi0wLjQ0Yy01LjM0LDAtMTAuMTUsMy4xNS0xMC4xNSwxMS44MnYxOC45OWgtMTMuM3YtNDMuNWgxMi44N3Y1Ljg2CgkJYzIuMjgtNC45LDcuNzktNi4zLDExLjI5LTYuM2MxLjMxLDAsMi42MiwwLjE3LDMuNSwwLjQ0VjQ0LjQyeiIvPgoJPHBhdGggY2xhc3M9InN0NCIgZD0iTTMzNy4zNCwzMS4yOWg4LjQ5djExLjY0aC04LjQ5djE2LjI4YzAsMy41OSwxLjkzLDQuNTUsNC44MSw0LjU1YzEuNCwwLDIuNzEtMC4yNiwzLjUtMC40NHYxMS4wMwoJCWMtMC41MywwLjI2LTIuNzEsMS4yMy02LjkyLDEuMjNjLTkuMDEsMC0xNC41My01LjM0LTE0LjUzLTE0VjQyLjkzaC03LjdWMzEuMjloMi4xOWM0LjU1LDAsNi43NC0zLjA2LDYuNzQtNy4wOXYtNS42aDExLjlWMzEuMjl6IgoJCS8+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMzYwLjcsNjEuMjJjMC41Myw0LjM4LDMuODUsNy44OCw5LjgsNy44OGM0LjY0LDAsNy4xOC0yLjYzLDcuMTgtNS42YzAtMi42My0xLjkzLTQuNjQtNS40My01LjQzbC03LjE4LTEuNTgKCQljLTYuNTYtMS40LTEwLjUtNS44Ni0xMC41LTExLjgyYzAtNy4xOCw2Ljc0LTEzLjMsMTQuOTctMTMuM2MxMS41NSwwLDE1LjE0LDcuNTMsMTYuMDIsMTEuMjlsLTcuMjYsMi43MWMtMC4zNS0yLjE5LTIuMS03LTguNzUtNwoJCWMtNC4yLDAtNywyLjcxLTcsNS42YzAsMi41NCwxLjU4LDQuMzgsNC44MSw1LjA4bDYuODMsMS40OWM3LjYyLDEuNjYsMTEuNjQsNi4zLDExLjY0LDEyLjUyYzAsNS45NS00Ljk5LDEzLjA0LTE1LjQsMTMuMDQKCQljLTExLjU1LDAtMTYuNDUtNy40NC0xNy4xNS0xMi4yNUwzNjAuNyw2MS4yMnoiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik00MzMuNyw2Mi44Yy0yLjM2LDcuNDQtOS4xLDEzLjMtMTguOTEsMTMuM2MtMTEuMjksMC0yMS4xOC04LjIzLTIxLjE4LTIyLjQ5YzAtMTMuMjIsOS41NC0yMi4yMywyMC4xMy0yMi4yMwoJCWMxMi45NSwwLDIwLjIyLDguOTMsMjAuMjIsMjIuMDZjMCwxLjA1LTAuMDksMi4xLTAuMTgsMi42M0g0MDIuMWMwLjE3LDcuNTMsNS42LDEyLjc4LDEyLjY5LDEyLjc4YzYuODMsMCwxMC4yNC0zLjc2LDExLjgyLTguNDkKCQlMNDMzLjcsNjIuOHogTTQyNS4zOCw0OS40MWMtMC4xNy02LjA0LTQuMTEtMTAuNzctMTEuNTUtMTAuNzdjLTYuOTIsMC0xMS4xMiw1LjM0LTExLjQ3LDEwLjc3SDQyNS4zOHoiLz4KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik00NDQuMjksNzQuNzlWMTEuNDJoOC4yM3Y2My4zN0g0NDQuMjl6Ii8+Cgk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNNDY1LjgyLDc0Ljc5VjExLjQyaDguMjN2NjMuMzdINDY1LjgyeiIvPgoJPHBhdGggY2xhc3M9InN0NCIgZD0iTTUyNC42Myw2Mi44Yy0yLjM2LDcuNDQtOS4xLDEzLjMtMTguOTEsMTMuM2MtMTEuMjksMC0yMS4xOC04LjIzLTIxLjE4LTIyLjQ5YzAtMTMuMjIsOS41NC0yMi4yMywyMC4xMy0yMi4yMwoJCWMxMi45NSwwLDIwLjIyLDguOTMsMjAuMjIsMjIuMDZjMCwxLjA1LTAuMDksMi4xLTAuMTgsMi42M2gtMzEuNjhjMC4xNyw3LjUzLDUuNiwxMi43OCwxMi42OSwxMi43OGM2LjgzLDAsMTAuMjQtMy43NiwxMS44Mi04LjQ5CgkJTDUyNC42Myw2Mi44eiBNNTE2LjMyLDQ5LjQxYy0wLjE3LTYuMDQtNC4xMS0xMC43Ny0xMS41NS0xMC43N2MtNi45MiwwLTExLjEyLDUuMzQtMTEuNDcsMTAuNzdINTE2LjMyeiIvPgoJPHBhdGggY2xhc3M9InN0NCIgZD0iTTU1OC41OSw0MWMtMS4yMi0wLjE3LTIuNDUtMC4yNi0zLjU5LTAuMjZjLTYuOTIsMC0xMS41NSwzLjY4LTExLjU1LDEyLjk1djIxLjA5aC04LjIzdi00Mi4xaDguMDV2Ny4zNQoJCWMzLjA2LTYuNDgsOC4zMS04LjA1LDEyLjYtOC4wNWMxLjE0LDAsMi4yOCwwLjE3LDIuNzEsMC4yNlY0MXoiLz4KPC9nPgo8L3N2Zz4K"
                    w="70%"
                    ml={2}
                />
                <VStack spacing={2} w="full" align={"stretch"} mt={10}>
                    {menus.map((item: Menu) => {
                        return (
                            <NavItem
                                item={item}
                                isActive={pathname == item.url}
                                key={item.title}
                            />
                        );
                    })}
                </VStack>
            </Box>
            <Box
                display="flex"
                flexDir="row"
                bg="primary.50"
                p={4}
                justifyContent="space-between"
                alignItems="center"
            >
                <Box color="white">
                    <Text fontWeight="semibold">{user?.displayName}</Text>
                    <Text>{user?.email}</Text>
                </Box>
                <IconButton
                    icon={<FiLogOut fontSize={24}/>}
                    aria-label="Logout"
                    bg="transparent"
                    onClick={logout}
                    color="white"
                    _hover={{
                        bg: "transparent",
                        border: "1px",
                        borderColor: "white",
                        rounded: "lg",
                    }}
                />
            </Box>
        </>
    );
};

export default Content;
