import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addHomework } from "../../actions/teacher/homework";
import NodeAlert from "../layouts/NodeAlert";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { Select } from "antd";
import { Alert } from "reactstrap";
import {
  getStudents,
  getSubject,
  getClasses,
} from "../../actions/teacher/teacher";
import { getClassRooms } from "../../actions/teacher/classRoom";
import { UncontrolledTooltip, ListGroupItem, ListGroup } from "reactstrap";
import TeacherTop from "./TeacherTop";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Attach Files");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState([]);
  const [effort_time, setEffort_Time] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [description, setDescription] = useState("");
  const [students, setStudent] = useState([]);
  const [set_date, setNew_Date] = useState(new Date());
  const [due_date, setDue_Date] = useState(new Date());

  // using form-data to submit homework with attachements
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("subject", subject);
  formData.append("effort_time", effort_time);
  formData.append("allocate_classes", allocate_classes);
  formData.append("description", description);
  formData.append("students", students);
  formData.append("set_date", set_date);
  formData.append("due_date", due_date);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

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
    <Option value={student.firstname + " " + student.sirname} key={student._id}>
      {""} {student.firstname + " " + student.sirname}
    </Option>
  ));

  // render  subjectopt ions
  const subjectOptions = subjects.map((subject) => (
    <Option color="primary" value={subject.subject_name} key={subject._id}>
      {""} {subject.subject_name}
    </Option>
  ));

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("effort_time", effort_time);
    formData.append("allocate_classes", allocate_classes);
    formData.append("description", description);
    formData.append("students", students);
    formData.append("set_date", set_date);
    formData.append("due_date", due_date);
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
                  <form
                    onSubmit={onSubmit}
                    action="upload/:id"
                    method="POST"
                    enctype="multipart/form-data"
                    id="attachWork"
                  >
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
                            No Subjects are available! Make you assign a subject
                            to the homework
                          </div>
                        </Alert>
                      ) : (
                        <div className="col-sm-6 ">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Email">
                              Add Subject
                            </label>
                            <Select
                              // mode="multiple"
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
                            You have not being assigned any class. Make you
                            assign a classroom to the homework
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
                      <div className="form-group col-md-6 ">
                        <label htmlFor="file" className="col-form-label">
                          <ListGroup>
                            <ListGroupItem color="primary" className="mb-2">
                              {" "}
                              {""}📜 {""}
                              {filename}
                            </ListGroupItem>
                          </ListGroup>
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={onChange}
                          name="file"
                          id="file"
                        />
                      </div>
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

                      <div className="col-sm-6">
                        <div className="form-group fill label_display">
                          <label
                            className="floating-label"
                            htmlFor="Occupation"
                          >
                            Set Date
                          </label>

                          <DatePicker
                            selected={set_date}
                            className="form-control date__width"
                            onChange={(date) => setNew_Date(date)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group fill label_display">
                          <label
                            className="floating-label"
                            htmlFor="Occupation"
                          >
                            Due Date
                          </label>
                          <DatePicker
                            selected={due_date}
                            className="form-control date__width"
                            onChange={(date) => setDue_Date(date)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <button
                          onClick={() => addHomework(formData)}
                          type="submit"
                          className="btn btn-success mr-2"
                        >
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
