import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_TEACHER,
  TEACHER_FAIL,
  GET_TEACHERS,
  DELETE_TEACHER,
  GET_TEACHERS_FAIL,
  TEACHER_LOADED,
  AUTH_TEACHER_ERROR,
  LOGIN_TEACHER_SUCCESS,
  LOGIN_TEACHER_FAIL,
  LOGOUT_TEACHER,
  UPDATE_TEACHER,
  UPDATE_TEACHER_FAIL,
  GET_TEACHERSBYID,
} from "../actions/types";
import setTeacherToken from "../utils/setTeacherToken";

// Load teacher

export const loadTeacher = () => async (dispatch) => {
  if (localStorage.token) {
    setTeacherToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/admin/authTeacher");
    dispatch({
      type: TEACHER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_TEACHER_ERROR,
    });
  }
};

// Register Teachers by school admin
export const registerTeacher = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/admin/teacher", formData, config);
    dispatch({
      type: REGISTER_TEACHER,
      payload: res.data,
    });
    dispatch(logoutTeacher());
    dispatch(setAlert("Teacher registered", "success"));
    dispatch(loadTeacher());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: TEACHER_FAIL,
    });
  }
};

// update teacher by school admin

export const updateTeacher = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/admin/teacher", formData, config);
    dispatch({
      type: UPDATE_TEACHER,
      payload: res.data,
    });
    dispatch(logoutTeacher());
    dispatch(setAlert("Teacher updated", "success"));
    dispatch(loadTeacher());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: UPDATE_TEACHER_FAIL,
    });
  }
};

// Login Teachers
export const loginTeacher = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/admin/authTeacher", body, config);
    dispatch({
      type: LOGIN_TEACHER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadTeacher());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_TEACHER_FAIL,
    });
  }
};

// Get teacher  by ID @@school level
export const getTeacherById = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/admin/teacher/${id}`);

    dispatch({
      type: GET_TEACHERSBYID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TEACHERS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all the Teacher
export const getTeachers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/admin/teacher");

    dispatch({
      type: GET_TEACHERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TEACHERS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Teacher
export const deleteTeacher = (id, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/admin/teacher/${id}`);

    dispatch({
      type: DELETE_TEACHER,
      payload: res.data,
    });

    dispatch(setAlert("Teacher deleted", "danger"));
    history.push("/create-subject");
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_TEACHERS_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Logout teachers
export const logoutTeacher = () => (dispatch) => {
  dispatch({
    type: LOGOUT_TEACHER,
  });
};
