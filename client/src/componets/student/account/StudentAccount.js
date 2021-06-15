import React, { Fragment, useEffect } from 'react'
import StudentNavigation from '../StudentNavigation'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import ParentInfo from './ParentInfo'
import { getParent } from '../../../actions/student/parents/parent'
import NodeAlert from '../../layouts/NodeAlert'
import { logoutStudent } from '../../../actions/student'


function StudentAccount({ studentHomework: { homeworks, completework }, studentMsg: { messages }, student: { student }, parent: { parents }, getParent, logoutStudent }) {

    useEffect(() => {
        getParent()
    }, [getParent])
    return (
        <Fragment>
            <StudentNavigation />
            <header className="pc-header ">
                <div className="header-wrapper">
                    <div className="mr-auto pc-mob-drp">
                        <ul className="list-unstyled">
                        </ul>
                    </div>
                    <div className="ml-auto">
                        <ul className="list-unstyled">
                            {/* Search icons */}
                            {/* notifications */}
                            <li className="pc-h-item">
                                <Link onClick={logoutStudent} to="#!" className="dropdown-item">
                                    <i className="fas fa-sign-out-alt"></i>{''}
                                    <span>Logout</span>
                                </Link>
                            </li>
                            <li className="dropdown pc-h-item">
                                <Link className="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                    {/* Avater */}
                                    <span>
                                        <span className="user-name">{student && student.name}</span>
                                        <span className="user-desc">Student</span>
                                    </span>
                                </Link>
                                <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                                    <div className=" dropdown-header">
                                        <h6 className="text-overflow m-0">Welcome {student && student.name}</h6>
                                    </div>
                                    <Link to="/student-account" className="dropdown-item">
                                        <i data-feather="user" />
                                        <span>My Account</span>
                                    </Link>
                                    <Link href="#!" className="dropdown-item">
                                        <i data-feather="power" />
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
                                <div className="col-md-12">
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item">Student's-Account</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* / */}
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card user-card user-card-1">
                                <div className="card-header border-0 p-2 pb-0 bg-info ">
                                </div>
                                <div className="card-body pt-0">
                                    <div className="user-about-block text-center">
                                        <div className="row align-items-end">
                                            <div className="col" />
                                            <div className="col">
                                                <div className="position-relative d-inline-block">
                                                    {/* Avatar */}
                                                </div>
                                            </div>
                                            <div className="col" />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h6 className="mb-1 mt-3">{student && student.name}</h6>
                                        <p className="mb-3 text-muted">Student @ Homework App</p>

                                    </div>

                                    <div className="row text-center">
                                        <div className="col">
                                            <h6 className="mb-1 text-success">{completework && completework.length}</h6>
                                            <span className="badge badge-pill badge-success ml-5">Complete Homework</span>
                                        </div>
                                        <div className="col">

                                            <h6 className="mb-1 text-danger">{homeworks && homeworks.length}</h6>
                                            <span className="badge badge-pill badge-danger ml-5">Pending Homework</span>
                                        </div>
                                        <div className="col text-info">
                                            <h6 className="mb-1 text-info">{messages && messages.length}</h6>
                                            <span className="badge badge-pill badge-info ml-5">Feedback Reports</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <NodeAlert /></div>
                        {/* Personal information */}
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body d-flex align-items-center justify-content-between">
                                    <h5 className="mb-0">Personal details</h5>

                                </div>
                                <div className="card-body border-top pro-det-edit collapse show" id="pro-det-edit-1">
                                    <form>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label font-weight-bolder">Full Name</label>
                                            <div className="col-sm-9">
                                                {student && student.name}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label font-weight-bolder">Gender</label>
                                            <div className="col-sm-9">
                                                {student && student.gender}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label font-weight-bolder">Birth Date</label>
                                            <div className="col-sm-9">
                                                <Moment format='YYYY/MM/DD' >{student && student.birth_date}</Moment>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label font-weight-bolder">Joining Year Group</label>
                                            <div className="col-sm-9">
                                                <Moment format='YYYY/MM/DD' >{student && student.joining_year_group}</Moment>

                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label font-weight-bolder">Joining Date</label>
                                            <div className="col-sm-9">
                                                <Moment format='YYYY/MM/DD'>{student && student.joining_date}</Moment>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label font-weight-bolder">Current Year Group</label>
                                            <div className="col-sm-9">
                                                <Moment format='YYYY'>{student && student.current_year_group}</Moment>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* parent notification */}

                        <ParentInfo parents={parents} />
                        {/*  end of parent */}
                    </div>
                    {/* end of row */}



                    <div className="row">
                        <div className="col-md-6  py-3 mb-3  ">
                            <button className="btn btn-danger">Delete Account</button>
                        </div>

                        <div className="col-md-6  py-3 mb-3  ">
                            <Link to='/register-parents' className="btn btn-success"><i className="feather icon-plus" />Add Parent</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

StudentAccount.propTypes = {
    student: PropTypes.object.isRequired,
    parent: PropTypes.object.isRequired,
    getParent: PropTypes.func.isRequired,
    studentHomework: PropTypes.object.isRequired,
    studentMsg: PropTypes.object.isRequired,
    logoutStudent: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    student: state.student,
    parent: state.parent,
    studentHomework: state.studentHomework,
    studentMsg: state.studentMsg

})

export default connect(mapStateToProps, { getParent, logoutStudent })(StudentAccount)
