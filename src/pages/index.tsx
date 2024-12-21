import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'

const HomePage = () => {
  return (
    <>
      <Head>
        <title>{'스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>HOME</ResponsiveLayout>
    </>
  )
}

export default HomePage
