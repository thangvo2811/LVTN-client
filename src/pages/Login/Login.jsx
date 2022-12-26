import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../../components/Helmet";
import { loginUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { auth, google } from "../../assets/firebase/FireBase";
import { signInWithPopup } from "firebase/auth";
import { message } from "antd";
const Login = () => {
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassWord] = useState("");

  const [userLogin, setUserLogin] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setEmail(e.target.value);
  };
  const handlePassWord = (e) => {
    setPassWord(e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const newUser = { email: emailUser, password: passwordUser };
    loginUser(dispatch, newUser, navigate);
  };
  const handleLoginGoogle = async (provider) => {
    const results = await signInWithPopup(auth, provider);
    setUserLogin(results);
    navigate("/");
    localStorage.setItem("loginNameGoogle", results.user.displayName);
    localStorage.setItem("loginGoogle", results.user.uid);
    console.log(results);
    message.success("Đăng Nhập Thành Công");
  };
  return (
    <Helmet name="Đăng nhập">
      <div className="login">
        <div className="login__container">
          <div className="login__title">Đăng nhập</div>
          <div className="login__content">
            <form onSubmit={onHandleSubmit}>
              <div className="form-input">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={inputHandler}
                />
                <label>Mật Khẩu</label>
                <input
                  type="password"
                  placeholder="Mật Khẩu"
                  onChange={handlePassWord}
                />
              </div>
              <Button size="sm" animate2={true}>
                Đăng nhập
              </Button>
            </form>

            {/* Start login social */}
            {/* <div className="login__sign">
              <div className="login__sign__phone">
                <div className="login__sign__phone__icon">
                  <i class="bx bxs-user"></i>
                </div>
                <div className="login__btnphone">
                  Sử dụng email/ Số điện thoại
                </div>
              </div>
              <div className="login__sign__gg">
                <div className="login__sign__gg__icon">
                  <i class="bx bxl-google"></i>
                </div>
                <div
                  className="login__btngg"
                  onClick={() => handleLoginGoogle(google)}
                >
                  Tiếp tục với Google
                </div>
              </div>
              <div className="login__sign__fb">
                <div className="login__sign__fb__icon">
                  <i class="bx bxl-facebook-circle"></i>
                </div>

                <div className="login__btnfb">Tiếp tục với facebook</div>
              </div>
            </div> */}
            {/* End login social */}
            <span className="login__account">
              <span>Bạn chưa có tài khoản ?</span>
              <Link to={"/register"}>
                <span> Đăng kí</span>
              </Link>
            </span>

            <div className="login__redirect">
              <Link to={"/user"}>
                <span> Quên mật khẩu ?</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
