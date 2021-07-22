import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import { UncontrolledTooltip } from "reactstrap";
import NodeAlert from "../../layouts/NodeAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ListGroupItem, ListGroup } from "reactstrap";
import { Alert } from "reactstrap";

const { Option } = Select;

function EditHomeWorkForm({
  classrooms,
  studentList,
  subjects,
  classes,
  updateHomeWork,
  selectedHomeWork,
}) {
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

  // fill the from with data from the state
  useEffect(() => {
    setTitle(selectedHomeWork.title || title);
    setSubject(selectedHomeWork.subject || subject);
    setEffort_Time(selectedHomeWork.effort_time || effort_time);
    setAllocate_Classes(selectedHomeWork.allocate_classes || allocate_classes);
    setDescription(selectedHomeWork.description || description);
    setStudent(selectedHomeWork.students || students);
    setNew_Date(new Date(selectedHomeWork.set_date));
    setDue_Date(new Date(selectedHomeWork.due_date));
    setFilename(selectedHomeWork.filename || filename);
    setFile(selectedHomeWork.file || file);
  }, [selectedHomeWork, selectedHomeWork.set_date]);

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
    formData.append("subject", [subject]);
    formData.append("effort_time", effort_time);
    formData.append("allocate_classes", [allocate_classes]);
    formData.append("description", description);
    formData.append("students", [students]);
    formData.append("set_date", set_date);
    formData.append("due_date", due_date);
  };

  return (
    <>
      <NodeAlert />
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
                disabled
                placeholder
              />
            </div>
          </div>

          {!subjects.length && subjects.length === 0 ? (
            <Alert color="info">
              <h4 className="alert-heading">Subjects not found</h4>
              <div className="alert-body">
                No Subjects are available! Make you assign a subject to the
                homework
              </div>
            </Alert>
          ) : (
            <div className="col-sm-6 ">
              <div className="form-group">
                <label className="floating-label" htmlFor="Email">
                  Add Subject
                </label>
                <Select
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
                No Classes are available! Make you assign a classroom to the
                homework
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
                No Student's are available! Make you assign a student to the
                homework
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
                  <UncontrolledTooltip placement="right" target="positionRight">
                    You can add students from others classrooms if needed this
                    is Optional
                  </UncontrolledTooltip>
                  <UncontrolledTooltip placement="top" target="positionTop">
                    You can add students from others classrooms if needed this
                    is Optional
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
              placeholder="sasasas"
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
              <label className="floating-label" htmlFor="Occupation">
                Set Date
              </label>{" "}
              <DatePicker
                selected={set_date}
                className="form-control date__width"
                onChange={(date) => setNew_Date(date)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill label_display">
              <label className="floating-label" htmlFor="Occupation">
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
              onClick={() => updateHomeWork(formData)}
              type="submit"
              className="btn btn-success mr-2"
            >
              Update Homework
            </button>
            <Link to="/teacher-dashboard" className="btn btn-secondary">
              Go back
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditHomeWorkForm;
