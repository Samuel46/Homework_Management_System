import React, { Fragment, useState, useEffect } from "react";
import XLSX from "xlsx";
import classnames from "classnames";
import Uppy from "@uppy/core";
import { Download, UserPlus, X } from "react-feather";
import { addClassRoom, getClasses } from "../../../../../actions/classRoom";
import { DragDrop } from "@uppy/react";
import { toast, ToastContainer } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
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
import { getTeachers, registerTeacher } from "../../../../../actions/teacher";
import { getStudents, registerStudent } from "../../../../../actions/student";
import { getSubject, addSubject } from "../../../../../actions/subject";
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

const ClassImport = ({
  auth: { user },
  logout,
  addClassRoom,
  getClasses,
  classRoom: { classes },
  getTeachers,
  teacher: { teachers },
  history,
  registerTeacher,
  getStudents,
  registerStudent,
  getSubject,
  addSubject,
  student: { students },
  subject: { subjects },
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

  // get all classes
  useEffect(() => {
    getClasses();
  }, []);

  // get all teachers
  useEffect(() => {
    getTeachers();
  }, []);

  // get all students
  useEffect(() => {
    getStudents();
  }, []);

  // get all Subjects
  useEffect(() => {
    getSubject();
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

  // render all the subjects

  const subjectFromDB = subjects.map((subject) => subject.subject_name);
  console.log(subjectFromDB, "subjetcss");

  //  render all classes form the   db
  const classRoomFromDb = classes.map((room) => room.name);
  // render all teachers
  const teachersFrommDB = teachers.map(
    (teacher) => teacher.firstname + " " + teacher.sirname
  );

  // render all the students
  const studentsFromDB = students.map(
    (student) => student.firstname + " " + student.sirname
  );
  console.log(studentsFromDB, "here");

  const allTeacherNames = dataArr?.map((fullname) =>
    studentsFromDB?.includes(fullname.StdFirstname + " " + fullname?.StdSirname)
  );
  console.log(allTeacherNames, "this are the teachers");
  console.log(dataArr, "db teacher");

  // Create classes
  const handleExport = () => {
    dataArr.map((item) => {
      if (
        selectedRows.includes(item.Classname) &&
        classRoomFromDb?.includes(item?.Classname) == false &&
        teachersFrommDB?.includes(item?.Firstname + " " + item?.Sirname) ==
          false &&
        subjectFromDB?.includes(item?.subject_name) == false &&
        studentsFromDB?.includes(item?.Firstname + " " + item?.Sirname) == false
      ) {
        // Register students

        const studentObj = {
          firstname: item?.StdFirstname,
          sirname: item?.StdSirname,
          username: item?.Username,
          code: item?.Code,
          gender: item?.Gender,
        };

        // Register subjects
        const subjectObj = {
          subject_name: item?.SubjectName,
          add_classes: item?.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
        };

        // register new teachers from Spreadsheet
        const teacherObj = {
          firstname: item.Firstname,
          sirname: item.Sirname,
          title: item.Title,
          password: 12345,
          allocate_classes: item.Classname,
          email: item.TeacherEmail,
        };

        //  add new classes from spreadsheet
        const obj = {
          name: item.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
          add_subjects: item?.SubjectName,
          add_students: item?.StdFirstname + " " + item?.StdSirname,
        };

        addClassRoom(obj, history) &&
          registerStudent(studentObj, history) &&
          registerStudent(studentObj, history) &&
          addSubject(subjectObj, history) &&
          registerTeacher(teacherObj, history);
      }
      // edge case for the teachers- done
      else if (
        selectedRows.includes(item.Classname) &&
        classRoomFromDb?.includes(item?.Classname) == false &&
        teachersFrommDB?.includes(item?.Firstname + " " + item?.Sirname) ==
          true &&
        subjectFromDB?.includes(item?.subject_name) == false
      ) {
        const obj = {
          name: item.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
          add_subjects: item?.SubjectName,
        };

        addClassRoom(obj, history);

        const studentObj = {
          firstname: item?.StdFirstname,
          sirname: item?.StdSirname,
          username: item?.Username,
          code: item?.Code,
          gender: item?.Gender,
        };
        registerStudent(studentObj, history);

        // Register subjects
        const subjectObj = {
          subject_name: item?.SubjectName,
          add_classes: item?.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
        };

        addSubject(subjectObj, history);
      }

      // edge case for students- done
      else if (
        selectedRows.includes(item.Classname) &&
        classRoomFromDb?.includes(item?.Classname) == false &&
        teachersFrommDB?.includes(item?.Firstname + " " + item?.Sirname) ==
          false &&
        subjectFromDB?.includes(item?.subject_name) == false &&
        studentsFromDB?.includes(item?.Firstname + " " + item?.Sirname) == true
      ) {
        // Register subjects
        const subjectObj = {
          subject_name: item?.SubjectName,
          add_classes: item?.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
        };

        addSubject(subjectObj, history);

        const obj = {
          name: item.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
          add_subjects: item?.SubjectName,
          add_students: item?.StdFirstname + " " + item?.StdSirname,
        };

        addClassRoom(obj, history);
        // register new teachers from Spreadsheet
        const teacherObj = {
          firstname: item.Firstname,
          sirname: item.Sirname,
          title: item.Title,
          password: 12345,
          allocate_classes: item.Classname,
          email: item.TeacherEmail,
        };
        registerTeacher(teacherObj, history);
      }
      // edge case for subjects- done
      else if (
        selectedRows.includes(item.Classname) &&
        classRoomFromDb?.includes(item?.Classname) == false &&
        teachersFrommDB?.includes(item?.Firstname + " " + item?.Sirname) ==
          false &&
        subjectFromDB?.includes(item?.subject_name) == true &&
        studentsFromDB?.includes(item?.Firstname + " " + item?.Sirname) == false
      ) {
        const studentObj = {
          firstname: item?.StdFirstname,
          sirname: item?.StdSirname,
          username: item?.Username,
          code: item?.Code,
          gender: item?.Gender,
        };
        registerStudent(studentObj, history);

        const teacherObj = {
          firstname: item.Firstname,
          sirname: item.Sirname,
          title: item.Title,
          password: 12345,
          allocate_classes: item.Classname,
          email: item.TeacherEmail,
        };
        registerTeacher(teacherObj, history);

        const obj = {
          name: item.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
          add_subjects: item?.SubjectName,
          add_students: item?.StdFirstname + " " + item?.StdSirname,
        };

        addClassRoom(obj, history);
      } else if (
        selectedRows.includes(item.Classname) &&
        classRoomFromDb?.includes(item?.Classname) == false &&
        teachersFrommDB?.includes(item?.Firstname + " " + item?.Sirname) ==
          true &&
        subjectFromDB?.includes(item?.subject_name) == true &&
        studentsFromDB?.includes(item?.Firstname + " " + item?.Sirname) == true
      ) {
        const obj = {
          name: item.Classname,
          assign_teachers:
            item.Title + " " + item.Firstname + " " + item.Sirname,
          add_subjects: item?.SubjectName,
          add_students: item?.StdFirstname + " " + item?.StdSirname,
        };

        addClassRoom(obj, history);
      } else {
        notify(
          <>
            <div className="toastify-body">
              <span role="img" aria-label="toast-text">
                👋{item.Classname} already exists!
              </span>
            </div>
          </>,
          true
        );
      }
    });

    toggleModal();
  };

  // Register student

  // const studentSpreadsheet =  dataArr
  //   useEffect(() => {

  //     const NewStudent = () => {
  //       registerStudent({
  //         firstname,
  //         sirname,
  //         email,
  //         username,
  //         code,
  //         birth_date,
  //         gender,
  //         joining_date,
  //         joining_year_group,
  //         current_year_group,

  //       })
  //     }
  //     NewT()

  //   },[handleExport])

  //  select classrooms
  const handleSelect = (name) => {
    const selectedRowsArr = selectedRows;
    if (!selectedRowsArr.includes(name)) {
      selectedRowsArr.push(name);
    } else if (selectedRowsArr.includes(name)) {
      selectedRowsArr.splice(selectedRowsArr.indexOf(name), 1);
    } else {
      return null;
    }

    setSelectedRows([...selectedRowsArr]);
  };

  // select all students
  const handleSelectAll = () => {
    let selectedRowsArr = selectedRows;
    if (selectedRowsArr.length < dataArr.length) {
      const ids = dataArr.map((i) => i.Classname);
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
            key={col.Classname || index}
            className={classnames({
              selected: selectedRows.includes(col.Classname),
            })}
          >
            <td>
              <CustomInput
                type="checkbox"
                id={col.Classname}
                label=""
                checked={!!selectedRows.includes(col.Classname)}
                onChange={() => handleSelect(col.Classname)}
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

  const handleExportClasses = () => {
    return dataArr?.map((item, index) => {
      if (
        selectedRows.includes(item.Classname) &&
        classRoomFromDb?.includes(item?.Classname) == false
      ) {
        return (
          <tr key={item.Classname || index}>
            <td>
              {" "}
              {""}
              <ListGroup>
                <ListGroupItem color="info" className="mb-2">
                  {" "}
                  {""} ✔✔ {""}
                  {item.Classname}
                </ListGroupItem>
              </ListGroup>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.Classname || index}>
            <td>
              {" "}
              {""}
              <ListGroup>
                <ListGroupItem color="danger" className="mb-2">
                  <h6>
                    {" "}
                    ❌<small>Class Already Exist</small>{" "}
                  </h6>{" "}
                  {item.Classname}
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
                    <h5 className="m-b-10">Import Classrooms</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">{user && user.name}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div div className="row dash_width">
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
                    Go Back🚀
                  </Link>
                </div>
              </div>
            </div>
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
                    Manage Students😀
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
                    Upload Classrooms 👇 <strong>Spreadsheet Only</strong>
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
                    <div className="d-flex align-items-center justify-content-end">
                      <Label for="search-input" className="mr-1">
                        Search
                      </Label>

                      <Input
                        id="search-input"
                        type="text"
                        bsSize="sm"
                        value={value}
                        onChange={(e) => handleFilter(e)}
                      />
                    </div>
                  </CardHeader>
                  <div className="row align-items-center m-l-0 py-3">
                    <div className="col-sm-4">
                      <Button
                        onClick={() => toggleModal()}
                        className="btn btn-primary btn-sm mb-3 btn-round"
                      >
                        <UserPlus /> Add Selected
                      </Button>
                    </div>
                    <div className="col-sm-4 "></div>
                    <div className="col-sm-4 text-right"></div>
                  </div>

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
              <h6>New Classrooms</h6>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Table className="table-hover-animation" responsive>
                  <thead>
                    <tr>
                      <th>Classname</th>
                    </tr>
                  </thead>
                  <tbody>{handleExportClasses()}</tbody>
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

ClassImport.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addClassRoom: PropTypes.func.isRequired,
  getClasses: PropTypes.func.isRequired,
  classRoom: PropTypes.object.isRequired,
  getTeachers: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,
  registerTeacher: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  registerStudent: PropTypes.func.isRequired,
  getSubject: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired,
  addSubject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  classRoom: state.classRoom,
  teacher: state.teacher,
  student: state.student,
  subject: state.subject,
});

export default connect(mapStateToProps, {
  logout,
  getClasses,
  getTeachers,
  addClassRoom,
  registerTeacher,
  getStudents,
  registerStudent,
  getSubject,
  addSubject,
})(withRouter(ClassImport));
