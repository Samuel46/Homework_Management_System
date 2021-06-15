import React, { useState, useEffect } from "react";
import NodeAlert from "../../layouts/NodeAlert";
import { Select } from "antd";
import { Link, withRouter } from "react-router-dom";

import Spinner from "../../layouts/Spinner";
const { Option } = Select;

function EditSubjectForm({
  updateSubject,
  selectedSubject,
  classes,
  teachers,
}) {
  const [subject_name, setSubject_Name] = useState("");
  const [add_classes, setAdd_classes] = useState([]);
  const [assign_teachers, setAssign_Teacher] = useState([]);

  // fill the from with data from the state
  useEffect(() => {
    setSubject_Name(selectedSubject.subject_name || subject_name);
    setAdd_classes(selectedSubject.add_classes || add_classes);
    setAssign_Teacher(selectedSubject.assign_teachers || assign_teachers);
  }, [selectedSubject.subject_name]);

  // class options from the state
  const classOptions =
    classes &&
    classes.map((rooms) => (
      <Option value={rooms.name} key={rooms._id}>
        {rooms.name}
      </Option>
    ));

  const teacherOptions =
    teachers &&
    teachers.map((teacher) => (
      <Option value={teacher.name} key={teacher._id}>
        {teacher.name}
      </Option>
    ));

  const handleAddSubject = () => {
    const obj = {
      subject_name,
      add_classes,
      assign_teachers,
    };

    updateSubject(obj);
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
    handleAddSubject();
  };
  return (teachers !== null && teachers !== undefined) ||
    (classes !== null && classes !== undefined) ? (
    <>
      <div>
        <NodeAlert />
      </div>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Subject Name
              </label>
              <input
                onChange={(e) => setSubject_Name(e.target.value)}
                name="subject_name"
                value={subject_name}
                type="text"
                className="form-control"
                placeholder
              />
            </div>
          </div>
          {/* add classes */}

          {classes !== null ? (
            <div className="col-sm-6 ">
              <div className="form-group">
                <label className="floating-label" htmlFor="Email">
                  Add Class
                </label>
                <Select
                  mode="multiple"
                  autoFocus
                  allowClear
                  defaultValue={[""]}
                  style={{ width: "100%" }}
                  placeholder="Please Add Class"
                  onChange={setAdd_classes}
                  value={add_classes}
                >
                  {classOptions}
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
                  onChange={setAssign_Teacher}
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
              Update Subject
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

export default EditSubjectForm;
