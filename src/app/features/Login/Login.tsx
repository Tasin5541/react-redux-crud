import React from "react";
import { Redirect } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import login_image from "../../../assets/images/login_image.png";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { userAuth, handleUserLogin } from "./loginSlice";
import { menuRoutes } from "../../../constants/menuRoutes.constants";
import "./login.scss";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<userAuth>();

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const loginError = useAppSelector((state) => state.auth.error);

  const onSubmitLoginForm: SubmitHandler<userAuth> = (data) => {
    let userData: userAuth = {
      email: data.email,
      password: data.password,
    };
    //e.preventDefault();
    dispatch(handleUserLogin(userData));
  };

  if (isLoggedIn) {
    return <Redirect to={menuRoutes.length > 0 ? menuRoutes[0].path : "/failed"} />;
  }

  return (
    <div className="limiter">
      <div className="container-login d-flex">
        <div className="wrap-login d-flex">
          <div className="login-pic">
            <img src={login_image} alt="IMG" />
          </div>

          <form className="login-form validate-form" onSubmit={handleSubmit(onSubmitLoginForm)}>
            <span className="login-form-title">Login</span>
            <span className="txt-red">{loginError}</span>

            <div className="wrap-input">
              <input {...register("email")} className="input" type="text" name="email" placeholder="Email" required />
              <span className="focus-input"></span>
              <span className="symbol-input d-flex">
                <EmailIcon fontSize="small" />
              </span>
            </div>

            <div className="wrap-input">
              <input {...register("password")} className="input" type="password" name="password" placeholder="Password" required />
              <span className="focus-input"></span>
              <span className="symbol-input d-flex">
                <LockIcon fontSize="small" />
              </span>
            </div>

            <div className="container-login-form-btn d-flex">
              <button type="submit" className="login-form-btn d-flex">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
