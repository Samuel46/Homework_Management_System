import axios from 'axios'
import {

    HOMEWORK_ERROR,
    GET_STUDENT_HOMEWORK,
    GET_HOMEWORK_ID,
    GET_COMPLETE_HOMEWORK,
    GET_SUBMITED_HOMEWORK_ID,


} from '../types'



// Get all pending homework @@@parent level based on the studentID
export const getHomework = () => async dispatch => {
    try {
        const res = await axios.get('/api/parent/pending')

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
// Get homework pending homework by ID @@ parent level.
export const getHomeworkBy_id = id => async dispatch => {
    try {
        const res = await axios.get(`/api/parent/pending/${id}`);

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



// Get all complete Homework @@ parent level
export const getCompletWork = () => async dispatch => {
    try {
        const res = await axios.get('/api/parent/complete')

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
// Get complete homework by ID @@parent level
export const getDoneWorkById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/parent/complete/${id}`)

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







