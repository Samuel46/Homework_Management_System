import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import { UncontrolledTooltip } from "reactstrap";
import Alert from "../../layouts/Alert";

const { Option } = Select;

function EditHomeWorkForm({
  classrooms,
  studentList,
  subjects,
  classes,
  updateHomeWork,
  selectedHomeWork,
}) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState([]);
  const [effort_time, setEffort_Time] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [description, setDescription] = useState("");
  const [students, setStudent] = useState([]);
  const [set_date, setNew_Date] = useState("");
  const [due_date, setDue_Date] = useState("");
  const [attachements, setAttachements] = useState("");

  // fill the from with data from the state
  useEffect(() => {
    setTitle(selectedHomeWork.title || title);
    setSubject(selectedHomeWork.subject || subject);
    setEffort_Time(selectedHomeWork.effort_time || effort_time);
    setAllocate_Classes(selectedHomeWork.allocate_classes || allocate_classes);
    setDescription(selectedHomeWork.description || description);
    setStudent(selectedHomeWork.students || students);
    setNew_Date(selectedHomeWork.set_date || set_date);
    setDue_Date(selectedHomeWork.due_date || due_date);
    setAttachements(selectedHomeWork.attachements || due_date);
  }, [selectedHomeWork]);


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
  const handleUpdateHomework = () => {
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

    updateHomeWork(obj);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateHomework();
  };

  return (
    <>
      <Alert />
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

          {subjects !== null ? (
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
          ) : (
            <h2>no availabel</h2>
            // <div className="col-sm-6">
            //   <div className="form-group">
            //     <label className="floating-label" htmlFor="Name">
            //       Allocate Class
            //     </label>
            //     <input
            //       name="allocate_classes"
            //       value={allocate_classes}
            //       type="text"
            //       className="form-control"
            //       id="Name"
            //       placeholder
            //     />
            //   </div>
            // </div>
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
          {classrooms || classes !== null ? (
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
          ) : (
            <h2>no availabel</h2>
            // <div className="col-sm-6">
            //   <div className="form-group">
            //     <label className="floating-label" htmlFor="Name">
            //       Allocate Class
            //     </label>
            //     <input
            //       name="allocate_classes"
            //       value={allocate_classes}
            //       type="text"
            //       className="form-control"
            //       id="Name"
            //       placeholder
            //     />
            //   </div>
            // </div>
          )}

          {/* student options */}
          {studentList !== null ? (
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
          ) : (
            <h2>no availabel</h2>
            // <div className="col-sm-6">
            //   <div className="form-group">
            //     <label className="floating-label" htmlFor="Name">
            //       Allocate Class
            //     </label>
            //     <input
            //       name="allocate_classes"
            //       value={allocate_classes}
            //       type="text"
            //       className="form-control"
            //       id="Name"
            //       placeholder
            //     />
            //   </div>
            // </div>
          )}

          <div className="col-sm-6">
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
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Occupation">
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
              <label className="floating-label" htmlFor="Occupation">
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
