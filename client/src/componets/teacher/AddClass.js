import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../layouts/NodeAlert";
import { addClassRoom } from "../../actions/teacher/classRoom";
import PropTypes from "prop-types";
import { Select } from "antd";
import { connect } from "react-redux";
import { getStudents } from "../../actions/teacher/teacher";
import TeacherTop from "./TeacherTop";
const { Option } = Select;

function AddClass({
  addClassRoom,
  getStudents,
  history,
  teacher: { teacher },
  teacherReducer: { studentList },
}) {
  // get all the students
  useEffect(() => {
    getStudents();
  }, []);
  const [name, setName] = useState("");
  const [add_students, setAdd_Students] = useState([]);

  // handle all students options
  const studentOptions = studentList.map((student) => (
    <Option value={student.name} key={student._id}>
      {student.name}
    </Option>
  ));

  // ** Adds New Lesson Event
  const handleAddClass = () => {
    const obj = {
      name,
      add_students,
    };

    addClassRoom(obj);
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
                          Add Class
                        </button>
                        <Link to="/dashboard" className="btn btn-secondary">
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
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
  teacherReducer: state.teacherReducer,
});
export default connect(mapStateToProps, { addClassRoom, getStudents })(
  withRouter(AddClass)
);
