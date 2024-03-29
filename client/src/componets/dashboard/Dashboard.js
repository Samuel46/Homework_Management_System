import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import Spinner from "../layouts/Spinner";
import { logout } from "../../actions/auth";
import Navigation from "./Navigation";
import AdminAction from "./admin/AdminAction";
import NodeAlert from "../layouts/NodeAlert";
import { getClasses } from "../../actions/classRoom";
import { getSubject } from "../../actions/subject";
import { getTeachers } from "../../actions/teacher";
import { getStudents } from "../../actions/student";
import { Alert } from "reactstrap";
import images from "../../../src/img/0.png";

function Dashboard({
  getClasses,
  getSubject,
  getTeachers,
  getStudents,
  auth: { user },
  teacher: { teachers, loading },
  student: { students },
  classRoom: { classes },
  subject: { subjects },
  logout,
}) {
  useEffect(() => {
    getTeachers();
  }, [getTeachers]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);
  useEffect(() => {
    getClasses();
  }, [getClasses]);

  useEffect(() => {
    getSubject();
  }, [getSubject]);

  return user !== null && user !== undefined ? (
    <Fragment>
      {/* Navigation */}
      <Navigation />
      {/* Header starts here */}

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
      <div className="pc-container dash_width">
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
          <div className="col-md-12 img_img">
            <div class="cover-img-block  py-4">
              <img src={images} alt="" class="img-fluid" />
            </div>
          </div>

          <AdminAction />
          <div className="py-2">
            <NodeAlert />
            {!classes.length &&
            !students.length &&
            !teachers.length &&
            !subjects.length ? (
              <Alert color="danger">
                <h4 className="alert-heading">Welcome to Homework APP!!🏩</h4>
                <div className="alert-body">
                  Are you ready to setup your account✨ <br /> First add the
                  students😄 <Link to="/create-student">Register Students</Link>{" "}
                </div>
              </Alert>
            ) : null}

            {!classes.length &&
            students.length &&
            !teachers.length &&
            !subjects.length ? (
              <Alert color="primary">
                <h4 className="alert-heading">
                  Now! Let's Setup The Teacher😎
                </h4>
                <div className="alert-body">
                  Add some cool teachers😎
                  <Link to="/create-teacher">Create Teacher</Link> <br />{" "}
                </div>
              </Alert>
            ) : null}

            {!classes.length &&
            students.length &&
            teachers.length &&
            !subjects.length ? (
              <Alert color="primary">
                <h4 className="alert-heading">You're almost there🏃‍♂️!!</h4>
                <div class="cover-img-block img_img">😄</div>
                <div className="alert-body">
                  Setup the Classes
                  <Link to="/create-class">Create Classes</Link>
                </div>
              </Alert>
            ) : null}

            {classes.length &&
            students.length &&
            teachers.length &&
            !subjects.length ? (
              <Alert color="success">
                <h4 className="alert-heading">Finally!! Setup The Subjects</h4>
                <div class="cover-img-block img_img">🤗🤗</div>
                <div className="alert-body">
                  You're done✨✨✨✨{" "}
                  <Link to="/create-subject">Create Subject📜</Link> <br />
                  And you're ready to Rock🚀
                </div>
              </Alert>
            ) : null}
          </div>
        </div>
      </div>
      {/* polor chat for more info */}
    </Fragment>
  ) : (
    <Spinner />
  );
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  getTeachers: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  classRoom: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,

  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  teacher: state.teacher,
  student: state.student,
  classRoom: state.classRoom,
  subject: state.subject,
});
export default connect(mapStateToProps, {
  getClasses,
  getSubject,
  getStudents,
  getTeachers,
  logout,
})(withRouter(Dashboard));
