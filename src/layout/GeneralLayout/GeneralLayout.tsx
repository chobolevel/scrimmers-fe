import { Flex } from '@chakra-ui/react'
import React from 'react'
import { GeneralLayoutFooter, GeneralLayoutHeader } from '@/layout'

interface GeneralLayoutProps {
  children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <Flex
      minH={'100vh'}
      direction={'column'}
      bgColor={'blue.950'}
      position={'relative'}
    >
      <GeneralLayoutHeader />
      <Flex direction={'column'} align={'center'}>
        <Flex w={'100%'} maxW={1000} py={4} direction={'column'}>
          {children}
        </Flex>
      </Flex>
      <GeneralLayoutFooter />
    </Flex>
  )
}

export default GeneralLayout
