import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import numberWithCommas from "../utils/numberWithCommas";
import axios from "axios";
import { message } from "antd";

const ProductCardList = (props) => {
  const product = props.product;
  const idWishList = props.idWishList;

  const navigate = useNavigate();
  const callDeleteProduct = async () => {
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/delete-wishlist/${idWishList}/`
      )
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Xóa Sản Phẩm Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="product-card-list">
        <div className="product-card-list__image">
          <img
            src={product.ProductWishlist.img}
            alt=""
            // onError={(e) => {
            //   e.target.setAttribute("src", pd);
            // }}
          />
        </div>
        <div className="product-card-list__interact">
          <div
            className="product-card-list__interact__btn"
            onClick={() => navigate("/detailproduct/" + product.product_id)}
          >
            Xem ngay
          </div>

          <i className="bx bx-trash" onClick={() => callDeleteProduct()}></i>
        </div>
        <div className="product-card-list__info">
          <div className="product-card-list__info__title">
            {product.ProductWishlist.name}
          </div>
          <div className="product-card-list__info__price">
            {numberWithCommas(product.ProductWishlist.unitprice)} VNĐ
          </div>
        </div>
      </div>
    </>
  );
};

ProductCardList.propTypes = {
  product: PropTypes.object,
};

export default ProductCardList;
