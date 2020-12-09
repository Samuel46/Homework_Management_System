import React, { useState } from 'react'
import Alert from '../../layouts/Alert'
import { registerTeacher } from '../../../actions/teacher'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'



function RegisterTeacher({ registerTeacher, history }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        create_classes: true,
        allocate_class: '',
        profile_image: '',
        joining_date: ''
    })

    const {
        name, email, password, create_class, allocate_classes, profile_image, joining_date
    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        registerTeacher(formData, history)
    }
    return (

        <div className="container">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary">
                    <div className="card-header">
                        <h4 className="card-title">Register Teacher</h4>
                    </div>
                    <div className="card-body">
                        <div className='py-1'>
                            <Alert />
                        </div>


                        <form onSubmit={e => onSubmit(e)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Name</label>
                                        <input onChange={e => onChange(e)} name="name" value={name} type="text" className="form-control" id="Name" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Email">Email Address</label>
                                        <input onChange={e => onChange(e)} name="email" value={email} type="email" className="form-control" id="Email" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Allocate Class</label>
                                        <input onChange={e => onChange(e)} name="allocate_classes" value={allocate_classes} type="text" className="form-control" id="Name" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group  ">
                                        <label className="floating-label "> Permission to Create Classes</label> <br />


                                        <select name="create_class" value={create_class} onChange={e => onChange(e)} className="form-control">
                                            <option value={0} />
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Icon">Profie Image</label>
                                        <input onChange={e => onChange(e)} name="profile_image" value={profile_image} type="file" className="form-control" id="Icon" placeholder="sdf" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Occupation">Joining Date</label>
                                        <input onChange={e => onChange(e)} name="joining_date" value={joining_date} type="date" className="form-control" id="Occupation" placeholder={123} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Email">Password</label>
                                        <input onChange={e => onChange(e)} name="password" value={password} type="password" className="form-control" id="Email" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="col-sm-6 mt-4">
                                    <div className="form-group fill">
                                        <button className="btn btn-secondary">Reset Password</button>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <button type='submit' className="btn btn-success mr-2">Add Teacher</button>
                                    <Link to='/dashboard' className="btn btn-secondary">Go Back</Link>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div >
        </div>




    )
}

RegisterTeacher.propTypes = {
    registerTeacher: PropTypes.func.isRequired,
}

export default connect(null, { registerTeacher })(withRouter(RegisterTeacher))
