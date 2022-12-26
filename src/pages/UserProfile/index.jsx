import React, { useCallback, useEffect } from "react";
import "./_userprofile.scss";
import pf from "../../assets/images/UserProfile/man.jpg";

import { useState } from "react";

import WishList from "./WishList";
import { Tabs } from "antd";
import MyAccount from "./MyAccount";
import Viewed from "./Viewed";

import OrderList from "./OrderList/index";
import Warranty from "./Warranty";

const UserProfile = (props) => {
  const [tabPosition, setTabPosition] = useState("left");
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  // const changeTabPosition = (e) => {
  //   setTabPosition(e.target.value);
  // };

  const tabContent = [
    {
      label: (
        <div className="user__content__left__card__item">
          <i className="bx bx-user "></i>
          <span>Thông Tin Cá Nhân</span>
        </div>
      ),
      key: 1,
      children: <MyAccount parentCallback={callbackFunction} />,
    },
    {
      label: (
        <div className="user__content__left__card__item">
          <i className="bx bx-heart "></i>
          <span>Danh Sách Yêu Thích</span>
        </div>
      ),
      key: 2,
      children: <WishList />,
    },
    {
      label: (
        <div className="user__content__left__card__item">
          <i className="bx bx-hide"></i>
          <span>Sản Phẩm Đã Xem</span>
        </div>
      ),
      key: 3,
      children: <Viewed />,
    },
    {
      label: (
        <div className="user__content__left__card__item">
          <i class="bx bxs-shopping-bag-alt"></i>
          <span>Danh Sách Đơn Hàng</span>
        </div>
      ),
      key: 4,
      children: <OrderList />,
    },
    {
      label: (
        <div className="user__content__left__card__item">
          <i class="bx bxs-cog"></i>
          <span>Bảo Hành</span>
        </div>
      ),
      key: 5,
      children: <Warranty />,
    },
  ];
  useEffect(() => {}, [reloadPage]);
  return (
    <>
      <div className="user__profile">
        <p className="user__profile__url">
          Home | <span className="user__profile__url__main">Tài Khoản</span>
        </p>
      </div>
      <div className="user__content">
        {/* star user content left */}
        <div className="user__content__left">
          <div className="user__content__left__profile">
            <img src="" alt="" className="user__content__left__profile__img" />
          </div>
          <div className="user__content__left__card">
            <Tabs
              tabPosition={tabPosition}
              items={tabContent.map((tab) => {
                return tab;
              })}
            />
          </div>
        </div>
        {/* end user content left */}

        {/* start user content right */}

        {/* end user content right */}
      </div>
    </>
  );
};

export default UserProfile;
