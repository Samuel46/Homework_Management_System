import React, { useEffect, useState } from "react";
import Spinner from "../../layouts/Spinner";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../../layouts/NodeAlert";
import PasswordGen from "../../PasswordGen";
import DatePicker from "react-datepicker";
import { Select } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
const { Option } = Select;

function EditStudentForm({ updateStudent, loading, selectedStudent, history }) {
  const [firstname, setFirstName] = useState("");
  const [sirname, setSirName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [username, setUserName] = useState("");
  const [birth_date, setBirth_Date] = useState(new Date());
  const [gender, setGender] = useState("");
  const [joining_date, setJoining_Date] = useState(new Date());
  const [joining_year_group, setJoining_Year_Group] = useState([]);
  const [current_year_group, setCurrent_Year_Group] = useState([]);

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
                disabled
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
              <Select
                mode="multiple"
                autoFocus
                allowClear
                style={{ width: "100%" }}
                size="large"
                placeholder="Please Allocate the Joining Year Group"
                onChange={setJoining_Year_Group}
                value={joining_year_group}
              >
                <Option value="Year 1">Year 1</Option>
                <Option value="Year 2">Year 2</Option>
                <Option value="Year 3">Year 3</Option>
                <Option value="Year 4">Year 4</Option>
                <Option value="Year 5">Year 5</Option>
                <Option value="Year 6">Year 6</Option>
                <Option value="Year 7">Year 7</Option>
                <Option value="Year 8">Year 8</Option>
                <Option value="Year 9">Year 9</Option>
                <Option value="Year 10">Year 10</Option>
                <Option value="Year 11">Year 11</Option>
                <Option value="Year 12">Year 12</Option>
                <Option value="Year 13">Year 13</Option>
                <Option value="Year 14">Year 14</Option>
                <Option value="Year 15">Year 15</Option>
                <Option value="Year 16">Year 16</Option>
                <Option value="Year 17">Year 17</Option>
                <Option value="Year 18">Year 18</Option>
                <Option value="Year 19">Year 19</Option>
                <Option value="Year 20">Year 20</Option>
              </Select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill label_display">
              <label className="floating-label" htmlFor="Birth">
                Current Year Group
              </label>

              <Select
                mode="multiple"
                autoFocus
                allowClear
                style={{ width: "100%" }}
                size="large"
                placeholder="Please Allocate the Current Year Group"
                onChange={setCurrent_Year_Group}
                value={current_year_group}
              >
                <Option value="Year 1">Year 1</Option>
                <Option value="Year 2">Year 2</Option>
                <Option value="Year 3">Year 3</Option>
                <Option value="Year 4">Year 4</Option>
                <Option value="Year 5">Year 5</Option>
                <Option value="Year 6">Year 6</Option>
                <Option value="Year 7">Year 7</Option>
                <Option value="Year 8">Year 8</Option>
                <Option value="Year 9">Year 9</Option>
                <Option value="Year 10">Year 10</Option>
                <Option value="Year 11">Year 11</Option>
                <Option value="Year 12">Year 12</Option>
                <Option value="Year 13">Year 13</Option>
                <Option value="Year 14">Year 14</Option>
                <Option value="Year 15">Year 15</Option>
                <Option value="Year 16">Year 16</Option>
                <Option value="Year 17">Year 17</Option>
                <Option value="Year 18">Year 18</Option>
                <Option value="Year 19">Year 19</Option>
                <Option value="Year 20">Year 20</Option>
              </Select>
            </div>
          </div>
          <div className="col-sm-6">
            {/*  */}
            <div class="form-group fill ">
              <label for="">Student Code</label>
              <div class="input-group">
                <div class="input-group-prepend btn_opc">
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
