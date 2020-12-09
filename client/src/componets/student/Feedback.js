import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

function Feedback({ messages }) {
    const feedback = messages.map(message => (
        <tr key={message._id}>
            <td>{message.title}</td>
            <td>

                {/* {Object.values(message && message.teacher.name)} */}
            </td>
            <td>{message.subject}</td>
            <td><td><Moment format='YYYY/MM/DD' >{message.date}</Moment></td></td>

            <td>

                <Link to={`/message/${message.feedbackId}`} type="button" className="btn  btn-success btn-sm"> <i className="fas fa-comments" /> View Feedback</Link>
            </td>
        </tr>

    ))
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12" id="pending__homework">
                    <div className="card shadow">
                        <div className="card-header">
                            <h4 className="text-danger"><span className="badge badge-pill badge-info">Feeback</span>
                            </h4>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center m-l-0">
                                <div className="col-sm-6">
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table id="report-table" className="table  table-bordered table-striped mb-0">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Teacher's Name</th>
                                            <th>Subject</th>
                                            <th>Date</th>

                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feedback}
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

export default Feedback
