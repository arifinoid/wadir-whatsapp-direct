import { FC } from 'react'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { useNavigate, useLocation } from 'react-router-dom'

const StarToggle: FC = () => {
  const { colorMode } = useColorMode()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(pathname === '/' ? '/favorite' : '/')
  }

  return (
    <IconButton
      aria-label='menu toggle'
      icon={pathname === '/' ? <BsStar /> : <BsStarFill />}
      onClick={handleClick}
      backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
    />
  )
}

export default StarToggle
