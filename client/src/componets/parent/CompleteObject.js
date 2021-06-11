import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import Moment from "react-moment";
import { getDoneWorkById } from "../../actions/parent/homework";
import Spinner from "../layouts/Spinner";
import ParentNavigation from "./ParentNavigation";
import { logoutParent } from "../../actions/student/parents/parent";

function CompleteObject({
  getDoneWorkById,
  parentwork: { complete, loading },
  match,
  parent: { parent },
  logoutParent,
}) {
  useEffect(() => {
    getDoneWorkById(match.params.id);
  }, [getDoneWorkById, match.params.id]);

  return parent !== null && complete !== null || complete !== undefined ? (
    <>
      <ParentNavigation />
      <header className="pc-header ">
        <div className="header-wrapper">
          <div className="mr-auto pc-mob-drp">
            <ul className="list-unstyled"></ul>
          </div>
          <div className="ml-auto">
            <ul className="list-unstyled">
              <li className="pc-h-item ">
                <Link onClick={logoutParent} to="#!" className="dropdown-item">
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
                      {parent && Object.values(parent && parent.student.name)}
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
                    <span className="user-name">{parent && parent.name}</span>
                    <span className="user-desc">Parent</span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                  <div className=" dropdown-header">
                    <h6 className="text-overflow m-0">
                      Welcome !{parent && parent.name}
                    </h6>
                  </div>
                  <a href="../students/account.html" className="dropdown-item">
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
            {complete && loading === null ? (
              <Spinner />
            ) : (
              <Fragment>
                <div className="py-2">
                  <div className="card ">
                    <div className="card-header ">
                      <h6 className="text-success">
                        <span className="badge badge-pill badge-success">
                          Complete Homework
                        </span>{" "}
                      </h6>
                      <div class="cover-img-block img_img">
                        <img
                          src="https://image.freepik.com/free-vector/girl-writing-journal-diary_74855-7408.jpg"
                          alt=""
                          class="img-fluid"
                        />
                      </div>
                    </div>
                    {/*  */}
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
                    <div className="ml-4 pt-3">
                      <div className=" mb-1 ">
                        <strong>Issued</strong>: {""}
                        <Moment format="YYYY/MM/DD">
                          {complete && complete.set_date}
                        </Moment>
                      </div>
                      <div className=" mb-1">
                        <strong>Due</strong>:{""}{" "}
                        <Moment format="YYYY/MM/DD">
                          {complete && complete.due_date}
                        </Moment>
                      </div>
                      <div className="mb-1">
                        <strong>Effort estimate</strong>:{""}{" "}
                        {complete && complete.effort_time}
                      </div>
                    </div>
                    <div className="card-body ">
                      <label className="floating-label">
                        {" "}
                        <strong>Description</strong>{" "}
                      </label>
                      <p>{complete && complete.description}</p>
                    </div>
                    <div className="card-footer">
                      {/*@@TODO Check wheheter the attachment from the state match with */}
                    </div>

                    <div className="col-sm-6 py-3">
                      <Link to="/manage-homework" className="btn btn-secondary">
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
      {/*  */}
    </>
  ):
  (
      <Spinner/>
  )
}

CompleteObject.propTypes = {
  getDoneWorkById: PropTypes.func.isRequired,
  parentwork: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  logoutParent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  parentwork: state.parentwork,
  parent: state.parent,
});

export default connect(mapStateToProps, { getDoneWorkById, logoutParent })(
  CompleteObject
);
