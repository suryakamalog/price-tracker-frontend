import { useState } from "react";
import useInput from "../hooks/use-input";

const SignUp = () => {
  const [error, setError] = useState(false);
  const {
    value: enteredUsername,
    isValid: enteredUsernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsernameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword1,
    isValid: enteredPassword1IsValid,
    hasError: password1InputHasError,
    valueChangeHandler: password1ChangeHandler,
    inputBlurHandler: password1BlurHandler,
    reset: resetPassword1Input,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPassword2,
    isValid: enteredPassword2IsValid,
    hasError: password2InputHasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2Input,
  } = useInput((value) => value.trim() !== "");

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (
      !enteredUsernameIsValid ||
      !enteredEmailIsValid ||
      !enteredPassword1IsValid ||
      !enteredPassword2IsValid
    ) {
      return;
    }

    const url = "http://127.0.0.1:8000/api/register/";
    const data = {
      email: enteredEmail,
      username: enteredUsername,
      password: enteredPassword1,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      if (!response.ok) {
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }

    resetUsernameInput();
    resetEmailInput();
    resetPassword1Input();
    resetPassword2Input();
  };

  return (
    <div className="container-sm">
      <form onSubmit={formSubmissionHandler}>
        <div className="mb-3">
          {error && <p className="text-danger">Error occurred!!!</p>}
        </div>
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
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={enteredEmail}
          />
          {emailInputHasError && (
            <p className="text-danger">Email must not be empty.</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword1"
            placeholder="Password"
            onChange={password1ChangeHandler}
            onBlur={password1BlurHandler}
            value={enteredPassword1}
          />
          {password1InputHasError && (
            <p className="text-danger">Password must not be empty.</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Re-enter Password</label>
          <input
            type="password"
            className="form-control"
            id="inputPassword2"
            placeholder="Re-enter Password"
            onChange={password2ChangeHandler}
            onBlur={password2BlurHandler}
            value={enteredPassword2}
          />
          {password2InputHasError && (
            <p className="text-danger">Password must not be empty.</p>
          )}
          {enteredPassword1 !== enteredPassword2 && (
            <p className="text-danger">Password must be same as above.</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
