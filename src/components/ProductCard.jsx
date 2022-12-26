import React, { useState } from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../utils/numberWithCommas";
import { Link, useNavigate } from "react-router-dom";

import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";
import axios from "axios";
import { message } from "antd";

const ProductCard = (props) => {
  const product = props.product;
  const navigate = useNavigate();
  const idCus = localStorage.getItem("User");
  console.log(product.id);

  const handleAddListProduct = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/add-too-wish-list/`, {
        cus_id: idCus,
        product_id: product.id,
      })
      .then((res) => {
        if (res.data.errCode === 3) {
          message.error("Đã Có Trong Danh Sách Yêu Thích");
          return;
        }
        console.log(res);
        message.success("Đã Thêm Vào Danh Sách Yêu Thích");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAddViewed = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/add-to-view/`, {
        cus_id: idCus,
        product_id: product.id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hanldeClickAdd = (e) => {
    e.preventDefault();
    message.error("Bạn Chưa Đăng Nhập");
  };
  return (
    <>
      <div className="product-card">
        <div className="product-card__image">
          <img
            src={product.img}
            alt=""
            onError={(e) => {
              e.target.setAttribute("src", pd);
            }}
          />
        </div>
        <div className="product-card__interact">
          {idCus ? (
            <div
              className="product-card__interact__btn"
              onClick={() => {
                navigate("/detailproduct/" + product.id);
                handleAddViewed(idCus, product.id);
              }}
            >
              Xem ngay
            </div>
          ) : (
            <div
              className="product-card__interact__btn"
              onClick={() => navigate("/detailproduct/" + product.id)}
            >
              Xem ngay
            </div>
          )}

          {/* {idCus ? (
            <div>
              <i className="bx bxs-cart-add"></i>
            </div>
          ) : (
            <div onClick={hanldeClickAdd}>
              <Link to={"/login"}>
                {" "}
                <i className="bx bxs-cart-add"></i>
              </Link>
            </div>
          )} */}

          {idCus ? (
            <div>
              <i
                onClick={() => handleAddListProduct(idCus, product.id)}
                className="bx bx-heart-circle"
              ></i>
            </div>
          ) : (
            <div onClick={hanldeClickAdd}>
              <Link to={"/login"}>
                {" "}
                <i className="bx bx-heart-circle"></i>
              </Link>
            </div>
          )}
        </div>
        <div className="product-card__info">
          <div className="product-card__info__title">{product.name}</div>
          <div className="product-card__info__price">
            {numberWithCommas(product.unitprice)} VNĐ
          </div>
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
