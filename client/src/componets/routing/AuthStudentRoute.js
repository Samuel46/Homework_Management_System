import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const AuthStudentRoute = ({ component: Component, student: { isAuthenticated, loading }, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="login" />) : (<Component{...props} />)} />
)


AuthStudentRoute.propTypes = {
    student: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    student: state.student
})



export default connect(mapStateToProps)(AuthStudentRoute)