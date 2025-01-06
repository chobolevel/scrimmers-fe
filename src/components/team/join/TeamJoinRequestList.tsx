import { Table } from '@chakra-ui/react'
import { TeamJoinRequest } from '@/apis/team/join'
import { TeamJoinRequestListItem } from '@/components'

interface TeamJoinRequestListProps {
  requests: TeamJoinRequest[]
}

const TeamJoinRequestList = ({ requests }: TeamJoinRequestListProps) => {
  return (
    <Table.ScrollArea borderWidth={'1px'}>
      <Table.Root>
        <Table.Header>
          <Table.Row bg={'bg.subtle'}>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              신청자
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              주포지션
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              부포지션
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              상태
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              신청일
            </Table.ColumnHeader>
            <Table.ColumnHeader textAlign={'center'} fontWeight={'bold'}>
              비고
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests.length > 0 ? (
            requests.map((request, idx) => {
              return <TeamJoinRequestListItem request={request} key={idx} />
            })
          ) : (
            <Table.Row>
              <Table.Cell colSpan={6} h={100} textAlign={'center'}>
                검색 조건에 맞는 팀 가입 요청이 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default TeamJoinRequestList
