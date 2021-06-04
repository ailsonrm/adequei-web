import React from 'react'
import MainHeaderMenu from '../../components/MainHeader'
import Footer from '../../components/Footer'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}))

function Home () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <form>
          <MainHeaderMenu />
          <h1>My Home</h1>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Home
