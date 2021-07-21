import React, { useState } from "react";
import NodeAlert from "../../layouts/NodeAlert";
import { registerTeacher } from "../../../actions/teacher";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Select } from "antd";
import Navigation from "../Navigation";
import { Alert } from "reactstrap";
import { logout } from "../../../actions/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const { Option } = Select;

function RegisterTeacher({
  registerTeacher,
  classRoom: { classes },
  auth: { user },
  logout,
  history,
}) {
  const [firstname, setFirstName] = useState("");
  const [sirname, setSirName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [joining_date, setJoining_Date] = useState(new Date());

  // render all classroom options
  const classOptions = classes.map((rooms) => (
    <Option value={rooms.name} key={rooms._id}>
      {rooms.name}
    </Option>
  ));


  // ** Adds New Teacher
  const handleAddTeacher = () => {
    const obj = {
      firstname,
      sirname,
      title,
      email,
      password,
      joining_date,
      allocate_classes,
    };

    registerTeacher(obj, history);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddTeacher();
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

          <div className="py-2">
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
                      <NodeAlert />
                    </div>

                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Name">
                              Firstname
                            </label>
                            <input
                              onChange={(e) => setFirstName(e.target.value)}
                              name="name"
                              value={firstname}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>

                        {/* sirname */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Name">
                              Sirname
                            </label>
                            <input
                              onChange={(e) => setSirName(e.target.value)}
                              value={sirname}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        {/* salutation */}
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Name">
                              What's your title?
                            </label>
                            <Select
                                // mode="multiple"
                                autoFocus
                                allowClear
                                style={{ width: "100%" }}
                                placeholder="Please Allocate Classes"
                                onChange={setTitle}
                                value={title}
                              >
                                <Option value="Mr.">
                                    Mr.
                                  </Option>
                                  <Option value="Mrs.">
                                  Mrs.
                                </Option>
                                  <Option value="Miss.">
                                  Miss.
                                </Option>
                                <Option value="Ms.">
                                Ms.
                              </Option>
                                <Option value="Dr.">
                                Dr.
                              </Option>
                              <Option value="Prof.">
                              Prof.
                              </Option>
                              </Select>
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

                        {!classes.length && classes.length === 0 ? (
                          <Alert color="info">
                            <h4 className="alert-heading">Classes not found</h4>
                            <div className="alert-body">
                              No Classes are available! Make you assign a
                              classroom to the teacher,
                              <Link to="/create-class">Create Classroom</Link>
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
                              </Select>
                            </div>
                          </div>
                        )}

                        <div className="col-sm-6">
                          <div className="form-group fill label_display">
                            <label
                              className="floating-label"
                              htmlFor="Occupation"
                            >
                              Joining Date
                            </label>
                            <DatePicker
                              selected={joining_date}
                              className="form-control date__width"
                              onChange={(date) => setJoining_Date(date)}
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
                          <button
                            type="submit"
                            className="btn btn-success mr-2"
                          >
                            Add Teacher
                          </button>
                          <Link
                            to="/manage-teachers"
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
  auth: state.auth,
});

export default connect(mapStateToProps, { registerTeacher, logout })(
  withRouter(RegisterTeacher)
);
