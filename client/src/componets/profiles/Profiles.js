import React, { Fragment, useEffect } from 'react'
import Spinner from '../layouts/Spinner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'

function Profiles({ getProfiles, profile: { profiles, loading } }) {

    useEffect(() => {
        getProfiles();
    }, [getProfiles])
    return (
        <Fragment>
            {loading ? <Spinner /> : <Fragment>
                <h1 className="large text-primary">Students</h1>
                <p className="leads">
                    <i className="fab fa-connectdevelop"></i> List of all students
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : <h4> No students available  </h4>}
                </div>
            </Fragment>}
        </Fragment>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
});



export default connect(mapStateToProps, { getProfiles })(Profiles)
