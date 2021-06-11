import {
  ADD_CLASS,
  CLASS_ERROR,
  UPDATE_CLASSROOM,
  GET_CLASSES,
  DELETE_CLASS,
  GET_CLASSBYID,
} from "../../actions/types";

const intialState = {
  class: null,
  classes: [],
  selectedClassRoom: null,
  loading: true,
  error: {},
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_CLASS:
    case DELETE_CLASS:
    case UPDATE_CLASSROOM:
      return {
        ...state,
        class: payload,
        loading: false,
      };

    case GET_CLASSES:
      return {
        ...state,
        classes: payload,
        loading: false,
      };
    case GET_CLASSBYID:
      return {
        ...state,
        loading: false,
        selectedClassRoom: payload,
      };
    case CLASS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
