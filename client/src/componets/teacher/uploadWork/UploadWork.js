import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { uploadHomework } from "../../../actions/teacher/teacher";
import { Fragment } from "react";
import Spinner from "../../layouts/Spinner";
import axios from "axios";

import {
  Alert,
  UncontrolledTooltip,
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import Progress from "./Progress";
import Message from "./Message";

function UploadWork({ uploadHomework }) {
  // file upload logics
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("File Name");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const formData = new FormData();
  formData.append("file", file);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      //   extracting the id from url

      const res = await axios.post("/api/teacher/teacher/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });
      const { attachements, filename } = res.data;
      setUploadedFile({ attachements, filename });

      setMessage(
        "Files uploaded, it's time to finish up creating the Homework"
      );
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("No File Uploaded");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        action="upload"
        method="POST"
        enctype="multipart/form-data"
        id="attachWork"
      >
        <div className="row">
          <div className="form-group col-md-6 ">
            <label htmlFor="file" className="col-form-label">
              <ListGroup>
                <ListGroupItem color="primary" className="mb-2">
                  {" "}
                  {""}📜 {""}
                  {filename}
                </ListGroupItem>
              </ListGroup>
            </label>
            <input
              className="form-control"
              type="file"
              onChange={onChange}
              name="file"
              id="file"
            />

            <input
              type="submit"
              value="Upload File"
              className="btn btn-primary mt-4"
            />
          </div>
        </div>
        <UncontrolledTooltip placement="top" target="attachWork">
          Attach Homework here make sure all the Document are well formatted
        </UncontrolledTooltip>
        {/* 
                        displaying the forms  */}
        {uploadedFile ? (
          <div className="row ">
            <div className="col-md-6 m-auto">
              <h3 className="text-center">{uploadedFile.filename}</h3>
              <img
                style={{ width: "100%" }}
                src={uploadedFile.attachements}
                alt=""
              />
            </div>
          </div>
        ) : null}
      </form>
      {message ? <Message msg={message} /> : null}
      <Progress percentage={uploadPercentage} />
     
    </>
  );
}

UploadWork.propTypes = {
  uploadHomework: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   studentHomework: state.studentHomework,
//   student: state.student,
// });

export default connect(null, { uploadHomework })(withRouter(UploadWork));
