import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { getTeachers } from "../../../actions/teacher";
import PropTypes from "prop-types";
import { getClassById } from "../../../actions/classRoom";
import { getStudents } from "../../../actions/student";
import { connect } from "react-redux";
import Alert from "../../layouts/Alert";
import { Select } from "antd";
import Spinner from "../../layouts/Spinner";
const { Option } = Select;

function EditClassForm({
  selectedClass,
  updateClassRoom,
  getStudents,
  getClassById,
  getTeachers,
  loading,
  teachers,
  students,
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
  //   console.log(teachers, "samueuueueueue");

  // fill the from with data from the state
  useEffect(() => {
    setName(selectedClass.name || name);
    setAdd_Students(selectedClass.add_students || add_students);
    setAssign_Teachers(selectedClass.assign_teachers || assign_teachers);
  }, [selectedClass.name]);

  //   render teacher's options
  const teacherOptions =
    teachers &&
    teachers.map((teacher) => (
      <Option value={teacher.name} key={teacher._id}>
        {teacher.name}
      </Option>
    ));

  //   render  student's options
  const studentOptions =
    students &&
    students.map((student) => (
      <Option value={student.name} key={student._id}>
        ✔{""} {student && student.name}
      </Option>
    ));

  // ** Adds New Lesson Event
  const handleUpdateClass = () => {
    const obj = {
      name,
      add_students,
      assign_teachers,
    };
    updateClassRoom(obj);
    // e.preventDefault();
    // refetchEvents();
    // handleAddEventSidebar();
    // toast.success(
    //   <ToastComponent title="Event Added" color="success" icon={<Check />} />,
    //   {
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeButton: false,
    //   }
    // );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateClass();
  };
  return (teachers !== null && teachers !== undefined) ||
    (students !== null && students !== undefined) ? (
    <>
      <div>
        <Alert />
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
                type="text"
                className="form-control"
                placeholder
              />
            </div>
          </div>
          {/* add students */}

          {students !== null ? (
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

          {/* add Teacher */}

          {teachers !== null ? (
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
          ) : (
            <h2>not available</h2>
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
              Update Class
            </button>
            <Link to="/dashboard" className="btn btn-secondary">
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
})(EditClassForm);
