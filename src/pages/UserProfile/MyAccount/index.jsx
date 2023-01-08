import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { SectionTitle } from "../../../components/Section";
import ChangeName from "../ChangeName";
import ChangePassWord from "../ChangePassWord";
import ChangePhone from "../ChangePhone";

const MyAccount = () => {
  const [detailUser, setDetailUser] = useState({});
  const newCustomer = localStorage.getItem("User").toString();
  // const [file, setFile] = useState("");
  // const handleUploadImage = async () => {
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     await axios
  //       .post(
  //         `${process.env.REACT_APP_API_URL}/api/create-img-product`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         // setFile(file.secure_url);
  //         console.log(res?.data?.res?.url);
  //         callUser(res?.data?.res?.url);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };
  const callUser = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-by-Id/${newCustomer}`)
      .then((res) => {
        console.log(res.data.customer.user);
        setDetailUser(res.data.customer.user);
        localStorage.setItem("updateName", res.data.customer.user.fullname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);
  useEffect(() => {
    callUser();
  }, [callUser, newCustomer]);
  return (
    <div className="user__content__right">
      <SectionTitle>Thông Tin Cá Nhân</SectionTitle>
      <div className="user__content__right__desc">
        {/* start user content right form */}
        <div className="user__content__right__desc__form">
          <form>
            {/* {file && (
              <img
                className="img-user"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
            <input
              type="file"
              className="form-input mr-input"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              className="form-input mr-input"
              defaultValue={detailUser?.fullname}
              disabled
            /> */}
            <input
              type="text"
              className="form-input mr-input"
              defaultValue={detailUser?.phonenumber}
              disabled
            />
            <input
              type="email"
              className="form-input mr-input"
              defaultValue={detailUser?.fullname}
              disabled
            />
            <input
              type="date"
              className="form-date mr-input"
              value={moment(detailUser?.birthday).format("YYYY-MM-DD")}
              disabled
            />
            <input
              type="text"
              className="form-input mr-input"
              defaultValue={detailUser?.address}
              disabled
            />
            {/* <div className="btn-update">
              <button className="btn-click" onClick={() => handleUploadImage()}>
                CẬP Nhật
              </button>
            </div> */}
          </form>
        </div>
        {/* end user content right form */}

        {/* start user content right update */}
        <div className="user__content__right__desc__update">
          <h3>Số Điện Thoại & Họ Tên</h3>
          <div className="user__content__right__desc__update__info">
            <div className="user__content__right__desc__update__info__name">
              <i className="bx bx-phone"></i>
              <span>Số Điện Thoại</span>
            </div>
            <ChangePhone
              phone={detailUser?.phonenumber}
              name={detailUser?.fullname}
              refresh={callUser}
            ></ChangePhone>
          </div>

          <div className="user__content__right__desc__update__info">
            <div className="user__content__right__desc__update__info__name">
              <i className="bx bx-user"></i>
              <span>Họ Tên</span>
            </div>
            <ChangeName
              name={detailUser?.fullname}
              phone={detailUser?.phonenumber}
              refresh={callUser}
            ></ChangeName>
          </div>

          <h3 className="user__content__right__desc__update__pw">Mật Khẩu</h3>
          <div className="user__content__right__desc__update__info">
            <div className="user__content__right__desc__update__info__name">
              <i className="bx bxs-key"></i>
              <span>Mật Khẩu</span>
            </div>
            <ChangePassWord pw={detailUser?.password}></ChangePassWord>
          </div>
        </div>
        {/* end user content right update */}
      </div>
    </div>
  );
};

export default MyAccount;
