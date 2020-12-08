import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

function CompleteWork({ completework, student: { student } }) {
    const completeWork = completework.map(work => (
        <tr key={work._id}>
            <td>{work.title}</td>
            <td>
                {student && student.name}
            </td>
            <td>{work.subject}</td>
            <td><Moment format='YYYY/MM/DD' >{work.set_date}</Moment> </td>
            <td><Moment format='YYYY/MM/DD' >{work.due_date}</Moment></td>
            <td>
                {/*  */}
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input input-success" id="customCheckc1" defaultChecked />
                    <label className="custom-control-label" htmlFor="customCheckc1">Completed</label>
                </div>
                <button className="btn btn-success btn-sm  btn-round" data-toggle="modal" data-target="#edit_teacher"><i className="fas fa-eye" />
View</button>
            </td>
        </tr>


    ))
    return (
        <div className="row">
            <div className="col-md-12" id="complete">
                <div className="card shadow">
                    <div className="card-header">
                        <h4 className="text-success"><span className="badge badge-pill badge-success">Complete
    Homework</span> </h4>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center m-l-0">
                            <div className="col-sm-6">
                            </div>
                        </div>
                        <div className="table-responsive table__height">
                            <table id="report-table" className="table  table__height table-bordered table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Student Name</th>
                                        <th>Subject</th>
                                        <th>Start Date</th>
                                        <th>Due Date</th>
                                        <th>Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completeWork}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
CompleteWork.propTypes = {
    student: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    student: state.student
})
export default connect(mapStateToProps)(CompleteWork)
