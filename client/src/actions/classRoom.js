import axios from 'axios'
import { setAlert } from './alert'
import {
    ADD_CLASS,
    CLASS_ERROR,
    DELETE_CLASS,
    GET_CLASSES

} from './types'


// Create classRoom 
export const addClassRoom = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/admin/classes/class', formData, config)

        dispatch({
            type: ADD_CLASS,
            payload: res.data
        });

        dispatch(setAlert('Class Added', 'success'))

        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CLASS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get all the class ##to display in the admin dashboard
export const getClasses = () => async dispatch => {
    try {
        const res = await axios.get('/api/admin/classes/class')

        dispatch({
            type: GET_CLASSES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: CLASS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Class
export const deleteClass = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/admin/classes/class/${id}`)

        dispatch({
            type: DELETE_CLASS,
            payload: res.data
        })

        dispatch(setAlert('Class deleted', 'danger'))
        history.push('./create-class')
        history.push('./dashboard')
    } catch (err) {
        dispatch({
            type: CLASS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}

// update class
// Create classRoom 
export const updateClassRoom = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.put('/api/admin/classes/class', formData, config)

        dispatch({
            type: ADD_CLASS,
            payload: res.data
        });

        dispatch(setAlert('Class Edited', 'success'))

        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CLASS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
