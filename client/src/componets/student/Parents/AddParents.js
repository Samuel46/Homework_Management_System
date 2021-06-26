import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { deleteParent } from "../../../actions/student/parents/parent";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

function AddParents({ parents, deleteParent }) {
  const allParents = parents.map((parent) => (
    <tr key={parent._id}>
      <td>
        <ListGroup>
          <ListGroupItem color="primary" className="mb-2">
            {" "}
            {""} {""}
            {parent.name}
          </ListGroupItem>
        </ListGroup>
      </td>
      <td>{parent.email}</td>

      {/* <td>
        <Moment format="YYYY/MM/DD">{homework.set_date}</Moment>
      </td> */}

      {/* <td>
        
      <button onClick={() => deleteParent(parent._id)} className="btn btn-light-danger">
      <i className="fas fa-trash" />
      {""} {""}
        Remove Parent</button>
       
        <span className="badge badge-pill badge-danger ml-2 mr-2">Delete</span>
      </td> */}
      <td>
        <Link
          to={`/edit-parent/${parent._id}`}
          className="btn btn-info btn-sm mr-2"
        >
          <i className="feather icon-settings" />
          Edit
        </Link>

        <Popconfirm
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          className="btn btn-danger btn-sm ml-2"
          title="Are you absolutely sure? This action cannot be undone. This will permanently delete this Parent🙄?"
          onConfirm={() => deleteParent(parent._id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Delete</a>
        </Popconfirm>
      </td>
    </tr>
  ));
  return (
    <div className="container py-5">
      <div className="row ">
        <div className="col-md-12">
          <div className="card shadow">
            <div className="card-header">
              <h4 className="text-info">Create parent's</h4>
              <div class="cover-img-block img_img">
                <img
                  src="https://image.freepik.com/free-vector/back-school-illustration_23-2148598173.jpg"
                  alt=""
                  class="img-fluid"
                />
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center m-l-0">
                <div className="col-sm-6"></div>
                <div className="col-sm-6 text-right">
                  <Link
                    to="/add-parents"
                    className="btn btn-info btn-sm mb-3 btn-round"
                  >
                    <i className="feather icon-plus" />
                    Add Parent
                  </Link>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  id="report-table"
                  className="table   table-bordered table-striped mb-0"
                >
                  <thead>
                    <tr>
                      <th>Parent's Full Name</th>

                      <th>Email</th>

                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>{allParents}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
AddParents.propTypes = {
  deleteParent: PropTypes.func.isRequired,
};

export default connect(null, { deleteParent })(AddParents);
