import React, { Fragment, useEffect } from 'react'
import CompleteWork from '../student/CompleteWork'
import Feedback from '../student/Feedback'
import PendingWork from '../student/PendingWork'
import StudentDashActions from './StudentDashActions'
import StudentNavigation from './StudentNavigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Alert from '../layouts/Alert'

import { getCompletWork, getHomework } from '../../actions/student/homework'
import Spinner from '../layouts/Spinner'
import { logoutStudent } from '../../actions/student'
import { Link } from 'react-router-dom'
import { getMsg } from '../../actions/feedback/studentMsg'

function StudentDash({ getHomework, getCompletWork, logoutStudent, getMsg, studentHomework: { homeworks, completework }, student: { student, loading }, studentMsg: { messages } }) {
    useEffect(() => {
        getHomework()
    }, [getHomework])
    useEffect(() => {
        getCompletWork()
    }, [getCompletWork])

    useEffect(() => {
        getMsg()
    }, [getMsg])


    return (
        <Fragment>
            {loading && student === null ? <Spinner /> :
                <Fragment>
                    <StudentNavigation />

                    {/* [ Header ] start */}
                    <header className="pc-header ">
                        <div className="header-wrapper">
                            <div className="mr-auto pc-mob-drp">
                                <ul className="list-unstyled">
                                </ul>
                            </div>
                            <div className="ml-auto">
                                <ul className="list-unstyled">

                                    <li className="pc-h-item">
                                        <Link onClick={logoutStudent} to="#!" className="dropdown-item">
                                            <i className="fas fa-sign-out-alt"></i>{''}
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                    <li className="pc-h-item">
                                        <Link className="pc-head-link mr-0" to="#!" data-toggle="modal" data-target="#notification-modal">
                                            <i data-feather="bell" />
                                            <span className="badge badge-danger pc-h-badge dots"><span className="sr-only" /></span>
                                        </Link>
                                    </li>
                                    <li className="dropdown pc-h-item">
                                        <Link className="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown" to="#" role="button" aria-haspopup="false" aria-expanded="false">
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
                                            <Link onClick={logoutStudent} to="#!" className="dropdown-item">
                                                <i className="fas fa-sign-out-alt"></i>{''}
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
                    {/* [ Main Content ] start */}
                    <div className="pc-container">
                        <div className="pcoded-content">
                            {/* [ breadcrumb ] start */}
                            <div className="page-header">
                                <div className="page-block">
                                    <div className="row align-items-center">
                                        <div className="col-md-12">
                                            <div className="page-header-title">
                                                <h5 className="m-b-10">Student</h5>
                                            </div>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item">{student && student.name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* [ breadcrumb ] end */}
                            {/* [ Main Content ] start */}
                            {/* <div className="col-md-12 mt-5">
                                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong>Pending Homework </strong>due in 3 day.Make sure you submit eailier
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    </div>
                                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                                        <strong> 3 New Feedback</strong> from Mr. Robin .
              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    </div>
                                </div> */}

                            <StudentDashActions />
                            {/* ////////////////////////////////////// */}
                            <Alert />
                            {/* {!isComplete ? <PendingWork homeworks={homeworks} /> :    <CompleteWork /> } */}
                            <PendingWork homeworks={homeworks} />
                            {/* ////////////////////// */}
                            {/* Complete */}
                            <CompleteWork completework={completework} />
                            {/* List of commented homework */}

                            <Feedback messages={messages} />
                        </div>
                    </div>


                </Fragment>}

        </Fragment>
    )
}

StudentDash.propTypes = {
    studentHomework: PropTypes.object.isRequired,
    getHomework: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    logoutStudent: PropTypes.func.isRequired,
    getCompletWork: PropTypes.func.isRequired,
    getMsg: PropTypes.func.isRequired,


}

const mapStateToProps = state => ({
    studentHomework: state.studentHomework,
    student: state.student,
    studentMsg: state.studentMsg

})

export default connect(mapStateToProps, { getHomework, getCompletWork, getMsg, logoutStudent, })(StudentDash)
