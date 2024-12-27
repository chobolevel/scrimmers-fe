import { useBreakpointValue } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { GeneralLayout, MobileLayout } from '@/layout'

enum LayoutType {
  GENERAL,
  MOBILE,
}

interface ResponsiveLayoutProps {
  children: React.ReactNode
}

const ResponsiveLayout = ({ children }: ResponsiveLayoutProps) => {
  const layoutType = useBreakpointValue({
    base: LayoutType.MOBILE,
    lg: LayoutType.GENERAL,
  })

  const Layout = useMemo(() => {
    switch (layoutType) {
      case 0:
        return GeneralLayout
      case 1:
        return MobileLayout
      default:
        throw new Error(`Invalid layout: ${layoutType}`)
    }
  }, [layoutType])
  return <Layout>{children}</Layout>
}

export default ResponsiveLayout
