import {
  CLASS_ERROR,
  GET_CLASSES,
  GET_CLASSES_TEACHER,
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_SUBJECTS,
  SUBJECT_ERROR,
} from "../../actions/types";

const intialState = {
  // class
  classrooms: [],
  loading: true,
  selectedClass: null,
  // students
  studentList: [],
  selectedStudent: null,
  isAuthenticated: false,
  error: {},
  // subject
  subjects: [],
  selectedSubject: null,
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    // class
    case GET_CLASSES_TEACHER:
      return {
        ...state,
        classrooms: payload,
        loading: false,
      };
    case CLASS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    // Students
    case GET_STUDENTS:
      return {
        ...state,
        studentList: payload,
        isAuthenticated: true,
        loading: false,
      };

    case GET_STUDENTS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    // Subjects
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: payload,
        loading: false,
      };

    case SUBJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
