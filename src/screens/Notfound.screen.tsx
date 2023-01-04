import { Flex, Heading, Link } from '@chakra-ui/react'
import { FC } from 'react'

import Layout from '../layouts/Main.layout'

const NotFoundScreen: FC = () => (
  <Layout>
    <Flex flexDir='column' justifyContent='center' alignItems='center'>
      <Heading>404 Not Found</Heading>
      <Link href='/'>Back to home</Link>
    </Flex>
  </Layout>
)

export default NotFoundScreen
