import React, { useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import NodeAlert from "../layouts/NodeAlert";
import Feedback from "./Feedback";
import CompleteWork from "./CompleteWork";
import ParentDashActions from "./ParentDashActions";
import ParentNavigation from "./ParentNavigation";
import PendingWork from "./PendingWork";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCompletWork, getHomework } from "../../actions/parent/homework";
import { getMsg } from "../../actions/parent/feedback";
import { logoutParent } from "../../actions/student/parents/parent";
import Spinner from "../layouts/Spinner";

function ParentDash({
  getMsg,
  getCompletWork,
  getHomework,
  logoutParent,
  parent: { parent, loading },
  parentwork: { homeworks, completework },
  feedback: { parentMsgs },
}) {
  useEffect(() => {
    getHomework();
  }, [getHomework]);
  useEffect(() => {
    getCompletWork();
  }, [getCompletWork]);

  useEffect(() => {
    getMsg();
  }, [getMsg]);

  return (
    <Fragment>
      {parent !== null && parent !== undefined ? (
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
                            Object.values(
                              parent &&
                                parent.student.firstname +
                                  " " +
                                  parent.student.sirname
                            )}
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

              <ParentDashActions />
              <NodeAlert />
              {/* pending homework */}
              <PendingWork homeworks={homeworks} />
              {/* complete homework */}
              <CompleteWork completework={completework} />

              <Feedback parentMsgs={parentMsgs} />
              {/* <Feedback messages={messages} /> */}
            </div>
          </div>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
}

ParentDash.protoTypes = {
  getHomework: PropTypes.func.isRequired,
  getCompletWork: PropTypes.func.isRequired,
  getMsg: PropTypes.func.isRequired,
  logoutParent: PropTypes.func.isRequired,
  parentwork: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  feedback: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  parentwork: state.parentwork,
  parent: state.parent,
  feedback: state.feedback,
});
export default connect(mapStateToProps, {
  getHomework,
  getCompletWork,
  getMsg,
  logoutParent,
})(ParentDash);
