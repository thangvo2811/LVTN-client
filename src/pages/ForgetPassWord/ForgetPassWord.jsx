import React, { useState } from "react";
// import Button from "../../components/Button";
import Helmet from "../../components/Helmet";
import "./style.scss";
import axios from "axios";
import { message } from "antd";
import FormInput from "../../components/FormInput";

const ForgetPassWord = () => {
  const [newEmail, setNewEmail] = useState("");
  const handleForgetPassWord = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/forgot-password/`, {
        email: newEmail,
      })
      .then((res) => {
        if (newEmail === "") {
          message.error("Mời Bạn Nhập Email");
          return;
        }
        if (res.data.errCode === 1) {
          message.error("Email Không Tồn Tại");
          return;
        }
        console.log(res.data);
        message.success("Vui Lòng Kiểm Tra Email");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgetPassWord();
  };
  const inputs = [
    {
      key: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email không hợp lệ",
      label: "Email",
      pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$",
      required: true,
    },
  ];
  const handleEmail = (e) => {
    setNewEmail(e.target.value);
  };
  return (
    <Helmet name="Quên Mật Khẩu">
      <div className="forget-pw">
        <div className="forget-pw__container">
          <div className="forget-pw__title">Quên Mật Khẩu</div>
          <div className="forget-pw__content">
            <form onSubmit={handleSubmit}>
              <div className="form-input">
                <FormInput {...inputs[0]} onChange={handleEmail}></FormInput>
              </div>
              <div className="btn-info">
                <button type="submit" className="btn-click">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ForgetPassWord;
