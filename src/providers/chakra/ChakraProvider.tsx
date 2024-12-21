'use client'

import {
  ChakraProvider as _ChakraProvider,
  ChakraProviderProps,
} from '@chakra-ui/react'

const ChakraProvider = ({ value, children }: ChakraProviderProps) => {
  return <_ChakraProvider value={value}>{children}</_ChakraProvider>
}

export default ChakraProvider
