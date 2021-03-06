import {
  ADD_HOMEWORK,
  HOMEWORK_ERROR,
  GET_HOMEWORK,
  DELETE_HOMEWORK,
  GET_PENDING_HOMEWORK,
  GET_SUBMITED_HOMEWORK,
  GET_SUBMITED_HOMEWORK_ID,
  DELETE_SUBMITED_HOMEWORK_ID,
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_HOMEWORKBYID,
  UPDATE_HOMEWORK,
  UPLOAD_HOMEWORK,
  UPLOAD_HOMEWORK_FAIL
} from "../../actions/types";

const intialState = {
  homework: null,
  homeworks: [],
  studentz: [],
  selectedHomeWork: null,
  loading: true,
  error: {},
  isComplete: [],
  complete: null,
  uploads:[]
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_HOMEWORK:
    case DELETE_HOMEWORK:
    case UPDATE_HOMEWORK:
      return {
        ...state,
        homework: payload,
        loading: false,
      };

       // upload homework by teacher
    case UPLOAD_HOMEWORK:
      return {
        ...state,
        uploads: payload,
        loading: false,
      };

    case GET_HOMEWORK:
      return {
        ...state,
        homeworks: payload,
        loading: false,
      };
    case GET_HOMEWORKBYID:
      return {
        ...state,
        loading: false,
        selectedHomeWork: payload,
      };

    //    get all complete homework
    case GET_SUBMITED_HOMEWORK:
      return {
        ...state,
        isComplete: payload,
        loading: false,
      };
    // get complete homework ID
    case GET_SUBMITED_HOMEWORK_ID:
      return {
        ...state,
        complete: payload,
        loading: false,
      };

    // get pending homework

    case GET_PENDING_HOMEWORK:
      return {
        ...state,
        homeworks: payload,
        loading: false,
        isComplete: false,
      };

    // delete submited homework
    case DELETE_SUBMITED_HOMEWORK_ID:
      return {
        ...state,
        complete: payload,
        loading: false,
      };
    // get students from the admin

    // get complete homework ID
    case GET_STUDENTS:
      return {
        ...state,
        studentz: payload,
        loading: false,
      };

    case HOMEWORK_ERROR:
    case GET_STUDENTS_FAIL:
      case UPLOAD_HOMEWORK_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
