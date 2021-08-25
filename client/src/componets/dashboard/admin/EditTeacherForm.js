import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select } from "antd";
import Spinner from "../../layouts/Spinner";
import NodeAlert from "../../layouts/NodeAlert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const { Option } = Select;

function EditTeacherForm({
  selectedTeacher,
  loading,
  history,
  updateTeacher,
  classRoom: { classes },
}) {
  const [firstname, setFirstName] = useState("");
  const [sirname, setSirName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [joining_date, setJoining_Date] = useState(new Date());

  // fill the from with data from the state
  useEffect(() => {
    setFirstName(selectedTeacher.firstname || firstname);
    setSirName(selectedTeacher.sirname || sirname);
    setTitle(selectedTeacher.title || title);
    setEmail(selectedTeacher.email || email);
    setAllocate_Classes(selectedTeacher.allocate_classes || allocate_classes);
    setPassword(selectedTeacher.password || password);
    setJoining_Date(new Date(selectedTeacher.joining_date));
  }, [
    selectedTeacher.firstname,
    selectedTeacher.sirname,
    selectedTeacher.allocate_classes,
    selectedTeacher.joining_date,
    selectedTeacher.email,
    selectedTeacher.password,
  ]);

  // handle onChange event of the dropdown
  const classOptions =
    classes &&
    classes.map((rooms) => (
      <Option value={rooms.name} key={rooms._id}>
        {rooms.name}
      </Option>
    ));

  // ** Adds New Lesson Event
  const handleUpdateClass = () => {
    const obj = {
      firstname,
      sirname,
      title,
      email,
      password,
      joining_date,
      allocate_classes,
    };

    updateTeacher(obj, history);
  };

  const onReset = () => {
    setPassword("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateClass();
  };

  return classes !== null ? (
    <Fragment>
      <div>
        <NodeAlert />
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          {/* salutation */}
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                What's your title?
              </label>
              <Select
                // mode="multiple"
                autoFocus
                allowClear
                style={{ width: "100%" }}
                placeholder="Please Allocate Classes"
                onChange={setTitle}
                value={title}
              >
                <Option value="Mr.">Mr.</Option>
                <Option value="Mrs.">Mrs.</Option>
                <Option value="Miss.">Miss.</Option>
                <Option value="Ms.">Ms.</Option>
                <Option value="Dr.">Dr.</Option>
                <Option value="Prof.">Prof.</Option>
              </Select>
            </div>
          </div>
          <div className="col-sm-6"></div>
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Firstname
              </label>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                name="name"
                value={firstname}
                type="text"
                className="form-control"
              />
            </div>
          </div>

          {/* sirname */}
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Sirname
              </label>
              <input
                onChange={(e) => setSirName(e.target.value)}
                value={sirname}
                type="text"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Email">
                Email Address
              </label>
              <input
                disabled
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

          {classes !== null ? (
            <div className="col-sm-6 ">
              <div className="form-group">
                <label className="floating-label" htmlFor="Email">
                  Allocate Class
                </label>
                <Select
                  mode="multiple"
                  autoFocus
                  allowClear
                  defaultValue={[""]}
                  style={{ width: "100%" }}
                  placeholder="Please Allocate Classes"
                  onChange={setAllocate_Classes}
                  value={allocate_classes}
                >
                  {classOptions}
                </Select>
              </div>
            </div>
          ) : (
            <h2>no availabel</h2>
          )}

          <div className="col-sm-6">
            <div className="form-group fill label_display">
              <label className="floating-label" htmlFor="Occupation">
                Joining Date
              </label>

              <DatePicker
                selected={joining_date}
                className="form-control date__width"
                onChange={(date) => setJoining_Date(date)}
              />
            </div>
          </div>
          <div className="col-sm-6 code_display">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Email">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="col-sm-6 mt-4">
            <div className="form-group fill">
              <button
                type="reset"
                onClick={onReset}
                className="btn btn-primary"
              >
                Reset Password
              </button>
            </div>
          </div>
          <div className="col-sm-12">
            <button type="submit" className="btn btn-success mr-2">
              Update Teacher
            </button>
            <Link to="/manage-teachers" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </Fragment>
  ) : (
    <Spinner />
  );
}
EditTeacherForm.protoType = {
  classRoom: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  classRoom: state.classRoom,
});

export default connect(mapStateToProps, {})(withRouter(EditTeacherForm));
