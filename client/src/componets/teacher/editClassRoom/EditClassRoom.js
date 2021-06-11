import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import EditClassRoomForm from "./EditClassRoomForm";
import {
  updatedClassRoom,
  getClassById,
} from "../../../actions/teacher/classRoom";
import { getStudents } from "../../../actions/teacher/teacher";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import TeacherTop from "../TeacherTop";

function EditClassRoom({
  teacher: { teacher },
  getStudents,
  updatedClassRoom,
  getClassById,
  teacherReducer: { studentList },
  classroomTeacher: { selectedClassRoom },
  match,
}) {
  useEffect(() => {
    getClassById(match.params.id);
  }, [getClassById, match.params.id]);
  return selectedClassRoom !== null && selectedClassRoom !== undefined ? (
    <>
      <TeacherTop />
      <div className="pc-container">
        <div className="pcoded-content">
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      Teacher|| {teacher && teacher.name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* / */}

          {/* HomeworkList */}

          <div className="container py-4">
            <div className="col-md-12 py-4">
              <div className="card shadow">
                <div className="card-header">
                  <h4 className="card-title">Edit Class</h4> <br />
                  <h5 className="card-title">
                    Teacher Name:{teacher && teacher.name}
                  </h5>
                  <div class="cover-img-block img_img">
                    <img
                      src="https://image.freepik.com/free-vector/usability-testing-concept-illustration_114360-1571.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <EditClassRoomForm
                    getStudents={getStudents}
                    updatedClassRoom={updatedClassRoom}
                    studentList={studentList}
                    selectedClassRoom={selectedClassRoom}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
    </>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">ClassRoom not found</h4>
      <div className="alert-body">
        ClassRoom with id: {match.params.id} doesn't exist. Check list of all
        Teacher: <Link to="/teacher-dashboard"> Teacher's Dashboard</Link>
      </div>
    </Alert>
  );
}
EditClassRoom.propType = {
  teacher: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  teacherReducer: PropTypes.object.isRequired,
  updatedClassRoom: PropTypes.func.isRequired,
  getClassById: PropTypes.func.isRequired,
  classroomTeacher: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
  teacherReducer: state.teacherReducer,
  classroomTeacher: state.classroomTeacher,
});

export default connect(mapStateToProps, {
  getStudents,
  getClassById,
  updatedClassRoom,
})(EditClassRoom);
