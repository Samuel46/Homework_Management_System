import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteTeacher } from '../../../actions/teacher'


function TeacherList({ teachers, deleteTeacher, history }) {
    let count = 1
    const teacherList = teachers.map(teacher => (

        <tr key={teacher._id}>

            <td>{teacher.name}</td>
            <td>{teacher.email}</td>
            <td>{teacher.allocate_classes.map((allocate_class, index) => (

                <p key={index} > {count++}. {''}{allocate_class}</p>
            ))}</td>
            <td>
                <button className="btn btn-info btn-sm  btn-round" data-toggle="modal" data-target="#edit_teacher"><i className="feather icon-settings" />
Edit</button>
                <button onClick={() => deleteTeacher(teacher._id, history)} className="btn btn-danger btn-sm ml-2">Remove Teacher</button>
            </td>
        </tr>


    ))
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Teacher List </h5>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center m-l-0">
                                <div className="col-sm-6">
                                </div>
                                <div className="col-sm-6 text-right">
                                    <button className="btn btn-success btn-sm mb-3 btn-round" data-toggle="modal" data-target="#modal-report"><i className="feather icon-plus" /> Add
                    Teacher</button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table id="report-table" className="table table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>

                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Allocated Class</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {teacherList}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

TeacherList.propTypes = {
    deleteTeacher: PropTypes.func.isRequired,
}

export default connect(null, { deleteTeacher })(withRouter(TeacherList))
