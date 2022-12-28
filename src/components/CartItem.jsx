import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../utils/numberWithCommas";
import lp from "../assets/images/products/chuot-choi-game-co-day-logitech-g502-hero.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  addNumberCart,
  addQuantityCart,
  deleteCart,
} from "../redux/apiCalls";
import {
  addCartByCartIdAction,
  removeCartByCartIdAction,
  totalCartNumber,
} from "../redux/cartRedux";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const CartItem = (props) => {
  const itemCart = props.cartItem;
  // const reloadPage = props.reload;

  // const newItem = useSelector((state) => state.cart.numberCart);
  const cartItem = useSelector((state) => state.cart);
  const newItemFromState = useSelector(
    (state) => state.cart.numberCartByCartId
  );
  const newItemByCartId = newItemFromState[itemCart.id];
  console.log("Sluong", newItemByCartId);
  console.log("ID cart", itemCart.id);
  const newCustomer = localStorage.getItem("User");

  const dispatch = useDispatch();

  const increaseQuantity = () => {
    // setQuantity(quantity + 1);
    addQuantityCart(dispatch, itemCart.id, "+");
    dispatch(
      addCartByCartIdAction({
        cartId: itemCart.id,
        currentAmount: itemCart.amount,
      })
    );
    props.reloadPage(Date.now());
  };
  const decreaseQuantity = () => {
    // setQuantity(quantity < 2 ? 1 : quantity - 1);
    addQuantityCart(dispatch, itemCart.id, "-");
    dispatch(
      removeCartByCartIdAction({
        cartId: itemCart.id,
        currentAmount: itemCart.amount,
      })
    );
    props.reloadPage(Date.now());
  };

  const handleDeleteCartItem = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/handle-Delete-Cartitem/${id}/`
      )
      .then((res) => {
        console.log(res.data);

        props.reloadPage(Date.now());
        message.success("Xóa Sản Phẩm Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    // deleteCart(dispatch, itemCart.id);
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item__image">
          <img src={itemCart.CartItemProduct.img} alt="" />
        </div>
        <div className="cart-item__info">
          <div className="cart-item__info__title"></div>
          <div className="cart-item__info__id">
            Tên sản phẩm: {itemCart.name}
          </div>
          <div className="cart-item__info__brand">
            Thương hiệu: {itemCart.CartItemProduct.ProductBrand.name}
          </div>
          <div className="cart-item__info__brand">
            Danh mục: {itemCart.CartItemProduct.CategoryProduct.name}
          </div>
          <div className="cart-item__info__price">
            Đơn giá: {numberWithCommas(itemCart.price)} VND
          </div>
        </div>
        <div className="cart-item__total">
          <div className="cart-item__total__quantity">
            <i className="bx bx-minus" onClick={decreaseQuantity}></i>
            <div>{newItemByCartId || 0}</div>
            <i className="bx bx-plus" onClick={increaseQuantity}></i>
          </div>
          <div className="cart-item__total__total">
            Tổng : {numberWithCommas(itemCart.ttprice)} VND
          </div>
        </div>
        <div className="cart-item__delete">
          <i
            className="bx bx-trash"
            onClick={(e) => handleDeleteCartItem(e, itemCart.id)}
          ></i>
        </div>
      </div>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
