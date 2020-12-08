import axios from 'axios'
import { setAlert } from '../alert'
import {

    HOMEWORK_ERROR,
    GET_STUDENT_HOMEWORK,
    GET_HOMEWORK_ID,
    SUBMIT_HOMEWORK,
    GET_COMPLETE_HOMEWORK,
    REMOVE_HOMEWORK



} from '../types'



// Get all pending homework
export const getHomework = () => async dispatch => {
    try {
        const res = await axios.get('/api/student/homework')

        dispatch({
            type: GET_STUDENT_HOMEWORK,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}



// Get all complete Homework
export const getCompletWork = () => async dispatch => {
    try {
        const res = await axios.get('/api/student/complete')

        dispatch({
            type: GET_COMPLETE_HOMEWORK,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get homework by :ID
export const getHomeworkBy_id = id => async dispatch => {
    try {
        const res = await axios.get(`/api/student/homework/${id}`);

        dispatch({
            type: GET_HOMEWORK_ID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// @Post action- to submit the complete homework@@Student
export const submitHomework = (id, formData, history) => async dispatch => {


    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const res = await axios.post(`/api/student/complete/upload/${id}`, formData, config);


        dispatch({
            type: SUBMIT_HOMEWORK,
            payload: res.data
        })
        dispatch(setAlert('Homework Submited', 'success'))

        history.push('/student-dashboard')


    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response }
        })
    }
}


// Remove homework from pending to complete after the student submits the homework
export const removeHomework = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/student/complete/${id}`)

        dispatch({
            type: REMOVE_HOMEWORK,
            payload: res.data
        })

        dispatch(setAlert('Homework Complete', 'info'))

    } catch (err) {
        dispatch({
            type: HOMEWORK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }
}
