import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../../layouts/Alert";
import { Select } from "antd";
const { Option } = Select;

function EditClassRoomForm({
  getStudents,
  studentList,
  updatedClassRoom,
  selectedClassRoom,
}) {
  useEffect(() => {
    getStudents();
  }, []);

  const [name, setName] = useState("");
  const [add_students, setAdd_Students] = useState([]);

  // fill the from with data from the state
  useEffect(() => {
    setAdd_Students(selectedClassRoom.add_students || add_students);
    setName(selectedClassRoom.name || (name && name));
  }, [selectedClassRoom.name]);

  // handle all students options
  const studentOptions =
    studentList &&
    studentList.map((student) => (
      <Option value={student.name} key={student._id}>
        {student.name}
      </Option>
    ));

  // ** Adds New Lesson Event
  const handleUpdateClass = () => {
    const obj = {
      name,
      add_students,
    };
    updatedClassRoom(obj);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateClass();
  };

  return (
    <>
      <Alert />
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Class Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
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

          <div className="col-sm-12">
            <button type="submit" className="btn btn-success mr-2">
              Update ClassRoom
            </button>
            <Link to="/dashboard" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditClassRoomForm;
