import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Container, CssBaseline, makeStyles, Typography } from '@material-ui/core'

import logoImg from '../../assets/images/logo.png'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'center'
  },
  text: {
    margin: theme.spacing(2, 0),
    textAlign: 'center'
  },
  btnLogin: {
    margin: theme.spacing(2, 0)
  }
}))

export default function ResetPwdSuccess () {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = () => {
    history.push('/login')
  }

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper} >
        <Link to='/'>
          <img width='300px' src={logoImg} alt='Adequei' />
        </Link>
        <Typography variant="subtitle1" gutterBottom>
          Sua senha foi alterada com sucesso faça seu login.
        </Typography>
        <Button
          className={classes.btnLogin}
          fullWidth
          onClick={handleClick}
          variant='contained'
          color='primary'
        >Login
        </Button>
      </div>
    </Container>
  )
}
