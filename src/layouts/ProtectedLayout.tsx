import { Avatar, Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  console.log(user)

  return <>{user ? (
      <>
        <Box bg={useColorModeValue('blue.500', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Stack spacing={0} color={'white'}>
            <Text fontWeight={'semibold'}>{ user.displayName }</Text>
            <Text lineHeight={1} fontSize={'sm'}>{ user.email }</Text>
          </Stack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <FiMoon /> : <FiSun />}
              </Button> */}

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
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
      {children}
      </>
  ) : null}</>
}

export default ProtectedLayout