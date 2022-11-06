import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

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
    <Button onClick={handleLogin}>Login</Button>
  )
}

export default Login