import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  KakaoTokenApi,
  KakaoTokenRequest,
  KakaoTokenResponse,
  KakaoUserApi,
  KakaoUserResponse,
  LoginRequest,
  useLogin,
} from '@/apis'
import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { Flex, Spinner } from '@chakra-ui/react'
import { PagePaths } from '@/constants'
import { toaster } from '@/components/ui/toaster'
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils'

const KakaoCodePage = () => {
  const router = useRouter()
  const { mutate: login } = useLogin()

  useEffect(() => {
    if (router.query.code) {
      KakaoTokenApi.instance
        .post<KakaoTokenResponse>('/oauth/token', {
          grant_type: 'authorization_code',
          client_id: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
          redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          code: router.query.code,
        } as KakaoTokenRequest)
        .then((res) => {
          KakaoUserApi.instance.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
          KakaoUserApi.instance
            .get<KakaoUserResponse>('/v2/user/me')
            .then((res) => {
              const loginRequest = {
                email: res.data.kakao_account.email,
                social_id: res.data.id,
                login_type: 'KAKAO',
              } as LoginRequest
              login(loginRequest, {
                onSuccess: () => {
                  router.push(PagePaths.HOME)
                },
                onError: () => {
                  router.push({
                    pathname: PagePaths.SocialSignUp,
                    query: {
                      base: encodeToBase64(loginRequest),
                    },
                  })
                },
              })
            })
            .catch(() => {
              router.push(PagePaths.HOME).then(() => {
                toaster.create({
                  type: 'error',
                  title: '카카오 로그인 실패',
                  description:
                    '카카로 로그인에 실패하였습니다. 다시 시도해 주세요.',
                })
              })
            })
        })
        .catch(() => {
          router.push(PagePaths.HOME).then(() => {
            toaster.create({
              type: 'error',
              title: '카카오 로그인 실패',
              description:
                '카카로 로그인에 실패하였습니다. 다시 시도해 주세요.',
            })
          })
        })
    }
  }, [router])
  return (
    <>
      <Head>
        <title>{'카카오 로그인 - 스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>
        <Flex w={'100%'} h={1000} justify={'center'} align={'center'}>
          <Spinner size={'lg'} />
        </Flex>
      </ResponsiveLayout>
    </>
  )
}

export default KakaoCodePage
