import { Badge, Flex, Image, Text } from '@chakra-ui/react'
import { Team } from '@/apis'
import { RiTeamFill } from 'react-icons/ri'
import { FaCrown } from 'react-icons/fa6'
import { PagePaths, toUrl } from '@/constants'
import { MdSupervisorAccount } from 'react-icons/md'
import React from 'react'
import { useRouter } from 'next/router'

interface UserProfileTeamSectionProps {
  team?: Team
}

const UserProfileTeamSection = ({ team }: UserProfileTeamSectionProps) => {
  const router = useRouter()
  return (
    <Flex direction={'column'} gap={4}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        팀 정보
      </Text>
      {team ? (
        <Flex align={'center'} gap={10}>
          <Flex
            direction={'column'}
            gap={2}
            align={'center'}
            cursor={'pointer'}
            onClick={() => {
              router.push(toUrl(PagePaths.TeamDetail, { id: team.id }))
            }}
          >
            {team?.logo ? (
              <Image
                w={100}
                h={100}
                src={team.logo.url}
                alt={`${team.name} 로고 이미지`}
                objectFit={'contain'}
              />
            ) : (
              <RiTeamFill size={100} />
            )}
            <Flex>
              <Badge size={'lg'} fontWeight={'bold'}>
                {team.name}
              </Badge>
            </Flex>
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
            <Text>{team.description}</Text>
          </Flex>
        </Flex>
      ) : (
        <Flex h={100} align={'center'} justify={'center'}>
          <Text>현재 소속팀이 없습니다. 새로운 소속팀을 찾아보세요!</Text>
        </Flex>
      )}
    </Flex>
  )
}

export default UserProfileTeamSection
