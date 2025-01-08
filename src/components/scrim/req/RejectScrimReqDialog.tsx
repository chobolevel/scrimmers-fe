import { Button, Flex, Text, Textarea } from '@chakra-ui/react'
import { ErrorText } from '@/components'
import {
  RejectScrimReqRequest,
  ScrimReq,
  useInvalidate,
  useRejectScrimReq,
} from '@/apis'
import { useCallback, useMemo, useState } from 'react'
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
import { ErrorMessage } from '@hookform/error-message'
import { useForm } from 'react-hook-form'
import { ApiV1Paths, toUrl } from '@/constants'

interface RejectScrimReqDialogProps {
  scrimReq: ScrimReq
}

const RejectScrimReqDialog = ({ scrimReq }: RejectScrimReqDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const invalidate = useInvalidate(toUrl(ApiV1Paths.SCRIM_REQUESTS))
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RejectScrimReqRequest>({
    defaultValues: {
      id: scrimReq.id,
    },
  })

  const { mutate: rejectScrimReq } = useRejectScrimReq()

  const fromTeam = useMemo(() => scrimReq.from_team, [scrimReq])
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button size={'xs'} fontWeight={'bold'} colorPalette={'red'}>
          거절
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Flex
          direction={'column'}
          as={'form'}
          onSubmit={handleSubmit(
            useCallback((data) => {
              rejectScrimReq(data, {
                onSuccess: () => {
                  setOpen(false)
                  invalidate()
                },
              })
            }, []),
          )}
        >
          <DialogHeader>
            <DialogTitle>{`${fromTeam.name}팀의 스크링 요청 거절`}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex direction={'column'} gap={2}>
              <Text fontWeight={'bold'}>거절 사유</Text>
              <Textarea
                placeholder={'거절 사유'}
                minH={140}
                {...register('reject_reason', {
                  required: '거절 사유가 입력되지 않았습니다.',
                  minLength: {
                    value: 10,
                    message: '거절 사유는 최소 10자 이상 작성해야합니다.',
                  },
                })}
              />
              <ErrorMessage
                name={'reject_reason'}
                errors={errors}
                render={({ message }) => <ErrorText message={message} />}
              />
            </Flex>
          </DialogBody>
          <DialogFooter>
            <Button type={'submit'} fontWeight={'bold'} variant={'surface'}>
              거절
            </Button>
            <DialogActionTrigger asChild>
              <Button fontWeight={'bold'}>닫기</Button>
            </DialogActionTrigger>
          </DialogFooter>
        </Flex>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default RejectScrimReqDialog
