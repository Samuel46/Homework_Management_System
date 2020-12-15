import React, { useState, useEffect } from 'react'
import Alert from '../../layouts/Alert'
import { Link, withRouter } from 'react-router-dom'
import StudentRes from '../../teacher/homework/StudentRes'
import TeacherChat from './TeacherChat'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendFeedback, getFeedback, getMsgId } from '../../../actions/feedback/teacherMsg'


function Feedback({ sendFeedback, getFeedback, getMsgId, history, teacherMsg: {
    msg, loading, studentMsg
}, match }) {

    useEffect(() => {
        getFeedback(match.params.id)
    }, [getFeedback, match.params.id])
    // get student msg
    useEffect(() => {
        getMsgId(match.params.id)
    }, [getMsgId, match.params.id])

    const [text, setText] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        sendFeedback(match.params.id, { text }, history)
    }
    return (

        <div className="container">
            <div className="col-md-12 py-4">
                <Alert />
                <div className="card chat-card bg-secondary">
                    <form
                        className="card-body"
                        onSubmit={e => onSubmit(e)}
                    >
                        {/* teacher chat */}
                        <TeacherChat msg={msg} loading={loading} />
                        {/*  */}
                        {/* Student chat */}
                        <StudentRes studentMsg={studentMsg} loading={loading} />


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

    )
}
Feedback.propTypes = {
    sendFeedback: PropTypes.func.isRequired,
    getFeedback: PropTypes.func.isRequired,
    teacherMsg: PropTypes.object.isRequired,
    getMsgId: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    teacherMsg: state.teacherMsg
})

export default connect(mapStateToProps, { sendFeedback, getFeedback, getMsgId })(withRouter(Feedback))
