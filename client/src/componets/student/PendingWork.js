import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

function PendingWork({ homeworks, studentHomework: { loading, homework } }) {
  const studenthomework = homeworks.map((homework) => (
    <tr key={homework._id}>
      <td>{homework.title}</td>
      <td>
        <ListGroup>
          <ListGroupItem color="primary" className="mb-2">
            {" "}
            {""}Mr/Mrs {""}
            {Object.values(
              homework !== null ? homework && homework.teacher.name : null
            )}
          </ListGroupItem>
        </ListGroup>
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

        <Link
          to={`/work/${homework._id}`}
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
      <div className="container">
        <div className="row">
          <div className="col-md-12" id="pending__homework">
            <div className="card shadow">
              <div className="card-header">
                <h4 className="text-danger">
                  <span className="badge badge-pill badge-danger">
                    Homework
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
                <div className="table-responsive">
                  <table
                    id="report-table"
                    className="table  table-bordered table-striped mb-0"
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
                    <tbody>{studenthomework}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
PendingWork.propTypes = {
  student: PropTypes.object.isRequired,
  studentHomework: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  student: state.student,
  studentHomework: state.studentHomework,
});

export default connect(mapStateToProps)(PendingWork);
