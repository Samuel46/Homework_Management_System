import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteStudent } from "../../../actions/student";
import { Link, withRouter } from "react-router-dom";

function StudentList({ students, deleteStudent, history }) {
  const allStudents = students.map((student) => (
    <tr key={student._id}>
      <td>
        {" "}
        😃 {""}
        {student.name}
      </td>
      <td>{student.email}</td>

      <td>{student.gender}</td>
      <td>
        {" "}
        <Moment format="YYYY/MM/DD">{student.birth_date}</Moment>
      </td>
      <td>
        {" "}
        <Moment format="YYYY/MM/DD">{student.joining_date}</Moment>
      </td>
      <td>
        {" "}
        <Moment format="YYYY">{student.current_year_group}</Moment>
      </td>
      <td>
        <Link
          to={`/edit-student/${student._id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <i className="feather icon-settings" />
          Edit
        </Link>
        <button
          onClick={() => deleteStudent(student._id, history)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row">
        {/* subscribe start */}
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5>Student List </h5>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg"
                  alt=""
                  class="img-fluid"
                />
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center m-l-0">
                <div className="col-sm-6"></div>
                <div className="col-sm-6 text-right">
                  <Link
                    to="/create-student"
                    className="btn btn-success btn-sm mb-3 btn-round"
                  >
                    <i className="feather icon-plus" /> Add Student
                  </Link>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  id="report-table"
                  className="table table-bordered table-striped mb-0"
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>

                      <th>Gender</th>
                      <th>Birth Date</th>
                      <th>Joining Date</th>
                      <th>Current Year Group</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{allStudents}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

StudentList.propTypes = {
  deleteStudent: PropTypes.func.isRequired,
};

export default connect(null, { deleteStudent })(withRouter(StudentList));
