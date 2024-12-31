import { Flex } from '@chakra-ui/react'
import React from 'react'
import { MobileLayoutFooter, MobileLayoutHeader } from '@/layout'

interface MobileLayoutProps {
  children: React.ReactNode
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <Flex minH={'100vh'} direction={'column'} bgColor={'blue.950'}>
      <MobileLayoutHeader />
      <Flex direction={'column'} p={4}>
        {children}
      </Flex>
      <MobileLayoutFooter />
    </Flex>
  )
}

export default MobileLayout
