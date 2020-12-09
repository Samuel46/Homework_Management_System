import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_STUDENT,
    STUDENT_FAIL,
    GET_STUDENTS,
    GET_STUDENTS_FAIL,
    DELETE_STUDENT,
    STUDENT_LOADED,
    AUTH_STUDENT_ERROR,
    LOGIN_STUDENT_SUCCESS,
    LOGIN_STUDENT_FAIL,
    LOGOUT_STUDENT



} from '../actions/types'
import setStudentToken from '../utils/setStudentToken'


// Load Student

export const loadStudent = () => async dispatch => {
    if (localStorage.token) {
        setStudentToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/admin/students/authStudent')
        dispatch({
            type: STUDENT_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_STUDENT_ERROR
        })
    }
}



// Register student/@@ admin level
export const registerStudent = (formData, history) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }



    try {
        const res = await axios.post('/api/admin/students/student', formData, config)
        dispatch({
            type: REGISTER_STUDENT,
            payload: res.data
        })
        dispatch(logoutStudent())
        dispatch(setAlert('Student registered', 'success'))
        history.push('./dashboard')

        dispatch(loadStudent())
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: STUDENT_FAIL
        })
    }
}

// Login Teachers
export const loginStudent = (username, code
) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ username, code })

    try {
        const res = await axios.post('/api/admin/students/authStudent', body, config)
        dispatch({
            type: LOGIN_STUDENT_SUCCESS,
            payload: res.data
        })



        dispatch(loadStudent())
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_STUDENT_FAIL
        })
    }
}

// Get all the students
export const getStudents = () => async dispatch => {
    try {
        const res = await axios.get('/api/admin/students/student')

        dispatch({
            type: GET_STUDENTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_STUDENTS_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// Delete Students
export const deleteStudent = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/admin/students/student/${id}`)

        dispatch({
            type: DELETE_STUDENT,
            payload: res.data
        })

        dispatch(setAlert('Student deleted', 'success'))
        history.push('/create-subject')
        history.push('/dashboard')
    } catch (err) {
        dispatch({
            type: GET_STUDENTS_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

// Logout Students
export const logoutStudent = () => dispatch => {

    dispatch({
        type: LOGOUT_STUDENT

    })


}


