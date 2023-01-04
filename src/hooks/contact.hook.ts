import { DependencyList, useEffect, useState } from 'react'

import { Contact, getContacts } from '../screens/services/contact.service.tsx'

export const useContact = (deps: DependencyList) => {
  const [contacts, setContacts] = useState<Contact[]>([])

  const fetchContact = async () => {
    const response = await getContacts()
    setContacts(response)
  }

  useEffect(() => {
    fetchContact()
  }, [deps])

  return contacts
}
