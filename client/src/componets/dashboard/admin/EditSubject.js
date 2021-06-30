import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  updateSubject,
  getSubject,
  getSubjectById,
} from "../../../actions/subject";
import { logout } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EditSubjectForm from "./EditSubjectForm";
import { Alert, Button } from "reactstrap";
import Navigation from "../Navigation";

function EditSubject({
  subject: { selectedSubject },
  updateSubject,
  getSubjectById,
  match,
  classRoom: { classes },
  teacher: { teachers },
  logout,
  auth: { user },
}) {
  useEffect(() => {
    getSubjectById(match.params.id);
  }, [getSubjectById, match.params.id]);

  return selectedSubject !== null && selectedSubject !== undefined ? (
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
                    <h4 className="card-title">Edit Subject</h4>
                    <div class="cover-img-block img_img">
                      <img
                        src="https://image.freepik.com/free-vector/usability-testing-concept-illustration_114360-1571.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <EditSubjectForm
                      selectedSubject={selectedSubject}
                      updateSubject={updateSubject}
                      classes={classes}
                      teachers={teachers}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  ) : (
    <div className="misc-wrapper">
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <Alert color="danger">
            <h4 className="alert-heading">Subject not found</h4>
            <div className="alert-body">
              Subject with id: {match.params.id} doesn't exist. Check list of
              all subjects: <Link to="/dashboard">Subject List</Link>
            </div>
          </Alert>
          <Button
            tag={Link}
            to="/dashboard"
            color="primary"
            className="btn-sm-block mb-2"
          >
            Back to home
          </Button>
          <img
            className="img-fluid"
            src="https://image.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg"
            alt="Not authorized page"
          />
        </div>
      </div>
    </div>
  );
}

EditSubject.propTypes = {
  updateSubject: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired,
  getSubjectById: PropTypes.func.isRequired,
  classRoom: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  subject: state.subject,
  classRoom: state.classRoom,
  teacher: state.teacher,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateSubject,
  getSubjectById,
  getSubject,
  logout,
})(withRouter(EditSubject));
