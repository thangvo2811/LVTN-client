import React, { useState } from "react";
import { Button, message, Steps } from "antd";

import "./style.scss";
import CheckProduct from "./CheckProduct/CheckProduct";
import Pay from "./Confirm/Confirm";
import Confirm from "./Confirm/Confirm";
import PaymentDetail from "./Pay/PaymentDetail";
import axios from "axios";

const Payment = () => {
  const [current, setCurrent] = useState(0);
  const [orderId, setOrderId] = useState("");

  const callCreateOrder = async (
    name,
    email,
    address,
    phone,
    newCustomer,
    idWareHouse,
    idCart
  ) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/create-order-user/`, {
        fullname: name,
        email: email,
        Address: address,
        phonenumber: phone,
        voucher_id: "",
        method_id: 1,
        cus_id: newCustomer,
        warehouse_id: 1,
        cartitem: idCart,
      })
      .then((res) => {
        console.log(res.data);
        setOrderId(res.data.data.Orderid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const next = () => {
    setCurrent(current + 1);
    console.log("Step", current);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Kiểm Tra Sản Phẩm",
      content: <CheckProduct />,
    },
    {
      title: "Thông Tin Khách Hàng",
      content: <Confirm continue={next} createOrder={callCreateOrder} />,
    },
    {
      title: "Thanh Toán",
      content: <PaymentDetail idOrder={orderId} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <div className="payment">
        <Steps current={current} items={items} />
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current === 1 ? null : (
            <>
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Tiếp Theo
                </Button>
              )}
              {/* {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Xong
            </Button>
          )} */}
              {current > 0 && (
                <Button
                  style={{
                    margin: "0 8px",
                  }}
                  onClick={() => prev()}
                >
                  Quay Lại
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
