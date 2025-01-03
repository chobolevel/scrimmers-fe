import React from 'react'
import { UserDetail } from '@/apis'
import { Button, Flex, Separator } from '@chakra-ui/react'
import {
  MyProfileSummonerSection,
  MyProfileTeamSection,
  MyProfileUserSection,
} from '@/components'
import { useRouter } from 'next/router'
import { PagePaths } from '@/constants'

interface MyProfileProps {
  user: UserDetail
}

const MyProfile = ({ user }: MyProfileProps) => {
  const router = useRouter()
  return (
    <Flex w={'100%'} direction={'column'} gap={10}>
      <MyProfileUserSection user={user} />
      <Separator />
      <MyProfileTeamSection team={user.team} />
      <Separator />
      <MyProfileSummonerSection summoners={user.summoners} />
      <Flex align={'center'} justify={'end'} gap={2}>
        <Button
          variant={'surface'}
          size={'sm'}
          fontWeight={'bold'}
          onClick={() => {
            router.push(PagePaths.MyPassword)
          }}
        >
          비밀번호 관리
        </Button>
      </Flex>
    </Flex>
  )
}

export default MyProfile
