import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { TeamRegistrationForm } from '@/components'

const TeamRegistrationPage = () => {
  return (
    <>
      <Head>
        <title>{'팀 등록 - 스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>
        <TeamRegistrationForm />
      </ResponsiveLayout>
    </>
  )
}

export default TeamRegistrationPage
