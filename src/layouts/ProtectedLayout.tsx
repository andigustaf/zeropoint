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
      <Box as="main">{children}</Box>
    </>
  ) : null}</>
}

export default ProtectedLayout