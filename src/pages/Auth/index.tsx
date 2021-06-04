import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { Button, Container, CssBaseline, Grid, IconButton, TextField, Link, Typography } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { Form, Formik } from 'formik'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import BackgroundImage from '../../assets/images/backgroundImg.jpg'

import logoImg from '../../assets/images/logo.png'
import authValidationSchema from './AuthValidationSchema'
import { callAuth } from '../../services/auth'
import Footer from '../../components/Footer'

function Alert (props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  paper: {
    paddingTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  forgotContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnShowPassword: {
    marginTop: 5,
    marginLeft: -60
  }
}))

const initialValues = {
  email: '',
  password: ''
}

const validate = values => {
  const validationSchema = authValidationSchema(values)
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

export default function Register () {
  const classes = useStyles()
  const history = useHistory()

  const [errorAlert, setErrorAlert] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleAuthResponse = (authResp) => {
    const { user, token, error } = authResp

    if (error) {
      setErrorAlert(error.toString())
    } else if (user && token) {
      const name = user.document.type === 'cpf' ? user.firstName : user.companyName

      localStorage.setItem('id', user.emailn)
      localStorage.setItem('name', name)
      localStorage.setItem('email', user.email)
      localStorage.setItem('token', token)
      history.push('/home')
    } else {
      console.log(authResp)
    }
  }

  const handleSubmit = async values => {
    const authResp = await callAuth(values)
    handleAuthResponse(authResp)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={classes.root}>
      <main>
        <Container component='main' maxWidth='sm'>
          <CssBaseline />
          <div className={classes.paper}>
            <Link href="/">
              <img width='300px' src={logoImg} alt="Adequei" />
            </Link>
            <Typography variant="subtitle2">
                    Login
            </Typography>
            <Formik
              className={classes.form}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validate={validate}
              validationSchema={ authValidationSchema }>
              {({ errors, handleChange, touched }) => (
                <Form className={classes.form} >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                      <div >
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
                          onClick={handleClickShowPassword}
                        >{showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} className={classes.forgotContainer}>
                    <Grid item xs={12}>
                      <Button
                        onClick={() => history.push('/forgot_password') }
                        fullWidth
                        variant='text'
                        color='primary'
                      >Esqueceu sua senha?
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >Login
                    </Button>
                  </Grid>
                  <div className={classes.registerContainer} >
                    <Typography
                      variant="subtitle2">
                        Ainda não possui conta? |
                    </Typography>
                    <Typography component="p">
                      <Button
                        onClick={() => history.push('/register') }
                        fullWidth
                        variant='text'
                        color='primary'
                      >Faça seu cadastro
                      </Button>
                    </Typography>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  )
}
