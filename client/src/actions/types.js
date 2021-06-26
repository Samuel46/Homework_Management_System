export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

// Add Teacher
export const REGISTER_TEACHER = "REGISTER_TEACHER";
export const TEACHER_FAIL = "TEACHER_FAIL";
// Log in Teacher
export const LOGIN_TEACHER_SUCCESS = "LOGIN_TEACHER_SUCCESS";
export const LOGIN_TEACHER_FAIL = "LOGIN_TEACHER_FAIL";
// Add Teacher
export const REGISTER_STUDENT = "REGISTER_STUDENT";
export const STUDENT_FAIL = "STUDENT_FAIL";
// get teacher by ID
export const GET_TEACHERSBYID = "GET_TEACHERSBYID";
// update teacher
export const UPDATE_TEACHER = "UPDATE_TEACHER";
export const UPDATE_TEACHER_FAIL = "UPDATE_TEACHER_FAIL";

// Logout teacher
export const LOGOUT_TEACHER = "LOGOUT_TEACHER";
// GET all auth teachers
export const TEACHER_LOADED = "TEACHER_LOADED";
export const AUTH_TEACHER_ERROR = "AUTH_TEACHER_ERROR";

// get teachers
export const GET_TEACHERS = "GET_TEACHERS";
export const GET_TEACHERS_FAIL = "GET_TEACHERS_FAIL";
export const DELETE_TEACHER = "DELETE_TEACHER";
export const GET_CLASSES_TEACHER = "GET_CLASSES_TEACHER";
export const UPLOAD_HOMEWORK = "UPLOAD_HOMEWORK";
export const UPLOAD_HOMEWORK_FAIL = "UPLOAD_HOMEWORK_FAIL";
// GET students
export const GET_STUDENTS = "GET_STUDENTS";
export const GET_STUDENTS_FAIL = "GET_STUDENTS_FAIL";
export const DELETE_STUDENT = "DELETE_STUDENT";
export const UPDATE_STUDENT = "UPDATE_STUDENT";
export const UPDATE_STUDENT_FAIL = "UPDATE_STUDENT_FAIL";
export const GET_STUDENTSBYID = "GET_STUDENTSBYID";
// GET all auth students
export const STUDENT_LOADED = "STUDENT_LOADED";
export const AUTH_STUDENT_ERROR = "AUTH_STUDENT_ERROR";
// Log in Students
export const LOGIN_STUDENT_SUCCESS = "LOGIN_STUDENT_SUCCESS";
export const LOGIN_STUDENT_FAIL = "LOGIN_STUDENT_FAIL";
// complete work
export const COMPLETE_WORK = "COMPLETE_WORK";
// Logout student
export const LOGOUT_STUDENT = "LOGOUT_STUDENT";
// Get all class @ students level.
export const GET_CLASS_STUDENT = "GET_CLASS_STUDENT";
export const GET_CLASS_STUDENT_FAIL = "GET_CLASS_STUDENT_FAIL";
// Add homework
export const ADD_HOMEWORK = "ADD_HOMEWORK";
export const HOMEWORK_ERROR = "HOMEWORK_ERROR";

// get homework
export const GET_HOMEWORK = "GET_HOMEWORK";
export const GET_HOMEWORKBYID = "GET_HOMEWORKBYID";
export const UPDATE_HOMEWORK = "UPDATE_HOMEWORK";
// get homework by :ID
export const GET_HOMEWORK_ID = "GET_HOMEWORK_ID";

// get submited homework @@Teacher level
export const GET_SUBMITED_HOMEWORK = "GET_SUBMITED_HOMEWORK";
// get submited homework by ID @@ Teacher level
export const GET_SUBMITED_HOMEWORK_ID = "GET_SUBMITED_HOMEWORK_ID";
// delete submited work
export const DELETE_SUBMITED_HOMEWORK_ID = "DELETE_SUBMITED_HOMEWORK_ID";
// get homework @@ student level
export const GET_STUDENT_HOMEWORK = "GET_STUDENT_HOMEWORK";

export const SUBMIT_HOMEWORK = "SUBMIT_HOMEWORK";
export const GET_PENDING_HOMEWORK = "GET_PENDING_HOMEWORK";
// delete homework
export const DELETE_HOMEWORK = "DELETE_HOMEWORK";

// Remove homework form pending then add it to the complete homework table @@@Student level
export const REMOVE_HOMEWORK = "REMOVE_HOMEWORK";

// Get complete homework@@student
export const GET_COMPLETE_HOMEWORK = "GET_COMPLETE_HOMEWORK";

// parent reducers
// @@register parent
export const REGISTER_PARENT = "REGISTER_PARENT";
export const UPDATE_PARENT = "UPDATE_PARENT";
export const PARENT_FAIL = "PARENT_FAIL";
// @@get register parents using student ID
export const GET_PARENTS = "GET_PARENTS";
export const GET_PARENTS_FAIL = "GET_PARENTS_FAIL";
export const GET_PARENT_BYID = "GET_PARENTS_BYID";

// @@ Delete and load parent
export const DELETE_PARENT = "DELETE_PARENT";
export const DELETE_PARENT_FAIL = "DELETE_PARENT_FAIL";
export const PARENT_LOADED = "PARENT_LOADED";
// @@Login parent
export const AUTH_PARENT_ERROR = "AUTH_PARENT_ERROR";
export const LOGIN_PARENT_SUCCESS = "LOGIN_PARENT_SUCCESS";
export const LOGIN_PARENT_FAIL = "LOGIN_PARENT_FAIL";
export const LOGOUT_PARENT = "LOGOUT_PARENT";

// Add classes
export const ADD_CLASS = "ADD_CLASS";
export const UPDATE_CLASSROOM = " UPDATE_CLASSROOM";
export const GET_CLASSBYID = "GET_CLASSBYID";
export const GET_CLASSES = "GET_CLASSES";
export const CLASS_ERROR = "CLASS_ERROR";
export const DELETE_CLASS = "DELETE_CLASS";
export const UPDATE_CLASS = "UPDATE_CLASS";
export const UPDATE_CLASS_FAIL = "UPDATE_CLASS_FAIL";
export const GET_CLASSESBYID = "GET_CLASSESBYID";
// Add Subjects
export const ADD_SUBJECT = "ADD_SUBJECT";
export const GET_SUBJECTS = "GET_SUBJECTS";
export const SUBJECT_ERROR = "SUBJECT_ERROR";
export const DELETE_SUBJECT = "DELETE_SUBJECT";
export const UPDATE_SUBJECT = "UPDATE_SUBJECT";
export const UPDATE_SUBJECT_FAIL = "UPDATE_SUBJECT_FAIL";
export const GET_SUBJECTSBYID = "GET_SUBJECTSBYID";

// feedback action types @@ teacher level
export const SEND_FEEDBACK = "SEND_FEEDBACK";
export const FEEDBACK_ERROR = "FEEDBACK_ERROR";
export const GET_FEEDBACK_ID = "GET_FEEDBACK_ID";
// feedback action@@@student level from the teacher
export const GET_MSG = "GET_MGS";
export const MSG_ERROR = "MSG_ERROR";
export const GET_MSG_ID = "GET_MSG_ID";
// feedback actions@@ by the student@@@the student level
export const SEND_MSG = "SEND_MSG";
export const GET_MESSAGE_ID = "GET_MESSAGE_ID";

export const GET_MSG_ID_ERROR = "GET_MSG_ID_ERROR";

export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILES = "GET_PROFILES";
export const GET_REPOS = "GET_REPOS";
export const PROFILE_ERROR = "PROFILE_ERROR";

export const CLEAR_PROFILE = "CLEAR_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const ACCOUNT_DELETED = "ACCOUNT_DELETED";
