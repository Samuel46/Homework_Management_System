import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loginParent } from '../../actions/student/parents/parent';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


function LoginParent({ loginParent, isAuthenticated }) {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        loginParent(email, password);
    };

    if (isAuthenticated) {
        return <Redirect to="/parent-dashboard" />
    }
    return (
        <form onSubmit={onSubmit} className="card-body card__width">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i data-feather="mail" /></span>
                </div>
                <input type="email" onChange={onChange} value={email} name="email" className="form-control" placeholder="Email address" />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i data-feather="lock" /></span>
                </div>
                <input type="password" onChange={onChange} value={password} name="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group text-left mb-4">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input input-primary" id="customCheckdefh2" defaultChecked />
                    <label className="custom-control-label" htmlFor="customCheckdefh2">I accept
              the <a href="#!"> Term &amp; condition</a></label>
                </div>
            </div>
            <div className>
                <button type='submit' className="btn btn-primary btn-block mt-2">Log
            in</button>
            </div>
            <div className="text-left">
                <p className="text-muted py-4">Don’t have an account? <br /> <strong><Link to="/register" className="f-w-400">Signup</Link></strong></p><strong>
                </strong>
                <p />
            </div>
        </form>
    )
}
LoginParent.propTypes = {
    loginParent: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    token: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    token: state.parent.token,
    isAuthenticated: state.parent.isAuthenticated
})
export default connect(mapStateToProps, { loginParent })(LoginParent)
