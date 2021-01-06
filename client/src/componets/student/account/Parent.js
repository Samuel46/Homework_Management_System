import React, { useState } from 'react'
import Alert from '../../layouts/Alert'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerParent } from '../../../actions/student/parents/parent'

function Parent({ registerParent, history }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const {
        name,
        email,
        password,

    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        registerParent(formData, history)
    }
    return (
        <div className="container">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary shadow">
                    <div className="card-header">
                        <h4 className="card-title">Add Parent</h4> <br />

                    </div>

                    <div className="card-body">
                        <div>
                            <Alert />
                        </div>
                        <form onSubmit={e => onSubmit(e)} >
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" >Parent's Name</label>
                                        <input onChange={e => onChange(e)} value={name} name="name" type="text" className="form-control" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Email">Email Address</label>
                                        <input onChange={e => onChange(e)} value={email} name="email" type="email" className="form-control" id="Email" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label">Password</label>
                                        <input onChange={e => onChange(e)} value={password} name="password" type="password" className="form-control" id="Password" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button type='submit' className="btn btn-primary mr-4">Add Parent</button>
                                    <Link to="/student-account" className="btn btn-secondary">Go Back</Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
Parent.propTypes = {
    registerParent: PropTypes.func.isRequired,
}

export default connect(null, { registerParent })(withRouter(Parent))
