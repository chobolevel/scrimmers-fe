import { Flex, Link } from '@chakra-ui/react'
import { PagePaths } from '@/constants'

const GeneralLayoutHeader = () => {
  return (
    <Flex justify={'center'}>
      <Flex
        w={'100%'}
        maxW={'1000px'}
        p={2}
        align={'center'}
        justify={'space-between'}
      >
        <Flex>
          <Link href={PagePaths.HOME} color={'white'} fontWeight={'bold'}>
            SCRIMMERS
          </Link>
        </Flex>
        <Flex>
          <Link href={PagePaths.SignIn} color={'white'}>
            로그인
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GeneralLayoutHeader
