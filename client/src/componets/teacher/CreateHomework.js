import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addHomework } from "../../actions/teacher/homework";
import NodeAlert from "../layouts/NodeAlert";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { Select } from "antd";
import Avatar from "../../utilities/avatar";
import { Check } from "react-feather";
import { toast } from "react-toastify";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Alert } from "reactstrap";
import {
  getStudents,
  getSubject,
  getClasses,
} from "../../actions/teacher/teacher";
import { getClassRooms } from "../../actions/teacher/classRoom";
import { Button, UncontrolledTooltip } from "reactstrap";
import { removePending } from "../../actions/student/homework";
import TeacherTop from "./TeacherTop";
const { Option } = Select;

function CreateHomework({
  addHomework,
  history,
  teacher: { teacher },
  getClasses,
  getStudents,
  getSubject,
  teacherReducer: { classrooms, studentList, subjects },
  getClassRooms,
  classroomTeacher: { classes },
}) {
  useEffect(() => {
    getClasses();
    getStudents();
    getSubject();
    getClassRooms();
  }, [getSubject, getClasses, getStudents, getClassRooms]);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState([]);
  const [effort_time, setEffort_Time] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [description, setDescription] = useState("");
  const [students, setStudent] = useState([]);
  const [set_date, setNew_Date] = useState("");
  const [due_date, setDue_Date] = useState("");
  const [attachements, setAttachements] = useState("");

  // render all classroom options from the admin
  const classOptions = classrooms.map((rooms) => (
    <Option value={rooms.name} key={rooms._id}>
      {rooms.name}
    </Option>
  ));

  // render all classroom options from the teacher
  const classOptions2 = classes.map((rooms) => (
    <Option value={rooms.name} key={rooms._id}>
      {rooms.name}
    </Option>
  ));
  // render  student's options
  const studentOptions = studentList.map((student) => (
    <Option value={student.name} key={student._id}>
      {""} {student.name}
    </Option>
  ));

  // render  subjectopt ions
  const subjectOptions = subjects.map((subject) => (
    <Option color="primary" value={subject.subject_name} key={subject._id}>
      {""} {subject.subject_name}
    </Option>
  ));

  // ** Adds Homework
  const handleAddHomework = () => {
    const obj = {
      title,
      subject,

      effort_time,
      allocate_classes,
      description,
      students,
      set_date,
      due_date,
      attachements,
    };

    addHomework(obj);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddHomework();
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
                      Create Homework|| {teacher && teacher.name}
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
                  <h4 className="card-title">Create Homework</h4> <br />
                  <h5 className="card-title">
                    Teacher Name:{""} {teacher && teacher.name}
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
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="floating-label">Title</label>
                          <input
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            value={title}
                            type="text"
                            className="form-control"
                            placeholder
                          />
                        </div>
                      </div>

                      {!subjects.length && subjects.length === 0 ? (
                        <Alert color="info">
                          <h4 className="alert-heading">Subjects not found</h4>
                          <div className="alert-body">
                            No Subjects are available! Make you assign a
                            subject to the homework
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
                              value={subject}
                            >
                              {subjectOptions}
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label className="floating-label" htmlFor="Name">
                            {" "}
                            Effort Estimat <small>amount of hours</small>
                          </label>
                          <input
                            onChange={(e) => setEffort_Time(e.target.value)}
                            name="effort_time"
                            value={effort_time}
                            type="text"
                            className="form-control"
                            id="Name"
                            placeholder="Estimated delivery time/hrs"
                          />
                        </div>
                      </div>
                      {!classrooms.length && classrooms.length === 0 ? (
                        <Alert color="info">
                          <h4 className="alert-heading">Classes not found</h4>
                          <div className="alert-body">
                            No Classes are available! Make you assign a
                            classroom to the homework
                          </div>
                        </Alert>
                      ) : (
                        <div className="col-sm-6 ">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Email">
                              Allocate Class
                            </label>
                            <Select
                              mode="multiple"
                              autoFocus
                              allowClear
                              defaultValue={[""]}
                              style={{ width: "100%" }}
                              placeholder="Please Allocate Classes"
                              onChange={setAllocate_Classes}
                              value={allocate_classes}
                            >
                              {classOptions}
                              {classOptions2}
                            </Select>
                          </div>
                        </div>
                      )}

                      {/* student options */}
                      {!studentList.length && studentList === 0 ? (
                        <Alert color="info">
                          <h4 className="alert-heading">Student not found</h4>
                          <div className="alert-body">
                            No Student's are available! Make you assign a
                            student to the homework
                          </div>
                        </Alert>
                      ) : (
                        <div className="col-sm-6 ">
                          <div className="form-group">
                            <label
                              id="positionRight"
                              className="floating-label"
                              htmlFor="Email"
                            >
                              Add Students <small>Optional</small>
                              <UncontrolledTooltip
                                placement="right"
                                target="positionRight"
                              >
                                You can add students from others classrooms if
                                needed this is Optional
                              </UncontrolledTooltip>
                              <UncontrolledTooltip
                                placement="top"
                                target="positionTop"
                              >
                                You can add students from others classrooms if
                                needed this is Optional
                              </UncontrolledTooltip>
                            </label>
                            <Select
                              mode="multiple"
                              id="positionTop"
                              autoFocus
                              allowClear
                              defaultValue={[""]}
                              style={{ width: "100%" }}
                              placeholder="Please Add Students"
                              onChange={setStudent}
                              value={students}
                            >
                              {studentOptions}
                            </Select>
                          </div>
                        </div>
                      )}

                      {/* <div className="col-sm-6">
                        <div className="form-group fill">
                          <label className="floating-label" htmlFor="Icon">
                            Attachements
                          </label>
                          <input
                            onChange={(e) => setAttachements(e.target.value)}
                            name="attachements"
                            value={attachements}
                            type="file"
                            className="form-control btn-secondary"
                            id="Icon"
                            placeholder
                          />
                        </div>
                      </div> */}
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label className="floating-label" htmlFor="Address">
                            Description
                          </label>
                          <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            value={description}
                            className="form-control"
                            id="Address"
                            rows={4}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      {/* <div className="col-sm-12">
                        <div className="form-group">
                          <label className="floating-label" htmlFor="Address">
                            Description
                          </label>

                          <Editor
                          editorState={description}
                          onEditorStateChange={(data) => setDescription(data)}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                         
                        </div>
                      </div> */}
                      <div className="col-sm-6">
                        <div className="form-group fill">
                          <label
                            className="floating-label"
                            htmlFor="Occupation"
                          >
                            Set Date
                          </label>
                          <input
                            onChange={(e) => setNew_Date(e.target.value)}
                            name="set_date"
                            value={set_date}
                            type="date"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group fill">
                          <label
                            className="floating-label"
                            htmlFor="Occupation"
                          >
                            Due Date
                          </label>
                          <input
                            onChange={(e) => setDue_Date(e.target.value)}
                            name="due_date"
                            value={due_date}
                            type="date"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <button type="submit" className="btn btn-success mr-2">
                          Create Homework
                        </button>

                        <Link
                          to="./teacher-dashboard"
                          className="btn btn-secondary"
                        >
                          Go back
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

CreateHomework.propTpyes = {
  addHomework: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,
  getClasses: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  teacherReducer: PropTypes.func.isRequired,
  classroomTeacher: PropTypes.object.isRequired,
  getClassRooms: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  teacher: state.teacher,
  teacherReducer: state.teacherReducer,
  classroomTeacher: state.classroomTeacher,
});
export default connect(mapStateToProps, {
  addHomework,
  getClasses,
  getStudents,
  getSubject,
  getClassRooms,
})(withRouter(CreateHomework));
