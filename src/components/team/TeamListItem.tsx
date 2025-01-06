import { Badge, Flex, Image, Text } from '@chakra-ui/react'
import { Team } from '@/apis'
import React, { useMemo } from 'react'
import { RiTeamFill } from 'react-icons/ri'
import { FaCrown } from 'react-icons/fa6'
import { PagePaths, toUrl } from '@/constants'
import { MdSupervisorAccount } from 'react-icons/md'
import { useRouter } from 'next/router'

interface TeamListItemProps {
  team: Team
}

const TeamListItem = ({ team }: TeamListItemProps) => {
  const router = useRouter()

  const logo = useMemo(() => team.logo, [team])
  return (
    <Flex p={4} align={'center'} gap={10}>
      <Flex
        direction={'column'}
        align={'center'}
        w={100}
        h={100}
        gap={2}
        cursor={'pointer'}
        onClick={() => {
          router.push(toUrl(PagePaths.TeamDetail, { id: team.id }))
        }}
      >
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
              router.push(toUrl(PagePaths.UserProfile, { id: team.owner_id }))
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
  )
}

export default TeamListItem
