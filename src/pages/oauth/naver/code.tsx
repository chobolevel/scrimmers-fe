import Head from 'next/head'
import { UnAuthenticatedLayout } from '@/layout'
import { Flex, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {
  Api,
  ApiResponse,
  LoginRequest,
  NaverTokenResponse,
  NaverUserResponse,
} from '@/apis'
import { useEffect } from 'react'
import { ApiV1Paths, PagePaths } from '@/constants'
import { toaster } from '@/components/ui/toaster'
import axios from 'axios'
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils'

const NaverCodePage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.query.code) {
      axios
        .post<NaverTokenResponse>(
          `/naver-token/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET}&code=${router.query.code}&state=${process.env.NEXT_PUBLIC_NAVER_API_STATE}`,
        )
        .then((res) => {
          axios
            .get<NaverUserResponse>(`/naver-me/v1/nid/me`, {
              headers: {
                Authorization: `${res.data.token_type} ${res.data.access_token}`,
              },
            })
            .then((res) => {
              const loginRequest = {
                email: res.data.response.email,
                social_id: res.data.response.id,
                login_type: 'NAVER',
              } as LoginRequest
              Api.instance
                .post<ApiResponse<boolean>>(ApiV1Paths.LOGIN, loginRequest)
                .then(() => {
                  router.push(PagePaths.HOME)
                })
                .catch(() => {
                  router.push({
                    pathname: PagePaths.SocialSignUp,
                    query: {
                      base: encodeToBase64(loginRequest),
                    },
                  })
                })
            })
            .catch(() => {
              router.push(PagePaths.HOME).then(() => {
                toaster.create({
                  type: 'error',
                  title: '네이버 로그인 실패',
                  description:
                    '네이버 로그인에 실패하였습니다. 다시 시도해 주세요.',
                })
              })
            })
        })
        .catch(() => {
          router.push(PagePaths.HOME).then(() => {
            toaster.create({
              type: 'error',
              title: '네이버 로그인 실패',
              description:
                '네이버 로그인에 실패하였습니다. 다시 시도해 주세요.',
            })
          })
        })
    }
  }, [router])
  return (
    <>
      <Head>
        <title>{'네이버 로그인 - 스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <UnAuthenticatedLayout>
        <Flex w={'100%'} h={'100%'} justify={'center'} align={'center'}>
          <Spinner size={'lg'} />
        </Flex>
      </UnAuthenticatedLayout>
    </>
  )
}

export default NaverCodePage
