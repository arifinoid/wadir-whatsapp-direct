import {
  Center,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { FC } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { FaTrash } from 'react-icons/fa'
import { open } from '@tauri-apps/api/shell'

import { useContact } from '../hooks/contact.hook'
import { deleteContact } from '../screens/services/contact.service.tsx'

export const FavoriteList: FC = () => {
  const handleRemoveContact = async (id: string) => {
    await deleteContact(id)
  }
  const contacts = useContact([handleRemoveContact])

  return (
    <Flex justifyItems='center' alignItems='center' flexDir='column'>
      <Heading fontSize='md'>You have {contacts.length} contacts saved</Heading>
      <Text fontSize='sm'>
        {contacts.length > 0
          ? 'go WhatsApp them again by click the phone number below'
          : ''}
      </Text>
      <Center my='4' textAlign='center' h='sm'>
        <List
          spacing='3'
          overflowY='scroll'
          maxH='md'
          w='md'
          justifyContent='center'
        >
          {contacts.map((c) => (
            <ListItem
              key={c.id}
              gap='2'
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <ReactCountryFlag countryCode={c.code || 'ID'} />
              <Text
                onClick={() => open(`https://wa.me/${c.phone_number}`)}
                _hover={{
                  cursor: 'pointer',
                }}
              >
                {c.phone_number}
              </Text>

              <IconButton
                colorScheme='red'
                aria-label='Delete contact'
                icon={<FaTrash />}
                onClick={() => handleRemoveContact(c.id)}
              />
            </ListItem>
          ))}
        </List>
      </Center>
    </Flex>
  )
}
