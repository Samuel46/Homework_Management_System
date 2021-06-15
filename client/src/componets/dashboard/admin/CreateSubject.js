import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../../layouts/NodeAlert";
import { addSubject } from "../../../actions/subject";
import PropTypes from "prop-types";
import { Select } from "antd";
import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import Navigation from "../Navigation";
import {Alert}  from 'reactstrap'
const { Option } = Select;
function CreateSubject({
  addSubject,
  history,
  classRoom: { classes },
  teacher: { teachers },
  auth: {user},
  logout
}) {
  const [subject_name, setSubject_Name] = useState("");
  const [add_classes, setAdd_classes] = useState([]);
  const [assign_teachers, setAssign_Teacher] = useState([]);

  // class options from the state
  const classOptions = classes.map((rooms) => (
    <Option value={rooms.name} key={rooms._id}>
      {rooms.name}
    </Option>
  ));

  const teacherOptions = teachers.map((teacher) => (
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

    addSubject(obj);
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
  return (
    <> 
    <Navigation/>
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
            <h4 className="card-title">Create Subject</h4>
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

                {classes.length !== 0 ? (
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
                  <Alert color="info">
                  <h4 className="alert-heading">
                    Class not found!
                  </h4>
                  <div className="alert-body">
                    No Classes are available! Make you add class to
                    the subject,
                    <Link to="/create-class">
                      Create Class
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
                        onChange={setAssign_Teacher}
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
                    No Teachers are available! Make you add class to
                    the subject,
                    <Link to="/create-teacher">
                      Create Class
                    </Link>
                  </div>
                </Alert>
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
      </div>
   
    </>
  );
}

CreateSubject.propType = {
  addSubject: PropTypes.func.isRequired,
  classRoom: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  classRoom: state.classRoom,
  teacher: state.teacher,
  auth: state.auth
});
export default connect(mapStateToProps, { addSubject, logout })(
  withRouter(CreateSubject)
);
