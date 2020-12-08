import React from 'react'
import { Redirect, Link } from 'react-router-dom';
import { connect } from "react-redux"
import { useState } from 'react'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'


function Register({ setAlert, register, isAuthenticated }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })


  // when the form is submited
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (

    <div className="register__container">

      <div className="auth-wrapper auth-v3">
        <div className="auth-content">
          <div className="card">
            <div className="row align-items-stretch text-center">
              <div className="col-md-6 img-card-side">
                <img src="assets/images/auth/homeWork1.png" alt="" className="img-fluid" />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <div className="text-left">
                    <h4 className="mb-3 f-w-600">Create <span className="text-primary"> School Account</span> </h4>
                    <p className="text-muted mb-4">Welcome Homework App, Please create your account <br /> <strong>Join our community</strong> </p>
                  </div>
                  {/* register new user here */}
                  <form onSubmit={e => onSubmit(e)} className="reg__pad">
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i data-feather="user" /></span>
                      </div>
                      <input className="form-control" type="text" placeholder="School Name" name="name" value={name} onChange={e => onChange(e)} />
                    </div>
                    {/* email address */}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i data-feather="mail" /></span>
                      </div>
                      <input className="form-control" type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />

                    </div>
                    {/* password one */}
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i data-feather="lock" /></span>
                      </div>
                      <input className="form-control" type="password" placeholder="Password" name="password" value={password} onChange={e =>
                        onChange(e)} />
                    </div>
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i data-feather="lock" /></span>
                      </div>
                      <input className="form-control" type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={e =>
                        onChange(e)} />
                    </div>
                    <div className="form-group text-left mb-4">
                      <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input input-primary" id="customCheckdefh2" defaultChecked />
                        <label className="custom-control-label" htmlFor="customCheckdefh2">I accept the <a href="#!"> Term &amp; condition</a></label>
                      </div>
                    </div>
                    <div className>
                      <button type="submit" className="btn btn-primary btn-block mt-2">Create Account</button>
                    </div>
                    <p className="mt-3 text-left">  Already have an account? <Link to="/login">Log in</Link></p>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
