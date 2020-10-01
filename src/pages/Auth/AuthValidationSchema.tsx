import * as Yup from 'yup'

export default AuthValidationSchema => Yup.object().shape({
  email: Yup
    .string()
    .email('E-mail inválido.')
    .required('E-mail obrigatório.'),
  password: Yup
    .string()
    .trim()
    .min(8, 'Deve ter no mínimo 8 caracteres.')
    .max(20, 'Deve ter no máximo 20 caracteres.')
    .required('Senha obrigatória.')
})
