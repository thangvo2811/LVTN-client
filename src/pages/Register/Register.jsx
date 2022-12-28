import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";
import axios from "axios";
import "antd/dist/antd.css";
import { message } from "antd";
import Button from "./../../components/Button";
import FormInput from "../../components/FormInput";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    birthday: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [allCity, setAllCity] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [cityById, setCityById] = useState("");
  const [districtById, setDistrictById] = useState("");

  const [idUser, setIdUser] = useState({});

  const localUrl = "http://localhost:3000";
  const currentUrl = localUrl;

  // const callAllUser = async (id) => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/api/get-by-Id/${id}/`)
  //     .then((res) => {
  //       setIdUser(res.data.customer);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const newId = idUser.user;
  // console.log("ID User", newId);

  // useEffect(() => {
  //   callAllUser();
  // }, [newId]);
  const callApi = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/sign-up-user/`, {
        email: email,
        password: password,
        fullname: userName,
        phonenumber: phone,
        avatar: "",
        birthday: birthDay,
        address: address,
      })
      .then((res) => {
        if (res.data.errCode === 0) {
          message.success("Vui Lòng Kiểm Tra Email");

          return;
        }
        if (res.data.errCode === 1) {
          message.error("Email Đã Có Người Sử Dụng");
          return;
        }
        if (res.data.errCode === 2) {
          message.error("Mời Bạn Nhập Thông Tin");
          return;
        }
        setValues(res);
      })
      .catch(() => {
        message.error("Đăng Ký Thất Bại");
      });
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

    {
      key: 2,
      name: "password",
      type: "password",
      placeholder: "Mật khẩu",
      errorMessage: "8-20 kí tự và có ít nhất một kí tự chữ, một kí tự số",
      label: "Mật khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },

    {
      key: 3,
      name: "username",
      type: "text",
      placeholder: "Họ tên",
      errorMessage: "Mời bạn nhập tên",
      label: "Họ tên",
      pattern: null,
      required: true,
    },
    {
      key: 4,
      name: "phone",
      type: "text",
      placeholder: "Số điện thoại",
      errorMessage: "Số điện thoại phải có ít nhất 10 số",
      label: "Số điện thoại",
      pattern: "[0-9]{10}",
      required: true,
    },
    {
      key: 5,
      name: "birthday",
      type: "date",
      placeholder: "Ngày Sinh",
      errorMessage: "Năm sinh không được trống",
      label: "Ngày Sinh",
      pattern: "YYYY-MM-DD",
      required: true,
    },
    {
      key: 6,
      name: "address",
      type: "text",
      placeholder: "Địa chỉ",
      errorMessage: "Địa chỉ không được trống",
      label: "Đỉa chỉ",
      pattern: null,
      required: true,
    },
  ];

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassWord(e.target.value);
  };
  const handleName = (e) => {
    setUserName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleDate = (e) => {
    setBirthDay(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    callApi();
  };

  const callAllCity = async (id) => {
    await axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then((res) => {
        console.log(res.data.results);
        setAllCity(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callAllDistrict = async (id) => {
    await axios
      .get(`https://vapi.vnappmob.com//api/province/district/${id}`)
      .then((res) => {
        console.log(res.data.results);
        setAllDistrict(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllCity();
    callAllDistrict(cityById);
  }, [cityById]);

  console.log({ cityById, districtById });
  return (
    <Helmet name="Đăng kí">
      <div className="register">
        <div className="register__container">
          <div className="register__title">Đăng kí</div>
          <div className="register__content">
            <form onSubmit={onHandleSubmit}>
              <div className="form-input">
                <FormInput {...inputs[0]} onChange={handleEmail}></FormInput>
                <FormInput {...inputs[1]} onChange={handlePassword}></FormInput>
                <FormInput {...inputs[2]} onChange={handleName}></FormInput>
                <FormInput {...inputs[3]} onChange={handlePhone}></FormInput>
                <FormInput {...inputs[4]} onChange={handleDate}></FormInput>
                <label>Thành Phố</label>
                <select onChange={(e) => setCityById(e.target.value)}>
                  <option>Chọn Thành Phố/ Tỉnh</option>
                  {allCity?.map((item, index) => (
                    <option key={index} value={item.province_id}>
                      {item.province_name}
                    </option>
                  ))}
                </select>
                <label>Quận/ Huyện</label>
                <select onChange={(e) => setDistrictById(e.target.value)}>
                  <option>Chọn Quận/ Huyện</option>
                  {allDistrict?.map((item, index) => (
                    <option key={index} value={item.district_id}>
                      {item.district_id ? item.district_name : ""}
                    </option>
                  ))}
                </select>
                <FormInput {...inputs[5]} onChange={handleAddress}></FormInput>
              </div>
              <Button size="sm" animate2={true}>
                ĐĂNG KÝ
              </Button>
            </form>
            {/* Start login social */}
            {/* <div className="login__sign">
              <div className="login__sign__gg">
                <div className="login__sign__gg__icon">
                  <i class="bx bxl-google"></i>
                </div>
                <div className="login__btngg">Tiếp tục với Google</div>
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
              <span> Đã có tài khoản?</span>
              <Link to={"/login"}>
                <span> Đăng nhập</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Register;
