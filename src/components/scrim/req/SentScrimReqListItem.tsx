import { Badge, Flex, Table } from '@chakra-ui/react'
import { ScrimReq, ScrimReqStatusObj, useDeleteScrimReq } from '@/apis/scrim'
import { useMemo } from 'react'
import moment from 'moment'
import {
  ConfirmDialog,
  ScrimReqRejectReasonDialog,
  UpdateScrimReqDialog,
} from '@/components'
import { toaster } from '@/components/ui/toaster'
import { useInvalidate } from '@/apis'
import { ApiV1Paths, toUrl } from '@/constants'

interface SentScrimReqListItemProps {
  scrimReq: ScrimReq
}

const SentScrimReqListItem = ({ scrimReq }: SentScrimReqListItemProps) => {
  const invalidate = useInvalidate(toUrl(ApiV1Paths.SCRIM_REQUESTS))
  const { mutate: deleteScrimReq } = useDeleteScrimReq()

  const toTeam = useMemo(() => scrimReq.to_team, [scrimReq])
  const status = useMemo(() => ScrimReqStatusObj[scrimReq.status], [scrimReq])
  const isProcessed = useMemo(() => scrimReq.status === 'REQUESTED', [scrimReq])
  const isRejected = useMemo(() => scrimReq.status === 'REJECTED', [scrimReq])
  const createdAt = useMemo(
    () => moment(scrimReq.created_at).format('YYYY-MM-DD'),
    [scrimReq],
  )
  return (
    <Table.Row>
      <Table.Cell textAlign={'center'} fontWeight={'bold'}>
        {toTeam.name}
      </Table.Cell>
      <Table.Cell textAlign={'center'}>
        <Badge size={'lg'} colorPalette={status.color}>
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell textAlign={'center'}>{createdAt}</Table.Cell>
      <Table.Cell>
        <Flex align={'center'} justify={'center'} gap={2}>
          {isProcessed && (
            <>
              <UpdateScrimReqDialog scrimReq={scrimReq} />
              <ConfirmDialog
                buttonText={'삭제'}
                buttonStyle={{
                  size: 'xs',
                  fontWeight: 'bold',
                  colorPalette: 'red',
                }}
                title={'스크림 요청 삭제'}
                description={
                  '정말 스크림 요청을 삭제하시겠습니까?\n이미 처리된 요청인 경우 삭제할 수 없습니다.'
                }
                onConfirm={() => {
                  deleteScrimReq(
                    {
                      id: scrimReq.id,
                    },
                    {
                      onSuccess: () => {
                        invalidate()
                        toaster.create({
                          type: 'success',
                          title: '스크림 요청 삭제 완료',
                        })
                      },
                    },
                  )
                }}
              />
            </>
          )}
          {isRejected && <ScrimReqRejectReasonDialog scrimReq={scrimReq} />}
        </Flex>
      </Table.Cell>
    </Table.Row>
  )
}

export default SentScrimReqListItem
