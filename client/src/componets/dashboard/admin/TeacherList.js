import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTeacher } from "../../../actions/teacher";
import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ListGroupItem, ListGroup } from "reactstrap";

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

function TeacherList({ teachers, deleteTeacher, history }) {
  const teacherList = teachers.map((teacher) => (
    <tr key={teacher._id}>
      <td>
        <ListGroup>
          <ListGroupItem color="primary" className="mb-2">
            {" "}
            {""} 😎 {""}
            {teacher.name}
          </ListGroupItem>
        </ListGroup>
      </td>
      <td>{teacher.email}</td>
      <td>
        {teacher.allocate_classes.map((allocate_class, index) => (
          <p key={index}>
            {""}✔{""}
            {allocate_class}
          </p>
        ))}
      </td>
      <td>
        <Link
          to={`/edit-teacher/${teacher._id}`}
          className="btn btn-info btn-sm  btn-round"
        >
          <i className="feather icon-settings" />
          Edit
        </Link>

        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          className="btn btn-danger btn-sm ml-2"
          title="Are you absolutely sure? This action cannot be undone. This will permanently delete this teacher🙄?"
          onConfirm={() => deleteTeacher(teacher._id, history)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Remove Teacher</a>
        </Popconfirm>
      </td>
    </tr>
  ));
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5>Teacher List </h5>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/teacher-concept-illustration_114360-2166.jpg"
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
                    to="/create-teacher"
                    className="btn btn-success btn-sm mb-3 btn-round"
                  >
                    <i className="feather icon-plus" /> Add Teacher
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
                      <th>Allocated Class</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{teacherList}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TeacherList.propTypes = {
  deleteTeacher: PropTypes.func.isRequired,
};

export default connect(null, { deleteTeacher })(withRouter(TeacherList));
