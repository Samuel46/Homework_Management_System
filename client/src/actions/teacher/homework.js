import axios from 'axios'
import { setAlert } from '../alert'
import {
    ADD_HOMEWORK,
    HOMEWORK_ERROR,
    GET_HOMEWORK,
    DELETE_HOMEWORK,
    GET_SUBMITED_HOMEWORK,
    GET_SUBMITED_HOMEWORK_ID,
    DELETE_SUBMITED_HOMEWORK_ID


} from '../types'


// Create homework
export const addHomework = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/teacher/homework', formData, config)

        dispatch({
            type: ADD_HOMEWORK,
            payload: res.data
        });

        dispatch(setAlert('Homework Added', 'success'))

        history.push('/teacher-dashboard')

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
// Get all homework
export const getHomework = () => async dispatch => {
    try {
        const res = await axios.get('/api/teacher/homework')

        dispatch({
            type: GET_HOMEWORK,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete Homework @@ teacher level
export const deleteHomework = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/teacher/homework/${id}`)

        dispatch({
            type: DELETE_HOMEWORK,
            payload: res.data
        })

        dispatch(setAlert('Homework removed', 'success'))
        history.push('./create-homework')
        history.push('./teacher-dashboard')
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}


// Get all complete homework @@teacher level
export const getDoneWork = () => async dispatch => {
    try {
        const res = await axios.get('/api/teacher/homework/complete')

        dispatch({
            type: GET_SUBMITED_HOMEWORK,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get complete homework by ID @@teacher level
export const getDoneWorkById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/teacher/homework/complete/${id}`)

        dispatch({
            type: GET_SUBMITED_HOMEWORK_ID,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete complete homework by ID @@teacher level
export const deleteDoneWorkById = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`/api/teacher/homework/complete/${id}`)

        dispatch({
            type: DELETE_SUBMITED_HOMEWORK_ID,
            payload: res.data
        })
        dispatch(setAlert('Submited homework deleted', 'danger'))
        history.push('/teacher-dashboard')
        history.push('/manage-homework')
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}