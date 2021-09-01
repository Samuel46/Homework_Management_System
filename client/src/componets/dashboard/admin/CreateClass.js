import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../../layouts/NodeAlert";
import { addClassRoom } from "../../../actions/classRoom";
import PropTypes from "prop-types";
import { Select } from "antd";
import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import Navigation from "../Navigation";
import { Alert } from "reactstrap";
import images from "../../../img/1.png";
const { Option } = Select;

function CreateClass({
  addClassRoom,
  history,
  teacher: { teachers },
  student: { students },
  subject: { subjects },
  logout,
  auth: { user },
}) {
  const [name, setName] = useState("");
  const [add_students, setAdd_Students] = useState([]);
  const [assign_teachers, setAssign_Teachers] = useState([]);
  const [add_subjects, setSubject] = useState([]);

  // render teacher's options
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

  // render  student's options
  const studentOptions = students.map((student) => (
    <Option value={student.firstname + " " + student.sirname} key={student._id}>
      ✔{""} {student.firstname + " " + student.sirname}
    </Option>
  ));

  // render  subject's options
  const subjectOptions = subjects.map((subject) => (
    <Option value={subject.subject_name} key={subject._id}>
      ✔{""} {subject.subject_name}
    </Option>
  ));

  // ** Adds New Lesson Event
  const handleCreateClass = () => {
    const obj = {
      name,
      add_students,
      assign_teachers,
      add_subjects,
    };
    addClassRoom(obj, history);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleCreateClass();
  };
  return (
    <>
      <Navigation />
      <header className="pc-header ">
        <div className="header-wrapper">
          <div className="mr-auto pc-mob-drp">
            <ul className="list-unstyled"></ul>
          </div>
          <div className="ml-auto">
            <ul className="list-unstyled">
              <li className="pc-h-item ">
                <Link
                  onClick={() => logout()}
                  className="pc-head-link mr-0"
                  to="#!"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  {""}
                  <span>Logout</span>
                </Link>
              </li>

              <li className="dropdown pc-h-item">
                <Link
                  className="pc-head-link dropdown-toggle arrow-none mr-0"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <span>
                    <span className="user-name">
                      Welcome {user && user.name}
                    </span>
                    <span className="user-desc">Administrator</span>
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                  <div className=" dropdown-header">
                    <h6 className="text-overflow m-0">
                      Welcome {user && user.name}
                    </h6>
                  </div>
                  <Link href="#!" className="dropdown-item">
                    <i data-feather="settings" />
                    <span>Account</span>
                  </Link>
                  <Link
                    onClick={() => logout()}
                    className="pc-head-link mr-0"
                    to="#!"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    {""}
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* [ Main Content ] start */}
      <div className="pc-container">
        <div className="pcoded-content">
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Dashboard</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">{user && user.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* [ breadcrumb ] end */}
          {/* [ Main Content ] start */}

          <div className="py-4">
            <div className="container">
              <div className="col-md-12 py-4">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Create Class</h4>
                    <div class="cover-img-block img_img">
                      <img src={images} alt="" class="img-fluid" />
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
                        {/* add students */}

                        {students.length !== 0 ? (
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
                          <Alert color="info">
                            <h4 className="alert-heading">
                              Students not found!
                            </h4>
                            <div className="alert-body">
                              No Students available! make you add students to
                              the classroom,
                              <Link to="/create-student">
                                Register Students
                              </Link>
                            </div>
                          </Alert>
                        )}

                        {/* add Teacher */}

                        {teachers.length !== 0 ? (
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
                          <Alert color="info">
                            <h4 className="alert-heading">
                              Teachers not found!
                            </h4>
                            <div className="alert-body">
                              No Teacher's are available! Make you add teachers
                              to the classroom,
                              <Link to="/create-teacher">
                                Register Teachers
                              </Link>
                            </div>
                          </Alert>
                        )}
                        {/* subjects */}
                        {!subjects.length && subjects.length === 0 ? (
                          <Alert color="info">
                            <h4 className="alert-heading">
                              Subjects not found
                            </h4>
                            <div className="alert-body">
                              No Subjects are available!
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
                                value={add_subjects}
                              >
                                {subjectOptions}
                              </Select>
                            </div>
                          </div>
                        )}

                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="btn btn-success mr-2"
                          >
                            Add Class
                          </button>
                          <Link
                            to="/manage-classrooms"
                            className="btn btn-secondary"
                          >
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
      </div>
    </>
  );
}

CreateClass.propType = {
  addClassRoom: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
  student: state.student,
  auth: state.auth,
  subject: state.subject,
});
export default connect(mapStateToProps, { addClassRoom, logout })(
  withRouter(CreateClass)
);
