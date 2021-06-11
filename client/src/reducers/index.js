import { combineReducers } from "redux";
import alert from "./alert";
import teacher from "./teacher";
import homework from "./teacher/homework";
import studentHomework from "./student/studentHomework";
import parent from "./student/parents/parent";
import classroomTeacher from "./teacher/classroomTeacher";
import teacherMsg from "./feedback/teacherMsg";
import studentMsg from "./feedback/studentMsg";
import student from "./student";
import classRoom from "./classRoom";
import subject from "./subject";
import auth from "./auth";
import feedback from "./parent/feedback";
import parentwork from "./parent/parentwork";
import teacherReducer from "./teacher/teacherReducer";

export default combineReducers({
  alert,
  auth,
  teacher,
  parentwork,
  feedback,
  teacherMsg,
  studentMsg,
  studentHomework,
  classroomTeacher,
  student,
  parent,
  classRoom,
  subject,
  homework,
  teacherReducer,
});
