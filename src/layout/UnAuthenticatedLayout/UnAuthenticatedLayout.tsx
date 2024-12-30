import { Flex } from '@chakra-ui/react'
import React from 'react'

interface UnAuthenticatedLayoutProps {
  children: React.ReactNode
}

const UnAuthenticatedLayout = ({ children }: UnAuthenticatedLayoutProps) => {
  return (
    <Flex
      direction={'column'}
      p={10}
      w={'100%'}
      minH={'100vh'}
      justify={'center'}
      align={'center'}
      bgColor={'blue.950'}
    >
      {children}
    </Flex>
  )
}

export default UnAuthenticatedLayout
