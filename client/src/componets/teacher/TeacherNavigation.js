import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { logoutTeacher } from "../../actions/teacher";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function TeacherNavigation({ logoutTeacher }) {
  return (
    <Fragment>
      <div>
        <div className="loader-bg">
          <div className="loader-track">
            <div className="loader-fill" />
          </div>
        </div>
        {/* [ Pre-loader ] End */}
        {/* [ Mobile header ] start */}
        <div className="pc-mob-header pc-header ">
          <div className="pcm-logo  ">
            <ul className="pc-navbar pc__position">
              <li className="pc-item mr-5">
                <Link className="pc-link text-primary " to="/teacher-dashboard">
                  <i className="fas fa-home f-26" /> <br />
                  <small className="mobo__nav">Dashboard</small>
                </Link>
              </li>
              <li className="pc-item mr-5">
                <Link className="pc-link text-info" to="/manage-homework">
                  <i className="fas fa-book f-26" /> <br />
                  <small className="mobo__nav">Homework</small>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pcm-toolbar">
            <li className="pc-h-item">
              <Link onClick={logoutTeacher} to="#!" className="dropdown-item">
                <i className="fas fa-sign-out-alt"></i>
                {""}
              </Link>
            </li>
          </div>
        </div>
      </div>
      <nav className="pc-sidebar pc__width  ">
        <div className="navbar-wrapper">
          <div className="m-header">
            <a href="../index.html" className="b-brand">
              <strong>Teacher's</strong>
            </a>
          </div>
          <div className="navbar-content">
            <ul className="pc-navbar">
              <li className="pc-item pc-caption">
                <label>Navigation</label>
              </li>
              <li className="pc-item">
                <Link className="pc-link text-primary" to="/teacher-dashboard">
                  <i className="fas fa-home f-26" /> Dashboard
                </Link>
              </li>
              <li className="pc-item">
                <Link className="pc-link text-info" to="/manage-homework">
                  <i className="fas fa-book f-26" /> Manage Homework
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

TeacherNavigation.propTypes = {
  logoutTeacher: PropTypes.func.isRequired,
};

export default connect(null, { logoutTeacher })(TeacherNavigation);
