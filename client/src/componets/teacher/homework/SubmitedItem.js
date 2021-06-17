import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getDoneWorkById } from "../../../actions/teacher/homework";
import { Fragment } from "react";
import Spinner from "../../layouts/Spinner";
import Moment from "react-moment";
import TeacherTop from "../TeacherTop";
import NodeAlert from "../../layouts/NodeAlert";

import { Table, Badge } from "reactstrap";

function SubmitedItem({
  getDoneWorkById,
  homework: { complete, loading },
  match,
  teacher: { teacher },
}) {
  useEffect(() => {
    getDoneWorkById(match.params.id);
  }, [getDoneWorkById, match.params.id]);

  return (
    <>
      <TeacherTop />
      <div className="pc-container">
        <div className="pcoded-content">
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      Teacher|| {teacher && teacher.name}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* / */}
          <div className="row">
            {/* Teacher class card*/}
            <div className="col-xl-4 col-md-4">
              <div className="card shadow">
                <div className="card-body bg-success">
                  <div className="row align-items-center m-l-0">
                    <div className="col-auto">
                      <i className="fas fa-laptop f-36 text-success" />
                    </div>
                    <div className="col-auto">
                      <h6 className="text-success m-b-10">Classes</h6>
                      {/* <h2 className="m-b-0 text-success ">2</h2> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-12  py-3 mb-3    ">
                  <Link to="/manage-classes" className="btn btn-success">
                    Manage Classes
                  </Link>
                </div>
              </div>
            </div>
            {/* create homework */}
            <div className="col-xl-4 col-md-4">
              <div className="card shadow">
                <div className="card-body bg-info">
                  <div className="row align-items-center m-l-0">
                    <div className="col-auto">
                      <i class="far fa-address-card f-36 text-info"></i>
                    </div>
                    <div className="col-auto">
                      <h6 className="text-info m-b-10">Create Homework</h6>
                      {/* <h2 className="m-b-0 text-info ">45</h2> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-12  py-3 mb-3 ">
                  <Link to="/create-homework" className="btn btn-info">
                    Create Homework
                  </Link>
                </div>
              </div>
            </div>
            {/* homework submittion */}
            <div className="col-xl-4 col-md-4">
              <div className="card shadow">
                <div className="card-body bg-danger">
                  <div className="row align-items-center m-l-0">
                    <div className="col-auto">
                      <i className="fas fa-book f-36 text-danger" />
                    </div>
                    <div className="col-auto">
                      <h6 className="text-danger m-b-10">Submissions</h6>
                      {/* <h2 className="m-b-0 text-danger ">45</h2> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 center py-3 mb-3 ">
                  <Link to="/manage-homework" className="btn btn-danger">
                    Manage Homework
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* end of row */}

          {/* HomeworkList */}
          <div className="py-4">
            <NodeAlert />

            <div className="container">
              {complete && loading === null ? (
                <Spinner />
              ) : (
                <Fragment>
                  <div className="py-2">
                    <div className="card">
                      <div className="card-header ">
                        <h6 className="text-success">
                          <span className="badge badge-pill badge-success">
                            Complete Homework
                          </span>{" "}
                        </h6>
                        <div class="cover-img-block img_img">
                          <img
                            src="https://image.freepik.com/free-vector/add-notes-concept-illustration_114360-3376.jpg"
                            alt=""
                            class="img-fluid"
                          />
                        </div>
                      </div>
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
                              <Badge
                                pill
                                color="light-success"
                                className="mr-1"
                              >
                                *
                              </Badge>
                              <Moment format="YYYY/MM/DD">
                                {complete && complete.set_date}
                              </Moment>
                            </td>

                            <td>
                              <Badge pill color="light-danger" className="mr-1">
                                *
                              </Badge>
                              <Moment format="YYYY/MM/DD">
                                {complete && complete.due_date}
                              </Moment>
                            </td>
                            <td>{complete && complete.effort_time}</td>
                          </tr>
                        </tbody>
                      </Table>
                      <div className="card-header bg-light-primary">
                        <label className="floating-label">
                          {" "}
                          <strong>Title</strong>{" "}
                        </label>
                        <h5 className="card-title">
                          {complete && complete.title}
                        </h5>
                      </div>
                      {/*  */}
                      {/* Dates */}

                      <div className="card-body ">
                        <label className="floating-label">
                          {" "}
                          <strong>Description</strong>{" "}
                        </label>
                        <p>{complete && complete.description}</p>
                      </div>
                      <div className="card-footer">
                        {/* <Link to="/files/myfile.pdf" target="_blank" download>Download</Link> */}
                        {/*@@TODO Check wheheter the attachment from the state match with */}
                        <Link
                          to={`uploads/${complete && complete.attachements}`}
                          className="btn  btn-info"
                          target="_blank"
                          download
                        >
                          Download attachements
                        </Link>
                      </div>

                      <div className="col-sm-6 py-3">
                        <Link
                          to="/manage-homework"
                          className="btn btn-secondary"
                        >
                          Go back
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
}

SubmitedItem.propTypes = {
  getDoneWorkById: PropTypes.func.isRequired,
  homework: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  homework: state.homework,
  teacher: state.teacher,
});

export default connect(mapStateToProps, { getDoneWorkById })(SubmitedItem);
