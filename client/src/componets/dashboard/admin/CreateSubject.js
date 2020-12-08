import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Alert from '../../layouts/Alert'
import { addSubject } from '../../../actions/subject';
import PropTypes from 'prop-types'

import { connect } from 'react-redux';

function CreateSubject({ addSubject, history }) {
    const [formData, setFormData] = useState({
        subject_name: '',
        add_classes: '',
        assign_teachers: ''
    })

    const {
        subject_name,
        add_classes,
        assign_teachers
    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addSubject(formData, history)
    }
    return (
        <div className="container">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary">
                    <div className="card-header">
                        <h4 className="card-title">Create Subject</h4>
                    </div>
                    <div className="card-body">
                        <div>
                            <Alert />
                        </div>
                        <form className="form" onSubmit={e => onSubmit(e)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Subject Name</label>
                                        <input onChange={e => onChange(e)} name="subject_name" value={subject_name} type="text" className="form-control" placeholder />
                                    </div>
                                </div>
                                {/* add classes */}


                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Add Class</label>
                                        <input onChange={e => onChange(e)} name="add_classes" value={add_classes} type="text" className="form-control" placeholder />
                                    </div>
                                </div>

                                {/* add Teacher */}

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Assign Teacher</label>
                                        <input onChange={e => onChange(e)} name="assign_teachers" value={assign_teachers} type="text" className="form-control" placeholder />
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <button type='submit' className="btn btn-success mr-2">Add Class</button>
                                    <Link to='/dashboard' className="btn btn-secondary">Go Back</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

CreateSubject.propType = {
    addSubject: PropTypes.func.isRequired,
}
export default connect(null, { addSubject })(withRouter(CreateSubject))
