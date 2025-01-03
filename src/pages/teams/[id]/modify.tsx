import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useGetMe, useGetTeam } from '@/apis'
import { ModifyTeamForm } from '@/components'
import { useEffect } from 'react'
import { PagePaths, toUrl } from '@/constants'
import { toaster } from '@/components/ui/toaster'

const ModifyTeamPage = () => {
  const router = useRouter()

  const { data: me } = useGetMe()
  const { data: team } = useGetTeam(
    {
      id: router.query.id as string,
    },
    !!router.query.id,
  )

  useEffect(() => {
    if (me && team) {
      if (me.id !== team.owner_id) {
        router.push(toUrl(PagePaths.TeamDetail, { id: team.id })).then(() => {
          toaster.create({
            type: 'info',
            title: '팀 정보 수정은 팀장만 접근할 수 있습니다.',
          })
        })
      }
    }
  }, [me, team])
  return (
    <>
      <Head>
        <title>{'팀 정보 수정 - 스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>
        {me && team ? (
          <ModifyTeamForm team={team} />
        ) : (
          <Flex h={200} align={'center'} justify={'center'}>
            <Text>해당 팀을 찾을 수 없습니다.</Text>
          </Flex>
        )}
      </ResponsiveLayout>
    </>
  )
}

export default ModifyTeamPage
