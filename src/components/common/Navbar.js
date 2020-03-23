import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import Auth from '../../lib/auth'

class Navbar extends React.Component {
  state = { navOpen: false }
    
  toggleNavbar = () => {
    this.setState({ navOpen: !this.state.navOpen })
  }

  handleLogout = () => {
    Auth.logout()
    notify.show('Thanks for coming by!', 'custom', 3000, { background: '#FFFFF0' })
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navOpen: false })
    } 
  }
  
  render() {
    return (
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">GINventory</Link>

            <a 
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className={`navbar-menu ${this.state.navOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/gins">See our GINventory</Link>
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/profile">Profile</Link>}
              {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}
              {Auth.isAuthenticated() && <Link className="navbar-item" to="/gins/new">Make a new gin</Link>}
              {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
