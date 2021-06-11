import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteHomework } from "../../actions/teacher/homework";
import { withRouter, Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

function HomeList({ homeworks, deleteHomework, history }) {
  const homeWorkList = homeworks.map((homework) => (
    <tr key={homework._d}>
      <td>{homework.title}</td>
      <td>
        {homework.students.map((student, index) => (
          <ListGroup key={index}>
            <ListGroupItem color="info" className="mb-2">
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
            <ListGroupItem color="primary" className="mb-2">
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
        <Link
          to={`/edit-homework/${homework._id}`}
          className="btn btn-info btn-sm mr-2 btn-round"
        >
          <i className="feather icon-settings" />
          Edit
        </Link>
        <button
          onClick={() => deleteHomework(homework._id, history)}
          className="btn btn-danger btn-sm mr-2"
        >
          Delete
        </button>
        {/* <a href="../Teachers/homework.html" className="btn btn-success btn-sm">Submission</a> */}
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-header">
              <h5 className="text-danger">
                <span className="badge badge-pill badge-danger">
                  Pending Homework
                </span>{" "}
              </h5>
              <div class="cover-img-block img_img">
											<img src="https://image.freepik.com/free-vector/smart-cute-child-boy-cartoon-character-sitting-chair-with-laptop-flat-illustration-isolated-white-background-personage-distance-home-education_181313-722.jpg" alt="" class="img-fluid"/>
										</div>
            </div>
            <div className="card-body">
              <div className="row align-items-center m-l-0">
                <div className="col-sm-6"></div>
                <div className="col-sm-6 text-right">
                  <Link
                    to="/create-homework"
                    className="btn btn-success btn-sm mb-3 btn-round"
                  >
                    <i className="feather icon-plus" />
                    Add Homework
                  </Link>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  id="report-table"
                  className="table   table-bordered table-striped mb-0"
                >
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>
                        <small>Optional</small> Students
                      </th>
                      <th>Classrooms</th>
                      <th>Subject</th>
                      <th>Start Date</th>
                      <th>Due Date</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{homeWorkList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

HomeList.propTypes = {
  deleteHomework: PropTypes.func.isRequired,
};

export default connect(null, { deleteHomework })(withRouter(HomeList));
