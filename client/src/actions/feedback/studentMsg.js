import axios from 'axios';
import { setAlert } from '../alert'
import {
    GET_MSG,
    MSG_ERROR,
    GET_MSG_ID,
    SEND_MSG,
    GET_MESSAGE_ID

} from '../types'



// Get all the sent message from teacher.

export const getMsg = () => async dispatch => {


    try {
        const res = await axios.get('/api/feedback/studentMsg')

        dispatch({
            type: GET_MSG,
            payload: res.data
        })
        // dispatch(setAlert('New feedback messages from the homework submission.', 'info'))


    } catch (err) {
        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get the sent message from teacher by ID

export const getMsgById = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/feedback/studentMsg/Msg/${id}`)

        dispatch({
            type: GET_MSG_ID,
            payload: res.data
        })
        dispatch(setAlert('New feedback message', 'info'))


    } catch (err) {
        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////

// Send feedback || replay to message via form @@Student level

export const sendMsg = (id, formData, history) => async dispatch => {

    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/feedback/studentMsg/${id}`, formData, config)

        dispatch({
            type: SEND_MSG,
            payload: res.data
        })
        dispatch(setAlert('Message submited', 'success'))
        history.push('/student-dashboard')


    } catch (err) {
        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get My message via the homework ID of the complete work@@ student

export const getMyMsg = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/feedback/studentMsg/me/${id}`)

        dispatch({
            type: GET_MESSAGE_ID,
            payload: res.data
        })
        dispatch(setAlert('New feedback message', 'success'))


    } catch (err) {
        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

