import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../layouts/NodeAlert";
import { addClassRoom } from "../../actions/teacher/classRoom";
import PropTypes from "prop-types";
import { Select } from "antd";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import { getStudents, getSubject } from "../../actions/teacher/teacher";
import TeacherTop from "./TeacherTop";
const { Option } = Select;

function AddClass({
  addClassRoom,
  getStudents,
  getSubject,
  history,
  teacher: { teacher },
  teacherReducer: { studentList, subjects },
}) {
  // get all the students
  useEffect(() => {
    getStudents();
    getSubject();
  }, [getSubject, getStudents]);
  const [name, setName] = useState("");
  const [add_students, setAdd_Students] = useState([]);
  const [add_subjects, setSubject] = useState([]);
  // handle all students options
  const studentOption = studentList.map((student) => (
    <Option value={student.firstname + " " + student.sirname} key={student._id}>
      {student.firstname + " " + student.sirname}
    </Option>
  ));
  // render subject options
  const subjectOptions = subjects.map((subject) => (
    <Option color="primary" value={subject.subject_name} key={subject._id}>
      {""} {subject.subject_name}
    </Option>
  ));

  // ** Adds New Lesson Event
  const handleAddClass = () => {
    const obj = {
      name,
      add_students,
      add_subjects,
    };

    addClassRoom(obj, history);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddClass();
  };
  return (
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
                      Add Classroom || {teacher && teacher.name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* HomeworkList */}
          <div className="py-2">
            <NodeAlert />
          </div>
          <div className="container">
            <div className="col-md-12 py-4">
              <div className="card  shadow">
                <div className="card-header">
                  <h4 className="card-title">Create Class</h4> <br />
                  <h5 className="card-title">
                    Teacher Name:{teacher && teacher.name}
                  </h5>
                  <div class="cover-img-block img_img">
                    <img
                      src="https://image.freepik.com/free-vector/add-notes-concept-illustration_114360-3376.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <NodeAlert />
                  </div>
                  <form className="form" onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="floating-label" htmlFor="Name">
                            Classroom Name
                          </label>
                          <input
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            value={name}
                            type="text"
                            className="form-control"
                            placeholder
                          />
                        </div>
                      </div>
                      {/* add classes */}

                      {studentList !== null ? (
                        <div className="col-sm-6 ">
                          <div className="form-group">
                            <label className="floating-label">
                              Add Students
                            </label>
                            <Select
                              mode="multiple"
                              autoFocus
                              allowClear
                              defaultValue={[""]}
                              style={{ width: "100%" }}
                              placeholder="Please Allocate Students"
                              onChange={setAdd_Students}
                              value={add_students}
                            >
                              {studentOption}
                            </Select>
                          </div>
                        </div>
                      ) : (
                        <h2>There are no students available</h2>
                      )}

                      {/* subjects */}
                      {!subjects.length && subjects.length === 0 ? (
                        <Alert color="info">
                          <h4 className="alert-heading">Subjects not found</h4>
                          <div className="alert-body">
                            No Subjects are available!
                          </div>
                        </Alert>
                      ) : (
                        <div className="col-sm-6 ">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Email">
                              Add Subject
                            </label>
                            <Select
                              mode="multiple"
                              autoFocus
                              allowClear
                              defaultValue={[""]}
                              style={{ width: "100%" }}
                              placeholder="Please Allocate Subjects"
                              onChange={setSubject}
                              value={add_subjects}
                            >
                              {subjectOptions}
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="col-sm-12">
                        <button type="submit" className="btn btn-success mr-2">
                          Add Class
                        </button>
                        <Link
                          to="/manage-classes"
                          className="btn btn-secondary"
                        >
                          Go Back
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AddClass.propType = {
  addClassRoom: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  teacherReducer: PropTypes.object.isRequired,
  getSubject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
  teacherReducer: state.teacherReducer,
});
export default connect(mapStateToProps, {
  addClassRoom,
  getStudents,
  getSubject,
})(withRouter(AddClass));
