import { Text } from '@chakra-ui/react'

interface ErrorTextProps {
  message: string
}

const ErrorText = ({ message }: ErrorTextProps) => {
  return (
    <Text color={'red'} fontSize={'sm'}>
      {message}
    </Text>
  )
}

export default ErrorText
