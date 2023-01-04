import React from "react";

import AddComment from "../pages/Comment/AddComment";
import numberWithCommas from "../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";
import DeleteOrder from "../pages/UserProfile/OrderList/DeleleOrder";

const orderStatus = [
  {
    id: 1,
    name: "Đơn hàng đang chờ xác nhận",
  },
  {
    id: 2,
    name: "Đơn hàng đang được chuẩn bị",
  },
  {
    id: 3,
    name: "Đơn hàng đang được giao",
  },
  {
    id: 4,
    name: "Đơn hàng giao thành công",
  },
  {
    id: 5,
    name: "Đơn hàng đã bị hủy",
  },
];
const Orderitem = (props) => {
  const orderItem = props.orderItem;
  const itemOrder = props.item;

  console.log("StatusPay", itemOrder.paymentstatus);
  const id = props.idOrderDetail;

  const navigate = useNavigate();

  return (
    <div className="order-content">
      <div className="order-title">
        <div className="order-id">
          Mã Đơn Hàng: <span className="order-id-code">{itemOrder.code}</span>
        </div>
        <div className="order-detail-status">
          <div className="order-name">Trạng Thái:</div>
          {orderStatus?.map((item, index) => (
            <div className="order-status">
              {item.id === props.statusOrder ? item.name : null}
            </div>
          ))}
        </div>
      </div>
      <div className="order-item">
        <div className="order-item__image">
          <img
            src={orderItem.img}
            alt=""
            onClick={() => navigate("/detailorder/" + id)}
          />
          <div className="order-item__info">
            <div className="order-item__info__title"></div>
            <div className="order-item__info__id">
              Tên sản phẩm: {orderItem.Orderitem.name}
            </div>
            <div className="order-item__info__price">
              Số lượng: {orderItem.Orderitem.TotalQuantity}
            </div>
          </div>
        </div>

        <div className="order-item__total">
          <div className="order-item__total__total">
            Tổng : {numberWithCommas(orderItem.Orderitem.TotalPrice)} VND
          </div>
        </div>
      </div>
      <div className="order-item__pay">
        {itemOrder.paymentstatus === 2 ? (
          <div className="order-item__pay">Đã Thanh Toán</div>
        ) : null}
      </div>
      <div className="btn-delete">
        {orderStatus?.map((item, index) => (
          <div>
            {item.id === 4 && props.statusOrder === 4 ? (
              <AddComment
                img={orderItem.img}
                idProduct={orderItem.id}
                reloadPage={props.parentCallback()}
              ></AddComment>
            ) : null}
            {(item.id === 1 &&
              props.statusOrder === 1 &&
              itemOrder.paymentstatus !== 2) ||
            (item.id === 2 &&
              props.statusOrder === 2 &&
              itemOrder.paymentstatus !== 2) ? (
              <DeleteOrder
                id={itemOrder.id}
                reloadPage={props.parentCallback()}
              ></DeleteOrder>
            ) : null}
          </div>
        ))}
      </div>
      {/* {itemOrder.paymentstatus === 2 ? null : null} */}
    </div>
  );
};

export default Orderitem;
