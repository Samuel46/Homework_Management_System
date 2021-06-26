import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { ListGroup, ListGroupItem } from "reactstrap";
import { removeHomework } from "../../actions/student/homework";

function CompleteWork({ completework, student: { student }, removeHomework }) {
  const completeWork = completework.map((work) => (
    <tr key={work._id}>
      <td>{work.title}</td>
      <td>
        <ListGroup>
          <ListGroupItem color="info" className="mb-2">
            {" "}
            {Object.values(work.student.name)}
          </ListGroupItem>
        </ListGroup>
      </td>
      <td>{work.subject}</td>
      <td>
        <Moment format="YYYY/MM/DD">{work.set_date}</Moment>{" "}
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{work.completeTime}</Moment>
      </td>
      <td>
        {/*  */}
        <div className="custom-control custom-checkbox mb-2">
          <input
            disabled
            type="checkbox"
            className="custom-control-input input-success"
            id="customCheckc1"
            defaultChecked
          />
          <label className="custom-control-label " htmlFor="customCheckc1">
            Submitted✔
          </label>
        </div>
        {/* <button
          onClick={() => removeHomework(work._id)}
          className="btn btn-danger btn-sm mr-2"
        >
          Delete
        </button> */}
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12" id="complete">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="text-success">
                <span className="badge badge-pill badge-success">
                  Complete Homework
                </span>{" "}
              </h4>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/completed-concept-illustration_114360-3449.jpg"
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
                      <th>Student Name</th>
                      <th>Subject</th>
                      <th>Start Date</th>
                      <th>Completed At</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{completeWork}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
CompleteWork.propTypes = {
  student: PropTypes.object.isRequired,
  removeHomework: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { removeHomework })(CompleteWork);
