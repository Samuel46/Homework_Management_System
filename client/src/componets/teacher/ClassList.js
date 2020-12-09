import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteClassRoom } from '../../actions/teacher/classRoom'
import { Link, withRouter } from 'react-router-dom'

function ClassList({ classes, teacher: { teacher }, deleteClassRoom, history }) {
    let count = 1
    const allClasses = classes.map(clas => (
        <tr key={clas._id}>
            <td>{clas.name}</td>
            <td>
                {clas.add_students.map((student, index) => (
                    <p key={index}> {count++}. {""} {student}</p>
                ))}
w
            </td>
            <td>{teacher && teacher.name}</td>
            <td>
                <Link className="btn btn-info btn-sm mr-2">Edit</Link>
                <button onClick={() => deleteClassRoom(clas._id, history)} className="btn btn-danger btn-sm ">Delete</button>
            </td>
        </tr>

    ))
    return (

        <div className="container">

            <div className="row">
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
                                    <Link to="/manage-classes" className="btn btn-success btn-sm mb-3 btn-round"><i className="feather icon-plus" /> Add
                    Class</Link>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table id="report-table" className="table table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Student'Name</th>
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
            </div>
        </div>




    )
}

ClassList.propTypes = {
    teacher: PropTypes.func.isRequired,
    deleteClassRoom: PropTypes.func.isRequired,


}

const mapStateToProps = state => ({
    teacher: state.teacher


})

export default connect(mapStateToProps, { deleteClassRoom })(withRouter(ClassList))
