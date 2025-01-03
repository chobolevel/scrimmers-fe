import { Badge, Flex, Image, Separator, Spinner, Text } from '@chakra-ui/react'
import { RiTeamFill } from 'react-icons/ri'
import { FaCrown } from 'react-icons/fa6'
import { PagePaths, toUrl } from '@/constants'
import { MdSupervisorAccount } from 'react-icons/md'
import { UserList } from '@/components'
import React, { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Team, useGetUsers } from '@/apis'

interface TeamDetailProps {
  team: Team
}

const TeamDetail = ({ team }: TeamDetailProps) => {
  const router = useRouter()

  const { data: users, isFetching } = useGetUsers(
    {
      teamId: router.query.id as string,
    },
    !!router.query.id,
  )

  const logo = useMemo(() => team?.logo, [team])
  return (
    <Flex direction={'column'} gap={6}>
      <Flex direction={'column'} gap={4}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          팀 정보
        </Text>
        <Flex p={4} align={'center'} gap={10}>
          <Flex direction={'column'} align={'center'} w={100} h={100} gap={2}>
            {logo ? (
              <Image
                w={100}
                h={100}
                src={logo.url}
                alt={`${team.name} 로고 이미지`}
                objectFit={'contain'}
              />
            ) : (
              <RiTeamFill size={100} />
            )}
            <Badge size={'lg'} fontWeight={'bold'}>
              {team.name}
            </Badge>
          </Flex>
          <Flex direction={'column'} gap={2}>
            <Flex align={'center'} gap={2}>
              <FaCrown size={20} />
              <Text
                cursor={'pointer'}
                _hover={{
                  textDecoration: 'underline',
                }}
                onClick={() => {
                  router.push(
                    toUrl(PagePaths.UserProfile, { id: team.owner_id }),
                  )
                }}
              >
                {team.owner_nickname}
              </Text>
            </Flex>
            <Flex align={'center'} gap={2}>
              <MdSupervisorAccount size={20} />
              <Text>{`${team.head_count}/${team.max_head_count}`}</Text>
            </Flex>
            <Text lineClamp={2}>{team.description}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Separator />
      <Flex direction={'column'} gap={4}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          팀원
        </Text>
        {users ? (
          <UserList users={users.data} />
        ) : (
          <Flex h={200} justify={'center'} align={'center'}>
            {isFetching ? (
              <Spinner size={'lg'} />
            ) : (
              <Text fontWeight={'bold'}>검색 조건에 맞는 팀원이 없습니다.</Text>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default TeamDetail
