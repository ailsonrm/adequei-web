import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import logoImg from '../../assets/images/logo.png'
import { AppBar, makeStyles, Link, Typography, IconButton } from '@material-ui/core'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BallotTwoToneIcon from '@material-ui/icons/BallotTwoTone'
import AutorenewTwoToneIcon from '@material-ui/icons/AutorenewTwoTone'
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone'

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
  userNameLabel: {
    font: '700 20px Nunito',
    color: '#0050a0',
    paddingLeft: '5px',
    '@media (max-width: 768px)': {
      width: '100px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  labelOla: {
    color: '#818b95'
  },
  manuItemAccountData: {
    borderBottom: 'solid 1px #C9D3DD'
  },
  manuItemMyAccount: {
    fontWeight: 'bold',
    color: '#0050a0'
  },
  manuItemChangeAccount: {
    borderBottom: 'solid 1px #C9D3DD',
    color: '#0050a0'
  },
  btnNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnContainer: {
    '@media (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column'
    },
    transition: 'all .2s ease-in-out'
  },
  anchorMenuName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    alignItems: 'center'
  },
  anchorMenuData: {
    paddingLeft: '10px',
    display: 'flex',
    flexDirection: 'column'
  }
}))

const MainHeaderMenu = () => {
  const classes = useStyles()
  const history = useHistory()

  var userNameLogged = localStorage.getItem('name')
  var userEmailogged = localStorage.getItem('email')
  const isLogged = !!localStorage.getItem('token')

  function signout (props) {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    history.push('/')
  }

  function handleGoHomeClick () {
    if (isLogged) {
      history.push('/home')
    } else {
      history.push('/')
    }
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseAnchorEl = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <main>
        <AppBar position='static' className={classes.header}>
          <div>
            <Link onClick={() => handleGoHomeClick()}>
              <img src={logoImg} alt="Adequei" className={classes.headerImg}/>
            </Link>
          </div>
          <span className={classes.btnContainer}>
            <div className={classes.btnNameContainer}>
              <Typography variant="body2" className={classes.labelOla} >Olá,</Typography>
              <Typography variant="body2" className={classes.userNameLabel}>{userNameLogged}</Typography>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="false"
                onClick={handleMenuClick}>
                <MenuIcon/>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseAnchorEl}
              >
                <MenuItem className={classes.manuItemAccountData}>
                  <AccountCircleIcon color="disabled" fontSize="large"/>
                  <div className={classes.anchorMenuData}>
                    <div className={classes.anchorMenuName}>
                      <Typography variant="body1" className={classes.labelOla} >Olá,</Typography>
                      <Typography variant="body2" className={classes.userNameLabel}>{userNameLogged}</Typography>
                    </div>
                    <Typography variant="caption" style={{ color: '#818b95' }}>{userEmailogged}</Typography>
                  </div>
                </MenuItem>
                <Typography variant="caption" style={{ color: '#818b95', paddingLeft: '5px' }}>Configurações da conta</Typography>
                <MenuItem onClick={() => history.push('/my_account') } className={classes.manuItemMyAccount}>
                  <BallotTwoToneIcon color="primary"/>
                  <Typography variant="subtitle2">Minha Conta</Typography>
                </MenuItem>
                <MenuItem onClick={() => history.push('/account_update') } className={classes.manuItemChangeAccount}>
                  <AutorenewTwoToneIcon color="primary"/>
                  <Typography variant="subtitle2">Alterar Cadastro</Typography>
                </MenuItem>
                <MenuItem onClick={signout}>
                  <ExitToAppTwoToneIcon color="primary"/>
                  <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>Sair</Typography>
                </MenuItem>
              </Menu>
            </div>
          </span>
        </AppBar>
      </main>
    </div>
  )
}

export default MainHeaderMenu
