import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import homework from '../../reducers/teacher/homework'




function PendingWork({ homeworks, studentHomework: { loading, homework } }) {


    const studenthomework = homeworks.map(homework => (
        <tr key={homework._id}>
            <td>{homework.title}</td>
            <td>


                {Object.values(homework.teacher.name)}

            </td>
            <td>{homework.subject}</td>
            <td><Moment format='YYYY/MM/DD' >{homework.set_date}</Moment></td>
            <td><Moment format='YYYY/MM/DD' >{homework.due_date}</Moment></td>
            <td>
                {/*  */}
                <div className="custom-control custom-checkbox mb-2">
                    <input type="checkbox" className="custom-control-input input-success" id="customCheckc1" />
                    <label className="custom-control-label" htmlFor="customCheckc1" />
                </div>
                <Link to={`/work/${homework._id}`} className="btn btn-danger btn-sm  btn-round"><i className="fas fa-eye" />
View</Link>
                <span className="badge badge-pill badge-danger ml-2 mr-2">Pending</span>
            </td>
        </tr>
    ))
    return (

        <Fragment>
            {loading && homework ? <Spinner /> : <Fragment>
                <div className="container">
                    <div className="row">

                        <div className="col-md-12" id="pending__homework">
                            <div className="card shadow">
                                <div className="card-header">
                                    <h4 className="text-danger"><span className="badge badge-pill badge-danger">Pending Homework</span>
                                    </h4>
                                    <small className="mt-5 ml-3 py-4"><strong>Due date:</strong> 12/20/12</small>
                                </div>
                                <div className="card-body">
                                    <div className="row align-items-center m-l-0">
                                        <div className="col-sm-6">
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table id="report-table" className="table  table__height table-bordered table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Teacher's Name</th>
                                                    <th>Subject</th>
                                                    <th>Start Date</th>
                                                    <th>Due Date</th>
                                                    <th>Options</th>
                                                </tr>
                                            </thead>
                                            <tbody>



                                                {studenthomework}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Fragment>}


        </Fragment>

    )
}
PendingWork.propTypes = {
    student: PropTypes.object.isRequired,
    studentHomework: PropTypes.object.isRequired,


}
const mapStateToProps = state => ({
    student: state.student,
    studentHomework: state.studentHomework

})

export default connect(mapStateToProps)(PendingWork)
