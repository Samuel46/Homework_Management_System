import React, { useEffect, useState } from "react";
import Spinner from "../../layouts/Spinner";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../../layouts/NodeAlert";
import PasswordGen from "../../PasswordGen";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";

function EditStudentForm({ updateStudent, loading, selectedStudent, history }) {
  const [firstname, setFirstName] = useState("");
  const [sirname, setSirName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [username, setUserName] = useState("");
  const [birth_date, setBirth_Date] = useState(new Date());
  const [gender, setGender] = useState("");
  const [joining_date, setJoining_Date] = useState(new Date());
  const [joining_year_group, setJoining_Year_Group] = useState("");
  const [current_year_group, setCurrent_Year_Group] = useState("");

  // setStartPicker(new Date(selectedEvent.start && selectedEvent.start));
  // fill the from with data from the state
  useEffect(() => {
    setFirstName(selectedStudent.firstname || firstname);
    setSirName(selectedStudent.sirname || sirname);
    setEmail(selectedStudent.email || email);
    setCode(selectedStudent.code || code);
    setUserName(selectedStudent.username || username);
    setBirth_Date(new Date(selectedStudent.birth_date));
    setGender(selectedStudent.gender || gender);
    setJoining_Date(new Date(selectedStudent.joining_date));
    setJoining_Year_Group(
      selectedStudent.joining_year_group || joining_year_group
    );
    setCurrent_Year_Group(
      selectedStudent.current_year_group || current_year_group
    );
  }, [
    selectedStudent.sirname,
    selectedStudent.firstname,
    selectedStudent.joining_date,
    selectedStudent.birth_date,
    selectedStudent.joining_year_group,
    selectedStudent.current_year_group,
    selectedStudent.email,
    selectedStudent.code,
    selectedStudent.username,
    selectedStudent.gender,
  ]);

  // ** Edit exising Student
  const handleUpdateStudents = () => {
    const obj = {
      firstname,
      sirname,
      email,
      username,
      code,
      birth_date,
      gender,
      joining_date,
      joining_year_group,
      current_year_group,
    };

    updateStudent(obj, history);
  };

  const onReset = () => {
    setCode("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateStudents();
  };

  return loading !== true && selectedStudent !== null ? (
    <>
      <NodeAlert />
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Firstname
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstname}
                name="name"
                type="text"
                className="form-control"
                id="Name"
                placeholder
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Sirname
              </label>
              <input
                onChange={(e) => setSirName(e.target.value)}
                value={sirname}
                name="name"
                type="text"
                className="form-control"
                id="Name"
                placeholder
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Email">
                Email <small>Optional</small>{" "}
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
                type="email"
                className="form-control"
                id="Email"
                placeholder
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Email">
                Username
              </label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                name="username"
                disabled
                value={username}
                type="username"
                className="form-control"
                placeholder
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill label_display">
              <label className="floating-label pr-3" htmlFor="Birth">
                Birth Date
              </label>

              <DatePicker
                selected={birth_date}
                className="form-control date__width"
                showYearDropdown
                dateFormatCalendar="MMMM"
                yearDropdownItemNumber={100}
                scrollableYearDropdown
                onChange={(date) => setBirth_Date(date)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill label_display">
              <label className="floating-label pr-3" htmlFor="Birth">
                Joining Date
              </label>

              <DatePicker
                selected={joining_date}
                className="form-control date__width"
                onChange={(date) => setJoining_Date(date)}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill label_display">
              <label className="floating-label" htmlFor="Birth">
                Joining Year Group
              </label>
              <input
                onChange={(e) => setJoining_Year_Group(e.target.value)}
                value={joining_year_group}
                name="joining_year_group"
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill label_display">
              <label className="floating-label" htmlFor="Birth">
                Current Year Group
              </label>

              <input
                onChange={(e) => setCurrent_Year_Group(e.target.value)}
                value={current_year_group}
                name="current_year_group"
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-sm-6">
            {/*  */}
            <div class="form-group fill ">
              <label for="">Student Code</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    onClick={onReset}
                  >
                    Reset Code 🔐
                  </button>
                </div>
                <input
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  name="code"
                  type="password"
                  className="form-control"
                  id="Birth"
                />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Sex">
                Gender
              </label>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                name="gender"
                className="form-control"
                id="Sex"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="col-sm-12">
            <button type="submit" className="btn btn-success mr-2">
              Update Student😃
            </button>
            <Link to="/manage-students" className="btn btn-secondary">
              Go back
            </Link>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Spinner />
  );
}

export default withRouter(EditStudentForm);
