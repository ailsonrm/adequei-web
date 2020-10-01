import React from 'react'
import { makeStyles } from '@material-ui/core'

import LandingHeaderMenu from '../../components/LandingHeader'
import Footer from '../../components/Footer'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}))

function Landing () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LandingHeaderMenu />
      <h1>Landing Page</h1>
      <Footer />
    </div>
  )
}

export default Landing
