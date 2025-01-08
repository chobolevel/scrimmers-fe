import { Flex } from '@chakra-ui/react'
import { Team, User } from '@/apis'
import { TeamUserListItem } from '@/components'

interface UserListProps {
  team: Team
  users: User[]
}

const TeamUserList = ({ team, users }: UserListProps) => {
  return (
    <Flex direction={'column'}>
      {users.map((user, idx) => {
        return <TeamUserListItem key={idx} team={team} user={user} />
      })}
    </Flex>
  )
}

export default TeamUserList
