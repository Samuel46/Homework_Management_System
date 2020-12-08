import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addHomework } from '../../actions/teacher/homework'
import Alert from '../layouts/Alert'
import { Link, withRouter } from 'react-router-dom'
import { useState } from 'react'

function CreateHomework({ addHomework, history, teacher: { teacher } }) {
    const [formData, setFormData] = useState({
        title: '',
        subject: '',

        effort_time: '',
        allocate_classes: '',
        description: '',
        students: '',
        set_date: '',
        due_date: '',
        attachements: ''
    })

    const {
        title,
        subject,

        effort_time,
        allocate_classes,
        description,
        students,
        set_date,
        due_date,
        attachements
    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addHomework(formData, history)
    }

    return (
        <div className="container">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary shadow">
                    <div className="card-header">
                        <h4 className="card-title">Create Homework</h4> <br />
                        <h5 className="card-title">Teacher Name:{""} {teacher && teacher.name}</h5>
                    </div>

                    <div className="card-body">
                        <div>
                            <Alert />
                        </div>
                        <form onSubmit={e => onSubmit(e)}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label">Title</label>
                                        <input onChange={e => onChange(e)} name='title' value={title} type="text" className="form-control" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name">Subject</label>
                                        <input onChange={e => onChange(e)} name="subject" value={subject} type="text" className="form-control" placeholder />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name"> Effort Estimat <small>amount of
                  hours</small></label>
                                        <input onChange={e => onChange(e)} name="effort_time" value={effort_time} type="text" className="form-control" id="Name" placeholder="Estimated delivery time/hrs" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name"> Allocate Class </label>
                                        <input onChange={e => onChange(e)} name="allocate_classes" value={allocate_classes} type="text" className="form-control" id="Name" placeholder="Allocate class" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Name"> Add Students</label>
                                        <input onChange={e => onChange(e)} name="students" value={students} type="text" className="form-control" placeholder="Add Students" />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Icon">Attachements</label>
                                        <input onChange={e => onChange(e)} name="attachements" value={attachements} type="file" className="form-control btn-secondary" id="Icon" placeholder />
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label className="floating-label" htmlFor="Address">Description</label>
                                        <textarea onChange={e => onChange(e)} name="description" value={description} className="form-control" id="Address" rows={4} defaultValue={""} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Occupation">Set Date</label>
                                        <input onChange={e => onChange(e)} name="set_date" value={set_date} type="date" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Occupation">Due Date</label>
                                        <input onChange={e => onChange(e)} name="due_date" value={due_date} type="date" className="form-control" />
                                    </div>
                                </div>


                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-success mr-2">Submit Homework</button>
                                    <Link to="teacher-dashboard" className="btn btn-secondary">Go back</Link>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

CreateHomework.propTpyes = {
    addHomework: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    teacher: state.teacher
})
export default connect(mapStateToProps, { addHomework })(withRouter(CreateHomework))
