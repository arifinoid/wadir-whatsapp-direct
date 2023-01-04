import { FC } from 'react'
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
} from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'
import * as z from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { open } from '@tauri-apps/api/shell'

import Title from '../components/Title.component'
import ControlledSelect from '../components/ControlledSelect.component'

import countryCodes from '../libs/countrycode.lib.json'
import { addContact } from '../screens/services/contact.service.tsx'
type Input = {
  label: string
  value: string
}

const countryCodeSchema = z.object({
  label: z.string(),
  value: z.string(),
})

type CountryCode = z.infer<typeof countryCodeSchema>
const options: CountryCode[] = countryCodes.map(({ name, dial_code }) => ({
  label: `${name} (${dial_code})`,
  value: dial_code,
}))

const formSchema = z.object({
  code: countryCodeSchema.refine(Boolean, {
    message: 'Country code is required',
  }),
  phoneNumber: z
    .string()
    .regex(/\d/g, 'Phone number must be integer')
    .min(9, { message: 'Phone Number must be 9 or more characters long' })
    .max(15, { message: 'Phone Number must be 15 or fewer characters long' }),
})

type FormValues = z.infer<typeof formSchema>

const Form: FC = () => {
  const defaultValues: FormValues = {
    code: {
      label: 'Indonesia (+62)',
      value: '+62',
    },
    phoneNumber: '',
  }

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const phoneNumber = `${values.code.value}${values.phoneNumber}`
      const country = countryCodes.find(
        (c) => c.dial_code === values.code.value
      )

      const response = await addContact(phoneNumber, country?.code || 'ID')
      if (response.id) {
        open(`https://wa.me/${response.phone_number}`)
        reset(defaultValues)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  return (
    <Container
      bg='grey.800'
      centerContent
      as='form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        flexDir='column'
        alignItems='center'
        justifyContent='center'
        h='inherit'
      >
        <Title />
        <InputGroup my='8'>
          <ControlledSelect<FormValues, CountryCode, false>
            name='code'
            useBasicStyles
            control={control}
            options={options}
            chakraStyles={{
              control: (provided) => ({
                ...provided,
                borderEndRadius: 'none',
                borderEnd: 'none',
              }),
            }}
          />

          <FormControl id='phoneNumber' isInvalid={!!errors.phoneNumber}>
            <Input
              type='tel'
              borderStartRadius='none'
              placeholder='Enter a phone number...'
              {...register('phoneNumber')}
            />
            <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
          </FormControl>
        </InputGroup>

        <Button
          variant='outline'
          colorScheme='whatsapp'
          leftIcon={<FaWhatsapp />}
          type='submit'
          isLoading={isSubmitting}
        >
          Go WhatsApp
        </Button>
      </Flex>
    </Container>
  )
}

export default Form
