import * as Yup from 'yup'
import { cpf, cnpj } from 'cpf-cnpj-validator'

export const cpfValidation = values => Yup.object().shape({
  firstName: Yup
    .string()
    .required('Nome obrigatório.'),
  lastName: Yup
    .string()
    .required('Sobrenome obrigatório.'),
  email: Yup
    .string()
    .email('E-mail inválido.')
    .required('E-mail obrigatório.'),
  password: Yup
    .string()
    .trim()
    .min(8, 'Deve ter no mínimo 8 caracteres.')
    .max(20, 'Deve ter no máximo 20 caracteres.')
    .required('Senha obrigatória.'),
  confirmPassword: Yup
    .string()
    .trim()
    .required('Confirmação de senha obrigatória.')
    .oneOf([Yup.ref('password'), ''], 'Senhas não coincidem'),
  document: Yup.object().shape({
    number: Yup
      .string()
      .test('cpf-validate', 'CPF inválido', function (values) {
        const cpfNumber = values || ''
        return cpf.isValid(cpfNumber)
      })
      .required('CPF obrigatório.')
  }),
  phone: Yup.object().shape({
    ddd: Yup
      .string()
      .required('DDD obrigatório.'),
    number: Yup
      .string()
      .required('Nº Telefone obrigatório.')
  })
})
export const cnpjValidation = values => Yup.object().shape({
  companyName: Yup
    .string()
    .required('Nome da empresa obrigatório.'),
  email: Yup
    .string()
    .email('E-mail inválido.')
    .required('E-mail obrigatório.'),
  password: Yup
    .string()
    .trim()
    .min(8, 'Deve ter no mínimo 8 caracteres.')
    .max(20, 'Deve ter no máximo 20 caracteres.')
    .required('Senha obrigatória.'),
  confirmPassword: Yup
    .string()
    .trim()
    .required('Confirmação de senha obrigatória.')
    .oneOf([Yup.ref('password'), ''], 'Senhas não coincidem'),
  document: Yup.object().shape({
    number: Yup
      .string()
      .test('cnpj-validate', 'CNPJ inválido', function (values) {
        const cnpjNumber = values || ''
        return cnpj.isValid(cnpjNumber)
      })
      .required('CNPJ obrigatório.')
  }),
  phone: Yup.object().shape({
    ddd: Yup
      .string()
      .required('DDD obrigatório.'),
    number: Yup
      .string()
      .required('Nº Telefone obrigatório.')
  })
})
