import React, { Fragment, useEffect } from 'react'
import Spinner from '../../layouts/Spinner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { getFeedback } from '../../../actions/feedback/teacherMsg'
function TeacherChat({ msg, loading, getFeedback }) {

    useEffect(() => {
        getFeedback()
    }, [getFeedback])

    const messages = msg.map(item => (
        <div className="row m-b-20 received-chat" key={item._id}>

            <div className="col-auto p-r-0">

                {Object.values(item.teacher.name)}
            </div>
            <div className="col">
                <div className="msg">
                    <p className="m-b-0">{item.text}</p>
                </div>
                <p className="text-muted m-b-0"><i className="fas fa-clock m-r-10" /><Moment format='LLLL' >{item.date}</Moment></p>
            </div>
        </div>
    ))
    return (

        <Fragment className="container">
            {loading && messages === null ? <Spinner /> :
                <Fragment>
                    {messages}

                </Fragment>}


        </Fragment>
    )

}

TeacherChat.propTypes = {


    getFeedback: PropTypes.func.isRequired,
}





export default connect(null, { getFeedback })(TeacherChat)
