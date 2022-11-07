import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import IndexLayout from '../layouts'
import { AttendanceContextProvider } from '../context/AttendanceContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AttendanceContextProvider>
        <ChakraProvider theme={theme}>
          <IndexLayout>
            <Component {...pageProps} />
          </IndexLayout>
        </ChakraProvider>
      </AttendanceContextProvider>
    </AuthContextProvider>
    
  )
}

export default MyApp
