import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// import './App.css';
import Login from './componets/auth/Login';
import Register from './componets/auth/Register';
import { loadUser } from './actions/auth'
import { loadTeacher } from './actions/teacher'
// Redux
import { Provider } from 'react-redux';
import store from './store'

import { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import setTeacherToken from './utils/setTeacherToken';
import Dashboard from './componets/dashboard/Dashboard';

// Teacher's dash
import TeacherDash from './componets/teacher/TeacherDash';
import CreateHomework from './componets/teacher/CreateHomework';
import AddClass from './componets/teacher/AddClass';
import PrivateRoute from './componets/routing/PrivateRoute';
import AuthTeacherRoute from './componets/routing/AuthTeacherRoute';


import Profiles from './componets/profiles/Profiles'
import Profile from './componets/profile/Profile'

import CreateClass from './componets/dashboard/admin/CreateClass';
import CreateSubject from './componets/dashboard/admin/CreateSubject';
import EditClass from './componets/dashboard/admin/EditClass';
import EditSubject from './componets/dashboard/admin/EditSubject';
import RegisterTeacher from './componets/dashboard/admin/RegisterTeacher';
import RegisterStudent from './componets/dashboard/admin/RegisterStudent';
import HomeworkBody from './componets/teacher/homework/HomeworkBody';
import Feedback from './componets/teacher/homework/Feedback';
import AuthStudentRoute from './componets/routing/AuthStudentRoute';
import StudentDash from './componets/student/StudentDash';
import { loadStudent } from './actions/student';
import setStudentToken from './utils/setStudentToken';
import HomeworkItem from './componets/student/homework/HomeworkItem';
import SubmitedItem from './componets/teacher/homework/SubmitedItem';
import StudentMsg from './componets/student/chats/StudentMsg';








if (localStorage.token) {
  setAuthToken(localStorage.token)
}

if (localStorage.token) {
  setTeacherToken(localStorage.token)
}

if (localStorage.token) {
  setStudentToken(localStorage.token)
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  useEffect(() => {
    store.dispatch(loadTeacher())
  }, [])

  useEffect(() => {
    store.dispatch(loadStudent())
  }, [])


  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Route exact path="/" component={Login} />

          {/* <Alert /> */}
          <Switch>
            <Route exact path="/register" component={Register} />
            {/* register teachers */}
            <Route exact path="/create-teacher" component={RegisterTeacher} />
            <Route exact path="/create-student" component={RegisterStudent} />
            <Route exact path="/login" component={Login} />


            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />


            {/* Admin routes */}

            <PrivateRoute exact path="/dashboard" component={Dashboard} />

            <PrivateRoute exact path="/create-class" component={CreateClass} />
            <PrivateRoute exact path="/create-subject" component={CreateSubject} />
            <PrivateRoute exact path="/edit-class" component={EditClass} />
            <PrivateRoute exact path="/edit-subject" component={EditSubject} />



            {/* teachers routes */}
            <AuthTeacherRoute exact path="/teacher-dashboard" component={TeacherDash} />
            <AuthTeacherRoute exact path="/create-homework" component={CreateHomework} />
            <AuthTeacherRoute exact path="/manage-classes" component={AddClass} />
            <AuthTeacherRoute exact path="/manage-homework" component={HomeworkBody} />
            <AuthTeacherRoute exact path="/feedback/:id" component={Feedback} />

            {/* Student Routes */}
            <AuthStudentRoute exact path="/student-dashboard" component={StudentDash} />
            <AuthStudentRoute exact path="/work/:id" component={HomeworkItem} />
            {/* Feedback Routes@@teacher & student */}
            <AuthTeacherRoute exact path="/sumited-work/:id" component={SubmitedItem} />



            <AuthStudentRoute exact path="/message/:id" component={StudentMsg} />

          </Switch>





        </Fragment>

      </Router>

    </Provider>

  )
}



export default App;
