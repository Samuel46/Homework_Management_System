import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { deleteClass } from '../../../actions/classRoom'



function ClassList({ classes, deleteClass, history }) {
    let count = 1
    const allClasses = classes.map(clas => (
        <tr key={clas._id}>

            <td>{clas.name}</td>
            <td>{clas.add_students.map((add_student, index) => (
                <p key={index}> {count++}. {""} {add_student}</p>
            ))} <br />
            </td>
            <td>{clas.assign_teachers}</td>
            <td>
                <Link to="/edit-class" className="btn btn-info btn-sm mr-2">Edit</Link>
                <button onClick={(e) => deleteClass(clas._id, history)} className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
    ))


    return (
        <div className="container">
            <div className="row">
                {/* subscribe start */}
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Class List</h5>
                        </div>

                        <div className="card-body">
                            <div className="row align-items-center m-l-0">
                                <div className="col-sm-6">
                                </div>
                                <div className="col-sm-6 text-right">
                                    <Link to="/create-class" className="btn btn-success btn-sm mb-3 btn-round">Add Class</Link>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table id="report-table" className="table table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Student'<small /> Name</th>
                                            <th>Teacher's Name</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allClasses}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* subscribe end */}
            </div>
        </div>

    )
}
ClassList.propTypes = {
    classes: PropTypes.array.isRequired,
    deleteClass: PropTypes.func.isRequired,
}

export default connect(null, { deleteClass })(withRouter(ClassList))
