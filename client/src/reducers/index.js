import { combineReducers } from "redux"
import alert from './alert'
import teacher from './teacher'
import homework from './teacher/homework'
import studentHomework from './student/studentHomework'
import classroomTeacher from './teacher/classroomTeacher'
import teacherMsg from './feedback/teacherMsg'
import studentMsg from './feedback/studentMsg'
import student from './student'
import classRoom from './classRoom'
import subject from './subject'
import auth from './auth'
import profile from './profile'
import post from './post'


export default combineReducers({
    alert,
    auth,
    teacher,
    teacherMsg,
    studentMsg,
    studentHomework,
    classroomTeacher,
    student,
    classRoom,
    subject,
    homework,
    profile,
    post,



})