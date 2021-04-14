import React, { useState, useEffect } from 'react'
import { CardMedia, Collapse, CssBaseline, makeStyles, Slide, Typography } from '@material-ui/core'
import BackgroundImage from '../../assets/images/backgroundImgLanding.jpg'

import LandingHeaderMenu from '../../components/LandingHeader'
import Footer from '../../components/Footer'

import SpeedOutlinedIcon from '@material-ui/icons/SpeedOutlined'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  welcomeVideoContainer: {
    margin: '25px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  welcome: {
    flex: '50%',
    maxWidth: '50%',
    height: 'auto',
    padding: '0 15px',
    '@media (max-width: 768px)': {
      flex: '100%',
      maxWidth: '100%',
      marginBottom: '15px',
      height: 'auto'
    },
    backgroundColor: '#ffffff66',
    borderRadius: '10px',
    paddingTop: '50px'
  },
  video: {
    flex: '50%',
    maxWidth: '50%',
    padding: '0 15px',
    '@media (max-width: 768px)': {
      flex: '100%',
      maxWidth: '100%'
    }
  },
  videoFrame: {
    width: '100%',
    height: '415px',
    '@media (max-width: 768px)': {
      height: '200px'
    }
  },
  welcomeStyle: {
    textAlign: 'center',
    font: '700 32px Nunito',
    color: '#246184'
  },
  paragraphStyle: {
    textAlign: 'center',
    color: '#212529'
  },
  benefitsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '25px',
    marginBottom: '25px',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#ffffff66',
    height: 'auto'
  },
  benefitsItemBox: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  benefitsItem: {
    flex: '1',
    margin: '16px',
    height: '150px',
    textAlign: 'center',
    color: '#3fa69f',
    paddingTop: '10px',
    font: '700 16px Nunito'
  }
}))

function Landing () {
  const classes = useStyles()

  const [checked, setChecked] = useState(false)
  const [checkedBenefits, setCheckedBenefits] = useState(false)

  useEffect(() => {
    setChecked(true)

    window.addEventListener('scroll', () => {
      console.log(window.pageYOffset)
      if (window.pageYOffset > 74) {
        setCheckedBenefits(true)
      }
    })
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline/>
      <LandingHeaderMenu />
      <div className={classes.welcomeVideoContainer}>
        <Slide direction="right" in={checked} {...(checked ? { timeout: 1000 } : {})} mountOnEnter unmountOnExit>
          <div className={classes.welcome}>
            <Typography variant="h2" gutterBottom className={classes.welcomeStyle}>Seja Bem Vind@!</Typography>
            <Typography variant="subtitle1" paragraph={true} className={classes.paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Typography variant="subtitle1" paragraph={true} className={classes.paragraphStyle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </div>
        </Slide>
        <div className={classes.video}>
          <Collapse
            in={checked}
            {...(checked ? { timeout: 1000 } : {})}
            collapsedHeight={50} >
            <CardMedia
              className={classes.videoFrame}
              component='iframe'
              src='https://www.youtube.com/embed/PB05d7kLgiI'
            />
          </Collapse>
        </div>
      </div>
      <div className={classes.benefitsContainer}>
        <Typography variant="h2" gutterBottom className={classes.welcomeStyle}>Por que usar a Adequei?</Typography>
        <div className={classes.benefitsItemBox}>
          <Slide direction="left" in={checkedBenefits} {...(checkedBenefits ? { timeout: 1000 } : {})} mountOnEnter unmountOnExit>
            <div className={classes.benefitsItem}>
              <SpeedOutlinedIcon style={{ fontSize: '80px' }}/>
              <div>Mais agilidade no processo de adequeção LGPD</div>
            </div>
          </Slide>
          <Slide direction="right" in={checkedBenefits} {...(checkedBenefits ? { timeout: 1000 } : {})} mountOnEnter unmountOnExit>
            <div className={classes.benefitsItem}>
              <InfoOutlinedIcon style={{ fontSize: '80px' }}/>
              <div>Saiba a finalidade legal de cada documento</div>
            </div>
          </Slide>
          <Slide direction="left" in={checkedBenefits} {...(checkedBenefits ? { timeout: 1000 } : {})} mountOnEnter unmountOnExit>
            <div className={classes.benefitsItem}>
              <InsertDriveFileOutlinedIcon style={{ fontSize: '80px' }}/>
              <div>Modelos atualizados</div>
            </div>
          </Slide>
          <Slide direction="right" in={checkedBenefits} {...(checkedBenefits ? { timeout: 1000 } : {})} mountOnEnter unmountOnExit>
            <div className={classes.benefitsItem}>
              <MonetizationOnOutlinedIcon style={{ fontSize: '80px' }}/>
              <div>Baixo custo</div>
            </div>
          </Slide>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default Landing
