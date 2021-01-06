import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { deleteParent } from '../../../actions/student/parents/parent'

function ParentInfo({ parents, deleteParent, history }) {

    const parentInfo = parents.map(parent => (
        <div className="card" key={parent._id}>
            <div className="card-body d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Parent details</h5>
            </div>
            <div className="card-body border-top pro-det-edit collapse show" id="pro-det-edit-1">
                <form>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label font-weight-bolder">Full Name</label>
                        <div className="col-sm-9">
                            {parent.name}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label font-weight-bolder">Email</label>
                        <div className="col-sm-9">
                            {parent.email}
                        </div>
                    </div>

                </form>
                <div className="form-group row">
                    {/* <label class="col-sm-3 col-form-label font-weight-bolder">Remove Parent</label> */}
                    <div className="col-sm-9">

                        <button onClick={() => deleteParent(parent._id, history)} className="btn btn-secondary">Remove Parent</button>
                    </div>
                </div>
            </div>
            {/* remove parent */}
        </div>
    ))
    return (

        <div className="col-md-12">
            {parentInfo}
        </div>
    )
}

ParentInfo.propTypes = {
    deleteParent: PropTypes.func.isRequired,
}

export default connect(null, { deleteParent })(withRouter(ParentInfo))
