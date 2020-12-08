import {
    HOMEWORK_ERROR, GET_PENDING_HOMEWORK, GET_STUDENT_HOMEWORK, GET_HOMEWORK_ID, SUBMIT_HOMEWORK, REMOVE_HOMEWORK, GET_COMPLETE_HOMEWORK
} from "../../actions/types"

const intialState = {
    homeworks: [],
    homework: null,
    loading: true,
    error: {},

    completework: []
}



export default function (state = intialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {

        // Get homework by :ID
        case GET_HOMEWORK_ID:
        case REMOVE_HOMEWORK:
            return {
                ...state,
                homework: payload,
                loading: false,

            }


        case GET_STUDENT_HOMEWORK:
            return {
                ...state,
                homeworks: payload,
                loading: false,

            }
        // submit completed homework
        case SUBMIT_HOMEWORK:
            return {
                ...state,
                homework: payload,
                loading: false,


            }

        // Get complete homework
        case GET_COMPLETE_HOMEWORK:
            return {
                ...state,
                completework: payload,
                loading: false,


            }

        // get pending homework

        case GET_PENDING_HOMEWORK:
            return {
                ...state,
                homeworks: payload,
                loading: false,

            }


        case HOMEWORK_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }



        default:
            return state;
    }
}




