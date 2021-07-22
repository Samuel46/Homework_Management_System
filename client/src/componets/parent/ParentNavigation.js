import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutParent } from "../../actions/student/parents/parent";

function ParentNavigation({ logoutParent, parent: { parent } }) {
  return (
    <Fragment>
      {/* [ Pre-loader ] start */}
      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill" />
        </div>
      </div>
      {/* [ Pre-loader ] End */}
      {/* [ Mobile header ] start */}
      <div className="pc-mob-header pc-header">
        <div className="pcm-logo">
          <ul className="pc-navbar pc__position">
            <li className="pc-item mr-5">
              <Link className="pc-link text-primary " to="/parent-dashboard">
                <i className="fas fa-home f-26" /> <br />
                <small className="mobo__nav">Dashboard</small>
              </Link>
            </li>

            <li className="pc-item">
              <Link to="/student-account" className="pc-link text-danger">
                <small className="text-white">Student's Name</small> <br />
                {parent &&
                  Object.values(
                    parent &&
                      parent.student.firstname + " " + parent.student.sirname
                  )}
              </Link>
            </li>
          </ul>
        </div>
        <div className="pcm-toolbar">
          <li className="pc-h-item">
            <Link onClick={logoutParent} to="#!" className="dropdown-item">
              <i className="fas fa-sign-out-alt"></i>
              {""}
            </Link>
          </li>
        </div>
      </div>
      <nav className="pc-sidebar pc__widthd">
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link to="/student-dashboard" className="b-brand">
              <strong>Parent</strong>
            </Link>
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
                <Link to="/student-account" className="pc-link text-danger">
                  <small className="text-white">Student's Name</small> <br />
                  {parent &&
                    Object.values(
                      parent &&
                        parent.student.firstname + " " + parent.student.sirname
                    )}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
ParentNavigation.propTypes = {
  logoutParent: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  parent: state.parent,
});

export default connect(mapStateToProps, { logoutParent })(ParentNavigation);
