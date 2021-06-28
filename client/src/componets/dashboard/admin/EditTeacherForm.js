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
  updateTeacher,
  classRoom: { classes },
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [create_classes, setCreate_Classes] = useState(false);
  const [joining_date, setJoining_Date] = useState(new Date());

  // fill the from with data from the state
  useEffect(() => {
    setName(selectedTeacher.name || name);
    setEmail(selectedTeacher.email || email);
    setPassword(selectedTeacher.password || password);
    setAllocate_Classes(selectedTeacher.allocate_classes || allocate_classes);
    setCreate_Classes(selectedTeacher.create_classes || create_classes);
    setJoining_Date(new Date(selectedTeacher.joining_date));
  }, [selectedTeacher.name, selectedTeacher.joining_date, selectedTeacher.allocate_classes]);

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
      name,
      email,
      password,
      create_classes,
      joining_date,
      allocate_classes,
    };

    updateTeacher(obj);
    // e.preventDefault();
    // refetchEvents();
    // handleAddEventSidebar();
    // toast.success(
    //   <ToastComponent title="Event Added" color="success" icon={<Check />} />,
    //   {
    //     autoClose: 2000,
    //     hideProgressBar: true,
    //     closeButton: false,
    //   }
    // );
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
          <div className="col-sm-6">
            <div className="form-group">
              <label className="floating-label" htmlFor="Name">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
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
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                disabled
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
            // <div className="col-sm-6">
            //   <div className="form-group">
            //     <label className="floating-label" htmlFor="Name">
            //       Allocate Class
            //     </label>
            //     <input
            //       name="allocate_classes"
            //       value={allocate_classes}
            //       type="text"
            //       className="form-control"
            //       id="Name"
            //       placeholder
            //     />
            //   </div>
            // </div>
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
                defaultValue={"**********"}
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
            <Link to="/dashboard" className="btn btn-secondary">
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

export default connect(mapStateToProps, {})(EditTeacherForm);
