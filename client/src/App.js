import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import './App.css';
import Login from "./componets/auth/Login";
import Register from "./componets/auth/Register";
import { loadUser } from "./actions/auth";
import { loadTeacher } from "./actions/teacher";
// Redux
import { Provider } from "react-redux";
import store from "./store";

import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import setTeacherToken from "./utils/setTeacherToken";
import Dashboard from "./componets/dashboard/Dashboard";

// Teacher's dash
import TeacherDash from "./componets/teacher/TeacherDash";
import CreateHomework from "./componets/teacher/CreateHomework";
import AddClass from "./componets/teacher/AddClass";
import PrivateRoute from "./componets/routing/PrivateRoute";
import AuthTeacherRoute from "./componets/routing/AuthTeacherRoute";
import CreateClass from "./componets/dashboard/admin/CreateClass";
import CreateSubject from "./componets/dashboard/admin/CreateSubject";
import EditClass from "./componets/dashboard/admin/EditClass";
import EditSubject from "./componets/dashboard/admin/EditSubject";
import RegisterTeacher from "./componets/dashboard/admin/RegisterTeacher";
import RegisterStudent from "./componets/dashboard/admin/RegisterStudent";
import HomeworkBody from "./componets/teacher/homework/HomeworkBody";
import Feedback from "./componets/teacher/homework/Feedback";
import AuthStudentRoute from "./componets/routing/AuthStudentRoute";
import StudentDash from "./componets/student/StudentDash";
import { loadStudent } from "./actions/student";
import setStudentToken from "./utils/setStudentToken";
import HomeworkItem from "./componets/student/homework/HomeworkItem";
import SubmitedItem from "./componets/teacher/homework/SubmitedItem";
import StudentMsg from "./componets/student/chats/StudentMsg";
import StudentAccount from "./componets/student/account/StudentAccount";
import setParentToken from "./utils/setParentToken";
import { loadParent } from "./actions/student/parents/parent";
import AuthParentRoute from "./componets/routing/AuthParentRoute";
import ParentDash from "./componets/parent/ParentDash";
import HomeworkObject from "./componets/parent/HomeworkObject";
import CompleteObject from "./componets/parent/CompleteObject";
import ParentMsg from "./componets/parent/feedback/ParentMsg";
import EditTeacher from "./componets/dashboard/admin/EditTeacher";
import EditStudent from "./componets/dashboard/admin/EditStudent";
import EditClassRoom from "./componets/teacher/editClassRoom/EditClassRoom";
import EditHomework from "./componets/teacher/editHomeWork/EditHomework";
import ParentForm from "./componets/student/Parents/ParentForm";
import RegisterParent from "./componets/student/account/RegisterParent";
import Parents from "./componets/student/Parents/Parents";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

if (localStorage.token) {
  setTeacherToken(localStorage.token);
}

if (localStorage.token) {
  setStudentToken(localStorage.token);
}

if (localStorage.token) {
  setParentToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    store.dispatch(loadTeacher());
  }, []);

  useEffect(() => {
    store.dispatch(loadStudent());
  }, []);

  useEffect(() => {
    store.dispatch(loadParent());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Route exact path="/" component={Login} />

          {/* <Alert /> */}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* Admin routes */}
            <PrivateRoute
              exact
              path="/create-teacher"
              component={RegisterTeacher}
            />
            <PrivateRoute
              exact
              path="/create-student"
              component={RegisterStudent}
            />
            <PrivateRoute
              exact
              path="/edit-teacher/:id"
              component={EditTeacher}
            />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-class" component={CreateClass} />
            <PrivateRoute
              exact
              path="/create-subject"
              component={CreateSubject}
            />
            <PrivateRoute exact path="/edit-class/:id" component={EditClass} />
            <PrivateRoute
              exact
              path="/edit-subject/:id"
              component={EditSubject}
            />
            <PrivateRoute
              exact
              path="/edit-student/:id"
              component={EditStudent}
            />

            {/* teachers routes */}
            <AuthTeacherRoute
              exact
              path="/teacher-dashboard"
              component={TeacherDash}
            />
            <AuthTeacherRoute
              exact
              path="/create-homework"
              component={CreateHomework}
            />
            <AuthTeacherRoute
              exact
              path="/manage-classes"
              component={AddClass}
            />
            <AuthTeacherRoute
              exact
              path="/edit-classRoom/:id"
              component={EditClassRoom}
            />

            <AuthTeacherRoute
              exact
              path="/edit-homework/:id"
              component={EditHomework}
            />
            <AuthTeacherRoute
              exact
              path="/manage-homework"
              component={HomeworkBody}
            />
            <AuthTeacherRoute exact path="/feedback/:id" component={Feedback} />

            {/* Student Routes */}
            <AuthStudentRoute
              exact
              path="/student-dashboard"
              component={StudentDash}
            />

            <AuthStudentRoute
              exact
              path="/student-account"
              component={StudentAccount}
            />
             <AuthStudentRoute
              exact
              path="/student-parent"
              component={Parents}
            />
            <AuthStudentRoute exact path="/add-parents" component={ParentForm} />
            <AuthStudentRoute exact path="/register-parents" component={RegisterParent} />
            <AuthStudentRoute exact path="/work/:id" component={HomeworkItem} />
            {/* Feedback Routes@@teacher & student */}
            <AuthTeacherRoute
              exact
              path="/sumited-work/:id"
              component={SubmitedItem}
            />
            <AuthStudentRoute
              exact
              path="/message/:id"
              component={StudentMsg}
            />
            {/* Parent route */}
            <AuthParentRoute
              exact
              path="/parent-dashboard"
              component={ParentDash}
            />
            <AuthParentRoute
              exact
              path="/parent-work/:id"
              component={HomeworkObject}
            />
            <AuthParentRoute
              exact
              path="/complete-work/:id"
              component={CompleteObject}
            />
            <AuthParentRoute
              exact
              path="/parent-message/:id"
              component={ParentMsg}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
