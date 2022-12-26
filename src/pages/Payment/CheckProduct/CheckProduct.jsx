import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { initialCartByCartIdAction } from "../../../redux/cartRedux";
import numberWithCommas from "../../../utils/numberWithCommas";

const CheckProduct = () => {
  const [cartItem, setCartItem] = useState([]);

  const newCustomer = localStorage.getItem("User");
  const dispatch = useDispatch();
  const callCartItem = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-cart-by-customer-id/${newCustomer}/`
      )
      .then((res) => {
        console.log(res.data.cartitem);
        setCartItem(res.data.cartitem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);

  useEffect(() => {
    callCartItem();
  }, [callCartItem, newCustomer]);
  return (
    <>
      {cartItem?.map((item, index) => {
        return (
          <>
            <div className="cart-item">
              <div className="cart-item__image">
                <img src={item.CartItemProduct.img} alt="" />
              </div>
              <div className="cart-item__info">
                <div className="cart-item__info__title"></div>
                <div className="cart-item__info__id">
                  Tên sản phẩm: {item.CartItemProduct.name}
                </div>
                <div className="cart-item__info__brand">
                  Thương hiệu: {item.CartItemProduct.ProductBrand.name}
                </div>
                <div className="cart-item__info__brand">
                  Danh mục: {item.CartItemProduct.CategoryProduct.name}
                </div>
                <div className="cart-item__info__price">
                  Đơn giá: {numberWithCommas(item.price)} VND
                </div>
              </div>
              <div className="cart-item__total">
                <div>x{item.amount}</div>
                <div className="cart-item__total__total">
                  {" "}
                  Tổng : {numberWithCommas(item.amount * item.price)} VND
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default CheckProduct;
