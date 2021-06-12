import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import EditHomeWorkForm from "./EditHomeWorkForm";
import {
  getStudents,
  getSubject,
  getClasses,
} from "../../../actions/teacher/teacher";
import { getClassRooms } from "../../../actions/teacher/classRoom";
import {
  getHomeWorkById,
  updateHomeWork,
} from "../../../actions/teacher/homework";
import { Alert } from "reactstrap";
import TeacherTop from "../TeacherTop";

function EditHomework({
  classroomTeacher: { classes },
  teacherReducer: { classrooms, studentList, subjects },
  getClasses,
  getStudents,
  getSubject,
  getHomeWorkById,
  updateHomeWork,
  homework: { selectedHomeWork },
  teacher: { teacher },
  match,
}) {
  useEffect(() => {
    getHomeWorkById(match.params.id);
  }, [getHomeWorkById, match.params.id]);

  useEffect(() => {
    getClasses();
    getStudents();
    getSubject();
    getClassRooms();
  }, [getSubject, getClasses, getStudents, getClassRooms]);
  return selectedHomeWork !== null && selectedHomeWork !== undefined ? (
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
                  <h4 className="card-title">Edit Homework</h4> <br />
                  <h5 className="card-title">
                    Teacher Name:{""} {teacher && teacher.name}
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
                  <EditHomeWorkForm
                    selectedHomeWork={selectedHomeWork}
                    updateHomeWork={updateHomeWork}
                    classrooms={classrooms}
                    classes={classes}
                    studentList={studentList}
                    subjects={subjects}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </div>
      {/*  */}
    </>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Homework not found</h4>
      <div className="alert-body">
        Homework with id: {match.params.id} doesn't exist. Check list of all
        homework: <Link to="/dashboard">Dashboard</Link>
      </div>
    </Alert>
  );
}

EditHomework.propTypes = {
  teacher: PropTypes.object.isRequired,
  teacherReducer: PropTypes.func.isRequired,
  classroomTeacher: PropTypes.object.isRequired,
  getClasses: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  getClassRooms: PropTypes.func.isRequired,
  homework: PropTypes.object.isRequired,
  getHomeWorkById: PropTypes.func.isRequired,
  updateHomeWork: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
  teacherReducer: state.teacherReducer,
  classroomTeacher: state.classroomTeacher,
  homework: state.homework,
});

export default connect(mapStateToProps, {
  getClasses,
  getStudents,
  getSubject,
  getClassRooms,
  getHomeWorkById,
  updateHomeWork,
})(EditHomework);
