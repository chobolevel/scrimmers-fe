import { AppProps } from 'next/app'
import { ChakraProvider } from '@/providers'
import { defaultSystem } from '@chakra-ui/react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
