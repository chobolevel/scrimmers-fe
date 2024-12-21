import { Flex } from '@chakra-ui/react'
import React from 'react'

interface MobileLayoutProps {
  children: React.ReactNode
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return <Flex>{children}</Flex>
}

export default MobileLayout
