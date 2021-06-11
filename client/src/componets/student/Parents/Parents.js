import React, { Fragment, useEffect } from 'react'
import StudentNavigation from '../StudentNavigation'
import AddParents from './AddParents'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { logoutStudent } from "../../../actions/student";
import { getParent } from '../../../actions/student/parents/parent'
import { Link } from "react-router-dom";
import MyClassRooms from '../MyClassRooms'

function Parents({
    logoutStudent,
    student: { student, loading },
    getParent,
    parent: { parents },
}) {

  useEffect(() => {
  getParent()
}, [getParent])
 
 
    return (
        <Fragment>
        <StudentNavigation />
  
        {/* [ Header ] start */}
        <header className="pc-header ">
          <div className="header-wrapper">
            <div className="mr-auto pc-mob-drp">
              <ul className="list-unstyled"></ul>
            </div>
            <div className="ml-auto">
              <ul className="list-unstyled">
                <li className="pc-h-item">
                  <Link onClick={logoutStudent} to="#!" className="dropdown-item">
                    <i className="fas fa-sign-out-alt"></i>
                    {""}
                    <span>Logout</span>
                  </Link>
                </li>
                <li className="pc-h-item">
                  <Link
                    className="pc-head-link mr-0"
                    to="#!"
                    data-toggle="modal"
                    data-target="#notification-modal"
                  >
                    <i data-feather="bell" />
                    <span className="badge badge-danger pc-h-badge dots">
                      <span className="sr-only" />
                    </span>
                  </Link>
                </li>
                <li className="dropdown pc-h-item">
                  <Link
                    className="pc-head-link dropdown-toggle arrow-none mr-0"
                    data-toggle="dropdown"
                    to="#"
                    role="button"
                    aria-haspopup="false"
                    aria-expanded="false"
                  >
                    {/* <img src="../assets/images/user/avatar-3.jpg" alt="user-image" className="user-avtar" /> */}
                    <span>
                      <span className="user-name">{student && student.name}</span>
                      <span className="user-desc">Student</span>
                    </span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                    <div className=" dropdown-header">
                      <h6 className="text-overflow m-0">Welcome !</h6>
                    </div>
                    <Link to="#!" className="dropdown-item">
                      <i data-feather="user" />
                      <span>My Account</span>
                    </Link>
                    <Link
                      onClick={logoutStudent}
                      to="#!"
                      className="dropdown-item"
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
        {/* [ Header ] end */}
        {/* [ Main Content ] start */}
  
        <div className="pc-container">
          <div className="pcoded-content">
            {/* [ breadcrumb ] start */}
            <div className="page-header">
              <div className="page-block">
                <div className="row align-items-center">
                  <div className="col-md-12">
                    <div className="page-header-title">
                      <h5 className="m-b-10">Manage Parents</h5>
                    </div>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        {student && student.name}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
  
           <AddParents parents={parents}/>
           
            
          </div>
        </div>
      </Fragment>
    ) 
   
  }
    

  Parents.propTypes= {
    student: PropTypes.object.isRequired,
    logoutStudent: PropTypes.func.isRequired,
    getParent: PropTypes.func.isRequired,
    parent: PropTypes.object.isRequired,
}
  const mapStateToProps = state => ({
    student: state.student,
    parent: state.parent,
  })
export default connect(mapStateToProps, {logoutStudent, getParent}) (Parents)
