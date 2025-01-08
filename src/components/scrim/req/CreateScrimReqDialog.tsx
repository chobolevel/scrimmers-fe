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
import { Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { ErrorText } from '@/components'
import { Team } from '@/apis'
import { useForm } from 'react-hook-form'
import { CreateScrimReqRequest, useCreateScrimReq } from '@/apis/scrim'
import { toaster } from '@/components/ui/toaster'

interface CreateScimReqDialogProps {
  fromTeam: Team
  toTeam: Team
}

const CreateScrimReqDialog = ({
  fromTeam,
  toTeam,
}: CreateScimReqDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateScrimReqRequest>({
    defaultValues: {
      from_team_id: fromTeam.id,
      to_team_id: toTeam.id,
    },
  })

  const { mutate: createScrimReq } = useCreateScrimReq()
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button size={'sm'} fontWeight={'bold'} colorPalette={'blue'}>
          스크림 신청
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Flex
          direction={'column'}
          as={'form'}
          onSubmit={handleSubmit(
            useCallback((data) => {
              createScrimReq(data, {
                onSuccess: () => {
                  setOpen(false)
                  toaster.create({
                    type: 'success',
                    title: '스크림 신청 완료',
                  })
                },
              })
            }, []),
          )}
        >
          <DialogHeader>
            <DialogTitle>{toTeam.name}팀에게 스크림 신청</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex direction={'column'} gap={2}>
              <Text fontWeight={'bold'}>신청문</Text>
              <Textarea
                placeholder={'스크림 신청문'}
                minH={140}
                {...register('comment', {
                  required: '신청문이 입력되지 않았습니다.',
                  minLength: {
                    value: 10,
                    message: '신청문은 최소 10자 이상 작성해야합니다.',
                  },
                })}
              />
              <ErrorMessage
                name={'comment'}
                errors={errors}
                render={({ message }) => <ErrorText message={message} />}
              />
            </Flex>
          </DialogBody>
          <DialogFooter>
            <Button variant={'surface'} type={'submit'}>
              신청
            </Button>
            <DialogActionTrigger asChild>
              <Button fontWeight={'bold'}>취소</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </Flex>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default CreateScrimReqDialog
