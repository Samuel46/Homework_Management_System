import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthTeacherRoute = ({ component: Component, teacher: { isAuthenticated, loading }, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="login" />) : (<Component{...props} />)} />
)


AuthTeacherRoute.propTypes = {
    teacher: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    teacher: state.teacher
})



export default connect(mapStateToProps)(AuthTeacherRoute)