import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Notifications from 'react-notify-toast'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import 'bulma'

import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import NotFound from './components/common/NotFound'
import SecureRoute from './components/common/SecureRoute'
import Gins from './components/gins/Gins'
import Show from './components/gins/Show'
import New from './components/gins/New'
import Edit from './components/gins/Edit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/auth/Profile'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Notifications />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <SecureRoute path="/gins/:id/edit" component={Edit} />
        <SecureRoute path="/gins/new" component={New} />
        <SecureRoute path="/profile" component={Profile} />
        <Route path="/gins" component={Gins} />
        <Route path="/gin/:id" component={Show} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </main>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)