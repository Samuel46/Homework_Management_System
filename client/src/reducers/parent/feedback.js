import {
    GET_MSG,
    MSG_ERROR,
    GET_MSG_ID,
    GET_MESSAGE_ID
} from "../../actions/types";


const initialState = {
    parentMsgs: [],
    message: [],
    myMsg: [],
    loading: true,
    error: {}
}
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {


        // get all student messages@@parent level
        case GET_MESSAGE_ID:
            return {
                ...state,
                myMsg: payload,
                loading: false
            }

        // Get all messages from teacher @@ parent level
        case GET_MSG:
            return {
                ...state,
                parentMsgs: payload,
                loading: false
            }
        // Get messages from teacher by ID @@ parent level
        case GET_MSG_ID:
            return {
                ...state,
                message: payload,
                loading: false
            }

        case MSG_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}