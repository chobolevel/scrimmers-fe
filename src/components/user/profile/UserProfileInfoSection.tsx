import { Badge, Flex, Image, Text } from '@chakra-ui/react'
import { FaUserAlt } from 'react-icons/fa'
import { UserDetail, UserGenderTypeObj, UserPositionTypeObj } from '@/apis'
import { useMemo } from 'react'

interface UserProfileInfoSectionProps {
  user: UserDetail
}

const UserProfileInfoSection = ({ user }: UserProfileInfoSectionProps) => {
  const profileImage = useMemo(
    () => (user?.profile_image ? user.profile_image : null),
    [user],
  )
  const gender = useMemo(() => UserGenderTypeObj[user.gender], [user])
  return (
    <Flex direction={'column'} gap={4}>
      <Text fontSize={'lg'} fontWeight={'bold'}>
        회원정보
      </Text>
      <Flex direction={{ base: 'column', lg: 'row' }} gap={10} align={'center'}>
        <Flex direction={'column'} align={'center'} gap={4}>
          {profileImage ? (
            <Image
              w={150}
              h={150}
              src={profileImage.url}
              alt={`${user.nickname}님의 프로필 이미지`}
            />
          ) : (
            <FaUserAlt size={150} />
          )}
        </Flex>
        <Flex direction={'column'} gap={4}>
          <Flex align={'center'} gap={2}>
            <Text
              fontSize={'lg'}
              fontWeight={'bold'}
            >{`${user.nickname}님의 프로필`}</Text>
            <Badge size={'lg'} colorPalette={gender.color} fontWeight={'bold'}>
              {`${user.age_range}대 ${gender.label}`}
            </Badge>
          </Flex>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align={'center'}
            gap={4}
          >
            <Flex gap={2} align={'center'}>
              <Text fontWeight={'bold'}>주포지션</Text>
              <Image
                w={30}
                h={30}
                src={UserPositionTypeObj[user.main_position].icon}
                alt={UserPositionTypeObj[user.main_position].label}
              />
            </Flex>
            <Flex gap={2} align={'center'}>
              <Text fontWeight={'bold'}>부포지션</Text>
              <Image
                w={30}
                h={30}
                src={UserPositionTypeObj[user.sub_position].icon}
                alt={UserPositionTypeObj[user.sub_position].label}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default UserProfileInfoSection
