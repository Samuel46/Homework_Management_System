import { ADD_SUBJECT, SUBJECT_ERROR, GET_SUBJECTS, DELETE_SUBJECT } from "../actions/types"

const intialState = {

    subject: null,
    subjects: [],
    loading: true,
    error: {}
}



export default function (state = intialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {
        case ADD_SUBJECT:
        case DELETE_SUBJECT:
            return {
                ...state,
                subject: payload,
                loading: false
            }



        case GET_SUBJECTS:
            return {
                ...state,
                subjects: payload,
                loading: false
            }
        case SUBJECT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }



        default:
            return state;
    }
}




