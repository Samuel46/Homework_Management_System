import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

function Navbar({ auth: { isAuthenticated, loading }, logout }) {
  const authLinks = (
    <ul>
      <li><Link to="/posts">Home Work</Link></li>
      <li><Link to="/profiles">Students</Link></li>
      <li><Link to="/dashboard">

        <i className="fas fa-user" />{' '}
        <span className="hide-sm">Dashboard</span>
      </Link></li>
      <li onClick={logout} ><Link to="#!">
        <i className="fas fa-sign-out-alt"></i>{''}
        <span className="hide-sm">Logout</span> </Link></li>

    </ul>
  )
  const guestLinks = (
    <ul>

      <li><Link to="/profiles">Students</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )
  return (
    <nav className="navbar bg-dark">
      <h6>
        <Link to="/"><i className="fas fa-code" /> Homework App</Link>
      </h6>
      {
        !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)
      }

    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
