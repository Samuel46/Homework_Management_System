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

import { Table, Badge, ListGroupItem, ListGroup } from "reactstrap";

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
                      Teacher|| {teacher && teacher.firstname}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* / */}

          {/* end of row */}

          {/* HomeworkList */}
          <div className="py-5">
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

                      <div className="card-body bg-light-primary ">
                        <label className="floating-label">
                          {" "}
                          <strong>Edited Homework</strong>{" "}
                        </label>
                        <p>{complete && complete.completeStudentWork}</p>
                      </div>
                      <div className="card-footer">
                        <ListGroup>
                          <ListGroupItem color="info" className="mb-2">
                            {" "}
                            {""}📜 {""}
                            {complete && complete.filename}
                          </ListGroupItem>
                        </ListGroup>
                        <a
                          href={complete && complete.attachements}
                          className="btn  btn-primary"
                          target="_blank"
                          download
                        >
                          {complete && complete.attachements === undefined
                            ? "No files available"
                            : " Download Files"}
                        </a>
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
