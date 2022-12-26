import { Input, Radio, Space } from "antd";
import Link from "antd/lib/typography/Link";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import FormInput from "../../../components/FormInput";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import numberWithCommas from "../../../utils/numberWithCommas";

const Confirm = (props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [warehouseId, setWareHouseId] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [detailUser, setDetailUser] = useState("");

  const newCustomer = localStorage.getItem("User");

  const callInfoUser = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-by-Id/${newCustomer}/`)
      .then((res) => {
        setDetailUser(res.data.customer.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);

  const callAllCartItem = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-cart-by-customer-id/${newCustomer}/`
      )
      .then((res) => {
        console.log(res);
        setCartItem(res.data.cartitem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);

  const idCart = cartItem?.map((item, index) => item.id);
  console.log("ID Cart", idCart);

  const idWareHouse = cartItem?.map((item, index) => item.warehouse_id);
  console.log("ID WareHouse", idWareHouse);

  useEffect(() => {
    callAllCartItem();
    callInfoUser();
  }, [callAllCartItem, newCustomer, callInfoUser]);

  const inputs = [
    {
      key: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email không hợp lệ",
      label: "Email",
      pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$",
      defaultValue: detailUser.email,
      required: true,
    },
    {
      key: 2,
      name: "username",
      type: "text",
      placeholder: "Họ tên",
      errorMessage: "Họ tên không được trống",
      label: "Họ tên",
      defaultValue: detailUser.fullname,
      pattern: null,
      required: true,
    },
    {
      key: 3,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "Phone phải có ít nhất 10 số",
      label: "Phone",
      defaultValue: detailUser.phonenumber,
      pattern: "[0-9]{10}",
      required: true,
    },
    {
      key: 4,
      name: "address",
      type: "text",
      placeholder: "Địa chỉ",
      errorMessage: "Địa chỉ không được trống",
      label: "Đỉa chỉ",
      defaultValue: detailUser.address,
      pattern: null,
      required: true,
    },
  ];

  return (
    <div className="payment">
      <form name="form">
        <div className="payment__content">
          <div className="payment__content__form">
            <div className="form-input">
              <FormInput
                {...inputs[0]}
                onChange={(e) => setEmail(e.target.value)}
              ></FormInput>
              <FormInput
                {...inputs[1]}
                onChange={(e) => setName(e.target.value)}
              ></FormInput>
              <FormInput
                {...inputs[2]}
                onChange={(e) => setPhone(e.target.value)}
              ></FormInput>
              <FormInput
                {...inputs[3]}
                onChange={(e) => setAddress(e.target.value)}
              ></FormInput>
              <div
                className="btn-info"
                onClick={() => {
                  props.createOrder(
                    detailUser.fullname,
                    detailUser.email,
                    detailUser.address,
                    detailUser.phonenumber,
                    newCustomer,
                    warehouseId,
                    idCart
                  );
                  props.continue();
                }}
              >
                <button type="submit" className="btn-click">
                  Tiếp Tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Confirm;
