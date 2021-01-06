import React from 'react'

import { connect } from 'react-redux'
import ParentMsg from './feedback/ParentMsg'


function ParentDashActions({ parentwork: { homeworks, completework }, feedback: { parentMsgs } }) {
    return (
        <div className="row">
            <div className="col-xl-4 col-md-6">
                <div className="card shadow">
                    <div className="card-body bg-info">
                        <div className="row align-items-center m-l-0">
                            <div className="col-auto">
                                <i className="fas fa-comments f-36 text-info" />
                            </div>
                            <div className="col-auto">
                                <h6 className="text-info m-b-10">Feedback</h6>
                                <h2 className="m-b-0 text-info">{parentMsgs && parentMsgs.length}</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Student */}
            <div className="col-xl-4 col-md-6">
                <div className="card shadow">
                    <div className="card-body bg-danger">
                        <div className="row align-items-center m-l-0">
                            <div className="col-auto">
                                <h6 className="text-danger m-b-10">Pending Homewrok</h6>
                                <h2 className="m-b-0 text-danger">{homeworks && homeworks.length}</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-xl-4 col-md-6">
                <div className="card shadow rounded ">
                    <div className="card-body bg-success ">
                        <div className="row align-items-center m-l-0">
                            <div className="col-auto">
                                <h6 className="text-success m-b-10">Complete Homework</h6>
                                <h2 className="m-b-0 text-success">{completework && completework.length}</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    parentwork: state.parentwork,
    feedback: state.feedback,
})
export default connect(mapStateToProps, {})(ParentDashActions)
