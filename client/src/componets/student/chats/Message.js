import React, { Fragment } from 'react'
import Moment from 'react-moment'

function Message({ message }) {
    const messages = message.map(msg => (
        <div className="row m-b-20 received-chat" key={msg._id}>
            <div className="col-auto p-r-0 mb-2">
                <small>Teacher</small> <br />
                <strong>{Object.values(msg.teacher.name)}</strong>
            </div>
            <div className="col">
                <div className="msg">
                    <p className="m-b-0">{msg.text}</p>
                </div>
                <p className="text-muted m-b-0"><i className="fas fa-clock m-r-10" /><Moment format='LLLL' >{msg.date}</Moment></p>
            </div>
        </div>
    ))
    return (

        <Fragment>
            {messages}
        </Fragment>
    )
}

export default Message
