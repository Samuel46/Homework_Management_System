import React, { useState } from "react";
import NodeAlert from "../../layouts/NodeAlert";
import { registerStudent } from "../../../actions/student";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../../actions/auth";
import Navigation from "../Navigation";
import PasswordGen from "../../PasswordGen";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RegisterStudent({ registerStudent, history, auth: { user }, logout }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [username, setUserName] = useState("");
  const [birth_date, setBirth_Date] = useState(new Date());
  const [gender, setGender] = useState("");
  const [joining_date, setJoining_Date] = useState(new Date());
  const [joining_year_group, setJoining_Year_Group] = useState("");
  const [current_year_group, setCurrent_Year_Group] = useState("");

  // ** Adds New Student
  const handleRegisterStudents = () => {
    const obj = {
      name,
      email,
      username,
      code,
      birth_date,
      gender,
      joining_date,
      joining_year_group,
      current_year_group,
    };

    registerStudent(obj);
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
    handleRegisterStudents();
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

          <div className="py-5">
            <div className="container">
              <div className="col-md-12 py-4">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Register Students</h4>
                    <div class="cover-img-block img_img">
                      <img
                        src="https://image.freepik.com/free-vector/add-notes-concept-illustration_114360-3376.jpg"
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
                        <div className="col-12">
                          <h5>Personal Information</h5>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Name">
                              Name
                            </label>
                            <input
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                              name="name"
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
                              Email <small>Optional</small>{" "}
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

                        <div className="col-sm-6">
                          <div className="form-group fill">
                            <label className="floating-label" htmlFor="Email">
                              Username
                            </label>
                            <input
                              onChange={(e) => setUserName(e.target.value)}
                              name="username"
                              value={username}
                              type="username"
                              className="form-control"
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group fill label_display">
                            <label
                              className="floating-label pr-3"
                              htmlFor="Birth"
                            >
                              Birth Date
                            </label>

                            <DatePicker
                              selected={birth_date}
                              className="form-control date__width"
                              showYearDropdown
                              dateFormatCalendar="MMMM"
                              yearDropdownItemNumber={100}
                              scrollableYearDropdown
                              onChange={(date) => setBirth_Date(date)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group fill label_display">
                            <label
                              className="floating-label pr-3"
                              htmlFor="Birth"
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
                          <div className="form-group fill ">
                            <label className="floating-label" htmlFor="Birth">
                              Joining Year Group
                            </label>
                            <input
                              onChange={(e) => setJoining_Year_Group(e.target.value)}
                              name="username"
                              value={joining_year_group}
                              type="text"
                              className="form-control"
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group fill label_display">
                            <label className="floating-label" htmlFor="Birth">
                              Current Year Group
                            </label>

                            <input
                              onChange={(e) => setCurrent_Year_Group(e.target.value)}
                              name="current_year_group"
                              value={current_year_group}
                              type="text"
                              className="form-control"
                              placeholder
                            />
                          </div>
                        </div>
                        <div className="col-sm-2">
                          <div className="form-group fill">
                            <label className="floating-label">
                              Student Code
                            </label>
                            <input
                              onChange={(e) => setCode(e.target.value)}
                              value={code}
                              name="code"
                              type="password"
                              className="form-control"
                              id="Birth"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="floating-label" htmlFor="Sex">
                              Gender
                            </label>
                            <select
                              onChange={(e) => setGender(e.target.value)}
                              value={gender}
                              name="gender"
                              className="form-control"
                              id="Sex"
                            >
                              <option value={0} />
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group"></div>
                        </div>
                        <div className="col-sm-8">
                          <PasswordGen />
                        </div>

                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="btn btn-success mr-2"
                          >
                            Add Student
                          </button>
                          <Link to="/dashboard" className="btn btn-secondary">
                            Go back
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

RegisterStudent.propTypes = {
  registerStudent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registerStudent, logout })(
  withRouter(RegisterStudent)
);
