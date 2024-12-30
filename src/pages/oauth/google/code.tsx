import Head from 'next/head'
import { UnAuthenticatedLayout } from '@/layout'
import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const GoogleCodePage = () => {
  const router = useRouter()

  useEffect(() => {
    console.log(router.query)
  }, [])
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
        <Flex w={'100%'} h={1000} justify={'center'} align={'center'}>
          <Spinner size={'lg'} />
        </Flex>
      </UnAuthenticatedLayout>
    </>
  )
}

export default GoogleCodePage
