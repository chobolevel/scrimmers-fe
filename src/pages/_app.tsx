import { AppProps } from 'next/app'
import { ChakraProvider, ReactQueryProvider } from '@/providers'
import { defaultSystem } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReactQueryProvider>
      <ChakraProvider value={defaultSystem}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ReactQueryProvider>
  )
}

export default App
