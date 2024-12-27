import { Flex } from '@chakra-ui/react'
import React from 'react'

interface UnAuthenticatedLayoutProps {
  children: React.ReactNode
}

const UnAuthenticatedLayout = ({ children }: UnAuthenticatedLayoutProps) => {
  return (
    <Flex
      direction={'column'}
      w={'100vw'}
      h={'100vh'}
      justify={'center'}
      align={'center'}
      bgColor={'blue.950'}
      color={'white'}
    >
      {children}
    </Flex>
  )
}

export default UnAuthenticatedLayout
