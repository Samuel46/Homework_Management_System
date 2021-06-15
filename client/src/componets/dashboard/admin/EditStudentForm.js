import React, { useEffect, useState } from "react";
import Spinner from "../../layouts/Spinner";
import { Link, withRouter } from "react-router-dom";
import NodeAlert from "../../layouts/NodeAlert";
import Moment from "react-moment";

function EditStudentForm({ updateStudent, loading, selectedStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    code: "",
    birth_date: Date,
    gender: "",
    joining_date: Date,
    joining_year_group: "",
    current_year_group: "",
  });

  // fill the form with data from the state
  useEffect(() => {
    setFormData({
      name: loading || !selectedStudent.name ? "" : selectedStudent.name,
      email: loading || !selectedStudent.email ? "" : selectedStudent.email,
      username:
        loading || !selectedStudent.username ? "" : selectedStudent.username,
      code: loading || !selectedStudent.code ? "" : selectedStudent.code,
      gender: loading || !selectedStudent.gender ? "" : selectedStudent.gender,
      joining_date:
        loading || !selectedStudent.joining_date
          ? ""
          : Date(selectedStudent.joining_date && selectedStudent.joining_date),
      joining_year_group:
        loading || !selectedStudent.joining_year_group
          ? ""
          : selectedStudent.joining_year_group,
      current_year_group:
        loading || !selectedStudent.current_year_group
          ? ""
          : selectedStudent.current_year_group,
      birth_date:
        loading || !selectedStudent.birth_date
          ? ""
          : selectedStudent.birth_date,
    });
  }, [selectedStudent.name]);

  const {
    name,
    email,
    username,
    code,
    birth_date,
    gender,
    joining_date,
    joining_year_group,
    current_year_group,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateStudent(formData);
  };
  return loading !== true && selectedStudent !== null ? (
    <>
      <NodeAlert />
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-12">
            <h5>Personal Information</h5>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Name
              </label>
              <input
                onChange={(e) => onChange(e)}
                value={name}
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
                onChange={(e) => onChange(e)}
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
                onChange={(e) => onChange(e)}
                name="username"
                value={username}
                type="username"
                className="form-control"
                placeholder
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Birth">
                Birth Date
              </label>
              <input
                onChange={(e) => onChange(e)}
                name="birth_date"
                value={birth_date}
                type="date"
                className="form-control"
                id="Birth"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Birth">
                Joining Date
              </label>
              <input
                onChange={(e) => onChange(e)}
                value={joining_date}
                name="joining_date"
                type="date"
                className="form-control"
                id="Birth"
                placeholder={123}
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Birth">
                Joining Year Group
              </label>
              <input
                onChange={(e) => onChange(e)}
                value={joining_year_group}
                name="joining_year_group"
                type="text"
                className="form-control"
                id="Birth"
              />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Birth">
                Current Year Group
              </label>
              <input
                onChange={(e) => onChange(e)}
                value={current_year_group}
                name="current_year_group"
                type="text"
                className="form-control"
                id="Birth"
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div className="form-group fill">
              <label className="floating-label">Student Code</label>
              <input
                onChange={(e) => onChange(e)}
                value={code}
                name="code"
                type="password"
                className="form-control"
                id="Birth"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Sex">
                Gender
              </label>
              <select
                onChange={(e) => onChange(e)}
                value={gender}
                name="gender"
                className="form-control"
                id="Sex"
              >
                <option value={0} />
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group"></div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <button className="btn btn-secondary">Reset Password</button>
            </div>
          </div>

          <div className="col-sm-12">
            <button type="submit" className="btn btn-success mr-2">
              Add Student
            </button>
            <Link to="/dashboard" className="btn btn-secondary">
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

export default EditStudentForm;
