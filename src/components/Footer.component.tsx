import { Link, Flex, Text } from '@chakra-ui/react'

const Footer = () => {
  const fullYear = new Date().getFullYear()
  return (
    <Flex
      as='footer'
      wrap='wrap'
      textAlign='center'
      width='full'
      alignItems='center'
      justifyContent='center'
      py='4'
      color='grey'
      position='fixed'
      bottom='0'
    >
      <Text flexBasis={['100%', '50%']}>
        {fullYear} -{' '}
        <Link
          _hover={{
            textDecoration: 'none',
          }}
          isExternal
          href='https://github.com/arifinoid'
          fontWeight={500}
        >
          arifinoid
        </Link>
      </Text>
    </Flex>
  )
}

export default Footer
