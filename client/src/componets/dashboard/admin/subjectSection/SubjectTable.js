import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteSubject } from "../../../../actions/subject";
import { Table } from "antd";
import { Link, withRouter } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

function SubjectTable({ subjects, deleteSubject, history }) {
  const allSubjects = subjects.map((subject) => (
    <tr key={subject._id}>
      <td>{subject.subject_name}</td>
      <td>
        {subject.add_classes.map((add_class, index) => (
          <p key={index}>
            {""}✔ {""} {add_class}
          </p>
        ))}
      </td>
      <td>
        {subject.assign_teachers.map((assign_teacher, i) => (
          <ListGroup key={i}>
            <ListGroupItem color="primary" className="mb-2">
              {" "}
              {""}😎 {""}
              {assign_teacher}
            </ListGroupItem>
          </ListGroup>
        ))}
      </td>
      <td>
        <Link
          to={`/edit-subject/${subject._id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <i className="feather icon-settings" />
          Edit
        </Link>

        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          className="btn btn-danger btn-sm ml-2"
          title="Are you absolutely sure? This action cannot be undone. This will permanently delete this subject🙄?"
          onConfirm={() => deleteSubject(subject._id, history)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Delete</a>
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
              <h5>Subject List</h5>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/people-with-education-related-icons_53876-66209.jpg"
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
                    to="/create-subject"
                    className="btn btn-success btn-sm mb-3 btn-round"
                  >
                    Add Subject
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
                      <th>Subject</th>
                      <th>Class</th>
                      <th>Teacher's Name</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{allSubjects}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
SubjectTable.propTypes = {
  getSubject: PropTypes.func.isRequired,
  deleteSubject: PropTypes.func.isRequired,
};

export default connect(null, { deleteSubject })(withRouter(SubjectTable));
