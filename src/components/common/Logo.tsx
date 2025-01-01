import { Text, TextProps } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { PagePaths } from '@/constants'

interface LogoProps extends TextProps {
  children?: React.ReactNode
}

const Logo = ({ ...rest }: LogoProps) => {
  const router = useRouter()
  return (
    <Text
      fontSize={rest.fontSize ? rest.fontSize : 'lg'}
      fontWeight={'bold'}
      cursor={'pointer'}
      onClick={() => {
        router.push(PagePaths.HOME)
      }}
    >
      SCRIMMERS
    </Text>
  )
}

export default Logo
