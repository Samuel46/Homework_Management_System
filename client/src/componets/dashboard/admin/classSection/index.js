import React from "react";
import { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../../actions/auth";
import Navigation from "../../Navigation";
import { getClasses } from "../../../../actions/classRoom";
import NodeAlert from "../../../layouts/NodeAlert";
import ClassRoomTable from "./ClassRoomTable";

function ClassRoomSections({
  classRoom: { classes },
  getClasses,
  logout,
  auth: { user },
}) {
  // on mount
  useEffect(() => {
    getClasses();
  }, [getClasses]);

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
                    <h5 className="m-b-10">Manage Classrooms</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">{user && user.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div div className="row dash_width">
            <div className="col-xl-4 col-md-6">
              <div className="card shadow rounded ">
                <div className="card-body bg-danger">
                  <div className="col-md-12 text-center ">
                    <i className="fas fa-user f-36 text-danger" />
                    <h5 className="text-danger  m-b-10">
                      {" "}
                      <strong>Students</strong>
                    </h5>
                  </div>
                </div>
                <div className="col-md-12  text-center py-3 mb-3 ">
                  <Link to="/manage-students" className="btn btn-info">
                    Manage Student😄
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
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
            <div className="col-xl-4 col-md-6">
              <div className="card shadow  ">
                <div className="card-body bg-primary">
                  <div className="col-md-12 text-center">
                    <i className="fas fa-book-open f-36 text-primary" />
                    <h5 className="text-primary m-b-10">
                      {" "}
                      <strong>Subjects</strong>{" "}
                    </h5>
                  </div>
                </div>
                <div className="col-md-12  py-3 mb-3 text-center  ">
                  <Link to="/manage-subjects" className="btn btn-info">
                    Manage Subject📜
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/*  */}

          <div className="py-5">
            <NodeAlert />
            <ClassRoomTable classes={classes} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

ClassRoomSections.propTypes = {
  classRoom: PropTypes.object.isRequired,
  getClasses: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  classRoom: state.classRoom,
  auth: state.auth,
});

export default connect(mapStateToProps, { getClasses, logout })(
  withRouter(ClassRoomSections)
);
