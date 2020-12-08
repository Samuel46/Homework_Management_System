import { GET_MSG, MSG_ERROR, GET_MSG_ID, SEND_MSG, GET_MESSAGE_ID } from "../../actions/types";


const initialState = {
    messages: [],
    message: [],
    myMsg: [],
    msgRes: null,
    loading: true,
    error: {}
}
export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {

        case SEND_MSG:
            return {
                ...state,
                msgRes: payload,
                loading: false
            }

        case GET_MESSAGE_ID:
            return {
                ...state,
                myMsg: payload,
                loading: false
            }


        case GET_MSG:
            return {
                ...state,
                messages: payload,
                loading: false
            }

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