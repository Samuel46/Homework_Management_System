import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import StudentChat from './StudentChat'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Message from './Message'
import { getMsgById, getMyMsg } from '../../../actions/parent/feedback'
import Spinner from '../../layouts/Spinner'
import { Fragment } from 'react'
import { logoutParent } from '../../../actions/student/parents/parent'
import ParentNavigation from '../ParentNavigation'


function ParentMsg({ getMsgById, getMyMsg, logoutParent,  parent:{parent}, feedback: { message, myMsg, loading }, history, match }) {

    useEffect(() => {
        getMsgById(match.params.id)
    }, [getMsgById, match.params.id])

    useEffect(() => {
        getMyMsg(match.params.id)
    }, [getMyMsg, match.params.id])




    return (
        <Fragment>
            <ParentNavigation/>
            <header className="pc-header ">
                        <div className="header-wrapper">
                            <div className="mr-auto pc-mob-drp">
                                <ul className="list-unstyled">
                                </ul>
                            </div>
                            <div className="ml-auto">
                                <ul className="list-unstyled">

                                    <li className="pc-h-item ">
                                        <Link onClick={logoutParent} to="#!" className="dropdown-item">
                                            <i className="fas fa-sign-out-alt"></i>{''}
                                            <span>Logout</span>
                                        </Link>
                                    </li>
                                    <li className="dropdown pc-h-item">
                                        <a className="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">

                                            <span>
                                                <span className="user-name"> {parent && Object.values(parent && parent.student.name)}</span>
                                                <span className="user-desc">Studen't Account</span>
                                            </span>
                                        </a>

                                    </li>
                                    <li className="dropdown pc-h-item">
                                        <a className="pc-head-link dropdown-toggle arrow-none mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">

                                            <span>
                                                <span className="user-name">{parent && parent.name}</span>
                                                <span className="user-desc">Parent</span>
                                            </span>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                                            <div className=" dropdown-header">
                                                <h6 className="text-overflow m-0">Welcome !{parent && parent.name}</h6>
                                            </div>
                                            <a href="../students/account.html" className="dropdown-item">
                                                <i data-feather="user" />
                                                <span>My Account</span>
                                            </a>
                                            <Link onClick={logoutParent} href="#!" className="dropdown-item">
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
                            <div className="page-header mb-3">
                                <div className="page-block">
                                    <div className="row align-items-center">
                                        <div className="col-md-12">
                                            <div className="page-header-title">
                                                <h5 className="m-b-10">Parent's Name</h5>
                                            </div>
                                            <ul className="breadcrumb">
                                                <li className="breadcrumb-item m-b-8">{parent && parent.name}</li>
                                            </ul>

                                        </div>
                                        {/*  */}

                                    </div>
                                </div>
                            </div>


                            {message === null && myMsg === null ? <Spinner /> : <Fragment>
                <div className="container py-4">
                    <div className="col-md-12 py-4">
                        <div className="card chat-card">
                        <div class="cover-img-block img_img">
                    <img
                      src="https://image.freepik.com/free-vector/man-with-texting-receiving-messages_74855-7613.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                            <form className="card-body">

                                <Message message={message} loading={loading} />
                                {/* Student__chat */}
                                <StudentChat myMsg={myMsg} loading={loading} />
                                {/*  */}

                                <div className="right-icon-control m-t-15">

                                    <div className="input-group py-3">
                                        <Link to="/parent-dashboard" className="btn btn-secondary">Go back</Link>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </Fragment>}
                            {/* <Feedback messages={messages} /> */}
                        </div>
                    </div>
           

        </Fragment>

    )
}

ParentMsg.propTypes = {
    getMsgById: PropTypes.func.isRequired,
    feedback: PropTypes.object.isRequired,
    parent: PropTypes.object.isRequired,
    getMyMsg: PropTypes.func.isRequired,
    logoutParent: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    feedback: state.feedback,
    parent: state.parent
})

export default connect(mapStateToProps, { getMsgById, getMyMsg, logoutParent })(withRouter(ParentMsg))
