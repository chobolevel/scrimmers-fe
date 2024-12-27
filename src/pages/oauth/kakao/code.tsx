import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  KakaoTokenApi,
  KakaoTokenRequest,
  KakaoTokenResponse,
  KakaoUserApi,
  KakaoUserResponse,
  useLogin,
} from '@/apis'
import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { Flex, Spinner } from '@chakra-ui/react'

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
              login(
                {
                  email: res.data.kakao_account.email,
                  social_id: res.data.id,
                  login_type: 'KAKAO',
                },
                {
                  onSuccess: () => {
                    // TODO 홈 화면 리다이렉팅
                    router.push('/')
                  },
                  onError: () => {
                    // TODO 회원가입 화면 리다이렉팅
                    router.push('/sign/up')
                  },
                },
              )
            })
            .catch((error) => {
              // TODO 로그인 화면 리다이렉팅
              console.log(error)
            })
        })
        .catch((error) => {
          // TODO 로그인 화면 리다이렉팅
          console.error(error)
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
        <Flex w={'100vw'} h={'100vh'} justify={'center'} align={'center'}>
          <Spinner size={'lg'} />
        </Flex>
      </ResponsiveLayout>
    </>
  )
}

export default KakaoCodePage
