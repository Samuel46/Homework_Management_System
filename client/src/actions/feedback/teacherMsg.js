import axios from 'axios';
import { setAlert } from '../alert'
import {
    SEND_FEEDBACK,
    FEEDBACK_ERROR,
    GET_FEEDBACK_ID,
    GET_MSG_ID,
    GET_MSG_ID_ERROR


} from '../types'

// Send feedback  via form @@Teacher level

export const sendFeedback = (id, formData, history) => async dispatch => {

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/feedback/teacherMsg/${id}`, formData, config)

        dispatch({
            type: SEND_FEEDBACK,
            payload: res.data
        })
        dispatch(setAlert('New feedback submited', 'success'))
        history.push('/manage-homework')


    } catch (err) {
        dispatch({
            type: FEEDBACK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Get the sent message with ID@@ teacher level

export const getFeedback = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/feedback/teacherMsg/${id}`)

        dispatch({
            type: GET_FEEDBACK_ID,
            payload: res.data
        })
        // dispatch(setAlert('New feedback message', 'success'))


    } catch (err) {
        dispatch({
            type: FEEDBACK_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get message from the student@@@ teacher level

export const getMsgId = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/feedback/teacherMsg/me/${id}`)

        dispatch({
            type: GET_MSG_ID,
            payload: res.data
        })
        dispatch(setAlert('New feedback message', 'success'))


    } catch (err) {
        dispatch({
            type: GET_MSG_ID_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


