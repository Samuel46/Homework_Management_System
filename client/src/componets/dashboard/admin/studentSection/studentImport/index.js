import React, { Fragment, useState, useEffect } from "react";
import XLSX from "xlsx";
import classnames from "classnames";
import Uppy from "@uppy/core";
import { Download, UserPlus, X } from "react-feather";
import { registerStudent } from "../../../../../actions/student";
import { DragDrop } from "@uppy/react";
import { toast, ToastContainer } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { getStudents } from "../../../../../actions/student";
import { ListGroup, ListGroupItem, Alert } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  CardHeader,
  CardTitle,
  Input,
  Label,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button,
} from "reactstrap";
import Navigation from "../../../Navigation";
import { logout } from "../../../../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "uppy/dist/uppy.css";
import "@uppy/status-bar/dist/style.css";
// import '@styles/react/libs/file-uploader/file-uploader.scss'
function cancel(e) {
  console.log(e);
  message.error("Click on No");
}

const notify = (message, hasError = false) => {
  if (hasError) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const ImportStudent = ({
  auth: { user },
  logout,
  registerStudent,
  getStudents,
  history,
  student: { students },
}) => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 2 },
    autoProceed: true,
  });

  const getTableData = (arr, name) => {
    setTableData(arr);
    setName(name);
  };

  // get all students
  useEffect(() => {
    getStudents();
  }, []);

  uppy.on("complete", (result) => {
    const reader = new FileReader();
    reader.onload = function () {
      const fileData = reader.result;
      const wb = XLSX.read(fileData, { type: "binary" });

      wb.SheetNames.forEach(function (sheetName) {
        const rowObj = XLSX.utils.sheet_to_row_object_array(
          wb.Sheets[sheetName]
        );
        getTableData(rowObj, result.successful[0].data.name);
      });
    };
    if (result.successful[0].extension === "xlsx") {
      reader.readAsBinaryString(result.successful[0].data);

      notify(
        <>
          <div className="toastify-body ">
            <span role="img" aria-label="toast-text">
              Congratulations! {result.successful[0].data.name} Successfully
              Upload!🤗{" "}
            </span>
          </div>
          ,
        </>
      );
    } else {
      notify(
        <>
          <div className="toastify-body">
            <span role="img" aria-label="toast-text">
              👋 You can only upload{" "}
              <span className="font-weight-bolder">.xlsx</span>,{" "}
              <span className="font-weight-bolder">.xls</span> &{" "}
              <span className="font-weight-bolder">.csv</span> Files!.
            </span>
          </div>
          ,
        </>
      );
    }
  });

  const handleFilter = (e) => {
    const data = tableData;
    let filteredData = [];
    const value = e.target.value;
    setValue(value);

    if (value.length) {
      filteredData = data.filter((col) => {
        const keys = Object.keys(col);

        const startsWithCondition = keys.filter((key) => {
          return col[key]
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase());
        });

        const includesCondition = keys.filter((key) =>
          col[key].toString().toLowerCase().includes(value.toLowerCase())
        );

        if (startsWithCondition.length) return col[startsWithCondition];
        else if (!startsWithCondition && includesCondition.length)
          return col[includesCondition];
        else return null;
      });
      setFilteredData(filteredData);
      setValue(value);
    } else {
      return null;
    }
  };
  /*eslint-disable */
  const headArr = tableData.length
    ? tableData.map((col, index) => {
        if (index === 0) return [...Object.keys(col)];
        else return null;
      })
    : [];

  /*eslint-enable */
  const dataArr = value.length
    ? filteredData
    : tableData.length && !value.length
    ? tableData
    : null;

  // render all students in list
  const studentsFromDb = students.map((student) => student.username);

  // register students
  const handleExport = () => {
    dataArr.map((item) => {
      if (
        selectedRows.includes(item.username) &&
        studentsFromDb?.includes(item?.username) == false
      ) {
        const obj = {
          firstname: item.firstname,
          sirname: item.sirname,
          email: item.email,
          username: item.username,
          code: item.code,
          birth_date: item.birth_date,
          gender: item.gender,
          joining_date: item.joining_date,
          joining_year_group: item.joining_year_group,
          current_year_group: item.current_year_group,
        };

        registerStudent(obj, history);
      } else {
        notify(
          <>
            <div className="toastify-body">
              <span role="img" aria-label="toast-text">
                👋 You have already register {item.username},
              </span>
            </div>
          </>,
          true
        );
      }
    });

    toggleModal();
  };

  //  select students
  const handleSelect = (username) => {
    const selectedRowsArr = selectedRows;
    if (!selectedRowsArr.includes(username)) {
      selectedRowsArr.push(username);
    } else if (selectedRowsArr.includes(username)) {
      selectedRowsArr.splice(selectedRowsArr.indexOf(username), 1);
    } else {
      return null;
    }
    setSelectedRows([...selectedRowsArr]);
  };

  // select all students
  const handleSelectAll = () => {
    let selectedRowsArr = selectedRows;
    if (selectedRowsArr.length < dataArr.length) {
      const ids = dataArr.map((i) => i.username);
      selectedRowsArr = ids;
    } else if (selectedRowsArr.length === dataArr.length) {
      selectedRowsArr = [];
    } else {
      return null;
    }

    setSelectedRows(selectedRowsArr);
  };

  const renderTableBody = () => {
    if (dataArr !== null && dataArr.length) {
      return dataArr.map((col, index) => {
        const keys = Object.keys(col);

        const renderTd = keys.map((key, index) => (
          <>
            <td key={index}>{col[key]}</td>
          </>
        ));

        return (
          <tr
            key={col.username || index}
            className={classnames({
              selected: selectedRows.includes(col.username),
            })}
          >
            <td>
              <CustomInput
                type="checkbox"
                id={col.username}
                label=""
                checked={!!selectedRows.includes(col.username)}
                onChange={() => handleSelect(col.username)}
              />
            </td>
            {renderTd}
          </tr>
        );
      });
    } else {
      return null;
    }
  };

  const renderTableHead = () => {
    if (headArr.length) {
      return headArr[0].map((head, index) => {
        return <th key={index}>{head} </th>;
      });
    } else {
      return null;
    }
  };

  const handleExportStudents = () => {
    return dataArr?.map((item) => {
      if (
        selectedRows.includes(item.username) &&
        studentsFromDb?.includes(item?.username) == false
      ) {
        return (
          <tr key={item.username}>
            <td>
              {" "}
              {""}
              <ListGroup>
                <ListGroupItem color="info" className="mb-2">
                  {" "}
                  {""} ✔✔ {""}
                  {item.firstname}
                </ListGroupItem>
              </ListGroup>
            </td>

            <td>
              {" "}
              {""}
              <ListGroup>
                <ListGroupItem color="info" className="mb-2">
                  {" "}
                  {item.sirname}
                </ListGroupItem>
              </ListGroup>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.username}>
            <td>
              {" "}
              {""}
              <ListGroup>
                <ListGroupItem color="danger" className="mb-2">
                  <h6>
                    {" "}
                    ❌<small>Student Already </small>{" "}
                  </h6>{" "}
                  {item.firstname}
                </ListGroupItem>
              </ListGroup>
            </td>

            <td>
              {" "}
              {""}
              <ListGroup>
                <ListGroupItem color="danger" className="mb-2">
                  {" "}
                  <h6>
                    {" "}
                    <small>Registered </small>{" "}
                  </h6>
                  {item.sirname}
                </ListGroupItem>
              </ListGroup>
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <Fragment>
      <Navigation />
      <header className="pc-header ">
        <div className="header-wrapper">
          <div className="mr-auto pc-mob-drp">
            <ul className="list-unstyled"></ul>
          </div>
          <div className="ml-auto">
            <ul className="list-unstyled">
              <li className="pc-h-item ">
                <Link
                  onClick={() => logout()}
                  className="pc-head-link mr-0"
                  to="#!"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  {""}
                  <span>Logout</span>
                </Link>
              </li>

              <li className="dropdown pc-h-item">
                <Link
                  className="pc-head-link dropdown-toggle arrow-none mr-0"
                  data-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <span>
                    <span className="user-name">
                      Welcome {user && user.name}
                    </span>
                    <span className="user-desc">Administrator</span>
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right pc-h-dropdown">
                  <div className=" dropdown-header">
                    <h6 className="text-overflow m-0">
                      Welcome {user && user.name}
                    </h6>
                  </div>
                  <Link href="#!" className="dropdown-item">
                    <i data-feather="settings" />
                    <span>Account</span>
                  </Link>
                  <Link
                    onClick={() => logout()}
                    className="pc-head-link mr-0"
                    to="#!"
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

      <div className="pc-container">
        <div className="pcoded-content">
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Import Students</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">{user && user.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div div className="row dash_width">
            {/* Student */}
            <div className="col-xl-4 col-md-6">
              <div className="card shadow rounded ">
                <div className="card-body bg-danger">
                  <div className="col-md-12 text-center ">
                    <i className="fas fa-user f-36 text-danger" />
                    <h5 className="text-danger  m-b-10">
                      {" "}
                      <strong>Students</strong>
                    </h5>
                  </div>
                </div>
                <div className="col-md-12  text-center py-3 mb-3 ">
                  <Link to="/manage-students" className="btn btn-info">
                    Go Back
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-6">
              <div className="card shadow rounded ">
                <div className="card-body bg-success">
                  <div className="col-md-12 text-center ">
                    <i className="fas fa-laptop f-36 text-success text-center py-1" />
                    <h5 className="text-success  m-b-10">
                      {" "}
                      <strong>Classrooms</strong>
                    </h5>
                  </div>
                </div>
                <div className="col-md-12  py-3 mb-3  text-center">
                  <Link to="/manage-classrooms" className="btn btn-info">
                    Manage Classes🚀
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div className="card shadow  ">
                <div className="card-body bg-primary">
                  <div className="col-md-12 text-center">
                    <i className="fas fa-book-open f-36 text-primary" />
                    <h5 className="text-primary m-b-10">
                      {" "}
                      <strong>Subjects</strong>{" "}
                    </h5>
                  </div>
                </div>
                <div className="col-md-12  py-3 mb-3 text-center  ">
                  <Link to="/manage-subjects" className="btn btn-info">
                    Manage Subject📜
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Row className="import-component">
            <Col sm="12">
              <Card>
                <CardBody>
                  <CardTitle tag="h4">
                    Upload Students 👇<strong>Spreadsheet Only</strong>
                  </CardTitle>
                  <Row>
                    <Col sm="12">
                      <DragDrop uppy={uppy} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            {tableData.length ? (
              <Col sm="12">
                <Card>
                  <CardHeader className="justify-content-between flex-wrap">
                    <CardTitle tag="h4">{name}</CardTitle>
                    <div class="cover-img-block img_img">
                      <img
                        src="https://image.freepik.com/free-vector/focused-tiny-people-reading-books_74855-5836.jpg"
                        alt=""
                        class="img-fluid"
                      />
                    </div>
                    <div className="row align-items-center m-l-0">
                      <div className="col-sm-4">
                        <Button
                          className="btn btn-success btn-sm mb-3 btn-round"
                          onClick={() => toggleModal()}
                        >
                          <UserPlus /> Register Selected
                        </Button>
                      </div>
                      <div className="col-sm-4 "></div>
                      <div className="col-sm-4 text-right">
                        <div className="d-flex align-items-center justify-content-end">
                          <Label for="search-input" className="mr-1">
                            Search
                          </Label>
                          <Input
                            id="search-input"
                            bsSize="sm"
                            type="text"
                            value={value}
                            onChange={(e) => handleFilter(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <Table className="table-hover-animation" responsive>
                    <thead>
                      <tr>
                        <th>
                          <CustomInput
                            type="checkbox"
                            id="select-all"
                            label=""
                            checked={!!selectedRows.length}
                            onChange={(e) => handleSelectAll()}
                          />
                        </th>
                        {renderTableHead()}
                      </tr>
                    </thead>
                    <tbody>{renderTableBody()}</tbody>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                    />
                  </Table>
                </Card>
              </Col>
            ) : null}
          </Row>
          {/* new model */}
          <Modal
            isOpen={modal}
            toggle={() => toggleModal()}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => toggleModal()}>
              <h6>New Student's</h6>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Table className="table-hover-animation" responsive>
                  <thead>
                    <tr>
                      <th>Firstname</th>

                      <th>Sirname</th>
                    </tr>
                  </thead>
                  <tbody>{handleExportStudents()}</tbody>
                </Table>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handleExport()}>
                Confirm
              </Button>
              <Button color="danger" onClick={() => toggleModal()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </Fragment>
  );
};

ImportStudent.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  registerStudent: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  student: state.student,
});

export default connect(mapStateToProps, {
  logout,
  getStudents,
  registerStudent,
})(withRouter(ImportStudent));
