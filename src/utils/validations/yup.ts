import * as yup from 'yup'

export const emailValidationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Email is a required field')
    .email('Please enter a valid Email address'),
})
