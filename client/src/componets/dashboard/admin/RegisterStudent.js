import React, { useState } from 'react'
import Alert from '../../layouts/Alert'
import { registerStudent } from '../../../actions/student'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'



function RegisterStudent({ registerStudent, history }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',

        code: '',
        birth_date: '',
        gender: '',
        joining_date: '',
        joining_year_group: '',
        current_year_group: ''

    })

    const {
        name,
        email,
        code,
        birth_date,
        gender,
        joining_date,
        joining_year_group,
        current_year_group

    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        registerStudent(formData, history)
    }
    return (
        <div className="container">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary">
                    <div className="card-header">
                        <h4 className="card-title">Register Students</h4>
                    </div>
                    <div className="card-body">
                        <div className='py-1'>
                            <Alert />
                        </div>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="row">
                                <div className="col-12">
                                    <h5>Personal Information</h5>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Name</label>
                                        <input onChange={e => onChange(e)} value={name} name="name" type="text" className="form-control" id="Name" placeholder />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Email">Email/Username</label>
                                        <input onChange={e => onChange(e)} name="email" value={email} type="email" className="form-control" id="Email" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Birth">Birth Date</label>
                                        <input onChange={e => onChange(e)} name="birth_date" value={birth_date} type="date" className="form-control" id="Birth" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Birth">Joining Date</label>
                                        <input onChange={e => onChange(e)} value={joining_date} name="joining_date" type="date" className="form-control" id="Birth" placeholder={123} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Birth">Joining Year Group</label>
                                        <input onChange={e => onChange(e)} value={joining_year_group}
                                            name="joining_year_group" type="text" className="form-control" id="Birth" />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Birth">Current Year Group</label>
                                        <input onChange={e => onChange(e)} value={current_year_group} name="current_year_group" type="text" className="form-control" id="Birth" />
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="form-group fill">
                                        <label className="floating-label" >Code</label>
                                        <input onChange={e => onChange(e)} value={code} name="code" type="password" className="form-control" id="Birth" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Sex">Gender</label>
                                        <select onChange={e => onChange(e)} value={gender} name="gender" className="form-control" id="Sex">
                                            <option value={0} />
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <button className="btn btn-secondary">Reset Password</button>
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <button type='submit' className="btn btn-success mr-2">Add Student</button>
                                    <Link to="/dashboard" className="btn btn-secondary">Go back</Link>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div >

        </div>


    )
}

RegisterStudent.propTypes = {
    registerStudent: PropTypes.func.isRequired,
}

export default connect(null, { registerStudent })(withRouter(RegisterStudent))
