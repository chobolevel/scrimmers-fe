import Head from 'next/head'
import React from 'react'
import { ResponsiveLayout } from '@/layout'
import { ChangePasswordForm } from '@/components'

const MyPasswordPage = () => {
  return (
    <>
      <Head>
        <title>{'나의 비밀번호 관리 - 스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>
        <ChangePasswordForm />
      </ResponsiveLayout>
    </>
  )
}

export default MyPasswordPage
