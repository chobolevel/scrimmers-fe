import { Flex, Text } from '@chakra-ui/react'
import { useMemo } from 'react'

const GeneralLayoutFooter = () => {
  const year = useMemo(() => new Date().getFullYear(), [])
  return (
    <Flex justify={'center'}>
      <Flex
        w={'100%'}
        maxW={'1000px'}
        p={2}
        justify={'center'}
        align={'center'}
      >
        <Text
          fontWeight={'bold'}
        >{`Copyright ${year} Scrimmers All rights reserved.`}</Text>
      </Flex>
    </Flex>
  )
}

export default GeneralLayoutFooter
