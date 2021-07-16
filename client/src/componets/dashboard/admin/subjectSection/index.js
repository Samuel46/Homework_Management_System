import React from "react";
import { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../../actions/auth";
import Navigation from "../../Navigation";
import { getSubject } from "../../../../actions/subject";
import NodeAlert from "../../../layouts/NodeAlert";
import SubjectTable from "./SubjectTable";

function SubjectSection({
  subject: { subjects },
  getSubject,
  logout,
  auth: { user },
}) {
  // on mount
  useEffect(() => {
    getSubject();
  }, [getSubject]);

  return (
    <Fragment>
      <Navigation />
      {/* header section */}
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
                    <h5 className="m-b-10">Manage Subjects</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">{user && user.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div div className="row dash_width">
            {/* Student */}

            <div className="col-xl-6 col-md-6">
              <div className="card shadow rounded ">
                <div className="card-body bg-info">
                  <div className="col-md-12 text-center ">
                    <i className="fas fa-user-graduate f-36 text-info" />
                    <h5 className="text-info  m-b-10">
                      {" "}
                      <strong>Teachers</strong>
                    </h5>
                  </div>
                </div>
                <div className="col-md-12  py-3 mb-3  text-center">
                  <Link to="/manage-teachers" className="btn btn-info">
                    Manage Teachers😎
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6">
              <div className="card shadow rounded ">
                <div className="card-body bg-success">
                  <div className="col-md-12 text-center ">
                    <i className="fas fa-laptop f-36 text-success text-center py-1" />
                    <h5 className="text-success  m-b-10">
                      {" "}
                      <strong>Classrooms</strong>
                    </h5>
                  </div>
                </div>
                <div className="col-md-12  py-3 mb-3  text-center">
                  <Link to="/manage-classrooms" className="btn btn-info">
                    Manage Classes🚀
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5">
            <NodeAlert />
            <SubjectTable subjects={subjects} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

SubjectSection.propTypes = {
  subject: PropTypes.object.isRequired,
  getSubject: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  subject: state.subject,
  auth: state.auth,
});

export default connect(mapStateToProps, { getSubject, logout })(
  withRouter(SubjectSection)
);
