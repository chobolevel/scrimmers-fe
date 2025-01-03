import { Badge, Flex, Image, Text } from '@chakra-ui/react'
import { User, UserGenderTypeObj, UserPositionTypeObj } from '@/apis'
import { useMemo } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { router } from 'next/client'
import { PagePaths, toUrl } from '@/constants'

interface UserListItemProps {
  user: User
}

const UserListItem = ({ user }: UserListItemProps) => {
  const profileImage = useMemo(() => user?.profile_image, [user])
  const gender = useMemo(() => UserGenderTypeObj[user.gender], [user])
  const mainPosition = useMemo(
    () => UserPositionTypeObj[user.main_position],
    [user],
  )
  const subPosition = useMemo(
    () => UserPositionTypeObj[user.sub_position],
    [user],
  )
  return (
    <Flex align={'center'} gap={10} p={4}>
      <Flex w={50} h={50}>
        {profileImage ? (
          <Image
            src={profileImage.url}
            alt={`${user.nickname}님의 프로필 이미지`}
          />
        ) : (
          <FaUserAlt size={50} />
        )}
      </Flex>
      <Flex direction={'column'} gap={2}>
        <Flex align={'center'} gap={2}>
          <Text
            fontWeight={'bold'}
            cursor={'pointer'}
            _hover={{ textDecoration: 'underline' }}
            onClick={() => {
              router.push(toUrl(PagePaths.UserProfile, { id: user.id }))
            }}
          >{`${user.nickname}님`}</Text>
          <Badge size={'lg'} colorPalette={gender.color} fontWeight={'bold'}>
            {`${user.age_range}대 ${gender.label}`}
          </Badge>
        </Flex>
        <Flex align={'center'} gap={4}>
          <Flex align={'center'} gap={2}>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              주포지션
            </Text>
            <Image
              w={30}
              h={30}
              src={mainPosition.icon}
              alt={mainPosition.label}
            />
          </Flex>
          <Flex align={'center'} gap={2}>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              부포지션
            </Text>
            <Image
              w={30}
              h={30}
              src={subPosition.icon}
              alt={subPosition.label}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default UserListItem
