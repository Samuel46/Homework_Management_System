import React, { useState } from "react";
import Alert from "../../layouts/Alert";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerParent } from "../../../actions/student/parents/parent";
import { logoutStudent } from "../../../actions/student";
import StudentNavigation from "../StudentNavigation";
import { Fragment } from "react";
function ParentForm({
  registerParent,
  history,
  logoutStudent,
  student: { student, loading },
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    registerParent(formData, history);
  };
  return (
    <Fragment>
      <StudentNavigation />

      {/* [ Header ] start */}
      <header className="pc-header ">
        <div className="header-wrapper">
          <div className="mr-auto pc-mob-drp">
            <ul className="list-unstyled"></ul>
          </div>
          <div className="ml-auto">
            <ul className="list-unstyled">
              <li className="pc-h-item">
                <Link onClick={logoutStudent} to="#!" className="dropdown-item">
                  <i className="fas fa-sign-out-alt"></i>
                  {""}
                  <span>Logout</span>
                </Link>
              </li>
              <li className="pc-h-item">
                <Link
                  className="pc-head-link mr-0"
                  to="#!"
                  data-toggle="modal"
                  data-target="#notification-modal"
                >
                  <i data-feather="bell" />
                  <span className="badge badge-danger pc-h-badge dots">
                    <span className="sr-only" />
                  </span>
                </Link>
              </li>
              <li className="dropdown pc-h-item">
                <Link
                  className="pc-head-link dropdown-toggle arrow-none mr-0"
                  data-toggle="dropdown"
                  to="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  {/* <img src="../assets/images/user/avatar-3.jpg" alt="user-image" className="user-avtar" /> */}
                  <span>
                    <span className="user-name">{student && student.name}</span>
                    <span className="user-desc">Student</span>
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                  <div className=" dropdown-header">
                    <h6 className="text-overflow m-0">Welcome !</h6>
                  </div>
                  <Link to="#!" className="dropdown-item">
                    <i data-feather="user" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    onClick={logoutStudent}
                    to="#!"
                    className="dropdown-item"
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
      {/* [ Header ] end */}
      {/* [ Main Content ] start */}

      <div className="pc-container">
        <div className="pcoded-content">
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Manage Parents</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      {student && student.name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="container py-5">
            <div className="col-md-12 py-4">
              <div className="card  shadow">
                <div className="card-header">
                  <h4 className="card-title">Add Parent</h4> 
                </div>
                <div class="cover-img-block img_img">
                  <img
                    src="https://image.freepik.com/free-vector/add-notes-concept-illustration_114360-3376.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>

                <div className="card-body">
                  <div>
                    <Alert />
                  </div>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group fill">
                          <label className="floating-label">
                            Parent's Name
                          </label>
                          <input
                            onChange={(e) => onChange(e)}
                            value={name}
                            name="name"
                            type="text"
                            className="form-control"
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
                            onChange={(e) => onChange(e)}
                            value={email}
                            name="email"
                            type="email"
                            className="form-control"
                            id="Email"
                            placeholder
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group fill">
                          <label className="floating-label">Password</label>
                          <input
                            onChange={(e) => onChange(e)}
                            value={password}
                            name="password"
                            type="password"
                            className="form-control"
                            id="Password"
                            placeholder
                          />
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary mr-4">
                          Add Parent
                        </button>
                        <Link
                          to="/student-parent"
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
    </Fragment>
  );
}
ParentForm.propTypes = {
  registerParent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, { registerParent })(
  withRouter(ParentForm)
);
