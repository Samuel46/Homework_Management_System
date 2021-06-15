import React, { Fragment, useEffect } from 'react'
import CompleteWork from './CompleteWork'
import PendingWork from './PendingWork'
import TeacherTop from '../TeacherTop'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getHomework, getDoneWork } from '../../../actions/teacher/homework'
import NodeAlert from '../../layouts/NodeAlert'
import Spinner from '../../layouts/Spinner'



function HomeworkBody({ getHomework, getDoneWork, homework: { homeworks, isComplete, loading } }) {
    useEffect(() => {
        getHomework()
    }, [getHomework])

    useEffect(() => {
        getDoneWork()
    }, [getDoneWork])

    return (


        <Fragment>
            {homeworks && isComplete === null ? <Spinner /> : <Fragment>
                <div>
                    <TeacherTop />
                </div>

                <div class="pc-container">
                    <div class="pcoded-content">

                        <div class="page-header">
                            <div class="page-block">
                                <div class="row align-items-center">
                                    <div class="col-md-12">

                                        <ul class="breadcrumb">

                                            <li class="breadcrumb-item"><Link to="/teacher-dashboard">Dashboard</Link></li>
                                            <li class="breadcrumb-item">Manage Homework</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- / --> */}
                        <div class="row">
                            {/* <!-- Teacher Dash --> */}
                            <div class="col-xl-6 col-md-6">
                                <div class="card shadow">
                                    <div class="card-body bg-success">
                                        <div class="row align-items-center m-l-0">
                                            <div class="col-auto">
                                                <i class="fas fa-book-open f-36 text-success"></i>
                                            </div>
                                            <div class="col-auto">

                                                <h6 class=" m-b-10  green__color">Complete Homework</h6>
                                                <h2 class="m-b-0 text-success">{isComplete && isComplete.length}</h2>
                                            </div>



                                        </div>
                                    </div>


                                </div>
                            </div>
                            {/* <!-- Student --> */}
                            <div class="col-xl-6 col-md-6">
                                <div class="card shadow">
                                    <div class="card-body bg-danger">
                                        <div class="row align-items-center m-l-0">
                                            <div class="col-auto">
                                                <i class="fas fa-book-open f-36 text-danger"></i>
                                            </div>
                                            <div class="col-auto">
                                                <h6 class="text-danger m-b-10">Pending Homework</h6>
                                                <h2 class="m-b-0 text-danger">{homeworks && homeworks.length}</h2>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>

                        <NodeAlert />

                        {/* CompleteHomework */}
                        <CompleteWork isComplete={isComplete} />


                        {/* <!-- pending homework --> */}
                        <PendingWork homeworks={homeworks} />



                    </div>
                </div>
            </Fragment>}

        </Fragment>
    )
}
HomeworkBody.propTypes = {
    getHomework: PropTypes.func.isRequired,
    homework: PropTypes.object.isRequired,
    getDoneWork: PropTypes.func.isRequired,
}

// geting the pedding & complete homework from the state
const mapStateToProps = state => ({
    homework: state.homework
})

export default connect(mapStateToProps, { getHomework, getDoneWork })(HomeworkBody)
