import {
  ADD_SUBJECT,
  SUBJECT_ERROR,
  GET_SUBJECTS,
  DELETE_SUBJECT,
  GET_SUBJECTSBYID,
  UPDATE_SUBJECT,
  UPDATE_SUBJECT_FAIL,
} from "../actions/types";

const intialState = {
  subject: null,
  subjects: [],
  selectedSubject: null,
  loading: true,
  error: {},
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_SUBJECT:
    case DELETE_SUBJECT:
    case UPDATE_SUBJECT:
      return {
        ...state,
        subject: payload,
        loading: false,
      };

    case GET_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        loading: false,
      };
    case GET_SUBJECTSBYID:
      return {
        ...state,
        loading: false,
        selectedSubject: payload,
      };
    case SUBJECT_ERROR:
    case UPDATE_SUBJECT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
