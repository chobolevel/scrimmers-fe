import { useBreakpointValue } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { GeneralLayout, MobileLayout } from '@/layout'

enum LayoutType {
  MOBILE,
  GENERAL,
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
      case LayoutType.GENERAL:
        return GeneralLayout
      case LayoutType.MOBILE:
        return MobileLayout
      default:
        throw new Error(`Invalid layout: ${layoutType}`)
    }
  }, [layoutType])
  return <Layout>{children}</Layout>
}

export default ResponsiveLayout
