import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { useGetMe } from '@/apis'
import { Flex, Text } from '@chakra-ui/react'
import { MyProfile } from '@/components'
import React from 'react'

const MyProfilePage = () => {
  const { data: me } = useGetMe()
  return (
    <>
      <Head>
        <title>{'나의 프로필 - 스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>
        {me ? (
          <MyProfile user={me} />
        ) : (
          <Flex
            direction={'column'}
            h={300}
            justify={'center'}
            align={'center'}
          >
            <Text fontSize={'lg'} fontWeight={'bold'}>
              스크리머를 찾을 수 없습니다.
            </Text>
          </Flex>
        )}
      </ResponsiveLayout>
    </>
  )
}

export default MyProfilePage
