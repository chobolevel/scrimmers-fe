import Head from 'next/head'
import { UnAuthenticatedLayout } from '@/layout'
import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Api, ApiResponse, GoogleUserApi, LoginRequest } from '@/apis'
import { ApiV1Paths, PagePaths } from '@/constants'
import { toaster } from '@/components/ui/toaster'
import { encodeToBase64 } from 'next/dist/build/webpack/loaders/utils'

const GoogleCodePage = () => {
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(router.asPath.split('#')[1])
    const accessToken = params.get('access_token')
    GoogleUserApi.instance
      .get(`/oauth2/v1/userinfo?access_token=${accessToken}`)
      .then((res) => {
        const req = {
          email: res.data.email,
          social_id: res.data.id,
          login_type: 'GOOGLE',
        } as LoginRequest
        Api.instance
          .post<ApiResponse<boolean>>(ApiV1Paths.LOGIN, req)
          .then(() => {
            router.push(PagePaths.HOME)
          })
          .catch(() => {
            router.push({
              pathname: PagePaths.SocialSignUp,
              query: {
                base: encodeToBase64(req),
              },
            })
          })
      })
      .catch(() => {
        router.push(PagePaths.HOME).then(() => {
          toaster.create({
            type: 'error',
            title: '구글 로그인 실패',
            description: '구글 로그인에 실패하였습니다. 다시 시도해 주세요.',
          })
        })
      })
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
      <UnAuthenticatedLayout>
        <Flex w={'100%'} h={'100%'} justify={'center'} align={'center'}>
          <Spinner size={'lg'} />
        </Flex>
      </UnAuthenticatedLayout>
    </>
  )
}

export default GoogleCodePage
