import axios from "axios";
import { setAlert } from "../../alert";
import {
  REGISTER_PARENT,
  PARENT_FAIL,
  DELETE_PARENT,
  GET_PARENTS,
  GET_PARENTS_FAIL,
  PARENT_LOADED,
  AUTH_PARENT_ERROR,
  LOGIN_PARENT_SUCCESS,
  LOGIN_PARENT_FAIL,
  LOGOUT_PARENT,
  DELETE_PARENT_FAIL,
  UPDATE_PARENT,
  GET_PARENT_BYID,
} from "../../../actions/types";
import setParentToken from "../../../utils/setParentToken";

// Load Student

export const loadParent = () => async (dispatch) => {
  if (localStorage.token) {
    setParentToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/student/parents/authParent");
    dispatch({
      type: PARENT_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_PARENT_ERROR,
    });
  }
};

// Register parent/@@ student level
export const registerParent = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "/api/student/parents/parent",
      formData,
      config
    );
    dispatch({
      type: REGISTER_PARENT,
      payload: res.data,
    });
    // @@TODO Log out parents after registration
    dispatch(logoutParent());
    dispatch(setAlert("Parent Created", "success"));
    // history.push('./student-account')
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PARENT_FAIL,
    });
  }
};

// Update parent/@@ student level
export const updateParent = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "/api/student/parents/parent",
      formData,
      config
    );
    dispatch({
      type: UPDATE_PARENT,
      payload: res.data,
    });
    // @@TODO Log out parents after registration
    dispatch(logoutParent());
    dispatch(setAlert("Parent Updated", "success"));
    // history.push('./student-account')
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PARENT_FAIL,
    });
  }
};

// Login Parent
export const loginParent = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "/api/student/parents/authParent",
      body,
      config
    );
    dispatch({
      type: LOGIN_PARENT_SUCCESS,
      payload: res.data,
    });
    dispatch(loadParent());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_PARENT_FAIL,
    });
  }
};

// Get parent by student ID
export const getParent = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/student/parents/parent");

    dispatch({
      type: GET_PARENTS,
      payload: res.data,
    });
    dispatch(logoutParent());
  } catch (err) {
    dispatch({
      type: GET_PARENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get parent by ID
export const getParentById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/student/parents/parent/${id}`);

    dispatch({
      type: GET_PARENT_BYID,
      payload: res.data,
    });
    dispatch(logoutParent());
  } catch (err) {
    dispatch({
      type: GET_PARENTS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Delete Parents
export const deleteParent = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/student/parents/parent/${id}`);

    dispatch({
      type: DELETE_PARENT,
      payload: res.data,
    });

    dispatch(setAlert("Parent removed", "danger"));
    dispatch(getParent());
  } catch (err) {
    dispatch({
      type: DELETE_PARENT_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Logout Students
export const logoutParent = () => (dispatch) => {
  dispatch({
    type: LOGOUT_PARENT,
  });
};
