import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { isAxiosError } from 'axios'
import { ApiErrorCode, ApiErrorResponse } from '@/apis'
import { toaster } from '@/components/ui/toaster'

interface ReactQueryProviderProps {
  children: React.ReactNode
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (!isAxiosError<ApiErrorResponse>(error)) return
        toaster.create({
          type: 'error',
          title: error.response?.data.error_message ?? error.message,
        })
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (!isAxiosError<ApiErrorResponse>(error)) return
        if (error.response?.data.error_code === ApiErrorCode.UNAUTHORIZED) {
          toaster.create({
            type: 'error',
            title: '비로그인 회원',
            description: '로그인한 회원만 접근 가능한 기능입니다.',
          })
        } else {
          toaster.create({
            type: 'error',
            title: error.response?.data.error_message ?? error.message,
          })
        }
      },
    }),
  })
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition={'bottom-left'}
      />
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
