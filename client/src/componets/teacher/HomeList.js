import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteHomework } from '../../actions/teacher/homework'
import { withRouter, Link } from 'react-router-dom'


function HomeList({ homeworks, deleteHomework, history }) {
    let count = 1;
    const homeWorkList = homeworks.map(homework => (
        <tr key={homework._d}>
            <td>{homework.title}</td>
            <td>
                {homework.students.map((student, index) => (
                    <p key={index}> {count++}. {""} {student}</p>
                ))}
            </td>
            <td>{homework.subject}</td>
            <td><Moment format='YYYY/MM/DD' >{homework.set_date}</Moment></td>
            <td><Moment format='YYYY/MM/DD' >{homework.due_date}</Moment></td>
            <td>
                <button className="btn btn-info btn-sm mr-2 btn-round" data-toggle="modal" data-target="#edit_teacher"><i className="feather icon-settings" />
Edit</button>
                <button onClick={() => deleteHomework(homework._id, history)} className="btn btn-danger btn-sm mr-2">Delete</button>
                {/* <a href="../Teachers/homework.html" className="btn btn-success btn-sm">Submission</a> */}
            </td>
        </tr>
    ))
    return (
        <div className="container">
            <div className="row ">

                <div className="col-md-12">
                    <div className="card shadow">
                        <div className="card-header">
                            <h5 className="text-danger"><span className="badge badge-pill badge-danger">Pending Homework</span> </h5>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center m-l-0">
                                <div className="col-sm-6">
                                </div>
                                <div className="col-sm-6 text-right">
                                    <button className="btn btn-success btn-sm mb-3 btn-round" data-toggle="modal" data-target="#modal-report"><i className="feather icon-plus" />Add
            Homework</button>
                                </div>
                            </div>
                            <div className="table-responsive table__hight">
                                <table id="report-table" className="table   table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Students</th>
                                            <th>Subject</th>
                                            <th>Start Date</th>
                                            <th>Due Date</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {homeWorkList}


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

HomeList.propTypes = {
    deleteHomework: PropTypes.func.isRequired,
}

export default connect(null, { deleteHomework })(withRouter(HomeList))
