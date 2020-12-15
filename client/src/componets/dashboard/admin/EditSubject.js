import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { updateSubject, getSubject } from '../../../actions/subject'
import Alert from '../../layouts/Alert'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function EditSubject({ subject: { subjects, loading }, updateSubject, getSubject, history }) {

    const [formData, setFormData] = useState({
        subject_name: '',
        add_class: '',
        assign_teacher: ''

    })

    useEffect(() => {
        getSubject()
        setFormData({
            subject_name: loading || !subjects.subject_name ? '' : subjects.subject_name,
            add_class: loading || !subjects.add_class ? [] : subjects.add_class,
            assign_teacher: loading || !subjects.assign_teacher ? [] : subjects.assign_teacher,
        })
    }, [getSubject, loading, subjects.add_class, subjects.assign_teacher, subjects.subject_name])

    const {
        subject_name,
        add_class,
        assign_teacher

    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        updateSubject(formData, history)
    }
    return (
        <div className="container">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary">
                    <div className="card-header">
                        <h4 className="card-title">Edit Subject</h4>
                    </div>
                    <div className="card-body">
                        <div>
                            <Alert />
                        </div>
                        <form className="form" onSubmit={e => onSubmit(e)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Add Subject</label>
                                        <input onChange={e => onChange(e)} name="subject_name" value={subject_name} type="text" className="form-control" placeholder />
                                    </div>
                                </div>
                                {/* add subject */}


                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Add Class</label>
                                        <input onChange={e => onChange(e)} name="add_class" value={add_class} type="text" className="form-control" placeholder />
                                    </div>
                                </div>

                                {/* add Teacher */}

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Assign Teacher</label>
                                        <input onChange={e => onChange(e)} name="assign_teacher" value={assign_teacher} type="text" className="form-control" placeholder />
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

EditSubject.propTypes = {
    updateSubject: PropTypes.func.isRequired,
    getSubject: PropTypes.func.isRequired,
    subject: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    subject: state.subject
})

export default connect(mapStateToProps, { updateSubject, getSubject })(withRouter(EditSubject))
