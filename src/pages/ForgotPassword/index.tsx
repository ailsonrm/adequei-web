import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container, CssBaseline, Grid, makeStyles, TextField, Typography, Link } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import * as Yup from 'yup'
import { callForgotPassword } from '../../services/auth'

import logoImg from '../../assets/images/logo.png'
import { Form, Formik } from 'formik'
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
  }
}))

const forgotPassValidationSchema = values => Yup.object().shape({
  email: Yup
    .string()
    .email('E-mail inválido.')
    .required('E-mail obrigatório.')
})

export default function ForgotPassword () {
  const classes = useStyles()
  const history = useHistory()

  const validate = values => {
    const validationSchema = forgotPassValidationSchema(values)
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
    setInfoAlert('')
    setErrorAlert('')

    const forgotPasswordResp = await callForgotPassword(values)
    handleForgotResponse(values, forgotPasswordResp)
  }

  const handleForgotResponse = (values, forgotPasswordResp) => {
    const { email } = values
    const { error } = forgotPasswordResp

    if (error) {
      setErrorAlert(error.toString())
    } else {
      setShowEmailField(false)
      setShowBtnRecovery(false)
      setInfoAlert(`Foi enviado um e-mail para ${email.toUpperCase()} com instruções para alteração da senha.`)
    }
  }

  const [showEmailField, setShowEmailField] = useState(true)
  const [showBtnRecovery, setShowBtnRecovery] = useState(true)
  const [infoAlert, setInfoAlert] = useState('')
  const [errorAlert, setErrorAlert] = useState('')

  return (
    <div className={classes.root}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <div className={classes.paper} >
          <Link href='/'>
            <img width='300px' src={logoImg} alt='Adequei' />
          </Link>

          <Formik
            className={classes.form}
            initialValues={{ email: '' }}
            onSubmit={handleSubmit}
            validate={validate}
            validationSchema={ forgotPassValidationSchema }>
            {({ errors, handleChange, touched }) => (
              <Form className={classes.form} >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {infoAlert && <Alert severity="info">{infoAlert}</Alert>}
                    {errorAlert && <Alert severity="error">{errorAlert}</Alert>}
                  </Grid>
                  <Grid item xs={12}>
                    { showEmailField
                      ? <TextField
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
                      : null }
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  { showBtnRecovery
                    ? <Button
                      className={classes.btnSubmit}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >Recuperar Senha
                    </Button>
                    : null }
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
