import { FC } from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { CgMoon, CgSun } from 'react-icons/cg'

const ThemeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label='theme toggle'
      icon={colorMode === 'light' ? <CgMoon /> : <CgSun />}
      onClick={toggleColorMode}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
    />
  )
}

export default ThemeToggle
