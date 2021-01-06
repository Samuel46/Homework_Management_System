import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

function CompleteWork({ completework }) {

    const complete = completework.map(work => (
        <tr key={work._id}>
            <td>{work.title}</td>
            <td>
                {Object.values(work.student.name)}
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
                <Link to={`/complete-work/${work._id}`} className="btn btn-success btn-sm  btn-round" ><i className="fas fa-eye" />
View</Link>
            </td>
        </tr>
    ))
    return (

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
                    <div className="table-responsive">
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
                                {complete}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CompleteWork
