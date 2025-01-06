import { Flex } from '@chakra-ui/react'
import { User } from '@/apis'
import { TeamUserListItem } from '@/components'

interface UserListProps {
  users: User[]
}

const TeamUserList = ({ users }: UserListProps) => {
  return (
    <Flex direction={'column'}>
      {users.map((user, idx) => {
        return <TeamUserListItem key={idx} user={user} />
      })}
    </Flex>
  )
}

export default TeamUserList
