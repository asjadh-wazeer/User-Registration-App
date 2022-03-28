import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { actionTypes } from "./Reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue(); 
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      //.then((result)=> console.log(result))
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user, 
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://icon-library.com/images/web-applications-icon/web-applications-icon-3.jpg"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to User Registration App</h1>
        </div>

        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;
