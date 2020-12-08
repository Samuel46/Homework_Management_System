import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getMsgById, getMyMsg, sendMsg } from '../../../actions/feedback/studentMsg'
import StudentChat from './StudentChat'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Message from './Message'

// const [input, setInput] = useState('')
// const [messages, setMessages] =useState([])

function StudentMsg({ getMsgById, getMyMsg, sendMsg, studentMsg: { message, myMsg, loading }, history, match }) {

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
        <div className="col-md-12 py-4">
            <div className="card chat-card bg-secondary">
                <form onSubmit={e => onSubmit(e)} className="card-body">

                    <Message message={message} />
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
    )
}

StudentMsg.propTypes = {
    getMsgById: PropTypes.func.isRequired,
    studentMsg: PropTypes.object.isRequired,
    sendMsg: PropTypes.func.isRequired,
    getMyMsg: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    studentMsg: state.studentMsg
})

export default connect(mapStateToProps, { getMsgById, sendMsg, getMyMsg })(withRouter(StudentMsg))
