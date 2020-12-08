import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteSubject } from '../../../actions/subject'

import { Link, withRouter } from 'react-router-dom'



function SubjectList({ subjects, deleteSubject, history }) {

    let count = 1
    const allSubjects = subjects.map(subject => (
        <tr key={subject._id}>
            <td>{subject.subject_name}</td>
            <td>{subject.add_classes.map((add_class, index) => (
                <p key={index}> {count++}.{""} {add_class}</p>
            ))}</td>
            <td>{subject.assign_teachers}</td>
            <td>
                <Link to='edit-subject' className="btn btn-info btn-sm mr-2">Edit</Link>
                <button onClick={() => deleteSubject(subject._id, history)} className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>

    ))
    return (
        <div className="container">
            < div className="row" >

                < div className="col-md-12" >
                    <div className="card">
                        <div className="card-header">
                            <h5>Subject List</h5>
                        </div>

                        <div className="card-body">
                            <div className="row align-items-center m-l-0">
                                <div className="col-sm-6">
                                </div>
                                <div className="col-sm-6 text-right">
                                    <Link to="/create-subject" className="btn btn-success btn-sm mb-3 btn-round">Add Subject</Link>

                                </div>
                            </div>
                            <div className="table-responsive">
                                <table id="report-table" className="table table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th>Class</th>
                                            <th>Teacher's Name</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allSubjects}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </ div>

            </div >
        </div>

    )
}
SubjectList.propTypes = {
    getSubject: PropTypes.func.isRequired,
    deleteSubject: PropTypes.func.isRequired,
}

export default connect(null, { deleteSubject })(withRouter(SubjectList))
