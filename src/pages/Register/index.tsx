import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { Button, Container, CssBaseline, Grid, IconButton, TextField, Link, Typography, FormControlLabel, Radio, RadioGroup, Checkbox } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { Form, Formik } from 'formik'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { cpfMask, cnpjMask } from '../../utils/documentMask'
import { phoneDDDMask, phoneNumberMask } from '../../utils/phoneMask'


import logoImg from '../../assets/images/logo.png'
import { cpfValidation, cnpjValidation } from './RegisterValidationSchema'
import { callRegister } from '../../services/register'
import Footer from '../../components/Footer'

function Alert (props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  paper: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '80%'
  },
  btnSubmit: {
    margin: theme.spacing(3, 0, 2)
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnShowPassword: {
    marginTop: 5,
    marginLeft: -60
  },
  radioGrdSession: {
    display: 'flex'
  },
  radioGrdContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0px 30px'
  },
  docField: {
    color: '#236084',
    fontWeight: 'bold'
  },
  termsContainer: {
    paddingLeft: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start'
  }
}))

const initialValues = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  password: '',
  confirmPassword: '',
  document: {
    type: 'cpf',
    number: ''
  },
  phone: {
    ddd: '',
    number: ''
  },
  acceptTerms: false
}

export default function Register () {
  const classes = useStyles()
  const history = useHistory()

  const [errorAlert, setErrorAlert] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [docType, setDocType] = useState('cpf')
  const [docNumber, setDocNumber] = useState('')
  const [phoneDDD, setPhoneDDD] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [acceptTerm, setAcceptTerm] = useState(false)

  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR]
      }
    }, {})
  }

  const validate = values => {
    const validationSchema = docType === 'cpf' ? cpfValidation(values) : cnpjValidation(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }

  const handleRegisterResponse = (registerResp) => {
    const { user, error } = registerResp

    if (error) {
      setErrorAlert(error.toString())
    } else if (user) {
      history.push('/register_success')
    } else {
      console.log(registerResp)
    }
  }

  const handleChooseDocType = (docType) => {
    setDocType(docType)
    setDocNumber('')
  }

  const handleSubmit = async values => {
    values.document.type = docType

    if (docType === 'cpf') {
      values.companyName = ''
    } else {
      values.firstName = ''
      values.lastName = ''
    }

    setErrorAlert('')
    const registerResp = await callRegister(values)
    handleRegisterResponse(registerResp)
  }

  const handleCPFChange = value => {
    setDocNumber(cpfMask(value.target.value))
  }

  const handleCNPJChange = value => {
    setDocNumber(cnpjMask(value.target.value))
  }

  const handlePhoneDDDChange = value => {
    setPhoneDDD(phoneDDDMask(value.target.value))
  }

  const handlePhoneNumberChange = value => {
    setPhoneNumber(phoneNumberMask(value.target.value))
  }

  return (
    <div className={classes.root}>
      <main>
        <Container component='main' maxWidth='md'>
          <CssBaseline />
          <div className={classes.paper} >
            <Link href="/">
              <img width='300px' src={logoImg} alt="Adequei" />
            </Link>
            <Typography variant="subtitle2">
              Cadastrar
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={validate}
              validationSchema={docType === 'cpf' ? cpfValidation : cnpjValidation}
            >
              {({ errors, handleChange, touched, values }) => (
                <Form className={classes.form} >
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.radioGrdSession}>
                      <RadioGroup
                        row
                        defaultValue="cpf"
                        className={classes.radioGrdContainer}
                      >
                        <FormControlLabel
                          value='cpf'
                          control={<Radio color="primary" />}
                          label='CPF'
                          onClick={ () => handleChooseDocType('cpf') }
                        />
                        <FormControlLabel
                          value="cnpj"
                          control={<Radio color="primary" />}
                          label="CNPJ"
                          onClick={ () => handleChooseDocType('cnpj') }
                        />
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {docType === 'cpf'
                        ? <TextField
                          inputProps={{ className: classes.docField, maxLength: 14 }}
                          value={ docNumber }
                          error={ !!errors.document?.number && touched.document?.number }
                          autoComplete="cpf"
                          name="document.number"
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          onInput={handleCPFChange}
                          id="cpf"
                          label="CPF"
                          placeholder="###.###.###-##"
                          autoFocus
                          helperText={
                                errors.document?.number && touched.document?.number
                                  ? errors.document?.number
                                  : null
                          }
                        /> : null}

                      {docType === 'cnpj'
                        ? <TextField
                          inputProps={{ className: classes.docField, maxLength: 18 }}
                          value={docNumber}
                          error={ !!errors.document?.number && touched.document?.number }
                          autoComplete="cpf"
                          name="document.number"
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          onInput={handleCNPJChange}
                          id="cnpj"
                          label="CNPJ"
                          placeholder="##.###.###/####-##"
                          autoFocus
                          helperText={
                                errors.document?.number && touched.document?.number
                                  ? errors.document?.number
                                  : null
                          }
                        /> : null}
                    </Grid>
                    {docType === 'cpf'
                      ? <Grid item xs={12} sm={4}>
                        <TextField
                          error={ !!errors.firstName && touched.firstName }
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          id="firstName"
                          label="Nome"
                          placeholder="Nome"
                          helperText={
                            errors.firstName && touched.firstName
                              ? errors.firstName
                              : null
                          }
                        />
                      </Grid> : null }
                    {docType === 'cpf'
                      ? <Grid item xs={12} sm={8}>
                        <TextField
                          error={ !!errors.lastName && touched.lastName }
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          id="lastName"
                          label="Sobrenome"
                          placeholder="Sobrenome"
                          name="lastName"
                          autoComplete="lname"
                          helperText={
                            errors.lastName && touched.lastName
                              ? errors.lastName
                              : null
                          }
                        />
                      </Grid> : null }
                    {docType === 'cnpj'
                      ? <Grid item xs={12}>
                        <TextField
                          error={ !!errors.companyName && touched.companyName }
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          id="companyName"
                          label="Nome da Empresa"
                          placeholder="Nome da Empresa"
                          name="companyName"
                          autoComplete="companyName"
                          helperText={
                            errors.companyName && touched.companyName
                              ? errors.companyName
                              : null
                          }
                        />
                      </Grid> : null }
                    <Grid item xs={6}>
                      <TextField
                        error={ !!errors.email && touched.email }
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        id="email"
                        label="E-mail"
                        placeholder="E-mail"
                        name="email"
                        autoComplete="email"
                        helperText={
                          errors.email && touched.email ? errors.email : null
                        }
                      />
                    </Grid>
                      <Grid item xs={3}>
                      <TextField
                        inputProps={{ maxLength: 2 }}
                        value={ phoneDDD }
                        error={ !!errors.phone?.ddd && touched.phone?.ddd }
                        autoComplete="phoneDDD"
                        name="phone.ddd"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onInput={handlePhoneDDDChange}
                        id="ddd"
                        label="DDD"
                        autoFocus
                        helperText={
                                errors.phone?.ddd && touched.phone?.ddd
                                  ? errors.phone?.ddd
                                  : null
                        }
                      /></Grid>
                      <Grid item xs={3}>
                      <TextField
                        inputProps={{ maxLength: 9 }}
                        value={ phoneNumber }
                        error={ !!errors.phone?.number && touched.phone?.number }
                        autoComplete="phoneNumber"
                        name="phone.number"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onInput={handlePhoneNumberChange}
                        id="telefone"
                        label="Telefone"
                        autoFocus
                        helperText={
                                errors.phone?.number && touched.phone?.number
                                  ? errors.phone?.number
                                  : null
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <TextField
                          error={ !!errors.password && touched.password }
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          name="password"
                          label="Senha"
                          placeholder="Senha"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          autoComplete="current-password"
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : null
                          }
                        />
                        <IconButton
                          className={classes.btnShowPassword}
                          onClick={() => setShowPassword(!showPassword)}
                        >{showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div>
                        <TextField
                          error={ !!errors.confirmPassword && touched.confirmPassword }
                          variant="outlined"
                          fullWidth
                          onChange={handleChange}
                          name="confirmPassword"
                          label="Confirmação de Senha"
                          placeholder="Confirmação de Senha"
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="confirmPassword"
                          autoComplete="current-password"
                          helperText={
                            errors.confirmPassword && touched.confirmPassword
                              ? errors.confirmPassword
                              : null
                          }
                        />
                        <IconButton
                          className={classes.btnShowPassword}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>                  
                  <Grid item xs={12} className={classes.termsContainer}>                  
                    <FormControlLabel
                        control={
                            <Checkbox
                              size='medium'
                              name="acceptTerms"
                              value={ acceptTerm }
                              color="primary"
                              onChange={handleChange}
                              onClick={() => setAcceptTerm(!acceptTerm)}
                            />
                          }
                          label=''
                      />
                      <Typography variant="caption" style={{marginRight: '5px', color: errors.acceptTerms ? 'red': '#0000008a'}}>
                        Li e concordo com os
                      </Typography>
                      <Link href='/terms_of_service'>Termos de Serviço</Link>
                      </Grid>
                      <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={!acceptTerm}
                      color="primary"
                      className={classes.btnSubmit}
                      >Cadastrar
                      </Button>
                  <div className={classes.loginContainer} >
                    <Typography variant="subtitle2">
                            Já possui cadastro? |
                    </Typography>
                    <Typography component="p">
                      <Button
                        onClick={() => history.push('/login') }
                        fullWidth
                        variant='text'
                        color='primary'
                      >Faça login
                      </Button>
                    </Typography>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

        </Container>
      </main>
      <Footer/>
    </div>
  )
}
