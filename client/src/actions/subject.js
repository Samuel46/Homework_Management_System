import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_SUBJECT,
  DELETE_SUBJECT,
  SUBJECT_ERROR,
  GET_SUBJECTS,
  GET_SUBJECTSBYID,
  UPDATE_SUBJECT_FAIL,
  UPDATE_SUBJECT,
} from "./types";

// Create subjects
export const addSubject = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/admin/subjects/subject",
      formData,
      config
    );

    dispatch({
      type: ADD_SUBJECT,
      payload: res.data,
    });

    dispatch(setAlert("Subject Added", "success"));
    dispatch(getSubject());
    history.push("/manage-subjects");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the subject ##to display in the admin dashboard
export const getSubject = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/subjects/subject");

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

// Get subject  by ID @@school level
export const getSubjectById = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/subjects/subject/${id}`);

    dispatch({
      type: GET_SUBJECTSBYID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update subjects
export const updateSubject = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      "/api/admin/subjects/subject",
      formData,
      config
    );

    dispatch({
      type: UPDATE_SUBJECT,
      payload: res.data,
    });

    dispatch(setAlert("Subject Edited", "success"));
    dispatch(getSubject());
    history.push("/manage-subjects");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_SUBJECT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Subject
export const deleteSubject = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/admin/subjects/subject/${id}`);

    dispatch({
      type: DELETE_SUBJECT,
      payload: res.data,
    });

    dispatch(setAlert("Subject deleted", "danger"));
    dispatch(getSubject());
    history.push("/manage-subjects");
  } catch (err) {
    dispatch({
      type: SUBJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
