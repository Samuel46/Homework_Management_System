import {
  REGISTER_STUDENT,
  STUDENT_FAIL,
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  DELETE_STUDENT,
  STUDENT_LOADED,
  AUTH_STUDENT_ERROR,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
  LOGOUT_STUDENT,
  GET_STUDENTSBYID,
  UPDATE_STUDENT,
  UPDATE_STUDENT_FAIL,
  GET_STUDENT_EXPORT,
} from "../actions/types";

const intialState = {
  token: localStorage.getItem("token"),

  isAuthenticated: null,
  loading: true,
  student: null,
  students: [],
  selectedStudent: null,
  studentExport: [],
  isLogin: null,
  error: {},
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    // load the student
    case STUDENT_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLogin: true,
        loading: false,
        student: payload,
      };

    case REGISTER_STUDENT:
    case LOGIN_STUDENT_SUCCESS:
    case UPDATE_STUDENT:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLogin: true,
        loading: false,
      };

    case GET_STUDENTS:
      return {
        ...state,
        students: payload,
        isAuthenticated: true,
        isLogin: true,
        loading: false,
      };

    case GET_STUDENT_EXPORT:
      return {
        ...state,
        studentExport: payload,
        isAuthenticated: true,
        isLogin: true,
        loading: false,
      };

    case GET_STUDENTSBYID:
      return {
        ...state,
        loading: false,
        selectedStudent: payload,
      };

    case STUDENT_FAIL:
    case AUTH_STUDENT_ERROR:
    case LOGIN_STUDENT_FAIL:
    case LOGOUT_STUDENT:
    case DELETE_STUDENT:
    case UPDATE_STUDENT_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLogin: false,
        loading: false,
      };

    case GET_STUDENTS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
