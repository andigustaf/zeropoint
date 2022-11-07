import { Button, Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import 'react-html5-camera-photo/build/css/index.css';

const Login = () => {
  const router = useRouter()
  const { user, login } = useAuth()
  
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [router, user])

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await login()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Flex
      justify="center"
      align="center"
      minH={"100vh"}
      bgAttachment="fixed"
      bgSize="contain"
      bgRepeat="no-repeat"
      bgPosition="bottom"
      bg="gray.100"
      w="full"
    >
      <Box w="full" maxW={"lg"} px={6}>
        <Box
          marginTop={6}
          rounded={"lg"}
          bg="white"
          boxShadow={"lg"}
          p={8}
          w="full"
          maxW="md"
        >
        <Stack align={"start"} mb={4}>
          <Text
            fontSize={"lg"}
            fontWeight="semibold"
            color={"gray.600"}
          >
            Simple Attendance App
          </Text>
          <Text fontSize={"md"} color={"gray.600"}>
            Sign in to use of our cool features ✌️
          </Text>
          </Stack>
          <Button colorScheme='blue' mt={2} w="full" onClick={handleLogin}>Sign In Now</Button>
        </Box>
      </Box>
    </Flex>
  )
}

export default Login