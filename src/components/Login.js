import { useState, useEffect } from "react";
import useInput from "../hooks/use-input";
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "");

  let formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredPasswordIsValid || !enteredUsernameIsValid) {
      return;
    }

    const TOKEN_URL = "/api/token/";
    try {
      const response = await axios.post(
        TOKEN_URL,
        JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      dispatch(authActions.login({access: response.data.access, refresh: response.data.refresh}));
      localStorage.setItem('refresh_token', response.data.refresh)
      navigate('/productlist')
    } catch (err) {
      if (!err?.response) {
        setError(true);
        setErrorMessage("No Server Response");
      } else if (err.response?.status === 400) {
        setError(true);
        setErrorMessage("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError(true);
        setErrorMessage("Unauthorized");
      } else {
        setError(true);
        setErrorMessage("Login Failed");
      }
    }

    resetPasswordInput();
    resetUsernameInput();
  };

  useEffect(() => {
    // localStorage.setItem("persist", false);
    // localStorage.setItem("refresh_token", "")
}, [])

  return (
    <div className="container-sm">
      <form onSubmit={formSubmissionHandler}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="username"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Username"
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            value={enteredUsername}
          />
          {usernameInputHasError && (
            <p className="text-danger">Username must not be empty.</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            placeholder="Password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
          />
          {passwordInputHasError && (
            <p className="text-danger">Password must not be empty.</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <div className="mb-3">
          {error && <p className="text-danger">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
