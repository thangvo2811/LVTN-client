import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Helmet from "./../../components/Helmet";
import axios from "axios";
import { message } from "antd";

const EmailActive = () => {
  const navigate = useNavigate();
  const callActiveEmail = async () => {
    const queryString = window.location.search.split("?userId=");
    const filter = queryString.filter((item) => item !== "");
    console.log("filter: ", filter);
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/acctive-user-account/${filter}/`
      )
      .then((res) => {
        if (res.data.errCode === 0) {
          console.log(res.data);
          navigate("/login");
          setTimeout(() => {
            message.success("Kích Hoạt Email Thành Công");
          }, 1000);
          return;
        }
        message.error("Kích Hoạt Email Thất Bại");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Helmet name="Email">
      <div className="active-email">
        <div className="active-email__container">
          <div className="active-email__title">Email</div>
          <div className="active-email__content">
            Cảm ơn bạn đã đăng ký tài khoản trên hệ thống PT shop. Mời bạn xác
            nhận.
          </div>
          <div className="btn-active">
            <button className="btn-accept" onClick={callActiveEmail}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default EmailActive;
