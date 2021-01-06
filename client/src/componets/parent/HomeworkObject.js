import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Fragment } from 'react'
import Moment from 'react-moment'
import { getHomeworkBy_id } from '../../actions/parent/homework'
import Spinner from '../layouts/Spinner'


function HomeworkObject({ getHomeworkBy_id, parentwork: { homework, loading

}, match, history
}) {
    useEffect(() => {
        getHomeworkBy_id(match.params.id)
    }, [getHomeworkBy_id, match.params.id])


    return (
        <Fragment>

            {homework && loading === null ? <Spinner /> : <Fragment>
                <div className="container">
                    <div className="py-2">
                        <div className="card bg-secondary">
                            <div className="card-header ">
                                <h4>Homework details</h4>
                            </div>
                            {/*  */}
                            <div className="card-header">
                                <label className="floating-label"> <strong>Title</strong> </label>
                                <h5 className="card-title">{homework && homework.title}</h5>

                            </div>
                            {/*  */}
                            {/* Dates */}
                            <div className="ml-4">
                                <div className=" mb-1 ">
                                    <strong>Issued</strong>:<Moment format='YYYY/MM/DD' >{homework && homework.set_date}</Moment>
                                </div>
                                <div className=" mb-1">
                                    <strong>Due</strong>: <Moment format='YYYY/MM/DD' >{homework && homework.due_date}</Moment>
                                </div>
                                <div className="mb-1">
                                    <strong>Effort estimate</strong>:  {homework && homework.effort_time}
                                </div>
                            </div>
                            <div className="card-body ">
                                <label className="floating-label"> <strong>Description</strong> </label>
                                <p>{homework && homework.description}</p>
                                <button type="button" className="btn  btn-secondary mr-3">View
            Attachments</button>
                                <Link to="/parent-dashboard" className="btn  btn-secondary">Go Back</Link>
                            </div>



                        </div>
                    </div>

                </div>

            </Fragment>}
        </Fragment>


    )
}

HomeworkObject.propTypes = {
    getHomeworkBy_id: PropTypes.func.isRequired,
    parentwork: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({

    parentwork: state.parentwork,
})

export default connect(mapStateToProps, { getHomeworkBy_id })(withRouter(HomeworkObject))
