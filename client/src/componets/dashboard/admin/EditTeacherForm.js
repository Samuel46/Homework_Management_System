import React, { Fragment, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Select } from "antd";
import Spinner from "../../layouts/Spinner";
import NodeAlert from "../../layouts/NodeAlert";
const { Option } = Select;

function EditTeacherForm({
  selectedTeacher,
  loading,
  updateTeacher,
  classRoom: { classes },
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [allocate_classes, setAllocate_Classes] = useState([]);
  const [create_classes, setCreate_Classes] = useState(false);
  const [joining_date, setJoining_Date] = useState("");

  // fill the from with data from the state
  useEffect(() => {
    setName(selectedTeacher.name || name);
    setEmail(selectedTeacher.email || email);
    setAllocate_Classes(selectedTeacher.allocate_classes || allocate_classes);
    setCreate_Classes(selectedTeacher.create_classes || create_classes);
    setJoining_Date(selectedTeacher.joining_date || joining_date);
  }, [selectedTeacher.name]);

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
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Occupation">
                Joining Date
              </label>
              <input
                onChange={(e) => setJoining_Date(e.target.value)}
                name="joining_date"
                value={joining_date}
                type="date"
                className="form-control"
              />
            </div>
          </div>
        
          {/* <div className="col-sm-6 mt-4">
                                    <div className="form-group fill">
                                        <button className="btn btn-secondary">Reset Password</button>
                                    </div>
                                </div> */}
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
