import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import Alert from '../layouts/Alert'
import LoginTeacher from './LoginTeacher';
import LoginStudent from './LoginStudent';
import LoginParent from './LoginParent';
function Login({ login, isAuthenticated }) {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if Logged in

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }


  return (

    <div className="auth-wrapper auth-v3">
      <div className="auth-content">
        <div className="card shadow">
          <div className="row align-items-stretch text-center">
            <div className="col-md-6 img-card-side ">
              <img src="assets/images/auth/homeWork1.png" alt="" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <Alert />
                <div className="text-left">
                  <h4 className="mb-3 f-w-600">Welcome to <span className="text-primary">Homework App</span></h4>
                  <p className="text-muted mb-4">Welcome back, Please login <br />into a account</p>
                </div>
                <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active text-uppercase text-primary" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Student</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-uppercase text-primary" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Teacher</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-uppercase text-primary" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">School</a>
                  </li>
                  <li className="nav-item parent ">
                    <a className="nav-link text-uppercase text-primary" id="parent-tab" data-toggle="tab" href="#parent" role="tab" aria-controls="parent" aria-selected="false">Parent</a>
                  </li>
                </ul>
                {/* Tab content */}
                <div className="tab-content col-12 " id="myTabContent">
                  {/* tap panel 1 */}
                  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <LoginStudent />
                  </div>
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    <LoginTeacher />
                  </div>
                  {/* school */}
                  <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                    <form className="card-body card__width" onSubmit={onSubmit}>
                      {/* Email */}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i data-feather="mail" /></span>
                        </div>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email Address"
                          name="email"
                          value={email}
                          onChange={onChange}

                        />
                      </div>
                      {/* Password */}
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span className="input-group-text"><i data-feather="lock" /></span>
                        </div>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={onChange}

                        />
                      </div>
                      <div className="form-group text-left mb-4">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input input-primary" id="customCheckdefh2" defaultChecked />
                          <label className="custom-control-label" htmlFor="customCheckdefh2">I accept
                          the <a href="#!"> Term &amp; condition</a></label>
                        </div>
                      </div>
                      <div className>
                        <button type="submit" class="btn btn-primary btn-block mt-2">Log in</button>
                        {/* <a href="students/student.html" className="btn btn-primary btn-block mt-2">Log
                        in</a> */}
                      </div>
                      <div className="text-left">
                        <p className="text-muted py-4">Don’t have an account? <br /> <strong> Join Our Community <Link to="/register">Sign Up</Link></strong></p>
                        <p />
                      </div>
                    </form>
                  </div>
                  {/* / */}

                  {/* Login parent */}
                  <div className="tab-pane fade" id="parent" role="tabpanel" aria-labelledby="parent-tab">

                    <LoginParent />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
