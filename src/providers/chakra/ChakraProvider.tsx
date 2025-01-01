'use client'

import {
  ChakraProvider as _ChakraProvider,
  ChakraProviderProps,
} from '@chakra-ui/react'
import { ColorModeProvider } from '@/components/ui/color-mode'

const ChakraProvider = ({ value, children }: ChakraProviderProps) => {
  return (
    <_ChakraProvider value={value}>
      <ColorModeProvider forcedTheme={'dark'}>{children}</ColorModeProvider>
    </_ChakraProvider>
  )
}

export default ChakraProvider
