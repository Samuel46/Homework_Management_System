import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Fragment } from "react";
import Moment from "react-moment";
import { getHomeworkBy_id } from "../../actions/parent/homework";
import Spinner from "../layouts/Spinner";
import ParentNavigation from "./ParentNavigation";
import { logoutParent } from "../../actions/student/parents/parent";
import {
    Table,
    Badge,
    ListGroupItem, ListGroup
    
  } from "reactstrap";

function HomeworkObject({
  getHomeworkBy_id,
  parentwork: { homework, loading },
  parent: { parent }, 
  match,
  history,
}) {
  useEffect(() => {
    getHomeworkBy_id(match.params.id);
  }, [getHomeworkBy_id, match.params.id]);
 

  return (
    <Fragment>
      {homework === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <ParentNavigation />
          {/* Header section */}
          <header className="pc-header ">
            <div className="header-wrapper">
              <div className="mr-auto pc-mob-drp">
                <ul className="list-unstyled"></ul>
              </div>
              <div className="ml-auto">
                <ul className="list-unstyled">
                  <li className="pc-h-item ">
                    <Link
                      onClick={logoutParent}
                      to="#!"
                      className="dropdown-item"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      {""}
                      <span>Logout</span>
                    </Link>
                  </li>
                  <li className="dropdown pc-h-item">
                    <a
                      className="pc-head-link dropdown-toggle arrow-none mr-0"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="false"
                      aria-expanded="false"
                    >
                      <span>
                        <span className="user-name">
                          {" "}
                          {parent &&
                            Object.values(parent && parent.student.name)}
                        </span>
                        <span className="user-desc">Studen't Account</span>
                      </span>
                    </a>
                  </li>
                  <li className="dropdown pc-h-item">
                    <a
                      className="pc-head-link dropdown-toggle arrow-none mr-0"
                      data-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-haspopup="false"
                      aria-expanded="false"
                    >
                      <span>
                        <span className="user-name">
                          {parent && parent.name}
                        </span>
                        <span className="user-desc">Parent</span>
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                      <div className=" dropdown-header">
                        <h6 className="text-overflow m-0">
                          Welcome !{parent && parent.name}
                        </h6>
                      </div>
                      <a
                        href="../students/account.html"
                        className="dropdown-item"
                      >
                        <i data-feather="user" />
                        <span>My Account</span>
                      </a>
                      <Link
                        onClick={logoutParent}
                        href="#!"
                        className="dropdown-item"
                      >
                        <i data-feather="power" />
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
              <div className="page-header mb-3">
                <div className="page-block">
                  <div className="row align-items-center">
                    <div className="col-md-12">
                      <div className="page-header-title">
                        <h5 className="m-b-10">Parent's Name</h5>
                      </div>
                      <ul className="breadcrumb">
                        <li className="breadcrumb-item m-b-8">
                          {parent && parent.name}
                        </li>
                      </ul>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>

              <div className="container py-5">
                <div className="py-2">
                  <div className="card ">
                    <div className="card-header ">
                      <h4>Homework details</h4>
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
                      <label className="floating-label">
                        {" "}
                        <strong>Title</strong>{" "}
                      </label>
                      <h5 className="card-title">
                        {homework && homework.title}
                      </h5>
                    </div>
                    {/*  */}
                    {/* Dates */}
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
                   
                    <div className="card-body bg-light-primary ">
                      <label className="floating-label">
                        {" "}
                        <strong>Description</strong>{" "}
                      </label>
                      <p>{homework && homework.description}</p>
                      <div className="card-footer">
                        <ListGroup>
                          <ListGroupItem color="info" className="mb-2">
                            {" "}
                            {""}📜 {""}
                            {homework && homework.filename}
                          </ListGroupItem>
                        </ListGroup>
                        <a
                          href={homework && homework.attachements}
                          className="btn  btn-primary"
                          target="_blank"
                          download
                        >
                          {homework && homework.attachements.length === 0
                            ? "No files available"
                            : " Download Files"}
                        </a>
                      </div>
                      

                      <Link
                        to="/parent-dashboard"
                        className="btn  btn-secondary"
                      >
                        Go Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

HomeworkObject.propTypes = {
  getHomeworkBy_id: PropTypes.func.isRequired,
  parentwork: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => ({
  parentwork: state.parentwork,
  parent: state.parent
});

export default connect(mapStateToProps, { getHomeworkBy_id })(
  withRouter(HomeworkObject)
);
