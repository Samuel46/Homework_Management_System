import React, { useState } from "react";
import Alert from "../../layouts/Alert";
import { registerTeacher } from "../../../actions/teacher";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import Navigation from '../Navigation'

import { logout } from "../../../actions/auth";
const { Option } = Select;
function RegisterTeacher({ registerTeacher, history, classRoom: { classes }, auth: { user }, logout }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [create_classes, setCreate_Classes] = useState(false);
  const [joining_date, setJoining_Date] = useState("");

  // render all classroom options
  const classOptions = classes.map((rooms) => (
    <Option value={rooms.name} key={rooms._id}>
      {rooms.name}
    </Option>
  ));

  // ** Adds New Lesson Event
  const handleAddClass = () => {
    const obj = {
      name,
      email,
      password,
      create_classes,
      joining_date,
      allocate_classes,
    };

    registerTeacher(obj);
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
    handleAddClass();
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

         
          <div className="py-2">
            <Alert />
            <div className="container py-5">
      <div className="col-md-12 py-4">
        <div className="card ">
          <div className="card-header">
            <h4 className="card-title">Register Teacher</h4>
            <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/add-user-concept-illustration_114360-458.jpg"
                  alt=""
                  class="img-fluid"
                />
              </div>
          </div>
          <div className="card-body">
            <div className="py-1">
              <Alert />
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label className="floating-label" htmlFor="Name">
                      Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      value={name}
                      type="text"
                      className="form-control"
                      id="Name"
                      placeholder
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group fill">
                    <label className="floating-label" htmlFor="Email">
                      Email Address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      value={email}
                      type="email"
                      className="form-control"
                      id="Email"
                      placeholder
                    />
                  </div>
                </div>

                {classes !== null ? (
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
                    <label className="floating-label" htmlFor="Occupation">
                      Joining Date
                    </label>
                    <input
                      onChange={(e) => setJoining_Date(e.target.value)}
                      name="joining_date"
                      value={joining_date}
                      type="date"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group fill">
                    <label className="floating-label" htmlFor="Email">
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
                {/* <div className="col-sm-6 mt-4">
                                    <div className="form-group fill">
                                        <button className="btn btn-secondary">Reset Password</button>
                                    </div>
                                </div> */}
                <div className="col-sm-12">
                  <button type="submit" className="btn btn-success mr-2">
                    Add Teacher
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
      {/*  */}
  

    </>
  );
}

RegisterTeacher.propTypes = {
  registerTeacher: PropTypes.func.isRequired,
  classRoom: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classRoom: state.classRoom,
  auth: state.auth
});

export default connect(mapStateToProps, { registerTeacher, logout })(
  withRouter(RegisterTeacher)
);
