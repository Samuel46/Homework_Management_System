import React from "react";

import { connect } from "react-redux";

function StudentDashActions({
  studentHomework: { homeworks, completework },
  studentMsg: { messages },
  parents,
}) {
  const pendingTitle = homeworks.map((work) => work.title);
  const completeTitle = completework.map((work) => work.title);

  const filteredHomework = pendingTitle.filter((work) =>
    completeTitle.includes(work)
  );
  const pendingLength = pendingTitle.filter(
    (work) => !filteredHomework.includes(work)
  );

  return (
    <div className="row">
      <div className="col-xl-3 col-md-3">
        <div className="card shadow">
          <div className="card-body bg-info">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <i className="fas fa-comments f-36 text-info" />
              </div>
              <div className="col-auto">
                <h6 className="text-info m-b-10">Feedback</h6>
                <h2 className="m-b-0 text-info">
                  {messages && messages.length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Student */}
      <div className="col-xl-3 col-md-3">
        <div className="card shadow">
          <div className="card-body bg-danger">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <h6 className="text-danger m-b-10">Homewrok</h6>
                <h2 className="m-b-0 text-danger">
                  {pendingLength && pendingLength.length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-md-3">
        <div className="card shadow rounded ">
          <div className="card-body bg-success ">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <h6 className="text-success m-b-10">Complete Homework</h6>
                <h2 className="m-b-0 text-success">
                  {completework && completework.length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* and Parents */}

      <div className="col-xl-3 col-md-3">
        <div className="card shadow rounded ">
          <div className="card-body bg-primary ">
            <div className="row align-items-center m-l-0">
              <div className="col-auto">
                <h6 className="text-primary m-b-10">Parents</h6>
                <h2 className="m-b-0 text-primary">
                  {parents && parents.length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  studentHomework: state.studentHomework,

  studentMsg: state.studentMsg,
});
export default connect(mapStateToProps, {})(StudentDashActions);
