import Head from "next/head";
import {Box, IconButton, useBreakpointValue} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {FiMenu} from "react-icons/fi";
import Sidebar from "../components/sidebars";
import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/router";
import {collection, limit, onSnapshot, query, where} from "firebase/firestore";
import {firestore} from "../config/firebase";
import {User} from "../types";

const smVariant = {navigation: "drawer", navigationButton: true};
const mdVariant = {navigation: "sidebar", navigationButton: false};

const PanelLayout = ({children}: { children: JSX.Element }) => {
    const router = useRouter()
    const {user} = useAuth()
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [permitted, setPermitted] = useState(false);
    const variants = useBreakpointValue({base: smVariant, md: mdVariant});

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [router, user])

    useEffect(() => {
        if (user) {
            const q = query(collection(firestore, "admins"),
                where('email', '==', user.email),
                limit(1)
            )

            const unsubscribe = onSnapshot(q, (snapshot) => {
                if (snapshot?.docs[0]?.data()) {
                    setPermitted(true)
                } else {
                    setPermitted(false)
                    router.push('/')
                }
            })

            return () => {
                unsubscribe()
            }
        }
    }, [permitted, user, router])

    return (<>{user && permitted ? (
        <>
            <Head>
                <title>Admin Zone | ZeroPoint</title>
            </Head>
            <Box minH="100vh" bg="gray.50" w="full">
                <Sidebar
                    variant={variants!.navigation}
                    isOpen={isSidebarOpen}
                    onClose={toggleSidebar}
                    user={user as User}
                />
                <Box p={6} ml={variants!.navigation !== "sidebar" ? "0px" : "250px"}>
                    <Box
                        bg="transparent"
                        px={[2, 2, 6, 6]}
                        py={4}
                        display="flex"
                        flexDir="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        {variants!.navigation !== "sidebar" && (
                            <IconButton
                                aria-label="Toggle Sidebar"
                                background="none"
                                _hover={{background: "none"}}
                                icon={<FiMenu/>}
                                onClick={toggleSidebar}
                            />
                        )}
                    </Box>
                    <Box w="full">{children}</Box>
                </Box>
            </Box>
        </>
    ) : null}
    </>);
};

export default PanelLayout;
