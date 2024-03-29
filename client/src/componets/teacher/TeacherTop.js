import React from "react";
import TeacherNavigation from "./TeacherNavigation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutTeacher } from "../../actions/teacher";

function TeacherTop({ teacher: { teacher }, logoutTeacher }) {
  return (
    <div>
      <TeacherNavigation />
      {/* [ Header ] start */}
      <header className="pc-header ">
        <div className="header-wrapper">
          <div className="mr-auto pc-mob-drp">
            <ul className="list-unstyled"></ul>
          </div>
          <div className="ml-auto">
            <ul className="list-unstyled">
              <li className="pc-h-item">
                <Link onClick={logoutTeacher} to="#!" className="dropdown-item">
                  <i className="fas fa-sign-out-alt"></i>
                  {""}
                  <span>Logout</span>
                </Link>
              </li>
              <li className="dropdown pc-h-item">
                <Link
                  className="pc-head-link dropdown-toggle arrow-none mr-0"
                  to="#"
                  role="button"
                >
                  <span>
                    <span className="user-name">
                      {teacher &&
                        teacher.title +
                          " " +
                          teacher.firstname +
                          " " +
                          teacher.sirname}
                    </span>
                    <span className="user-desc">Teacher</span>
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                  <div className=" dropdown-header">
                    <h6 className="text-overflow m-0">
                      Welcome{" "}
                      {teacher &&
                        teacher.title +
                          " " +
                          teacher.firstname +
                          " " +
                          teacher.sirname}
                    </h6>
                  </div>
                  <Link to="/teacher-dashboard" className="dropdown-item">
                    <i data-feather="user" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    onClick={logoutTeacher}
                    to="#!"
                    className="dropdown-item"
                  >
                    <i data-feather="power" />
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}
TeacherTop.propTypes = {
  teacher: PropTypes.object.isRequired,
  logoutTeacher: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
});
export default connect(mapStateToProps, { logoutTeacher })(TeacherTop);
