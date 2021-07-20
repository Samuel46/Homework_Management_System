import React from "react";
import { Popconfirm, message } from "antd";
import { deleteClass, deleteClassTeacher } from "../../../../actions/classRoom";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { ListGroupItem, ListGroup } from "reactstrap";
import Spinner from "../../../layouts/Spinner";

function cancel(e) {
  console.log(e);
  message.error("cancle");
}

function ClassRoomTable({
  classes,
  teacherClassrooms,
  deleteClassTeacher,
  deleteClass,
  history,
}) {
  console.log(teacherClassrooms);
  const allClasses = classes.map((clas) => (
    <tr key={clas._id}>
      <td>{clas.name}</td>
      <td>
        {clas.add_students.map((add_student, index) => (
          <>
            <p key={index}>
              <ListGroup>
                <ListGroupItem color="info" className="mb-2">
                  {" "}
                  {""} 😃 {""}
                  {add_student}
                </ListGroupItem>
              </ListGroup>
            </p>
          </>
        ))}{" "}
        <br />
      </td>
      <td>
        {clas.add_subjects.map((subject, index) => (
          <>
            <p key={index}>
              <ListGroup>
                <ListGroupItem color="warning" className="mb-2">
                  {" "}
                  {""} 📜 {""}
                  {subject}
                </ListGroupItem>
              </ListGroup>
            </p>
          </>
        ))}{" "}
        <br />
      </td>
      <td>
        {clas !== null && clas !== undefined ? (
          clas.assign_teachers.map((assign_teacher, index) => (
            <ListGroup key={index}>
              <ListGroupItem color="primary" className="mb-2">
                {" "}
                {""}😎 {""}
                {assign_teacher}
              </ListGroupItem>
            </ListGroup>
          ))
        ) : (
          <Spinner />
        )}
      </td>
      <td>
        <Link
          to={`/edit-class/${clas._id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <i className="feather icon-settings" />
          Edit
        </Link>

        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          className="btn btn-danger btn-sm ml-2"
          title="Are you absolutely sure? This action cannot be undone. This will permanently delete this classroom🙄?"
          onConfirm={(e) => deleteClass(clas._id, history)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Delete</a>
        </Popconfirm>
      </td>
    </tr>
  ));

  const teacherClasses = teacherClassrooms.map((clas) => (
    <tr key={clas._id}>
      <td>{clas.name}</td>
      <td>
        {clas.add_students.map((add_student, index) => (
          <>
            <p key={index}>
              <ListGroup>
                <ListGroupItem color="info" className="mb-2">
                  {" "}
                  {""} 😃 {""}
                  {add_student}
                </ListGroupItem>
              </ListGroup>
            </p>
          </>
        ))}{" "}
        <br />
      </td>
      <td>
        {clas.add_subjects.map((subject, index) => (
          <>
            <p key={index}>
              <ListGroup>
                <ListGroupItem color="warning" className="mb-2">
                  {" "}
                  {""} 📜 {""}
                  {subject}
                </ListGroupItem>
              </ListGroup>
            </p>
          </>
        ))}{" "}
        <br />
      </td>
      <td>
        <ListGroup>
          <ListGroupItem color="light-primary" className="mb-2">
            {" "}
            {""} 😎 {""}
            {Object.values(
              clas.teacher.name !== null && clas.teacher.name !== undefined ? (
                clas.teacher.name
              ) : (
                <Spinner />
              )
            )}
          </ListGroupItem>
        </ListGroup>
      </td>
      <td>
        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          className="btn btn-danger btn-sm ml-2"
          title="Are you absolutely sure? This classroom was created by a teacher. This will permanently delete this classroom🙄?"
          onConfirm={(e) => deleteClassTeacher(clas._id, history)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Remove Classroom</a>
        </Popconfirm>
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
              <h5>Class List</h5>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/kids-online-lessons_52683-36818.jpg"
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
                    to="/create-class"
                    className="btn btn-success btn-sm mb-3 btn-round"
                  >
                    Add Classroom
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
                      <th>Class Name</th>
                      <th>Student' Name</th>
                      <th>Allocated Subjects</th>
                      <th>Teacher's Name</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allClasses}
                    {teacherClasses}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* subscribe end */}
      </div>
    </div>
  );
}

ClassRoomTable.propTypes = {
  deleteClass: PropTypes.func.isRequired,
  deleteClassTeacher: PropTypes.func.isRequired,
};

export default connect(null, { deleteClass, deleteClassTeacher })(
  withRouter(ClassRoomTable)
);
