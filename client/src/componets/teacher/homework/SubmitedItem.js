import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDoneWorkById } from '../../../actions/teacher/homework'
import { Fragment } from 'react'
import Spinner from '../../layouts/Spinner'
import Moment from 'react-moment'


function SubmitedItem({ getDoneWorkById, homework: {
    complete, loading
}, match
}) {
    useEffect(() => {
        getDoneWorkById(match.params.id)
    }, [getDoneWorkById, match.params.id])


    return (
        <div className="container">
            {complete && loading === null ? <Spinner /> : <Fragment>
                <div className="py-2">
                    <div className="card bg-secondary">
                        <div className="card-header ">

                            <h6 className="text-success"><span className="badge badge-pill badge-success">Complete
    Homework</span> </h6>

                        </div>
                        {/*  */}
                        <div className="card-header">
                            <label className="floating-label"> <strong>Title</strong> </label>
                            <h5 className="card-title">{complete && complete.title}</h5>

                        </div>
                        {/*  */}
                        {/* Dates */}
                        <div className="ml-4">
                            <div className=" mb-1 ">
                                <strong>Issued</strong>: {""}<Moment format='YYYY/MM/DD' >{complete && complete.set_date}</Moment>
                            </div>
                            <div className=" mb-1">
                                <strong>Due</strong>:{""} <Moment format='YYYY/MM/DD' >{complete && complete.due_date}</Moment>
                            </div>
                            <div className="mb-1">
                                <strong>Effort estimate</strong>:{""}  {complete && complete.effort_time}
                            </div>
                        </div>
                        <div className="card-body ">
                            <label className="floating-label"> <strong>Description</strong> </label>
                            <p>{complete && complete.description}</p>
                        </div>
                        <div className="card-footer">

                            {/*@@TODO Check wheheter the attachment from the state match with */}
                            <Link to={`/${complete && complete.attachements}`} className="btn  btn-info">View
            Submited Attachments</Link>



                        </div>

                        <div className="col-sm-6 py-3">
                            <Link to="/manage-homework" className="btn btn-secondary">Go back</Link>
                        </div>
                    </div>
                </div>

            </Fragment>}
        </div>


    )
}

SubmitedItem.propTypes = {
    getDoneWorkById: PropTypes.func.isRequired,
    homework: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    homework: state.homework
})

export default connect(mapStateToProps, { getDoneWorkById })(SubmitedItem)
