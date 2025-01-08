import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button, ButtonProps, Text } from '@chakra-ui/react'

interface AlertDialogProps {
  buttonText: string
  buttonStyle: ButtonProps
  title: string
  description: string
}

const AlertDialog = ({
  buttonText,
  buttonStyle,
  title,
  description,
}: AlertDialogProps) => {
  return (
    <DialogRoot role={'alertdialog'}>
      <DialogTrigger asChild>
        <Button {...buttonStyle}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text whiteSpace={'break-spaces'} textAlign={'center'}>
            {description}
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button fontWeight={'bold'}>확인</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AlertDialog
