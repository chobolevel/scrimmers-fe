import { Flex, Text } from '@chakra-ui/react'
import { PagePaths } from '@/constants'
import { useRouter } from 'next/router'
import { useGetMe, useLogout } from '@/apis'
import { useMemo } from 'react'

const GeneralLayoutHeader = () => {
  const router = useRouter()

  const { data: me } = useGetMe()
  const { mutate: logout } = useLogout()

  const isAuthenticated = useMemo(() => !!me, [me])
  return (
    <Flex justify={'center'} fontWeight={'bold'}>
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
          {isAuthenticated ? (
            <>
              <Text
                cursor={'pointer'}
                onClick={() => {
                  logout(undefined, {
                    onSuccess: () => {
                      router.push(PagePaths.HOME)
                    },
                  })
                }}
              >
                로그아웃
              </Text>
            </>
          ) : (
            <>
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
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GeneralLayoutHeader
