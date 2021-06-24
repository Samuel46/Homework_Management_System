import React from "react";

import Moment from "react-moment";
import { ListGroup, ListGroupItem } from "reactstrap";
function PendingWork({ homeworks }) {
  let count = 1;
  const pendingWork = homeworks.map((homework) => (
    <tr key={homework._id}>
      <td>{homework.title}</td>
      <td>
        {homework.students.map((student, index) => (
          <ListGroup key={index}>
            <ListGroupItem color="danger" className="mb-2">
              {" "}
              {""}😃 {""}
              {student}
            </ListGroupItem>
          </ListGroup>
        ))}
      </td>
      <td>
        {homework.allocate_classes.map((classroom, index) => (
          <ListGroup key={index}>
            <ListGroupItem color="danger" className="mb-2">
              {" "}
              {""}✔ {""}
              {classroom}
            </ListGroupItem>
          </ListGroup>
        ))}
      </td>
      <td>{homework.subject}</td>
      <td>
        <Moment format="YYYY/MM/DD">{homework.set_date}</Moment>
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{homework.due_date}</Moment>
      </td>
      <td>
        {/*  */}

        <button
          className="btn btn-danger btn-sm  btn-round"
          data-toggle="modal"
          data-target="#edit_teacher"
        >
          <i className="fas fa-eye" />
          View
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12" id="pending__homework">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="text-danger">
                <span className="badge badge-pill badge-danger">
                  Pending Homework
                </span>
              </h4>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/smart-cute-child-boy-cartoon-character-sitting-chair-with-laptop-flat-illustration-isolated-white-background-personage-distance-home-education_181313-722.jpg"
                  alt=""
                  class="img-fluid"
                />
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center m-l-0">
                <div className="col-sm-6"></div>
              </div>
              <div className="table-responsive ">
                <table
                  id="report-table"
                  className="table  table-bordered table-striped mb-0"
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Students</th>

                      <th>Classrooms</th>
                      <th>Subject</th>
                      <th>Start Date</th>
                      <th>Due Date</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{pendingWork}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingWork;
