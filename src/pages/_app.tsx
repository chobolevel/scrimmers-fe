import { AppProps } from 'next/app'
import { ChakraProvider, ReactQueryProvider } from '@/providers'
import { defaultSystem } from '@chakra-ui/react'
import { Toaster } from '@/components/ui/toaster'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReactQueryProvider>
      <ChakraProvider value={defaultSystem}>
        <Component {...pageProps} />
        <Toaster />
      </ChakraProvider>
    </ReactQueryProvider>
  )
}

export default App
