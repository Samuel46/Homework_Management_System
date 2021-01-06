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


function ParentMsg({ getMsgById, getMyMsg, feedback: { message, myMsg, loading }, history, match }) {

    useEffect(() => {
        getMsgById(match.params.id)
    }, [getMsgById, match.params.id])

    useEffect(() => {
        getMyMsg(match.params.id)
    }, [getMyMsg, match.params.id])




    return (
        <Fragment>
            {message === null && myMsg === null ? <Spinner /> : <Fragment>
                <div className="container">
                    <div className="col-md-12 py-4">
                        <div className="card chat-card bg-secondary">
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

        </Fragment>

    )
}

ParentMsg.propTypes = {
    getMsgById: PropTypes.func.isRequired,
    feedback: PropTypes.object.isRequired,

    getMyMsg: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    feedback: state.feedback
})

export default connect(mapStateToProps, { getMsgById, getMyMsg })(withRouter(ParentMsg))
