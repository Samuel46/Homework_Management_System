import axios from "axios";
import { setAlert } from "../alert";
import {
  HOMEWORK_ERROR,
  GET_STUDENT_HOMEWORK,
  GET_HOMEWORK_ID,
  GET_CLASS_STUDENT,
  GET_CLASS_STUDENT_FAIL,
  SUBMIT_HOMEWORK,
  GET_COMPLETE_HOMEWORK,
  REMOVE_HOMEWORK,
  COMPLETE_WORK,
} from "../types";

// Get all pending homework
export const getHomework = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/student/homework") 

    dispatch({
      type: GET_STUDENT_HOMEWORK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all class associate with student
export const getMyClass = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/student/homework/work");

    dispatch({
      type: GET_CLASS_STUDENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CLASS_STUDENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Get all homework associate with student using the classroom
export const getHomeworkFromClass = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/student/homework/classroom");

    dispatch({
      type: GET_STUDENT_HOMEWORK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get all complete Homework
export const getCompletWork = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/student/complete");

    dispatch({
      type: GET_COMPLETE_HOMEWORK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get homework by :ID
export const getHomeworkBy_id = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/student/homework/${id}`);

    dispatch({
      type: GET_HOMEWORK_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// @Post action- to submit the complete homework@@Student
export const submitHomework = (id, formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      `/api/student/complete/upload/${id}`,
      formData,
      config
    );

    dispatch({
      type: SUBMIT_HOMEWORK,
      payload: res.data,
    });
    dispatch(setAlert("Homework Submited", "success"));
    history.push("/student-dashboard");
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response },
    });
  }
};

// remove complete homework
export const removeHomework = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/student/complete/${id}`);

    dispatch({
      type: REMOVE_HOMEWORK,
      payload: res.data,
    });

    dispatch(setAlert("Homework removed!", "danger"));
    dispatch(getCompletWork());
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove homework from pending to complete after the student submits the homework
export const removePending = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/student/homework/${id}`);

    dispatch({
      type: REMOVE_HOMEWORK,
      payload: res.data,
    });

    dispatch(setAlert("Homework removed!", "danger"));
    dispatch(getCompletWork());
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// display none for pending homework after submissiom
export const movePending = () => async (dispatch) => {
  try {
    dispatch({
      type: COMPLETE_WORK,
    });

    dispatch(setAlert("Homework Complete!", "success"));
  } catch (err) {
    dispatch({
      type: HOMEWORK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
