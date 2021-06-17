import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { updateStudent, getStudentById } from "../../../actions/student";
import EditStudentForm from "./EditStudentForm";
import { logout } from "../../../actions/auth";
import Navigation from "../Navigation";

function EditStudent({
  updateStudent,
  getStudentById,
  student: { loading, selectedStudent },
  match,
  auth: { user },
  logout,
}) {
  useEffect(() => {
    getStudentById(match.params.id);
  }, [getStudentById, match.params.id]);
  return selectedStudent !== null && selectedStudent !== undefined ? (
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
                    <h4 className="card-title">Edit Student</h4>
                    <div class="cover-img-block img_img">
                      <img
                        src="https://image.freepik.com/free-vector/usability-testing-concept-illustration_114360-1571.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <EditStudentForm
                      selectedStudent={selectedStudent}
                      loading={loading}
                      updateStudent={updateStudent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12  py-3 mb-3  ">
            <button className="btn btn-danger">Delete Account</button>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Student not found</h4>
      <div className="alert-body">
        Student with id: {match.params.id} doesn't exist. Check list of all
        Student: <Link to="/dashboard">Dashboard</Link>
      </div>
    </Alert>
  );
}

EditStudent.propTypes = {
  updateStudent: PropTypes.func.isRequired,
  getStudentById: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateStudent,
  logout,
  getStudentById,
})(EditStudent);
