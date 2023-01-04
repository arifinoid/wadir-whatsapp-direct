import { invoke } from '@tauri-apps/api'

export type Contact = {
  id: string
  phone_number: string
  code: string
  created_at: string
}

export const getContacts = async () => {
  const response = await invoke<string>('get_contacts')
  return JSON.parse(response)
}

export const addContact = async (phoneNumber: string, code: string) => {
  const message = await invoke<string>('create_contact', {
    phoneNumber,
    code,
  })
  return JSON.parse(message)
}

export const deleteContact = async (id: string) => {
  return await invoke('remove_contact', { id })
}
