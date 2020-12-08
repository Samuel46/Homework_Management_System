import { ADD_CLASS, CLASS_ERROR, GET_CLASSES, DELETE_CLASS } from "../../actions/types"

const intialState = {

    class: null,
    classes: [],
    loading: true,
    error: {}
}



export default function (state = intialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {
        case ADD_CLASS:
        case DELETE_CLASS:
            return {
                ...state,
                class: payload,
                loading: false
            }



        case GET_CLASSES:
            return {
                ...state,
                classes: payload,
                loading: false
            }
        case CLASS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }



        default:
            return state;
    }
}



