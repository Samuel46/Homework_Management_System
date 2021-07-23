import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import { numbers } from "./characters";
import "react-toastify/dist/ReactToastify.css";
import { COPY_SUCCESS } from "./message";
import { Check } from "react-feather";

function CodeGenerator() {
  const [password, setPassword] = useState("");
  const handleGeneratePassword = (e) => {
    let characterList = "0123456789";
    setPassword(createPassword(characterList));
  };
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < 4; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = (e) => {
    e.preventDefault();
    if (password === "") {
      notify("Nothing To Copy", true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h2 className="generator__header">Generate Code</h2>
          <div className="generator__password">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy__btn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <button
            onClick={handleGeneratePassword}
            className="btn btn-light-primary mr-2"
          >
            Generate Code
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default CodeGenerator;
