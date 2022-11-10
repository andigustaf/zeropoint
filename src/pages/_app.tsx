import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import IndexLayout from '../layouts'
import { AttendanceContextProvider } from '../context/AttendanceContext'
import "react-datepicker/dist/react-datepicker.css";
import '../components/chakra-react-datepicker.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ZeroPoint</title>
      </Head>
      <AuthContextProvider>
        <AttendanceContextProvider>
          <ChakraProvider theme={theme}>
            <IndexLayout>
              <Component {...pageProps} />
            </IndexLayout>
          </ChakraProvider>
        </AttendanceContextProvider>
      </AuthContextProvider>
    </>
    
  )
}

export default MyApp
