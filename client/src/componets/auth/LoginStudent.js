import React, { useState } from "react";
import { loginStudent } from "../../actions/student";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UncontrolledTooltip } from "reactstrap";

function LoginStudent({ isAuthenticated, loginStudent, isLogin, token }) {
  const [formData, setFormData] = useState({
    username: "",
    code: "",
  });

  const { username, code } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    loginStudent(username, code);
  };

  if (isAuthenticated && token) {
    return <Redirect to="/student-dashboard" />;
  }

  return (
    <form className="card-body card__width" onSubmit={onSubmit}>
      {/* Email */}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i data-feather="user" />
          </span>
        </div>
        <UncontrolledTooltip placement="top" target="positionTop">
          User your <strong>USERNAME</strong> to login
        </UncontrolledTooltip>
        <input
          id="positionTop"
          className="form-control"
          type="text"
          placeholder="USERNAME 😀"
          name="username"
          value={username}
          onChange={onChange}
        />
      </div>
      {/* Password */}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i data-feather="lock" />
          </span>
        </div>
        <input
          className="form-control"
          type="password"
          placeholder="Student code 🔒"
          name="code"
          value={code}
          onChange={onChange}
        />
      </div>
      <div className="form-group text-left mb-4">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input input-primary"
            id="customCheckdefh2"
            defaultChecked
          />
          <label className="custom-control-label" htmlFor="customCheckdefh2">
            I accept the <a href="#!"> Term &amp; condition</a>
          </label>
        </div>
      </div>
      <div className>
        <button type="submit" class="btn btn-primary btn-block mt-2">
          Log in
        </button>
        {/* <a href="students/student.html" className="btn btn-primary btn-block mt-2">Log
                        in</a> */}
      </div>
      <div className="text-left">
        <p className="text-muted py-4">
          Don’t have an account? <br />{" "}
          <strong>
            {" "}
            Join Our Community <Link to="/register">Sign Up</Link>
          </strong>
        </p>
        <p />
      </div>
    </form>
  );
}

LoginStudent.propTypes = {
  isAuthenticated: PropTypes.bool,
  loginStudent: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
  token: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.student.isAuthenticated,
  isLogin: state.student.isLogin,
  token: state.student.token,
});

export default connect(mapStateToProps, { loginStudent })(LoginStudent);
