import React, { Fragment } from 'react'
import Moment from 'react-moment'

function StudentRes({ studentMsg }) {
    const studentRes = studentMsg.map(msg => (
        <div className="row m-b-20 send-chat" key={msg._id}>
            <div className="col">
                <div className="msg">
                    <p className="m-b-0">{msg.text}</p>
                </div>
                <p className="text-muted m-b-0"><i className="fas fa-clock m-r-10" /><Moment format='LLLL' >{msg.date}</Moment></p>
            </div>
            <div className="col-auto p-l-0">
                <p className="m-b-2">   {Object.values(msg.student.name)}</p>

            </div>
        </div>
    ))
    return (
        <div className="container">
            {studentRes}
        </div>
    )
}

export default StudentRes
