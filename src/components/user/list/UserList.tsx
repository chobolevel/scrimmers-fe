import { Flex } from '@chakra-ui/react'
import { User } from '@/apis'
import { UserListItem } from '@/components'

interface UserListProps {
  users: User[]
}

const UserList = ({ users }: UserListProps) => {
  return (
    <Flex direction={'column'}>
      {users.map((user, idx) => {
        return <UserListItem key={idx} user={user} />
      })}
    </Flex>
  )
}

export default UserList
