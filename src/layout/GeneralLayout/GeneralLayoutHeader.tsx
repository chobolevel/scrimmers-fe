import { Flex, Text } from '@chakra-ui/react'
import { PagePaths } from '@/constants'
import { useRouter } from 'next/router'

const GeneralLayoutHeader = () => {
  const router = useRouter()
  return (
    <Flex justify={'center'} color={'white'} fontWeight={'bold'}>
      <Flex
        w={'100%'}
        maxW={'1000px'}
        p={2}
        align={'center'}
        justify={'space-between'}
      >
        <Flex align={'center'}>
          <Text
            cursor={'pointer'}
            onClick={() => {
              router.push(PagePaths.HOME)
            }}
          >
            SCRIMMERS
          </Text>
        </Flex>
        <Flex align={'center'} gap={2}>
          <Text
            cursor={'pointer'}
            onClick={() => {
              router.push(PagePaths.SignIn)
            }}
          >
            로그인
          </Text>
          <Text
            cursor={'pointer'}
            onClick={() => {
              router.push(PagePaths.SignUp)
            }}
          >
            회원가입
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GeneralLayoutHeader
