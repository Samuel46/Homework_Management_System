import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../actions/auth";

function Navigation({ logout }) {
  return (
    <Fragment>
      {/* [ navigation menu ] start */}

      <div className="loader-bg">
        <div className="loader-track">
          <div className="loader-fill" />
        </div>
      </div>

      {/* [ Mobile header ] start */}
      <div className="pc-mob-header pc-header">
        <div className="pcm-logo">
          <ul className="pc-navbar pc__position">
            <li className="pc-item mr-5">
              <Link className="pc-link text-primary " to="/dashboard">
                <i className="fas fa-home f-26" /> <br />
                <small className="mobo__nav">Dashboard</small>
              </Link>
            </li>

            <li className="pc-item mr-5 ">
              <Link to="/manage-account" className="pc-link  text-danger">
                <i class="far fa-user-circle f-26"></i> <br />
                <small className="mobo__nav">Account</small>
              </Link>
            </li>
          </ul>
        </div>
        <div className="pcm-toolbar">
          <Link onClick={logout} className="pc-head-link mr-0" to="#!">
            <i className="fas fa-sign-out-alt"></i>
            {""}
            <span>Logout</span>
          </Link>
        </div>
      </div>
      <nav className="pc-sidebar">
        <div className="navbar-wrapper">
          <div className="m-header">
            <Link to="/dashboard" className="b-brand">
              <strong>Dashboard</strong>
            </Link>
          </div>
          <div className="navbar-content">
            <ul className="pc-navbar">
              <li className="pc-item pc-caption">
                <label>Navigation</label>
              </li>
              <li className="pc-item">
                <Link className="pc-link text-primary" to="/dashboard">
                  <i className="fas fa-home f-26" /> Dashboard
                </Link>
              </li>
              <li className="pc-item">
                <Link to="/manage-account" className="pc-link text-danger">
                  <i class="far fa-user-circle f-26"></i> My Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classRoom: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(withRouter(Navigation));
