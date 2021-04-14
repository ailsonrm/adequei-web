import React from 'react'
import {} from 'react-router-dom'
import logoImg from '../../assets/images/logo.png'
import { AppBar, Button, makeStyles, Link } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  header: {
    background: '#ffffff80',
    color: '#3f51b5',
    height: '80px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px'
  },
  headerImg: {
    height: '60px',
    '@media (max-width: 768px)': {
      height: '40px'
    },
    transition: 'all .2s ease-in-out'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  btnLogin: {
    font: '700 20px Nunito',
    color: '#236084'
  },
  btnCadastro: {
    height: '50px',
    borderRadius: '30px',
    marginLeft: '10px',
    background: '#217bb0',
    color: '#fff',
    '&:hover': {
      background: '#236084',
      color: '#fff'
    },
    '@media (max-width: 768px)': {
      height: '30px',
      font: '700 10px Nunito'
    },
    transition: 'all .2s ease-in-out'
  },
  btnsContainer: {
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column'
    },
    transition: 'all .2s ease-in-out'
  }
}))

const HomeHeaderMenu = () => {
  const classes = useStyles()

  const userNameLocal = localStorage.getItem('name')

  function deslogar (props) {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
  }

  return (
    <div>
      <main>
        <AppBar position='static' className={classes.header}>
          <div>
            <Link href="/">
              <img src={logoImg} alt="Adequei" className={classes.headerImg}/>
            </Link>
          </div>
          <span className={classes.btnsContainer}>
            <Button color="inherit" className={classes.btnLogin} href='/login'>{userNameLocal}</Button>
            <button onClick={deslogar}>Sair</button>
          </span>
        </AppBar>
      </main>
    </div>
  )
}

export default HomeHeaderMenu
