import React from "react";
import HomeList from "./HomeList";
import ClassList from "./ClassList";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHomework } from "../../actions/teacher/homework";
import { getStudents } from "../../actions/teacher/teacher";
import { getClassRooms } from "../../actions/teacher/classRoom";
import { useEffect } from "react";
import NodeAlert from "../layouts/NodeAlert";

function TeacherBody({
  getHomework,
  getStudents,
  getClassRooms,
  homework: { homeworks },
  classroomTeacher: { classes },
  teacher: { teacher },
}) {
  useEffect(() => {
    getHomework();
  }, [getHomework]);

  useEffect(() => {
    getClassRooms();
  }, [getClassRooms]);
  // load all the students
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="pc-container">
      <div className="pcoded-content">
        {/* [ breadcrumb ] start */}
        <div className="page-header">
          <div className="page-block">
            <div className="row align-items-center">
              <div className="col-md-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    Teacher||{" "}
                    {teacher &&
                      teacher.title +
                        " " +
                        teacher.firstname +
                        " " +
                        teacher.sirname}
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
        <div className="py-2">
          <NodeAlert />
        </div>
        <HomeList homeworks={homeworks} />
      </div>
    </div>
  );
}

TeacherBody.propTypes = {
  getHomework: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  homework: PropTypes.object.isRequired,
  getClassRooms: PropTypes.func.isRequired,
  classroomTeacher: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  homework: state.homework,
  classroomTeacher: state.classroomTeacher,
  teacher: state.teacher,
});

export default connect(mapStateToProps, {
  getHomework,
  getStudents,
  getClassRooms,
})(TeacherBody);
