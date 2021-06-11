import React from "react";
import { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function PendingWork({ homeworks }) {
  const pendingWork = homeworks.map((homework) => (
    <tr key={homework._id}>
      <td>{homework.title}</td>
      <td>{/* {Object.values(homework.teacher.name)} */}</td>
      <td>{homework.subject}</td>
      <td>
        <Moment format="YYYY/MM/DD">{homework.set_date}</Moment>
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{homework.due_date}</Moment>
      </td>
      <td>
        {/*  */}

        <Link
          to={`/parent-work/${homework._id}`}
          className="btn btn-danger btn-sm  btn-round"
        >
          <i className="fas fa-eye" />
          View
        </Link>
        <span className="badge badge-pill badge-danger ml-2 mr-2">Pending</span>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <div className="col-md-12" id="pending__homework">
        <div className="card shadow">
          <div className="card-header">
            <h4 className="text-danger">
              <span className="badge badge-pill badge-danger">
                Pending Homework
              </span>
            </h4>

            <small className="mt-5 ml-3 py-4">
              <strong>Due date:</strong> 12/20/12
            </small>
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
                className="table   table-bordered table-striped mb-0"
              >
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
                <tbody>{pendingWork}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PendingWork;
