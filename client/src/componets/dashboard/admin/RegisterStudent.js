import React, { useState } from "react";
import NodeAlert from "../../layouts/NodeAlert";
import { registerStudent } from "../../../actions/student";
import { toast, ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../../actions/auth";
import Navigation from "../Navigation";
import PasswordGen from "../../PasswordGen";
import DatePicker from "react-datepicker";
import { Select } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { COPY_SUCCESS } from "./teacherSection/message";
import { UncontrolledTooltip } from "reactstrap";
import { useEffect } from "react";
const { Option } = Select;

function RegisterStudent({ registerStudent, history, auth: { user }, logout }) {
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

  // var arr = ["a", "b", "c", "d", "e", "f"];

  // var indexToSplit = 3;
  // var first = arr.slice(0, indexToSplit);
  // var second = arr.slice(indexToSplit + 1);

  // console.log({ first, second });

  // username gen
  const a = firstname.split("");
  const b = sirname.split(" ");
  const rB = Math.floor(Math.random() * b.length);
  const name = a[0] + b[rB] + Math.floor(Math.random() * 20000);

  function generateName(e) {
    setUserName(name);
  }

  // ** Adds New Student
  const handleRegisterStudents = () => {
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

    registerStudent(obj, history);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegisterStudents();
  };

  // *************passwordgen option******************//
  const [genpassword, setGenPassword] = useState("");
  const handleGeneratePassword = (e) => {
    let characterList = "0123456789";
    setGenPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
    let genpassword = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < 4; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      genpassword = genpassword + characterList.charAt(characterIndex);
    }
    return genpassword;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = genpassword;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = (e) => {
    e.preventDefault();
    if (genpassword === "") {
      notify("Nothing To Copy", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
    }
  };

  useEffect(() => {
    setCode(genpassword);
  }, [handleGeneratePassword, handleCopyPassword]);

  return (
    <>
      <Navigation />

      <header className="pc-header ">
        <div className="header-wrapper">
          <div className="mr-auto pc-mob-drp">
            <ul className="list-unstyled"></ul>
          </div>
          <div className="ml-auto">
            <ul className="list-unstyled">
              <li className="pc-h-item ">
                <Link
                  onClick={() => logout()}
                  className="pc-head-link mr-0"
                  to="#!"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  {""}
                  <span>Logout</span>
                </Link>
              </li>

              <li className="dropdown pc-h-item">
                <Link
                  className="pc-head-link dropdown-toggle arrow-none mr-0"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <span>
                    <span className="user-name">
                      Welcome {user && user.name}
                    </span>
                    <span className="user-desc">Administrator</span>
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                  <div className=" dropdown-header">
                    <h6 className="text-overflow m-0">
                      Welcome {user && user.name}
                    </h6>
                  </div>
                  <Link href="#!" className="dropdown-item">
                    <i data-feather="settings" />
                    <span>Account</span>
                  </Link>
                  <Link
                    onClick={() => logout()}
                    className="pc-head-link mr-0"
                    to="#!"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    {""}
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* [ Main Content ] start */}
      <div className="pc-container">
        <div className="pcoded-content">
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Dashboard</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">{user && user.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* [ breadcrumb ] end */}
          {/* [ Main Content ] start */}

          <div className="py-5">
            <div className="container">
              <div className="col-md-12 py-4">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Register Students</h4>
                    <div class="cover-img-block img_img">
                      <img
                        src="https://image.freepik.com/free-vector/add-notes-concept-illustration_114360-3376.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="py-1">
                      <NodeAlert />
                    </div>

                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="row">
                        <div className="col-12">
                          <h5>Personal Information</h5>
                        </div>
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
                              Sirname/Lastname
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
                          <div class="form-group fill ">
                            <label for="">Username</label>
                            <div class="input-group">
                              <div class="input-group-prepend btn_opc">
                                <button
                                  class="btn btn-primary "
                                  type="button"
                                  onClick={generateName}
                                >
                                  Generate username
                                </button>
                              </div>
                              <input
                                onChange={(e) => setUserName(e.target.value)}
                                name="username"
                                value={username}
                                type="username"
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group fill label_display">
                            <label
                              className="floating-label pr-3"
                              htmlFor="Birth"
                            >
                              Birth Date
                            </label>

                            <DatePicker
                              selected={birth_date}
                              className=" form-control date__width"
                              wrapperClassName="datePicker"
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
                            <label
                              className="floating-label pr-3"
                              htmlFor="Birth"
                            >
                              Joining Date
                            </label>

                            <DatePicker
                              selected={joining_date}
                              className="date__width form-control"
                              onChange={(date) => setJoining_Date(date)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group fill ">
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
                        <UncontrolledTooltip
                          placement="top"
                          target="positionTop"
                        >
                          Generate unique <strong>CODE</strong> for the student
                        </UncontrolledTooltip>
                        <div className="col-sm-6">
                          <div class="form-group fill ">
                            <label for="">Student Code</label>
                            <div class="input-group">
                              <div class="input-group-prepend btn_opc">
                                <button
                                  class="btn btn-outline-primary "
                                  type="button"
                                  onClick={handleGeneratePassword}
                                >
                                  Generate code
                                </button>
                              </div>
                              <input
                                onChange={(e) => setCode(e.target.value)}
                                name="username"
                                id="positionTop"
                                value={code}
                                type="text"
                                className="form-control"
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
                              <option value={0} />
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                        </div>
                        <UncontrolledTooltip
                          placement="top"
                          target="positionTopp"
                        >
                          We recommend copying the<strong>CODE</strong> for
                          later use
                        </UncontrolledTooltip>

                        <div className="col-sm-6">
                          {/* <PasswordGen /> */}
                          <div className="form-group">
                            <div className="generator__password">
                              <h3 id="positionTopp">{genpassword}</h3>
                              <button
                                onClick={handleCopyPassword}
                                className="copy__btn"
                              >
                                <i className="far fa-clipboard"></i> Copy Code
                              </button>
                            </div>

                            <ToastContainer
                              position="top-center"
                              autoClose={5000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="btn btn-success mr-2"
                          >
                            Add Student
                          </button>
                          <Link
                            to="/manage-students"
                            className="btn btn-secondary"
                          >
                            Go back
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
}

RegisterStudent.propTypes = {
  registerStudent: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { registerStudent, logout })(
  withRouter(RegisterStudent)
);
