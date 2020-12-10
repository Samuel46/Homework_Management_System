import { ADD_HOMEWORK, HOMEWORK_ERROR, GET_HOMEWORK, DELETE_HOMEWORK, GET_PENDING_HOMEWORK, GET_SUBMITED_HOMEWORK, GET_SUBMITED_HOMEWORK_ID, DELETE_SUBMITED_HOMEWORK_ID } from "../../actions/types"

const intialState = {

    homework: null,
    homeworks: [],
    loading: true,
    error: {},
    isComplete: [],
    complete: null
}



export default function (state = intialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {
        case ADD_HOMEWORK:
        case DELETE_HOMEWORK:
            return {
                ...state,
                homework: payload,
                loading: false
            }



        case GET_HOMEWORK:
            return {
                ...state,
                homeworks: payload,
                loading: false
            }
        //    get all complete homework
        case GET_SUBMITED_HOMEWORK:
            return {
                ...state,
                isComplete: payload,
                loading: false
            }
        // get complete homework ID
        case GET_SUBMITED_HOMEWORK_ID:
            return {
                ...state,
                complete: payload,
                loading: false,
            }

        // get pending homework

        case GET_PENDING_HOMEWORK:
            return {
                ...state,
                homeworks: payload,
                loading: false,
                isComplete: false
            }

        // delete submited homework
        case DELETE_SUBMITED_HOMEWORK_ID:
            return {
                ...state,
                complete: payload,
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




