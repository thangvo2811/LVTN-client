import React from "react";
import { useNavigate } from "react-router-dom";

import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";
import { message } from "antd";
import axios from "axios";
import numberWithCommas from "../utils/numberWithCommas";
const ProductCardViewed = (props) => {
  const idCus = localStorage.getItem("User");
  const price = props.priceProduct;
  console.log("Price", price);

  const navigate = useNavigate();
  const handleAddListProduct = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/add-too-wish-list/`, {
        cus_id: idCus,
        product_id: props.idProduct,
      })
      .then((res) => {
        if (res.data.errCode === 3) {
          message.error("Đã Có Trong Danh Sách Yêu Thích");
          return;
        }
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Đã Thêm Vào Danh Sách Yêu Thích");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="product-card-view">
        <div className="product-card-view__image">
          <img
            src={props.imgProduct}
            alt=""
            onError={(e) => {
              e.target.setAttribute("src", pd);
            }}
          />
        </div>
        <div className="product-card-view__interact">
          <div
            className="product-card-view__interact__btn"
            onClick={() => navigate("/detailproduct/" + props.idProduct)}
          >
            Xem ngay
          </div>

          <div onClick={() => handleAddListProduct(idCus, props.idProduct)}>
            <i className="bx bx-heart-circle"></i>
          </div>
        </div>
        <div className="product-card-view__info">
          <div className="product-card-view__info__title">
            {props.nameProduct}
          </div>
          <div className="product-card-view__info__price">
            {props.priceProduct ? numberWithCommas(props.priceProduct) : null}
            VNĐ
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardViewed;
