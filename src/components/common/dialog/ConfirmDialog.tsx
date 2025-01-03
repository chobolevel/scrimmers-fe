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

interface ConfirmDialogProps {
  buttonText: string
  buttonStyle: ButtonProps
  title: string
  description: string
  onConfirm: () => void
}

const ConfirmDialog = ({
  buttonText,
  buttonStyle,
  title,
  description,
  onConfirm,
}: ConfirmDialogProps) => {
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
          <Text>{description}</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={onConfirm} variant={'surface'}>
              확인
            </Button>
          </DialogActionTrigger>
          <DialogActionTrigger asChild>
            <Button fontWeight={'bold'}>취소</Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default ConfirmDialog
