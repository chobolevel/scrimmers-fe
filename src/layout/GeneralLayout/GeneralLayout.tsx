import { Flex } from '@chakra-ui/react'
import React from 'react'

interface GeneralLayoutProps {
  children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return <Flex>{children}</Flex>
}

export default GeneralLayout
