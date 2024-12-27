import { Flex } from '@chakra-ui/react'
import React from 'react'
import { GeneralLayoutFooter, GeneralLayoutHeader } from '@/layout'

interface GeneralLayoutProps {
  children: React.ReactNode
}

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
  return (
    <Flex direction={'column'}>
      <GeneralLayoutHeader />
      {children}
      <GeneralLayoutFooter />
    </Flex>
  )
}

export default GeneralLayout
