import React, { Fragment, useEffect } from "react";
import NodeAlert from "../../../layouts/NodeAlert";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateParent,
  getParentById,
} from "../../../../actions/student/parents/parent";
import { logoutStudent } from "../../../../actions/student";
import StudentNavigation from "../../StudentNavigation";
import { Alert } from "reactstrap";
import EditParentForm from "./EditParentForm";

function EditParents({
  updateParent,
  logoutStudent,
  getParentById,
  match,
  student: { student, loading },
  parent: { selectedParent },
}) {
  // TO_DO get parents by id
  useEffect(() => {
    getParentById(match.params.id);
  }, [getParentById, match.params.id]);
  return selectedParent !== null && selectedParent !== undefined ? (
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
                <Link onClick={logoutStudent} to="#!" className="dropdown-item">
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
                    <span className="user-name">{student && student.name}</span>
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
                    <h5 className="m-b-10">Manage Parents</h5>
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
            <div className="col-md-12 py-4">
              <div className="card  shadow">
                <div className="card-header">
                  <h4 className="card-title">Update Parent</h4>
                </div>
                <div class="cover-img-block img_img">
                  <img
                    src="https://image.freepik.com/free-vector/editing-body-text-concept-illustration_114360-5791.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>

                <div className="card-body">
                  <div>
                    <NodeAlert />
                  </div>
                  {/* edit parent form */}

                  <EditParentForm
                    selectedParent={selectedParent}
                    updateParent={updateParent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Parent not found</h4>
      <div className="alert-body">
        Parent with id: {match.params.id} doesn't exist. Check list of all
        Student: <Link to="/student-parent">Dashboard</Link>
      </div>
    </Alert>
  );
}

EditParentForm.propTypes = {
  updateParent: PropTypes.func.isRequired,
  logoutStudent: PropTypes.func.isRequired,
  getParentById: PropTypes.func.isRequired,
  parent: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
  parent: state.parent,
});

export default connect(mapStateToProps, {
  updateParent,
  getParentById,
  logoutStudent,
})(EditParents);
