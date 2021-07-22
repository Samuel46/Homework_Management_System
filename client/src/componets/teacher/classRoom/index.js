import React, { Fragment } from "react";
import ClassList from "../ClassList";
import TeacherTop from "../TeacherTop";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getClassRooms } from "../../../actions/teacher/classRoom";
import { useEffect } from "react";
import NodeAlert from "../../layouts/NodeAlert";

function ClassroomTeacher({
  classroomTeacher: { classes },
  teacher: { teacher },
  history,
  getClassRooms,
}) {
  useEffect(() => {
    getClassRooms();
  }, [getClassRooms]);
  return (
    <div>
      <Fragment>
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
              {/* create homework */}
              <div className="col-xl-6 col-md-6">
                <div className="card shadow">
                  <div className="card-body bg-info">
                    <div className="col-md-12 text-center">
                      <i class="far fa-address-card f-36 text-info"></i>
                      <h5 className="text-info m-b-10">Create Homework</h5>
                    </div>
                  </div>
                  <div className="col-md-12  py-3 mb-3 text-center ">
                    <Link to="/create-homework" className="btn btn-info">
                      Create Homework
                    </Link>
                  </div>
                </div>
              </div>
              {/* homework submittion */}
              <div className="col-xl-6 col-md-6">
                <div className="card shadow">
                  <div className="card-body bg-danger">
                    <div className="col-md-12 text-center">
                      <i className="fas fa-book f-36 text-danger" />
                      <h5 className="text-danger m-b-10">Submissions</h5>
                    </div>
                  </div>
                  <div className="col-md-12 text-center py-3 mb-3 ">
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

            <ClassList classes={classes} />
          </div>
        </div>
      </Fragment>
    </div>
  );
}
ClassroomTeacher.propTypes = {
  classroomTeacher: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  classroomTeacher: state.classroomTeacher,
  teacher: state.teacher,
});

export default connect(mapStateToProps, { getClassRooms })(
  withRouter(ClassroomTeacher)
);
