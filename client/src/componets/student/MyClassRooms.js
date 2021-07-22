import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import Spinner from "../layouts/Spinner";

function MyClassRooms({ classRooms }) {
  const myclassrooms = classRooms.map((room) => (
    <tr key={room._id}>
      <td>{room.name}</td>
      <td>
        {room.assign_teachers.map((teacher, index) => (
          <ListGroup key={index}>
            <ListGroupItem color="primary" className="mb-2">
              {teacher}
            </ListGroupItem>
          </ListGroup>
        ))}
      </td>
      <td>
        {room.add_students.map((student, index) => (
          <ListGroup key={index}>
            <ListGroupItem color={"info"} className="mb-2">
              {" "}
              {""}✔{""} {student}
            </ListGroupItem>
          </ListGroup>
        ))}
      </td>
    </tr>
  ));
  return classRooms !== null && classRooms !== undefined ? (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12" id="pending__homework">
            <div className="card shadow">
              <div className="card-header">
                <h4 className="text-danger">
                  <span className="badge badge-pill badge-primary">
                    My ClassRooms
                  </span>
                </h4>
                <div class="cover-img-block img_img">
                  <img
                    src="https://image.freepik.com/free-vector/internet-lessons-searching-remote-university-educational-programs-online-classes-website-high-school-student-with-magnifying-glass-cartoon-character_335657-3269.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
              </div>
              <div className="card-body">
                <div className="row align-items-center m-l-0">
                  <div className="col-sm-6"></div>
                </div>
                <div className="table-responsive">
                  <table
                    id="report-table"
                    className="table  table-bordered table-striped mb-0"
                  >
                    <thead>
                      <tr>
                        <th>Classroom name</th>
                        <th>Teacher's Name</th>

                        <th>Classmates</th>
                      </tr>
                    </thead>
                    <tbody>{myclassrooms}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
}

export default MyClassRooms;
