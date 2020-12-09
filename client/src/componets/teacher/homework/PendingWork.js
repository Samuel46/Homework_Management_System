import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
function PendingWork({ homeworks }) {
  let count = 1;
  const pendingWork = homeworks.map(homework => (
    <tr key={homework._id}>
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
        {/*  */}

        <button className="btn btn-danger btn-sm  btn-round" data-toggle="modal" data-target="#edit_teacher"><i className="fas fa-eye" />
          View</button>

      </td>
    </tr>

  ))
  return (
    <div className="container">
      <div className="row">

        <div className="col-md-12" id="pending__homework">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="text-danger"><span className="badge badge-pill badge-danger">Pending Homework</span>
              </h4>
            </div>
            <div className="card-body">
              <div className="row align-items-center m-l-0">
                <div className="col-sm-6">
                </div>
              </div>
              <div className="table-responsive ">
                <table id="report-table" className="table  table-bordered table-striped mb-0">
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
                    {pendingWork}
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


export default PendingWork
