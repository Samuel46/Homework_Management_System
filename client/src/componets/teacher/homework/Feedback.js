import React, { useState, useEffect } from "react";
import NodeAlert from "../../layouts/NodeAlert";
import { Link, withRouter } from "react-router-dom";
import StudentRes from "../../teacher/homework/StudentRes";
import TeacherChat from "./TeacherChat";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  sendFeedback,
  getFeedback,
  getMsgId,
} from "../../../actions/feedback/teacherMsg";
import TeacherTop from "../TeacherTop";

function Feedback({
  sendFeedback,
  getFeedback,
  getMsgId,
  history,
  teacherMsg: { msg, loading, studentMsg },
  match,
  teacher: { teacher },
}) {
  useEffect(() => {
    getFeedback(match.params.id);
  }, [getFeedback, match.params.id]);
  // get student msg
  useEffect(() => {
    getMsgId(match.params.id);
  }, [getMsgId, match.params.id]);

  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    sendFeedback(match.params.id, { text }, history);
  };
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

          {/* HomeworkList */}
          <div className="py-4">
            <div className="container">
              <div className="col-md-12 py-4">
                <NodeAlert />

                <div className="card chat-card ">
                  <div class="cover-img-block img_img">
                    <img
                      src="https://image.freepik.com/free-vector/messaging-application-abstract-concept-illustration_335657-2231.jpg"
                      alt=""
                      class="img-fluid"
                    />
                  </div>
                  <form className="card-body" onSubmit={(e) => onSubmit(e)}>
                    {/* teacher chat */}
                    <TeacherChat msg={msg} loading={loading} />
                    {/*  */}
                    {/* Student chat */}
                    <StudentRes studentMsg={studentMsg} loading={loading} />

                    <div className="right-icon-control m-t-15">
                      <label>Send message</label>
                      <div className="input-group input-group-button">
                        <input
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          name="text"
                          type="text"
                          className="form-control"
                          placeholder="text"
                          autoComplete="off"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                            <i className="feather icon-message-circle m-0" />
                          </button>
                        </div>
                      </div>
                      <div className="input-group py-3">
                        <Link
                          to="/manage-homework"
                          className="btn btn-secondary"
                        >
                          Go back
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
}
Feedback.propTypes = {
  sendFeedback: PropTypes.func.isRequired,
  getFeedback: PropTypes.func.isRequired,
  teacherMsg: PropTypes.object.isRequired,
  getMsgId: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  teacherMsg: state.teacherMsg,
  teacher: state.teacher,
});

export default connect(mapStateToProps, {
  sendFeedback,
  getFeedback,
  getMsgId,
})(withRouter(Feedback));
