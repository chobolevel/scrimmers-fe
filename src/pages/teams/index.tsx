import Head from 'next/head'
import { ResponsiveLayout } from '@/layout'
import { useGetMe, useGetTeams } from '@/apis'
import { Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { TeamList } from '@/components'
import React, { useMemo, useState } from 'react'
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination'
import { RiTeamFill } from 'react-icons/ri'
import { useRouter } from 'next/router'
import { PagePaths } from '@/constants'

const LIMIT_COUNT = 10

const TeamListPage = () => {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)

  const { data: me } = useGetMe()
  const { data: teams, isFetching } = useGetTeams({
    skipCount: (page - 1) * LIMIT_COUNT,
    limitCount: LIMIT_COUNT,
    orderTypes: ['CREATED_AT_DESC'],
  })

  const team = useMemo(() => me?.team, [me])
  return (
    <>
      <Head>
        <title>{'팀 목록 - 스크리머즈'}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <ResponsiveLayout>
        <Flex direction={'column'} gap={6}>
          <Flex align={'center'} justify={'space-between'}>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              팀
            </Text>
            {!team && (
              <Button
                size={'sm'}
                colorPalette={'blue'}
                fontWeight={'bold'}
                onClick={() => {
                  router.push(PagePaths.TeamRegistration)
                }}
              >
                <RiTeamFill />팀 등록
              </Button>
            )}
          </Flex>
          {teams ? (
            <>
              <TeamList teams={teams.data} />
              <Flex align={'center'} justify={'center'}>
                <PaginationRoot
                  page={page}
                  pageSize={LIMIT_COUNT}
                  count={teams.total_count}
                  onPageChange={(e) => setPage(e.page)}
                  variant={'subtle'}
                >
                  <Flex align={'center'} gap={2}>
                    <PaginationPrevTrigger />
                    <PaginationItems />
                    <PaginationNextTrigger />
                  </Flex>
                </PaginationRoot>
              </Flex>
            </>
          ) : (
            <Flex h={200} align={'center'} justify={'center'}>
              {isFetching ? (
                <Spinner size={'lg'} />
              ) : (
                <Text fontWeight={'bold'}>
                  검색 조건에 맞는 팀을 찾을 수 없습니다.
                </Text>
              )}
            </Flex>
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  )
}

export default TeamListPage
