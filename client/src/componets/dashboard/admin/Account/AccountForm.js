import React, { useEffect, useState } from "react";
import Spinner from "../../../layouts/Spinner";
import { Link, withRouter } from "react-router-dom";
import { UncontrolledTooltip } from "reactstrap";

function AccountForm({ updateSchool, user, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //    fill
  useEffect(() => {
    setName(user.name || name);
    setEmail(user.email || email);
    setPassword(user.password || password);
  }, [user.name, user.email, user.password]);

  const handleUpdateSchool = () => {
    const obj = {
      name,
      email,
      password,
    };

    updateSchool(obj, history);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleUpdateSchool();
  };

  const onReset = () => {
    setPassword("");
  };

  return user !== null && user !== undefined ? (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="reg__pad">
        <div className="row">
          <div className="input-group mb-3 col-md-6">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i data-feather="user" />
              </span>
            </div>
            <input
              className="form-control"
              type="text"
              placeholder="School Name 🏩"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* email address */}
          <div className="input-group mb-3 col-md-6">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i data-feather="mail" />
              </span>
            </div>
            <input
              className="form-control"
              type="email"
              placeholder="Email Address 📧"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* password one */}
          <UncontrolledTooltip placement="top" target="positionTop">
            This is your encripted <strong>PASSWORD</strong> hit the reset
            button to change it🤗
          </UncontrolledTooltip>
          <div className="col-sm-6">
            <div class="form-group fill ">
              <label for="">Password</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    onClick={onReset}
                  >
                    Reset Password 🔐
                  </button>
                </div>
                <input
                  id="positionTop"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="col-md-6"></div>
          <div className="col-sm-12 mt-2">
            <button type="submit" className="btn btn-primary mr-2">
              Update School
            </button>
            <Link to="/manage-classrooms" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Spinner />
  );
}

export default withRouter(AccountForm);
