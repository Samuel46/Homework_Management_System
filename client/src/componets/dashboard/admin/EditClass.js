import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { updateClassRoom, getClasses } from '../../../actions/classRoom'
import Alert from '../../layouts/Alert'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function EditClass({ classRoom: { classes, loading }, updateClassRoom, getClasses, history }) {

    const [formData, setFormData] = useState({
        name: '',
        add_student: '',
        assign_teacher: ''
    })

    useEffect(() => {
        getClasses()
        setFormData({
            name: loading || !classes.name ? '' : classes.name,
            add_student: loading || !classes.add_student ? [] : classes.add_student,
            assign_teacher: loading || !classes.assign_teacher ? [] : classes.assign_teacher,
        })
    }, [getClasses, loading, classes.add_student, classes.assign_teacher, classes.name])

    const {
        name,
        add_student,
        assign_teacher
    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        updateClassRoom(formData, history)
    }
    return (
        <div className="conatainer">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary">
                    <div className="card-header">
                        <h4 className="card-title">Create Class</h4>
                    </div>
                    <div className="card-body">
                        <div>
                            <Alert />
                        </div>
                        <form className="form" onSubmit={e => onSubmit(e)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Class Name</label>
                                        <input onChange={e => onChange(e)} name="name" value={name} type="text" className="form-control" placeholder />
                                    </div>
                                </div>
                                {/* add classes */}


                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Add Students</label>
                                        <input onChange={e => onChange(e)} name="add_student" value={add_student} type="text" className="form-control" placeholder />
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

EditClass.propTypes = {
    updateClassRoom: PropTypes.func.isRequired,
    getClasses: PropTypes.func.isRequired,
    classRoom: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    classRoom: state.classRoom
})

export default connect(mapStateToProps, { updateClassRoom, getClasses })(withRouter(EditClass))
