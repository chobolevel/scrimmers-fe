import { Flex } from '@chakra-ui/react'
import { Team } from '@/apis'
import { TeamListItem } from '@/components'

interface TeamListProps {
  teams: Team[]
}

const TeamList = ({ teams }: TeamListProps) => {
  return (
    <Flex direction={'column'}>
      {teams.map((team, idx) => {
        return <TeamListItem key={idx} team={team} />
      })}
    </Flex>
  )
}

export default TeamList
