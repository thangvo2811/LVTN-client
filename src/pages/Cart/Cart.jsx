import React, { useState, useEffect, useCallback } from "react";

import Button from "../../components/Button";
import CartItem from "../../components/CartItem";
import Helmet from "../../components/Helmet";

import { Link, useNavigate } from "react-router-dom";

import numberWithCommas from "../../utils/numberWithCommas";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addCartByCartIdAction,
  initialCartByCartIdAction,
  totalCartNumber,
} from "../../redux/cartRedux";

import { message } from "antd";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [totalProduct, setTotalProduct] = useState();
  const [totalPrice, setToTalPrice] = useState([]);
  const [refreshState, setRefreshState] = useState();
  const newCustomer = localStorage.getItem("User");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callCartItem = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-cart-by-customer-id/${newCustomer}/`
      )
      .then((res) => {
        setCartItem(res.data.cartitem);
        setTotalProduct(res.data.quantity);
        setToTalPrice(res.data.totalprice);
        dispatch(totalCartNumber(res.data.quantity));
        res.data.cartitem.forEach((item) => {
          console.log("Item", item);
          dispatch(
            initialCartByCartIdAction({
              cartId: item.id,
              currentAmount: item.amount,
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, newCustomer]);

  useEffect(() => {
    callCartItem();
  }, [callCartItem, refreshState]);

  const idCartItem = cartItem?.map((item, index) => item.cart_id);
  console.log("ID CART ITEM", idCartItem);

  const handleDeleteAllCart = async (e, [id]) => {
    e.preventDefault();
    await axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/handle-Delete-All-Cartitem/${id}/`
      )
      .then((res) => {
        console.log(res.data);
        message.success("X??a S???n Ph???m Th??nh C??ng");
        callCartItem();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshList = (randomValue) => {
    setRefreshState(randomValue);
  };

  const handlePay = () => {
    message.error("Kh??ng C?? S???n Ph???m");
  };

  return (
    <Helmet name="Gi??? h??ng">
      <div className="cart">
        <div className="cart__desc">
          <div className="cart__desc__item">
            {idCartItem.length === 0
              ? navigate("/product")
              : cartItem?.map((item, index) => {
                  return (
                    <CartItem
                      cartItem={item}
                      id={item.id}
                      key={index}
                      reload={callCartItem}
                      idCartItem={item.CartItemProduct.id}
                      reloadPage={refreshList}
                    ></CartItem>
                  );
                })}
          </div>
          <div
            className="cart__desc__clear"
            onClick={(e) => handleDeleteAllCart(e, idCartItem)}
          >
            <Button size="sm" animate2={true}>
              X??a T???t C???
            </Button>
          </div>
        </div>

        <div className="cart__info">
          <div className="cart__info__content">
            <div className="cart__info__content__title">T???ng K???t</div>
            <div className="cart__info__content__item">
              {/* <div className="cart__info__content__item__title">Ti???n ship</div>
              <div className="cart__info__content__item__price">0,000 VND</div> */}
            </div>
            <div className="cart__info__content__item">
              <div className="cart__info__content__item__title">
                T???ng s???n ph???m
              </div>
              <div className="cart__info__content__item__price">
                {totalProduct || 0}
              </div>
            </div>
            <div className="cart__info__content__item">
              {/* <div className="cart__info__content__item__title">Thanh to??n</div> */}
              <div className="cart__info__content__item__price">
                {/* {totalPrice ? numberWithCommas(totalPrice) : ""} VND */}
              </div>
            </div>
            <div className="cart__info__content__item cart__info__content__item__main">
              <div className="cart__info__content__item__title">T???ng gi??</div>
              <div className="cart__info__content__item__price">
                {totalPrice ? numberWithCommas(totalPrice) : ""} VND
              </div>
            </div>
          </div>
          {idCartItem.length === 0 ? (
            <div
              className="cart__info__btn cart__info__btn__payment"
              onClick={() => handlePay()}
            >
              <Button size="stable" animate3={true}>
                Ti???p t???c thanh to??n
              </Button>
            </div>
          ) : (
            <Link to={"/payment"}>
              <div className="cart__info__btn cart__info__btn__payment">
                <Button size="stable" animate3={true}>
                  Ti???p t???c thanh to??n
                </Button>
              </div>
            </Link>
          )}

          <Link to={"/product"}>
            <div className="cart__info__btn cart__info__btn__cart">
              <Button size="stable" animate3={true}>
                ti???p t???c mua h??ng
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
