import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteDoneWorkById } from "../../../actions/teacher/homework";
import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ListGroup, ListGroupItem } from "reactstrap";

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

function CompleteWork({ isComplete, deleteDoneWorkById, history }) {
  const completeWork = isComplete.map((complete) => (
    <tr key={complete._id}>
      <td>{complete.title}</td>
      <td>
        <ListGroup>
          <ListGroupItem color="info" className="mb-2">
            {" "}
            {""}😃 {""}
            {Object.values(
              complete &&
                complete.student.firstname + " " + complete.student.sirname
            )}
          </ListGroupItem>
        </ListGroup>
      </td>
      <td>{complete.subject}</td>
      <td>
        <Moment format="YYYY/MM/DD">{complete.set_date}</Moment>
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{complete.due_date}</Moment>
      </td>
      <td>
        <div className="custom-control custom-checkbox mb-2">
          <input
            type="checkbox"
            className="custom-control-input input-success"
            id="customCheckc1"
            defaultChecked
          />
          <label className="custom-control-label" htmlFor="customCheckc1">
            Completed
          </label>
        </div>
        <Link
          to={`/sumited-work/${complete._id}`}
          className="btn btn-info btn-sm  btn-round mr-2"
        >
          <i className="fas fa-eye" />
          View
        </Link>
        <Link
          to={`/feedback/${complete._id}`}
          className="btn  btn-success btn-sm mr-2"
        >
          {" "}
          <i className="fas fa-comments" /> Give Feedback
        </Link>

        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          className="btn btn-danger btn-sm ml-2"
          title="Are you absolutely sure? This action cannot be undone. This will permanently delete this complete work🙄?"
          onConfirm={() => deleteDoneWorkById(complete._id, history)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Remove Homework</a>
        </Popconfirm>
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
              <div className="table-responsive">
                <table
                  id="report-table"
                  className="table   table-bordered table-striped mb-0"
                >
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
  deleteDoneWorkById: PropTypes.func.isRequired,
};

export default connect(null, { deleteDoneWorkById })(withRouter(CompleteWork));
