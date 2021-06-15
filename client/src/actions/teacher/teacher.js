import axios from "axios";
import { setAlert } from "../alert";
import {
  CLASS_ERROR,
  GET_CLASSES,
  GET_CLASSES_TEACHER,
  GET_STUDENTS,
  GET_STUDENTS_FAIL,
  GET_SUBJECTS,
  SUBJECT_ERROR,
  UPLOAD_HOMEWORK,
  UPLOAD_HOMEWORK_FAIL
} from "../types";



// UPLOAD HOMEWORK@@ teacher level
export const uploadHomework = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "form-data",
      },
    };

    const res = await axios.post(
     "/api/teacher/teacher/upload",
      formData,
      config
    );

    dispatch({
      type: UPLOAD_HOMEWORK,
      payload: res.data,
    });
    dispatch(setAlert("Homework attachement uploaded", "success"));

  } catch (err) {
    dispatch({
      type: UPLOAD_HOMEWORK_FAIL,
      payload: { msg: err.response },
    });
  }
};

// get all subject by teacher's name
export const getSubject = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/teacher/teacher/subject");

    dispatch({
      type: GET_SUBJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the students
export const getStudents = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/teacher/teacher/students");

    dispatch({
      type: GET_STUDENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_STUDENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the class from the school by teacher's name
export const getClasses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/teacher/teacher/classRoom");

    dispatch({
      type: GET_CLASSES_TEACHER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
