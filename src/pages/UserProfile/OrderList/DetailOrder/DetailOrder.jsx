import React, { useCallback, useEffect, useState } from "react";
import numberWithCommas from "../../../../utils/numberWithCommas";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailOrder = () => {
  const [detailOrder, setDetailOrder] = useState();
  const [detailUser, setDetailUser] = useState({});
  const param = useParams();
  const callDetailOrder = useCallback(async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-order-detail/${param.id}/`)
      .then((res) => {
        setDetailOrder(res.data.data);
        setDetailUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id]);
  useEffect(() => {
    callDetailOrder();
  }, [callDetailOrder]);
  return (
    <>
      <div className="detail-title">CHI TIẾT ĐƠN HÀNG</div>
      <div className="detail">
        <div className="detail-location">
          <div className="detail-location__title">Địa Chỉ Nhận Hàng</div>
          <div className="detail-location__name">{detailUser.fullname}</div>
          <div className="detail-location__address">
            2266/14/29/10, đường Huỳnh Tấn Phát, Tổ 6, Ấp 3, Phú Xuân, Huyện Nhà
            Bè
          </div>
          <div className="detail-location__phone">
            (+84) {detailUser.phonenumber}
          </div>
        </div>
        <div className="detail-content">
          {detailOrder?.listOrder.map((item, index) => (
            <>
              <div className="detail-item">
                <div className="detail-item__image">
                  <img src={item?.img} alt="" />
                  <div className="detail-item__info">
                    <div className="detail-item__info__title"></div>
                    <div className="detail-item__info__id">
                      Tên sản phẩm: {item?.Orderitem?.name}
                    </div>
                    <div className="detail-item__info__price">
                      Số lượng:{item?.Orderitem?.TotalQuantity}
                    </div>
                    <div className="detail-item__info__price">
                      Giá:{numberWithCommas(item?.Orderitem?.price)} VNĐ
                    </div>
                    <div className="detail-item__info__price">
                      Mã Đơn Hàng: {item?.Orderitem?.serinumber}
                    </div>
                  </div>
                </div>

                <div className="detail-item__total">
                  <div className="detail-item__total__total">
                    Tổng : {numberWithCommas(item.Orderitem.TotalPrice)} VNĐ
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailOrder;
