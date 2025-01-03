import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Nullable } from '@zag-js/utils'
import { Api, ApiResponse, Team } from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { TeamDetail } from '@/components'

const TeamDetailPage = ({
  team,
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
        {team ? (
          <TeamDetail team={team} />
        ) : (
          <Flex h={200} align={'center'} justify={'center'}>
            <Text>해당 팀을 찾을 수 없습니다.</Text>
          </Flex>
        )}
      </ResponsiveLayout>
    </>
  )
}

export default TeamDetailPage

export const getServerSideProps: GetServerSideProps<{
  team: Nullable<Team>
  metadata: { title: string; description: string }
}> = async (context) => {
  const id = context.query.id as string

  return await Api.instance
    .get<ApiResponse<Team>>(toUrl(ApiV1Paths.TEAMS, { id }))
    .then((res) => {
      return {
        props: {
          team: res.data.data,
          metadata: {
            title: `${res.data.data.name} - 스크리머즈`,
            description: `스크리머즈에서 ${res.data.data.name}팀의 상세 정보를 확인해보세요!`,
          },
        },
      }
    })
    .catch(() => {
      return {
        props: {
          team: null,
          metadata: {
            title: '팀을 찾을 수 없습니다. - 스크리머즈',
            description: `해당 팀을 찾을 수 없습니다.`,
          },
        },
      }
    })
}
