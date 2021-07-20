import axios from "axios";

import { setAlert } from "../alert";
import {
  ADD_CLASS,
  CLASS_ERROR,
  DELETE_CLASS,
  GET_CLASSES,
  UPDATE_CLASSROOM,
  GET_CLASSBYID,
} from "../types";

// Create classRoom @@ teacher level if allowed
export const addClassRoom = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/teacher/classroom", formData, config);

    dispatch({
      type: ADD_CLASS,
      payload: res.data,
    });

    dispatch(setAlert("Class Added", "success"));
    history.push("./manage-classes");
    dispatch(getClassRooms());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update classRoom @@ teacher level if allowed
export const updatedClassRoom = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/teacher/classroom", formData, config);

    dispatch({
      type: UPDATE_CLASSROOM,
      payload: res.data,
    });

    dispatch(setAlert(" Your ClassRoom has been updated!", "success"));
    history.push("/manage-classes");
    dispatch(getClassRooms());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the class @@ Teacher Level
export const getClassRooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/teacher/classroom");

    dispatch({
      type: GET_CLASSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get classRm  by ID @@school level
export const getClassById = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/teacher/classroom/${id}`);

    dispatch({
      type: GET_CLASSBYID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Class @@ teacher level
export const deleteClassRoom = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/teacher/classroom/${id}`);

    dispatch({
      type: DELETE_CLASS,
      payload: res.data,
    });

    dispatch(setAlert("Class deleted", "success"));
    history.push("./manage-classes");
    dispatch(getClassRooms());
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
