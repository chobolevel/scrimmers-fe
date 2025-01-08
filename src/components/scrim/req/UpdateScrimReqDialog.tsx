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
import {
  ScrimReq,
  UpdateScrimReqRequest,
  useInvalidate,
  useUpdateScrimReq,
} from '@/apis'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorText } from '@/components'
import { ErrorMessage } from '@hookform/error-message'
import { ApiV1Paths, toUrl } from '@/constants'
import { toaster } from '@/components/ui/toaster'

interface UpdateScrimReqDialogProps {
  scrimReq: ScrimReq
}

const UpdateScrimReqDialog = ({ scrimReq }: UpdateScrimReqDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const invalidate = useInvalidate(toUrl(ApiV1Paths.SCRIM_REQUESTS))
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateScrimReqRequest>({
    defaultValues: {
      id: scrimReq.id,
      comment: scrimReq.comment,
      update_mask: ['COMMENT'],
    },
  })

  const { mutate: updateScrimReq } = useUpdateScrimReq()
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button size={'xs'} fontWeight={'bold'} variant={'surface'}>
          수정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Flex
          direction={'column'}
          as={'form'}
          onSubmit={handleSubmit(
            useCallback((data) => {
              updateScrimReq(data, {
                onSuccess: () => {
                  setOpen(false)
                  invalidate()
                  toaster.create({
                    type: 'success',
                    title: '스크림 요청 수정 완료',
                  })
                },
              })
            }, []),
          )}
        >
          <DialogHeader>
            <DialogTitle>스크림 신청문</DialogTitle>
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
            <Button type={'submit'} fontWeight={'bold'} variant={'surface'}>
              수정
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

export default UpdateScrimReqDialog
