import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Alert from '../layouts/Alert'
import { addClassRoom } from '../../actions/teacher/classRoom';
import PropTypes from 'prop-types'

import { connect } from 'react-redux';

function AddClass({ addClassRoom, history, teacher: { teacher } }) {
    const [formData, setFormData] = useState({
        name: '',
        add_students: '',

    })

    const {
        name,
        add_students,

    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        addClassRoom(formData, history)
    }
    return (
        <div className="container">
            <div className="col-md-12 py-4">
                <div className="card bg-secondary shadow">
                    <div className="card-header">
                        <h4 className="card-title">Create Class</h4> <br />
                        <h5 className="card-title">Teacher Name:{teacher && teacher.name}</h5>
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
                                        <input onChange={e => onChange(e)} name="add_students" value={add_students} type="text" className="form-control" placeholder />
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

AddClass.propType = {
    addClassRoom: PropTypes.func.isRequired,
    teacher: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    teacher: state.teacher
})
export default connect(mapStateToProps, { addClassRoom })(withRouter(AddClass))
