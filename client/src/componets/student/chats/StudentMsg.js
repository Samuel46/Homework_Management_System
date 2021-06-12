import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getMsgById, getMyMsg, sendMsg } from '../../../actions/feedback/studentMsg'
import StudentChat from './StudentChat'
import PropTypes from 'prop-types'
import { logoutStudent } from "../../../actions/student";
import { connect } from 'react-redux'
import Message from './Message'
import StudentNavigation from '../StudentNavigation'

// const [input, setInput] = useState('')
// const [messages, setMessages] =useState([])

function StudentMsg({ getMsgById, getMyMsg, sendMsg, studentMsg: { message, myMsg, loading }, student:{student} ,  logoutStudent, history, match }) {

    useEffect(() => {
        getMsgById(match.params.id)
    }, [getMsgById, match.params.id])

    useEffect(() => {
        getMyMsg(match.params.id)
    }, [getMyMsg, match.params.id])
    const [text, setText] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        sendMsg(match.params.id, { text }, history)
    }

    return (
        <> 
        <StudentNavigation/>
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
                    <h5 className="m-b-10">Student</h5>
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

          <div className="container py-5">
            <div className="col-md-12 py-4">
                <div className="card chat-card">
                <div class="cover-img-block img_img">
                    <img
                      src="https://image.freepik.com/free-vector/man-with-texting-receiving-messages_74855-7613.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                    <form onSubmit={e => onSubmit(e)} className="card-body">

                        <Message message={message} loading={loading} />
                        {/* Student__chat */}
                        <StudentChat myMsg={myMsg} loading={loading} />
                        {/*  */}

                        <div className="right-icon-control m-t-15">
                            <label>Send message</label>
                            <div className="input-group input-group-button">
                                <input value={text} onChange={e => setText(e.target.value)} name="text" type="text" className="form-control" placeholder="text" autoComplete="off" />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="submit"><i className="feather icon-message-circle m-0" /></button>
                                </div>
                            </div>
                            <div className="input-group py-3">
                                <Link to="/manage-homework" className="btn btn-secondary">Go back</Link>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </div>

        </div>
      </div>
      {/*  */}
       
        </>

    )
}

StudentMsg.propTypes = {
    getMsgById: PropTypes.func.isRequired,
    studentMsg: PropTypes.object.isRequired,
    sendMsg: PropTypes.func.isRequired,
    getMyMsg: PropTypes.func.isRequired,
    logoutStudent: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    studentMsg: state.studentMsg,
    student: state.student
})

export default connect(mapStateToProps, { getMsgById,  logoutStudent, sendMsg, getMyMsg })(withRouter(StudentMsg))
