import React, { useCallback, useEffect, useState } from "react";
import numberWithCommas from "../../../../utils/numberWithCommas";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailOrder = () => {
  const [detailOrder, setDetailOrder] = useState();
  const [detailUser, setDetailUser] = useState({});
  const [payment, setPayMent] = useState({});

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

  const callPayMentOrder = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/get-momo-payment-link/`, {
        orderId: detailUser.id,
      })
      .then((res) => {
        if (res && res.status === 200) {
          setPayMent(res?.data?.data.qrCodeUrl);
          console.log(res?.data?.data.qrCodeUrl);
          window.location.href = res?.data?.data.qrCodeUrl;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callDetailOrder();
  }, [callDetailOrder]);
  return (
    <>
      <div className="detail-title">CHI TIẾT ĐƠN HÀNG</div>
      <div className="detail">
        <div className="detail-location">
          <div className="detail-location__title">Địa Chỉ Nhận Hàng</div>
          <div className="detail-location__name">
            Họ tên:
            <span> {detailUser.fullname}</span>
          </div>
          <div className="detail-location__address">
            Địa chỉ:
            <span> {detailUser?.Address}</span>
          </div>
          <div className="detail-location__phone">
            Số điện thoại: <span> (+84) {detailUser.phonenumber}</span>
          </div>
          <div>
            <div className="detail-location__status">THÔNG TIN ĐƠN HÀNG</div>
            <div>
              {detailUser?.paymentstatus === 2 ? (
                <div className="detail-location__status__payment">
                  Trạng Thái Thanh Toán: <span>Đã Thanh Toán</span>
                </div>
              ) : (
                <div className="detail-location__status__payment">
                  Trạng Thái Thanh Toán: <span>Chưa Thanh Toán</span>
                </div>
              )}
            </div>
            <div>
              {detailUser?.method_id === 1 ? (
                <div className="detail-location__status__method">
                  Phương Thức Thanh Toán: <span>Thanh Toán MoMo</span>
                </div>
              ) : null}
            </div>
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
          {detailUser.paymentstatus === 2 ? null : (
            <div className="payment__card" onClick={callPayMentOrder}>
              <button className="btn-pay">Thanh Toán</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailOrder;
