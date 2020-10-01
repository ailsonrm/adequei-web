import React from 'react'
import { makeStyles } from '@material-ui/core'

import Routes from '../../components/routes'

const useStyles = makeStyles(theme => ({
  '@global': {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'center'
    },
    body: {
      margin: '0px',
      backgroundColor: theme.palette.common.white
    }
  }
}))

const App = () => {
  useStyles()

  return (
    <main className="app">
      <Routes />
    </main>
  )
}

export default App
