import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../../layouts/NodeAlert";
import { Select } from "antd";
import { Alert } from "reactstrap";
const { Option } = Select;

function EditClassRoomForm({
  getStudents,
  studentList,
  getSubject,
  updatedClassRoom,
  selectedClassRoom,
  history,
  subjects,
}) {
  useEffect(() => {
    getStudents();
    getSubject();
  }, [getSubject, getStudents]);

  const [name, setName] = useState("");
  const [add_students, setAdd_Students] = useState([]);
  const [add_subjects, setSubject] = useState([]);

  // fill the from with data from the state
  useEffect(() => {
    setAdd_Students(selectedClassRoom.add_students || add_students);
    setName(selectedClassRoom.name || (name && name));
    setSubject(
      selectedClassRoom.add_subjects || (add_subjects && add_subjects)
    );
  }, [
    selectedClassRoom.name,
    selectedClassRoom.add_students,
    selectedClassRoom.add_subjects,
  ]);

  // handle all students options
  const studentOptions = studentList.map((student) => (
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
  const handleUpdateClass = () => {
    const obj = {
      name,
      add_students,
      add_subjects,
    };
    updatedClassRoom(obj, history);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateClass();
  };

  return (
    <>
      <NodeAlert />
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Class Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                disabled
                value={name}
                name="name"
                type="text"
                className="form-control"
              />
            </div>
          </div>
          {/* add students */}

          {studentList !== null ? (
            <div className="col-sm-6 ">
              <div className="form-group">
                <label className="floating-label">Add Students</label>
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
                  {studentOptions}
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
              Update ClassRoom
            </button>
            <Link to="/manage-classes" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default withRouter(EditClassRoomForm);
