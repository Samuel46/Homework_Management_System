import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
function Feedback({ parentMsgs }) {
    const feedback = parentMsgs.map(message => (
        <tr key={message._id}>
            <td>{message.title}</td>

            <td>{message.subject}</td>
            <td><td><Moment format='YYYY/MM/DD' >{message.date}</Moment></td></td>

            <td>

                <Link to={`/parent-message/${message.feedbackId}`} type="button" className="btn  btn-success btn-sm"> <i className="fas fa-comments" /> View Feedback</Link>
            </td>
        </tr>
    ))
    return (
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
                        <table id="report-table" className="table   table-bordered table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>Title</th>

                                    <th>Subject</th>
                                    <th>Issue Date</th>

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

    )
}

export default Feedback
