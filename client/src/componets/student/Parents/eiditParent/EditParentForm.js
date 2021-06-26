import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function EditParentForm({ updateParent, selectedParent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  fill in the form with data from the db
  useEffect(() => {
    setName(selectedParent.name || name);
    setEmail(selectedParent.email || email);
    setPassword(selectedParent.password || password);
  }, [selectedParent.name]);

  const handleAddParent = () => {
    const parent = {
      name,
      email,
      password,
    };
    updateParent(parent);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddParent();
  };
  const onReset = () => {
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label">Parent's Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="name"
                type="text"
                className="form-control"
                placeholder
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label" htmlFor="Email">
                Email Address
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled
                name="email"
                type="email"
                className="form-control"
                id="Email"
                placeholder
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group fill">
              <label className="floating-label">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                type="password"
                className="form-control"
                id="Password"
                placeholder
              />
            </div>
          </div>
          <div className="col-sm-6 mt-4 ">
            <div className="form-group fill">
              <button
                type="reset"
                onClick={onReset}
                className="btn btn-secondary"
              >
                Reset Password
              </button>
            </div>
          </div>
          <div className="col-sm-12">
            <button type="submit" className="btn btn-primary mr-4">
              Update Parent
            </button>
            <Link to="/student-parent" className="btn btn-secondary">
              Go Back
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditParentForm;
