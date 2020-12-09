import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import { useEffect } from "react";

import Spinner from "../layouts/Spinner";
import { logout } from '../../actions/auth'
import Navigation from './Navigation'
import AdminAction from "./admin/AdminAction";
import Alert from "../layouts/Alert";
import Class from "./admin/ClassList";
import { getClasses } from '../../actions/classRoom';
import SubjectList from "./admin/SubjectList";
import { getSubject } from "../../actions/subject";
import { getTeachers } from "../../actions/teacher";
import { getStudents } from "../../actions/student";
import TeacherList from "./admin/TeacherList";
import StudentList from "./admin/StudentList";






function Dashboard({
  getCurrentProfile,
  getClasses,
  getSubject,
  getTeachers,
  getStudents,
  auth: { user, token },
  teacher: { teachers },
  student: { students },
  classRoom: { classes },
  subject: { subjects },
  profile: { profile, loading },

  deleteAccount, logout, history
}) {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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



  return loading && profile === null ? (
    <Spinner />
  ) : (



      <Fragment>
        {/* Navigation */}
        <Navigation />
        {/* Header starts here */}

        <header className="pc-header ">
          <div className="header-wrapper">
            <div className="mr-auto pc-mob-drp">
              <ul className="list-unstyled">
              </ul>
            </div>
            <div className="ml-auto">
              <ul className="list-unstyled">

                <li className="pc-h-item ">
                  <Link onClick={() => logout()} className="pc-head-link mr-0" to='#!'>
                    <i className="fas fa-sign-out-alt"></i>{''}
                    <span>Logout</span>
                  </Link>
                </li>





                <li className="dropdown pc-h-item">
                  <Link className="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">

                    <span>
                      <span className="user-name">Welcome {user && user.name}</span>
                      <span className="user-desc">Administrator</span>
                    </span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                    <div className=" dropdown-header">
                      <h6 className="text-overflow m-0">Welcome {user && user.name}</h6>
                    </div>
                    <Link href="#!" className="dropdown-item">
                      <i data-feather="settings" />
                      <span>Account</span>
                    </Link>
                    <Link onClick={() => logout()} className="pc-head-link mr-0" to='#!'>
                      <i className="fas fa-sign-out-alt"></i>{''}
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
                      <li className="breadcrumb-item">Dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* [ breadcrumb ] end */}
            {/* [ Main Content ] start */}


            <AdminAction />
            <div className="py-2">
              <Alert />
              <TeacherList teachers={teachers} />
              <StudentList students={students} />
              <Class classes={classes} />
              <SubjectList subjects={subjects} />
            </div>

            <div className="col-md-12  py-3 mb-3  ">
              <button className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        </div>






        {/* 
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        {profile !== null ?

          <Fragment>
            <DashboardAction />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </Fragment> :

          <Fragment>

            <p>  You have not yet setup a profile, Please add some info</p>
            <Link to='/create-profile' className="btn btn-primary my-1">
              Create Profile
        </Link>
          </Fragment >} */}
      </Fragment >
    );
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  getTeachers: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  classRoom: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,

  deleteAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  teacher: state.teacher,
  student: state.student,
  classRoom: state.classRoom,
  subject: state.subject,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, getClasses, getSubject, getStudents, getTeachers, deleteAccount, logout })(withRouter(Dashboard));
