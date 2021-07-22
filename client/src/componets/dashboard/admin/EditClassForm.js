import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { getTeachers } from "../../../actions/teacher";
import PropTypes from "prop-types";
import { getClassById } from "../../../actions/classRoom";
import { getStudents } from "../../../actions/student";
import { connect } from "react-redux";
import NodeAlert from "../../layouts/NodeAlert";
import { Select } from "antd";
import Spinner from "../../layouts/Spinner";
import { Alert } from "reactstrap";
const { Option } = Select;

function EditClassForm({
  selectedClass,
  updateClassRoom,
  getStudents,
  getClassById,
  getTeachers,
  teachers,
  students,
  subjects,
  history,
}) {
  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  useEffect(() => {
    getStudents();
  }, [getClassById]);
  const [name, setName] = useState("");
  const [add_students, setAdd_Students] = useState([]);
  const [assign_teachers, setAssign_Teachers] = useState([]);
  const [add_subjects, setSubject] = useState([]);

  // fill the from with data from the state
  useEffect(() => {
    setName(selectedClass.name || name);
    setAdd_Students(selectedClass.add_students || add_students);
    setSubject(selectedClass.add_subjects || add_subjects);
    setAssign_Teachers(selectedClass.assign_teachers || assign_teachers);
  }, [
    selectedClass.name,
    selectedClass.add_students,
    selectedClass.assign_teachers,
    selectedClass.add_subjects,
  ]);

  //   render teacher's options
  const teacherOptions = teachers.map((teacher) => (
    <Option
      value={
        teacher.title && teacher.firstname && teacher.sirname
          ? teacher.title + " " + teacher.firstname + " " + teacher.sirname
          : null
      }
      key={teacher._id}
    >
      {teacher.title && teacher.firstname && teacher.sirname
        ? teacher.title + " " + teacher.firstname + " " + teacher.sirname
        : null}
    </Option>
  ));

  //   render  student's options
  const studentOptions =
    students &&
    students.map((student) => (
      <Option
        value={student.firstname + " " + student.sirname}
        key={student._id}
      >
        ✔{""} {student && student.firstname + " " + student.sirname}
      </Option>
    ));

  // render  subject's options
  const subjectOptions = subjects.map((subject) => (
    <Option value={subject.subject_name} key={subject._id}>
      ✔{""} {subject.subject_name}
    </Option>
  ));

  // ** Adds New Lesson Event
  const handleUpdateClass = () => {
    const obj = {
      name,
      add_students,
      assign_teachers,
      add_subjects,
    };
    updateClassRoom(obj, history);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateClass();
  };
  return (teachers !== null && teachers !== undefined) ||
    (students !== null && students !== undefined) ? (
    <>
      <div>
        <NodeAlert />
      </div>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Class Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
                disabled
                type="text"
                className="form-control"
                placeholder
              />
            </div>
          </div>
          {/* add students */}

          {students.length > 0 ? (
            <div className="col-sm-6 ">
              <div className="form-group">
                <label className="floating-label" htmlFor="Email">
                  Add Students
                </label>
                <Select
                  mode="multiple"
                  autoFocus
                  allowClear
                  defaultValue={[""]}
                  style={{ width: "100%" }}
                  placeholder="Please Add Students"
                  onChange={setAdd_Students}
                  value={add_students}
                >
                  {studentOptions}
                </Select>
              </div>
            </div>
          ) : (
            <h2>no available</h2>
          )}

          {/* add Teacher */}

          {!teachers.length && teachers.length === 0 ? (
            <h2>not available</h2>
          ) : (
            <div className="col-sm-6 ">
              <div className="form-group">
                <label className="floating-label" htmlFor="Email">
                  Assign Teacher
                </label>
                <Select
                  mode="multiple"
                  autoFocus
                  allowClear
                  defaultValue={[""]}
                  style={{ width: "100%" }}
                  placeholder="Please Assign Teacher"
                  onChange={setAssign_Teachers}
                  value={assign_teachers}
                >
                  {teacherOptions}
                </Select>
              </div>
            </div>
          )}
          {/* subjects */}
          {!subjects.length && subjects.length === 0 ? (
            <Alert color="info">
              <h4 className="alert-heading">Subjects not found</h4>
              <div className="alert-body">No Subjects are available!</div>
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
              Update Class
            </button>
            <Link to="/manage-classrooms" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Spinner />
  );
}

EditClassForm.propTypes = {
  getTeachers: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getClassById: PropTypes.func.isRequired,
};

export default connect(null, {
  getStudents,
  getTeachers,
  getClassById,
})(withRouter(EditClassForm));
