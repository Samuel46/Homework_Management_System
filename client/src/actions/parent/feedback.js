import axios from 'axios';
import { setAlert } from '../alert'
import {
    GET_MSG,
    MSG_ERROR,
    GET_MSG_ID,
    GET_MESSAGE_ID

} from '../types'

// Get all the sent message from teacher.

export const getMsg = () => async dispatch => {

    try {
        const res = await axios.get('/api/parent/feedback')

        dispatch({
            type: GET_MSG,
            payload: res.data
        })

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
        const res = await axios.get(`/api/parent/feedback/Msg/${id}`)

        dispatch({
            type: GET_MSG_ID,
            payload: res.data
        })
        // dispatch(setAlert('New feedback message', 'info'))


    } catch (err) {
        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////

// Get My message via the homework ID of the complete work@@ student

export const getMyMsg = (id) => async dispatch => {

    try {
        const res = await axios.get(`/api/parent/feedback/me/${id}`)

        dispatch({
            type: GET_MESSAGE_ID,
            payload: res.data
        })



    } catch (err) {
        dispatch({
            type: MSG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

