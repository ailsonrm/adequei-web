import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from '../pages/Landing'
import Register from '../pages/Register'
import RegisterSuccess from '../pages/RegisterSuccess'
import ResetPwdSuccess from '../pages/ResetPwdSuccess'
import Auth from '../pages/Auth'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import Home from '../pages/Home'
import MyAccount from '../pages/MyAccount'
import AccountUpdate from '../pages/AccountUpdate'
import NotFound from '../pages/NotFound'
import PrivateRoute from '../components/PrivateRoute'

function Routes () {
  return (
    <BrowserRouter >
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/register" exact component={Register}/>
        <Route path="/register_success" exact component={RegisterSuccess}/>
        <Route path="/login" exact component={Auth}/>
        <Route path="/forgot_password" exact component={ForgotPassword}/>
        <Route path="/reset_password:token?:email?" exact component={ResetPassword}/>
        <Route path="/reset_success" exact component={ResetPwdSuccess}/>
        <PrivateRoute path="/home" exact component={Home}/>
        <PrivateRoute path="/my_account" exact component={MyAccount}/>
        <PrivateRoute path="/account_update" exact component={AccountUpdate}/>
        <PrivateRoute component={NotFound}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
