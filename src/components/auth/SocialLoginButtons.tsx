import { Flex, Link } from '@chakra-ui/react'
import { KakaoLoginPageUrl, NaverLoginPageUrl } from '@/apis'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import { FaGoogle } from 'react-icons/fa'

const SocialLoginButtons = () => {
  return (
    <Flex gap={4}>
      <Link
        p={4}
        borderRadius={10}
        bgColor={'#fde500'}
        href={KakaoLoginPageUrl}
      >
        <RiKakaoTalkFill size={24} color={'#1c1b18'} />
      </Link>
      <Link
        p={4}
        borderRadius={10}
        bgColor={'#03c75b'}
        href={NaverLoginPageUrl}
      >
        <SiNaver size={24} color={'white'} />
      </Link>
      <Link p={4} borderRadius={10} bgColor={'gray'}>
        <FaGoogle size={24} color={'white'} />
      </Link>
    </Flex>
  )
}

export default SocialLoginButtons
