import {
    REGISTER_TEACHER, TEACHER_FAIL, GET_TEACHERS, GET_TEACHERS_FAIL, DELETE_TEACHER, TEACHER_LOADED, AUTH_TEACHER_ERROR, LOGIN_TEACHER_SUCCESS, LOGIN_TEACHER_FAIL, LOGOUT_TEACHER, UPDATE_TEACHER, UPDATE_TEACHER_FAIL, 
    GET_TEACHERSBYID
} from "../actions/types"

const intialState = {
    token: localStorage.getItem('token'),

    isAuthenticated: null,
    loading: true,
    teacher: null,
    selectedTeacher: null,
    teachers: [],
    error: {}
}



export default function (state = intialState, action) {
    const {
        type, payload
    } = action;

    switch (type) {

        case TEACHER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                teacher: payload
            }

            case GET_TEACHERSBYID:
            return {
                ...state,
                loading: false,
                selectedTeacher: payload
            }
        case REGISTER_TEACHER:
        case LOGIN_TEACHER_SUCCESS:
            case UPDATE_TEACHER:

            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }


        case GET_TEACHERS:
            return {
                ...state,
                teachers: payload,
                isAuthenticated: true,
                loading: false
            }

        case DELETE_TEACHER:

            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            }



        case TEACHER_FAIL:
        case AUTH_TEACHER_ERROR:
        case LOGIN_TEACHER_FAIL:
        case LOGOUT_TEACHER:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        case GET_TEACHERS_FAIL:
            case UPDATE_TEACHER_FAIL:
            return {
                ...state,
                error: payload,
                loading: false
            }

        default:
            return state;
    }
}




