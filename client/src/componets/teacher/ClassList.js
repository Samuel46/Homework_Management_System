import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteClassRoom } from "../../actions/teacher/classRoom";
import { Link, withRouter } from "react-router-dom";
import { useEffect } from "react";
import { getClasses } from "../../actions/teacher/teacher";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

function ClassList({
  classes,
  teacherReducer: { classrooms },
  teacher: { teacher },
  deleteClassRoom,
  getClasses,
  history,
}) {
  // get class by teacher's name
  useEffect(() => {
    getClasses();
  }, []);
  //   get class from the school
  const classRooms = classrooms.map((clas) => (
    <tr key={clas._id}>
      <td>{clas.name}</td>
      <td>
        {clas.add_students.map((student, index) => (
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
        {clas.add_subjects.map((subject, index) => (
          <ListGroup key={index}>
            <ListGroupItem color="warning" className="mb-2">
              {" "}
              {""}📜 {""}
              {subject}
            </ListGroupItem>
          </ListGroup>
        ))}
      </td>
      <td>
        {teacher &&
          teacher.title + " " + teacher.firstname + " " + teacher.sirname}
      </td>
      <td>
        <Link className="btn btn-secondary disabled btn-sm mr-2">Edit</Link>
        <button className="btn disabled btn-secondary btn-sm ">Delete</button>
      </td>
    </tr>
  ));

  //   get the create classes
  const allClasses = classes.map((clas) => (
    <tr key={clas._id}>
      <td>{clas.name}</td>
      <td>
        {clas.add_students.map((student, index) => (
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
        {clas.add_subjects.map((subject, index) => (
          <ListGroup key={index}>
            <ListGroupItem color="warning" className="mb-2">
              {" "}
              {""}📜 {""}
              {subject}
            </ListGroupItem>
          </ListGroup>
        ))}
      </td>
      <td>
        {" "}
        {teacher &&
          teacher.title + " " + teacher.firstname + " " + teacher.sirname}
      </td>
      <td>
        <Link
          to={`/edit-classRoom/${clas._id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <i className="feather icon-settings" />
          Edit
        </Link>
        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          className="btn btn-danger btn-sm ml-2"
          title="Are you absolutely sure? This action cannot be undone. This will permanently delete this student🙄?"
          onConfirm={() => deleteClassRoom(clas._id, history)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Remove Class</a>
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
              <h5>Classroom List</h5>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/internet-lessons-searching-remote-university-educational-programs-online-classes-website-high-school-student-with-magnifying-glass-cartoon-character_335657-3269.jpg"
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
                    to="/create-classes"
                    className="btn btn-success btn-sm mb-3 btn-round"
                  >
                    <i className="feather icon-plus" /> Add Class
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
                      <th>Student's Name</th>
                      <th>Subject's Allocated</th>
                      <th>Teacher's Name</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{classRooms}</tbody>
                  <tbody>{allClasses}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ClassList.propTypes = {
  teacher: PropTypes.func.isRequired,
  deleteClassRoom: PropTypes.func.isRequired,
  teacherReducer: PropTypes.object.isRequired,
  getClasses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
  teacherReducer: state.teacherReducer,
});

export default connect(mapStateToProps, { deleteClassRoom, getClasses })(
  withRouter(ClassList)
);
