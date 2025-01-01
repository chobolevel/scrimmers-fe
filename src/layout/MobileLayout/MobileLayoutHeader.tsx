import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useGetMe, useLogout } from '@/apis'
import { useMemo } from 'react'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu'
import { PagePaths, toUrl } from '@/constants'
import { TiThMenu } from 'react-icons/ti'

const MobileLayoutHeader = () => {
  const router = useRouter()

  const { data: me } = useGetMe()
  const { mutate: logout } = useLogout()

  const isAuthenticated = useMemo(() => !!me, [me])
  return (
    <Flex
      as={'header'}
      justify={'center'}
      fontWeight={'bold'}
      bgColor={'blue.800'}
    >
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
              logout()
            }}
          >
            SCRIMMERS
          </Text>
        </Flex>
        <Flex align={'center'} gap={2}>
          {isAuthenticated ? (
            <MenuRoot>
              <MenuTrigger>
                <Flex>MENU</Flex>
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  value={'로그아웃'}
                  onClick={() => {
                    logout()
                  }}
                >
                  로그아웃
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          ) : (
            <MenuRoot>
              <MenuTrigger>
                <Flex justify={'center'} align={'center'} cursor={'pointer'}>
                  <TiThMenu size={30} />
                </Flex>
              </MenuTrigger>
              <MenuContent>
                <MenuItem
                  value={'로그인'}
                  onClick={() => {
                    router.push(toUrl(PagePaths.SignIn))
                  }}
                >
                  로그인
                </MenuItem>
                <MenuItem
                  value={'회원가입'}
                  onClick={() => {
                    router.push(toUrl(PagePaths.SignUp))
                  }}
                >
                  회원가입
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default MobileLayoutHeader
