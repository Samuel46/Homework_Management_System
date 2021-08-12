import React, { Fragment, useState, useEffect } from "react";
import classnames from "classnames";
import XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../../../../layouts/Spinner";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  CustomInput,
  Label,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../../../../../actions/auth";
import { getStudentsForExport } from "../../../../../actions/student";
import { Download } from "react-feather";

function ExportSelected({
  logout,
  auth: { user },
  student: { studentExport },
  getStudentsForExport,
}) {
  // get export students
  useEffect(() => {
    getStudentsForExport();
  }, []);

  const studentExp = studentExport.map((student) => student);
  const [filteredData, setFilteredData] = useState([]);
  const [dataToExport, setDataToExport] = useState([]);
  const [value, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileFormat, setFileFormat] = useState("xlsx");
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleModal = () => setModal(!modal);

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleFilter = (e) => {
    let filteredData = [];
    const value = e.target.value;
    setValue(value);
    if (value.length) {
      filteredData = studentExp.filter((col) => {
        const startsWithCondition =
          col.firstname.toLowerCase().startsWith(value.toLowerCase()) ||
          col.sirname.toLowerCase().startsWith(value.toLowerCase()) ||
          col.username.toLowerCase().startsWith(value.toLowerCase()) ||
          col.code.toLowerCase().startsWith(value.toLowerCase());

        const includesCondition =
          col.firstname.toLowerCase().includes(value.toLowerCase()) ||
          col.sirname.toLowerCase().includes(value.toLowerCase()) ||
          col.username.toLowerCase().includes(value.toLowerCase()) ||
          col.code.toLowerCase().includes(value.toLowerCase());

        if (startsWithCondition) return startsWithCondition;
        else if (!startsWithCondition && includesCondition)
          return includesCondition;
        else return null;
      });
      setValue(value);
      setFilteredData(filteredData);
    }
  };

  const handleExport = () => {
    const exportArr = dataToExport;
    studentExp.map((item) => {
      if (selectedRows.includes(item.username)) {
        return exportArr.push(item);
      } else {
        return null;
      }
    });

    setDataToExport([...exportArr]);
    const name = fileName.length
      ? `${fileName}.${fileFormat}`
      : `excel-sheet.${fileFormat}`;
    const wb = XLSX.utils.json_to_sheet(dataToExport);
    const wbout = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wbout, wb, "Homework App");
    XLSX.writeFile(wbout, name);
    toggleModal();
    notify(
      <>
        <div className="toastify-body ">
          <span role="img" aria-label="toast-text">
            Congratulations! {fileName}.{fileFormat} Successfully Exported🤗{" "}
          </span>
        </div>
        ,
      </>
    );
  };

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

  const handleSelectAll = () => {
    let selectedRowsArr = selectedRows;
    if (selectedRowsArr.length < studentExp.length) {
      const ids = studentExp.map((i) => i.username);
      selectedRowsArr = ids;
    } else if (selectedRowsArr.length === studentExp.length) {
      selectedRowsArr = [];
    } else {
      return null;
    }

    setSelectedRows(selectedRowsArr);
  };

  const array = value ? filteredData : studentExp;
  const renderTableData = array.map((col) => {
    return (
      <tr
        key={col.username}
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
        <td>{col.firstname}</td>
        <td>{col.sirname}</td>
        <td>{col.gender}</td>
        <td>{col.username}</td>

        <td>{col.code}</td>
      </tr>
    );
  });
  return studentExport.length !== 0 || studentExp.length !== 0 ? (
    <Fragment>
      {/*  navigation*/}
      <Fragment>
        {/* [ navigation menu ] start */}

        <div className="loader-bg">
          <div className="loader-track">
            <div className="loader-fill" />
          </div>
        </div>

        {/* [ Mobile header ] start */}
        <div className="pc-mob-header pc-header">
          <div className="pcm-logo">
            <ul className="pc-navbar pc__position">
              <li className="pc-item mr-5">
                <Link className="pc-link text-primary " to="/dashboard">
                  <i className="fas fa-home f-26" /> <br />
                  <small className="mobo__nav">Dashboard</small>
                </Link>
              </li>

              <li className="pc-item mr-5 ">
                <Link to="/manage-account" className="pc-link  text-danger">
                  <i class="far fa-user-circle f-26"></i> <br />
                  <small className="mobo__nav">Account</small>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pcm-toolbar">
            <Link onClick={logout} className="pc-head-link mr-0" to="#!">
              <i className="fas fa-sign-out-alt"></i>
              {""}
              <span>Logout</span>
            </Link>
          </div>
        </div>
        <nav className="pc-sidebar">
          <div className="navbar-wrapper">
            {/* <div className="m-header">
              <Link to="/dashboard" className="b-brand">
                <strong>Dashboard</strong>
              </Link>
            </div> */}
            <div className="navbar-content">
              <ul className="pc-navbar">
                <li className="pc-item pc-caption">
                  <label>Navigation</label>
                </li>
                <li className="pc-item">
                  <Link className="pc-link text-primary" to="/dashboard">
                    <i className="fas fa-home f-26" /> Dashboard
                  </Link>
                </li>
                <li className="pc-item">
                  <Link to="/manage-account" className="pc-link text-danger">
                    <i class="far fa-user-circle f-26"></i> My Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
      {/* end of nav */}

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
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="page-header-title">
                    <h5 className="m-b-10">Export Students</h5>
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

          <Row className="export-component">
            <Col sm="12">
              <Card>
                <CardBody className="pb-0">
                  <div className="row align-items-center m-l-0">
                    <div className="col-sm-4">
                      <Button
                        className="btn btn-primary btn-sm mb-3 btn-round"
                        onClick={() => toggleModal()}
                      >
                        <Download /> Export Selected
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
                </CardBody>
                <Table className="table-hover-animation mt-2" responsive>
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

                      <th>Firstname</th>
                      <th>Sirname</th>
                      <th>Gender</th>
                      <th>Username</th>

                      <th>Access Code</th>
                      {/* <th className="tb_display">Id</th> */}
                    </tr>
                  </thead>
                  <tbody>{renderTableData}</tbody>
                  <ToastContainer
                    position="bottom-left"
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
          </Row>
          <Modal
            isOpen={modal}
            toggle={() => toggleModal()}
            className="modal-dialog-centered"
            onClosed={() => setFileName("")}
          >
            <ModalHeader toggle={() => toggleModal()}>
              Export To Excel
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter File Name"
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="select"
                  id="selectFileFormat"
                  name="customSelect"
                  value={fileFormat}
                  onChange={(e) => {
                    setFileFormat(e.target.value);
                  }}
                >
                  <option>xlsx</option>
                  <option>csv</option>
                  <option>txt</option>
                </CustomInput>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => handleExport()}>
                Export
              </Button>
              <Button color="flat-danger" onClick={() => toggleModal()}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
}

ExportSelected.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classRoom: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  getStudentsForExport: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  student: state.student,
});

export default connect(mapStateToProps, { logout, getStudentsForExport })(
  withRouter(ExportSelected)
);
