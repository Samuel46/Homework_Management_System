import {
    REGISTER_PARENT,
    PARENT_FAIL,
    DELETE_PARENT,
    GET_PARENTS,
    GET_PARENTS_FAIL,
    DELETE_PARENT_FAIL,
    PARENT_LOADED,
    AUTH_PARENT_ERROR,
    LOGIN_PARENT_SUCCESS,
    LOGIN_PARENT_FAIL,
    LOGOUT_PARENT
} from "../../../actions/types"

const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    parent: null,
    parents: [],
    error: {}
}

export default function (state = intialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {

        // load the student
        case PARENT_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                parent: payload
            }

        case REGISTER_PARENT:
        case LOGIN_PARENT_SUCCESS:


            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }


        case GET_PARENTS:
            return {
                ...state,
                parents: payload,
                isAuthenticated: true,
                loading: false
            }

        case PARENT_FAIL:
        case AUTH_PARENT_ERROR:
        case LOGIN_PARENT_FAIL:
        case LOGOUT_PARENT:
        case DELETE_PARENT:

            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        case DELETE_PARENT_FAIL:
        case GET_PARENTS_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }


        default:
            return state;
    }
}




