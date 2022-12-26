import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailWarranty = () => {
  const [detailWarranty, setDetailWarranty] = useState({});

  const param = useParams();

  const callDetail = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-detail-warranty/${param.id}/`
      )
      .then((res) => {
        setDetailWarranty(res.data.warranty);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id]);
  useEffect(() => {
    callDetail();
  }, [callDetail]);
  return (
    <>
      <div className="detail-title">THÔNG TIN BẢO HÀNH</div>
      <div className="detail">
        <div className="detail-warranty">
          {detailWarranty?.WarrantyInfor?.map((item, index) => (
            <>
              <div className="detail-item">
                <div className="detail-item__info">
                  <div className="detail-item__info__title">{item.infor}</div>
                  <div className="detail-item__info__id">
                    Tên sản phẩm: <span>{item.name}</span>
                  </div>
                  <div className="detail-item__info__price">
                    Nội Dung: <span>{item.description}</span>
                  </div>

                  <div className="detail-item__info__price">
                    Mã Đơn Hàng: <span>{item.serinumber}</span>
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

export default DetailWarranty;
