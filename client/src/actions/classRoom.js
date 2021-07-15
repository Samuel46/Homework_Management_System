import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_CLASS,
  CLASS_ERROR,
  DELETE_CLASS,
  GET_CLASSES,
  GET_CLASSESBYID,
  UPDATE_CLASS,
} from "./types";

// Create classRoom
export const addClassRoom = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/admin/classes/class", formData, config);

    dispatch({
      type: ADD_CLASS,
      payload: res.data,
    });

    dispatch(setAlert("Class Added", "success"));
    dispatch(getClasses());
    history.push("/manage-classrooms");
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

// Get all the class ##to display in the admin dashboard
export const getClasses = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/classes/class");

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

// Get CLASS  by ID @@school level
export const getClassById = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/classes/class/${id}`);

    dispatch({
      type: GET_CLASSESBYID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Class
export const deleteClass = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/admin/classes/class/${id}`);

    dispatch({
      type: DELETE_CLASS,
      payload: res.data,
    });

    dispatch(setAlert("Class deleted", "danger"));
    dispatch(getClasses());
    history.push("/manage-classrooms");
  } catch (err) {
    dispatch({
      type: CLASS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// update class
export const updateClassRoom = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/admin/classes/class", formData, config);

    dispatch({
      type: UPDATE_CLASS,
      payload: res.data,
    });

    dispatch(setAlert("Class Updated", "success"));
    dispatch(getClasses());
    history.push("/manage-classrooms");
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
