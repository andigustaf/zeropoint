import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import IndexLayout from '../layouts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <IndexLayout>
          <Component {...pageProps} />
        </IndexLayout>
      </ChakraProvider>
    </AuthContextProvider>
    
  )
}

export default MyApp
