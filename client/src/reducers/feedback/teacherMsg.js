import { SEND_FEEDBACK, FEEDBACK_ERROR, GET_FEEDBACK_ID, GET_MSG_ID, GET_MSG_ID_ERROR } from "../../actions/types";


const initialState = {
    feeds: [],
    feed: null,
    msg: [],
    studentMsg: [],
    loading: true,
    error: {}
}
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {

        case SEND_FEEDBACK:
            return {
                ...state,
                feed: payload,
                loading: false
            }

        case GET_FEEDBACK_ID:
            return {
                ...state,
                msg: payload,
                loading: false
            }
        // get student messages
        case GET_MSG_ID:
            return {
                ...state,
                studentMsg: payload,
                loading: false
            }

        case FEEDBACK_ERROR:
        case GET_MSG_ID_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}