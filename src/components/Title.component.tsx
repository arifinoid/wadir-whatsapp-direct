import { Box, Heading, Text, Image } from '@chakra-ui/react'
import { FC } from 'react'

const Title: FC = () => {
  return (
    <>
      <Box>
        <Image src='/tauri.svg' className='logo tauri' alt='Tauri logo' />
      </Box>
      <Heading
        display='flex'
        bgGradient='linear(to-br, green.300, blue.500)'
        bgClip='text'
      >
        WaDir - WhatsApp Direct
      </Heading>
      <Text fontSize='sm' textAlign='center' color='grey'>
        Welcome to WaDir - WhatsApp Direct! This app allows you to use WhatsApp
        from your desktop without having to save a phone number
      </Text>
    </>
  )
}

export default Title
