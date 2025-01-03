import { UserDetail } from '@/apis'
import { Flex, Separator } from '@chakra-ui/react'
import {
  UserProfileInfoSection,
  UserProfileSummonerSection,
  UserProfileTeamSection,
} from '@/components'

interface UserProfileProps {
  user: UserDetail
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <Flex w={'100%'} direction={'column'} gap={10}>
      <UserProfileInfoSection user={user} />
      <Separator />
      <UserProfileTeamSection team={user.team} />
      <Separator />
      <UserProfileSummonerSection summoners={user.summoners} />
    </Flex>
  )
}

export default UserProfile
