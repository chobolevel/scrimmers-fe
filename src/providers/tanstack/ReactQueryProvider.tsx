import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ReactQueryProviderProps {
  children: React.ReactNode
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const client = new QueryClient()
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
