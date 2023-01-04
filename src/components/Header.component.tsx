import { Box, Flex, Heading } from '@chakra-ui/react'
import { FC } from 'react'

import StarToggle from './StarToggle.component'
import ThemeToggle from './Themetoggle.component'

const Header: FC = () => {
  return (
    <Flex as='header' width='full' align='center' p='4'>
      <Box flexBasis='100%'>
        <Heading
          fontSize={['2xl', '3xl']}
          bgGradient='linear(to-br, green.300, blue.500)'
          bgClip='text'
        >
          WaDir
        </Heading>
      </Box>

      <Flex marginLeft='auto' gap='2'>
        <StarToggle />
        <ThemeToggle />
      </Flex>
    </Flex>
  )
}

export default Header
