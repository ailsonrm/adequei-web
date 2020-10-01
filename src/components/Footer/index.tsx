import React from 'react'
import {} from 'react-router-dom'
import logoImg from '../../assets/images/logo.png'
import { makeStyles, Link, Container, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  footerSession: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    padding: theme.spacing(2, 2),
    marginTop: 'auto',
    borderTop: 'solid 1px #C9D3DD',
    width: '95%'
  },
  footerlogo: {
    width: '90px',
    '@media (max-width: 768px)': {
      width: '0px'
    },
    transition: 'all .2s ease-in-out'
  }
}))

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      {new Date().getFullYear() + ' '}
      <Link color='primary' href='/'>
                Termos de uso
      </Link>
      {' e '}
      <Link color='primary' href='/'>
                Política de Privacidade.
      </Link>
    </Typography>
  )
}

const Footer = () => {
  const classes = useStyles()
  return (
    <div className={classes.footerSession}>
      <footer className={classes.footer}>
        <Container className={classes.footerContainer}>
          <Link href="/">
            <img className={classes.footerlogo} src={logoImg} alt="Adequei"/>
          </Link>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}

export default Footer
