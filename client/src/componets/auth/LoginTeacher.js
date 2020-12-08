import React, { useState } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loginTeacher } from '../../actions/teacher'


function LoginTeacher({ loginTeacher, isAuthenticated, token }) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        loginTeacher(email, password);
    };

    if (isAuthenticated && token) {
        return <Redirect to="/teacher-dashboard" />
    }




    return (


        <form>
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
                    <p className="text-muted py-4">Don’t have an account? <br /> <strong> Don't have an account? <Link to="/register">Sign Up</Link></strong></p>
                    <p />
                </div>
            </form>
        </form>
    )
}

LoginTeacher.propTypes = {
    loginTeacher: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.object.isRequired,



}

const mapStateToProps = state => ({
    isAuthenticated: state.teacher.isAuthenticated,
    token: state.teacher.token,
})




export default connect(mapStateToProps, { loginTeacher })(withRouter(LoginTeacher))
