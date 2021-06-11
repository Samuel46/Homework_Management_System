import {
  ADD_CLASS,
  CLASS_ERROR,
  GET_CLASSES,
  DELETE_CLASS,
  UPDATE_CLASS,
  UPDATE_CLASS_FAIL,
  GET_CLASSESBYID,
} from "../actions/types";

const intialState = {
  class: null,
  classes: [],
  loading: true,
  selectedClass: null,
  error: {},
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CLASS:
    case DELETE_CLASS:
    case UPDATE_CLASS:
      return {
        ...state,
        class: payload,
        loading: false,
      };

    case GET_CLASSESBYID:
      return {
        ...state,
        loading: false,
        selectedClass: payload,
      };

    case GET_CLASSES:
      return {
        ...state,
        classes: payload,
        loading: false,
      };
    case CLASS_ERROR:
    case UPDATE_CLASS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
