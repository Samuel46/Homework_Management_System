import React from "react";
import { Link } from "react-router-dom";

function AdminAction() {
  return (
    <div div className="row dash_width">
      <div className="col-xl-3 col-md-6">
        <div className="card shadow">
          <div className="card-body bg-info">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <i className="fas fa-user-graduate f-36 text-info" />
              </div>
              <div className="col-auto">
                <h6 className="text-info m-b-10">Teachers</h6>
                {/* <h2 className="m-b-0 text-info">5</h2> */}
              </div>
            </div>
          </div>
          <div className="col-md-12  py-3 mb-3 ">
            <Link to="/manage-teachers" className="btn btn-info">
              Manage Teachers
            </Link>
          </div>
        </div>
      </div>
      {/* Student */}
      <div className="col-xl-3 col-md-6">
        <div className="card shadow">
          <div className="card-body bg-danger">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <i className="fas fa-user f-36 text-danger" />
              </div>
              <div className="col-auto">
                <h6 className="text-danger m-b-10">Students</h6>
                {/* <h2 className="m-b-0 text-danger">45</h2> */}
              </div>
            </div>
          </div>
          <div className="col-md-12  py-3 mb-3 ">
            <Link to="/create-student" className="btn btn-info">
              Manage Student
            </Link>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card shadow rounded ">
          <div className="card-body bg-success ">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <i className="fas fa-laptop f-36 text-success" />
              </div>
              <div className="col-auto">
                <h6 className="text-success m-b-10">Classes</h6>
                {/* <h2 className="m-b-0 text-success">9</h2> */}
              </div>
            </div>
          </div>
          <div className="col-md-12  py-3 mb-3    ">
            <Link to="/manage-classrooms" className="btn btn-info">
              Manage Classes
            </Link>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-6">
        <div className="card shadow  ">
          <div className="card-body bg-primary">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <i className="fas fa-book-open f-36 text-primary" />
              </div>
              <div className="col-auto">
                <h6 className="text-primary m-b-10">Subjects</h6>
                {/* <h2 className="m-b-0 text-primary">25</h2> */}
              </div>
            </div>
          </div>
          <div className="col-md-12  py-3 mb-3  ">
            <Link to="/create-subject" className="btn btn-info">
              Manage Subject
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAction;
