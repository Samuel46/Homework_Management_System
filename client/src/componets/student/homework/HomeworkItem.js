import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  getHomeworkBy_id,
  submitHomework,
  removePending,
} from "../../../actions/student/homework";
import { Fragment } from "react";
import Spinner from "../../layouts/Spinner";
import Moment from "react-moment";
// import Message from "./Message";
// import Progress from "./Progress";
import axios from "axios";
import { logoutStudent } from "../../../actions/student";
// testing new look
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Table,
  Badge,
  Card,
  Alert,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledTooltip,
  ListGroupItem,
  ListGroup,
} from "reactstrap";

import { DragSwitch } from "react-dragswitch";
import "react-dragswitch/dist/index.css";
import StudentNavigation from "../StudentNavigation";

function HomeworkItem({
  getHomeworkBy_id,
  submitHomework,
  removePending,
  studentHomework: { homework, loading },
  match,
  history,
  logoutStudent,
  student: { student },
}) {
  useEffect(() => {
    getHomeworkBy_id(match.params.id);
  }, [getHomeworkBy_id, match.params.id]);

  // const [value, setValue] = useState(EditorState.createEmpty());
  // file upload logics
  const [file, setFile] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [completeStudentWork, setCompleteWork] = useState(
    EditorState.createEmpty()
  );
  const [filename, setFilename] = useState("Attach Homework");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const formData = new FormData();
  formData.append("file", file);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const obj = {
    completeStudentWork,
    isComplete,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      //   extracting the id from url
      const id = match.params.id;
      const res = await axios.post(
        `/api/student/complete/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          },
        }
      );

      const { attachements, filename } = res.data;

      setUploadedFile({ attachements, filename });

      setMessage("You have Uploaded your work, it's time to submit");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("No File Uploaded");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return homework !== null && homework !== undefined ? (
    <Fragment>
      {homework && loading === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <StudentNavigation />
          {/* [ Header ] start */}
          <header className="pc-header ">
            <div className="header-wrapper">
              <div className="mr-auto pc-mob-drp">
                <ul className="list-unstyled"></ul>
              </div>
              <div className="ml-auto">
                <ul className="list-unstyled">
                  <li className="pc-h-item">
                    <Link
                      onClick={logoutStudent}
                      to="#!"
                      className="dropdown-item"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      {""}
                      <span>Logout</span>
                    </Link>
                  </li>
                  <li className="pc-h-item">
                    <Link
                      className="pc-head-link mr-0"
                      to="#!"
                      data-toggle="modal"
                      data-target="#notification-modal"
                    >
                      <i data-feather="bell" />
                      <span className="badge badge-danger pc-h-badge dots">
                        <span className="sr-only" />
                      </span>
                    </Link>
                  </li>
                  <li className="dropdown pc-h-item">
                    <Link
                      className="pc-head-link dropdown-toggle arrow-none mr-0"
                      data-toggle="dropdown"
                      to="#"
                      role="button"
                      aria-haspopup="false"
                      aria-expanded="false"
                    >
                      {/* <img src="../assets/images/user/avatar-3.jpg" alt="user-image" className="user-avtar" /> */}
                      <span>
                        <span className="user-name">
                          {student && student.name}
                        </span>
                        <span className="user-desc">Student</span>
                      </span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                      <div className=" dropdown-header">
                        <h6 className="text-overflow m-0">Welcome !</h6>
                      </div>
                      <Link to="#!" className="dropdown-item">
                        <i data-feather="user" />
                        <span>My Account</span>
                      </Link>
                      <Link
                        onClick={logoutStudent}
                        to="#!"
                        className="dropdown-item"
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
          {/* [ Header ] end */}
          {/* [ Main Content ] start */}

          <div className="pc-container">
            <div className="pcoded-content">
              {/* [ breadcrumb ] start */}
              <div className="page-header">
                <div className="page-block">
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      <div className="page-header-title">
                        <h5 className="m-b-10">Student</h5>
                      </div>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item">
                          {student && student.name}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container py-5">
                <div className="py-2">
                  <div className="card ">
                    <div className="card-header ">
                      <h4>Homework Details</h4>
                      <div class="cover-img-block img_img">
                    <img
                      src="https://image.freepik.com/free-vector/happy-kid-school_97632-828.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                    </div>
                    {/*  */}
                    <div className="card-header">
                      <h5 className="card-title">
                        {homework && homework.title}
                      </h5>
                    </div>
                    {/*  */}
                    {/* Dates */}

                    {/*  */}
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Issued Date</th>
                          <th>Due Date</th>
                          <th>Effort Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <Badge pill color="light-success" className="mr-1">
                              *
                            </Badge>
                            <Moment format="YYYY/MM/DD">
                              {homework && homework.set_date}
                            </Moment>
                          </td>

                          <td>
                            <Badge pill color="light-danger" className="mr-1">
                              *
                            </Badge>
                            <Moment format="YYYY/MM/DD">
                              {homework && homework.due_date}
                            </Moment>
                          </td>
                          <td>{homework && homework.effort_time}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="card-body bg-light-primary">
                      <label className="floating-label">
                        {" "}
                        <strong>Description</strong>{" "}
                      </label>
                      <p>{homework && homework.description}</p>
                      <button type="button" className="btn  btn-secondary">
                        Download Homework Attachments
                      </button>
                    </div>
                    <div className="card-footer">
                      {/* submit homework */}
                      <form
                        onSubmit={onSubmit}
                        action="upload/:id"
                        method="POST"
                        enctype="multipart/form-data"
                        id="attachWork"
                      >
                        {/* <Card>
                      <CardHeader>
                        <UncontrolledTooltip
                          placement="top"
                          target="positionTop"
                        >
                          You can now edit you Homework here without leaving the
                          app, Please make sure your homework is well organised
                          and formated in the right manner
                        </UncontrolledTooltip>
                       
                        
                        <CardTitle id="positionTop" tag="h4">
                          Homework Editor
                        </CardTitle>
                      </CardHeader>
                      <CardBody id="positionTop">
                        <Editor
                          editorState={completeStudentWork}
                          onEditorStateChange={(data) => setCompleteWork(data)}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </CardBody>
                    </Card> */}

                        <div className="row">
                          <div className="form-group col-md-6 ">
                            <label htmlFor="file" className="col-form-label">
                              <ListGroup>
                                <ListGroupItem color="primary" className="mb-2">
                                  {" "}
                                  {""}📜 {""}
                                  {filename}
                                </ListGroupItem>
                              </ListGroup>
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              onChange={onChange}
                              name="file"
                              id="file"
                            />

                            {/* <input
                          type="submit"
                          value="Upload Homework"
                          className="btn btn-primary mt-2"
                        /> */}
                          </div>

                          <div className="form-group col-md-6 mt-5 ">
                            <label
                              htmlFor="file"
                              className="col-form-label  mr-1"
                            >
                              {!isComplete
                                ? "Homework Pending! Toggle after Completion"
                                : "Homework Completed You Can Submit"}
                            </label>
                            <DragSwitch
                              checked={isComplete}
                              onChange={(e) => {
                                setIsComplete(e);
                              }}
                            />
                          </div>
                        </div>
                        <UncontrolledTooltip
                          placement="top"
                          target="attachWork"
                        >
                          Attach your complete Homework here make sure the
                          Document are well formatted
                        </UncontrolledTooltip>

                        {/* displaying the forms */}
                        {/* {uploadedFile ? (
                      <div className="row ">
                        <div className="col-md-6 m-auto">
                          <h3 className="text-center">
                            {uploadedFile.filename}
                          </h3>
                          <img
                            style={{ width: "100%" }}
                            src={uploadedFile.attachements}
                            alt=""
                          />
                        </div>
                      </div>
                    ) : null} */}
                      </form>
                      {/* {message ? <Message msg={message} /> : null}
                  <Progress percentage={uploadPercentage} /> */}
                    </div>

                    <div className="col-sm-6 py-3">
                      {!isComplete ? (
                        <Alert color="danger">
                          <h4 className="alert-heading">
                            Homework not Complete!
                          </h4>
                          <div className="alert-body">
                            Homework with title : {homework && homework.title}{" "}
                            is not yet complete!. Make sure you toggle the
                            complete switch in order for you to submit your
                            homework. Complete Other Homework:{" "}
                            <Link to="/student-dashboard">
                              Pending Homework List
                            </Link>
                          </div>
                        </Alert>
                      ) : (
                        <button
                          onClick={() =>
                            submitHomework(
                              homework._id,
                              formData,
                              history
                              // removePending(homework._id)
                            )
                          }
                          type="submit"
                          className="btn btn-success mr-2"
                        >
                          Submit Homework
                        </button>
                      )}

                      <Link
                        to="/student-dashboard"
                        className="btn btn-secondary"
                      >
                        Go back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </Fragment>
      )}
    </Fragment>
  ) : (
    <Spinner />
  );
}

HomeworkItem.propTypes = {
  getHomeworkBy_id: PropTypes.func.isRequired,
  studentHomework: PropTypes.object.isRequired,
  submitHomework: PropTypes.func.isRequired,
  removePending: PropTypes.func.isRequired,
  logoutStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  studentHomework: state.studentHomework,
  student: state.student,
});

export default connect(mapStateToProps, {
  getHomeworkBy_id,
  submitHomework,
  logoutStudent,
  removePending,
})(withRouter(HomeworkItem));
