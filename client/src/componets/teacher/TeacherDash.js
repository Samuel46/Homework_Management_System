import React, { Fragment, useEffect } from "react";
import TeacherTop from "./TeacherTop";
import "../dashboard/Dashboard.css";
import TeacherBody from "./TeacherBody";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";

import setTeacherToken from "../../utils/setTeacherToken";
import { loadTeacher } from "../../actions/teacher";

if (localStorage.token) {
  setTeacherToken(localStorage.token);
}

function TeacherDash({ teacher: { teacher, loading }, loadTeacher }) {
  useEffect(() => {
    loadTeacher();
  }, [loadTeacher]);

  return (
    <Fragment>
      {teacher !== null && teacher !== undefined ? (
        <Fragment>
          <div>
            <TeacherTop />
          </div>
          <TeacherBody />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
}

TeacherDash.propTypes = {
  teacher: PropTypes.object.isRequired,
  homework: PropTypes.object.isRequired,
  loadTeacher: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  teacher: state.teacher,
  homework: state.homework,
});

export default connect(mapStateToProps, { loadTeacher })(TeacherDash);
