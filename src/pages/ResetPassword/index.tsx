import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography, Link, IconButton } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import * as Yup from 'yup'
import qs from 'query-string'
import { callResetPassword } from '../../services/auth'

import logoImg from '../../assets/images/logo.png'
import { Form, Formik } from 'formik'
import { Visibility, VisibilityOff } from '@material-ui/icons'
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
    paddingTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  btnSubmit: {
    margin: theme.spacing(3, 0, 2)
  },
  btnShowPassword: {
    marginTop: 5,
    marginLeft: -60
  }
}))

const ResetPassValidationSchema = values => Yup.object().shape({
  newPassword: Yup
    .string()
    .trim()
    .min(8, 'Deve ter no mínimo 8 caracteres.')
    .max(20, 'Deve ter no máximo 20 caracteres.')
    .required('Nova Senha obrigatória.'),
  confirmNewPassword: Yup
    .string()
    .trim()
    .required('Confirmação de nova senha obrigatória.')
    .oneOf([Yup.ref('newPassword'), ''], 'Senhas não coincidem')
})

export default function ResetPassword ({ ...props }) {
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    const url = qs.parse(props.location.search)
    setResetToken(url.token + '')
    setResetEmail(url.email + '')
  }, [props.location.search])

  const validate = values => {
    const validationSchema = ResetPassValidationSchema(values)
    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }

  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR]
      }
    }, {})
  }

  const handleSubmit = async values => {
    setErrorAlert('')
    values.token = resetToken
    values.email = resetEmail

    const resetPasswordResp = await callResetPassword(values)
    handleResetResponse(resetPasswordResp)
  }

  const handleResetResponse = (resetPasswordResp) => {
    const { error } = resetPasswordResp

    if (error) {
      setErrorAlert(error.toString())
    } else {
      history.push('/login')
    }
  }

  const [errorAlert, setErrorAlert] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [resetToken, setResetToken] = useState('')
  const [resetEmail, setResetEmail] = useState('')

  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper} >
          <Link href='/'>
            <img width='300px' src={logoImg} alt='Adequei' />
          </Link>
          <Formik
            className={classes.form}
            initialValues={{ newPassword: '', confirmNewPassword: '' }}
            onSubmit={handleSubmit}
            validate={validate}
            validationSchema={ ResetPassValidationSchema }>
            {({ errors, handleChange, touched }) => (
              <Form className={classes.form} >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
                  </Grid>
                  <Grid item xs={12}>
                    <div>
                      <TextField
                        error={ !!errors.newPassword && touched.newPassword }
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        name="newPassword"
                        label="Nova Senha"
                        placeholder="Nova Senha"
                        type={showPassword ? 'text' : 'password'}
                        id="newPassword"
                        autoComplete="newPassword"
                        helperText={
                          errors.newPassword && touched.newPassword
                            ? errors.newPassword
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
                  <Grid item xs={12}>
                    <div>
                      <TextField
                        error={ !!errors.confirmNewPassword && touched.confirmNewPassword }
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        name="confirmNewPassword"
                        label="Confirmação de nova Senha"
                        placeholder="Confirmação de nova Senha"
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmNewPassword"
                        autoComplete="confirmNewPassword"
                        helperText={
                          errors.confirmNewPassword && touched.confirmNewPassword
                            ? errors.confirmNewPassword
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
                <Grid item xs={12}>
                  <Button
                    className={classes.btnSubmit}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >Alterar Senha
                  </Button>
                </Grid>
                <div className={classes.loginContainer} >
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
      <Footer/>
    </div>
  )
}
