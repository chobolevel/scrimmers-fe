import Head from 'next/head'
import { UnAuthenticatedLayout } from '@/layout'
import { SignUpForm } from '@/components'

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>{'스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <UnAuthenticatedLayout>
        <SignUpForm />
      </UnAuthenticatedLayout>
    </>
  )
}

export default SignUpPage
