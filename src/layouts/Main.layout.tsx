import { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Header from '../components/Header.component'
import Footer from '../components/Footer.component'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minHeight='100vh' transition='0.4s ease-out'>
      <Header />
      <Flex as='main' justifyContent='center' alignItems='center'>
        {children}
      </Flex>
      <Footer />
    </Box>
  )
}

export default Layout
