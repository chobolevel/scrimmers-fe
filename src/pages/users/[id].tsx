import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Api, ApiResponse, UserDetail } from '@/apis'
import { Nullable } from '@zag-js/utils'
import { ApiV1Paths, toUrl } from '@/constants'
import { Flex, Text } from '@chakra-ui/react'

const UserProfilePage = ({
  user,
  metadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>
        {user ? (
          <Flex direction={'column'}>{user.nickname}</Flex>
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

export default UserProfilePage

export const getServerSideProps: GetServerSideProps<{
  user: Nullable<UserDetail>
  metadata: { title: string; description: string }
}> = async (context) => {
  const id = context.query.id as string

  return await Api.instance
    .get<ApiResponse<UserDetail>>(toUrl(ApiV1Paths.USERS, { id }))
    .then((res) => {
      return {
        props: {
          user: res.data.data,
          metadata: {
            title: `${res.data.data.nickname}님의 프로필 - 스크리머즈`,
            description: `스크리머즈에서 ${res.data.data.nickname}님의 프로필을 확인해보세요!`,
          },
        },
      }
    })
    .catch(() => {
      return {
        props: {
          user: null,
          metadata: {
            title: '스크리머를 찾을 수 없습니다 - 스크리머즈',
            description: `해당 스크리머를 찾을 수 없습니다.`,
          },
        },
      }
    })
}
