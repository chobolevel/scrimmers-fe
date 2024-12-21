import Head from 'next/head'

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
    </>
  )
}

export default HomePage
