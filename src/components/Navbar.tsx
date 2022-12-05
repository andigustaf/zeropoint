import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react'
import {useAuth} from '../context/AuthContext'

export const Navbar = () => {
    const {user, logout} = useAuth()
    return (
        <>
            <Box zIndex={2} bg={useColorModeValue('primary.50', 'gray.900')} px={4} position={'fixed'} w={'full'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack spacing={0} color={'white'}>
                        <Text fontWeight={'semibold'}>{user.displayName}</Text>
                        <Text lineHeight={1} fontSize={'sm'}>{user.email}</Text>
                    </Stack>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Menu>
                                <MenuButton
                                    aria-label='Avatar'
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        name={user.displayName}
                                        size={'sm'}
                                        src={user.image}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={logout}>Log Out</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
            <Box height={16}/>
        </>
    )
}