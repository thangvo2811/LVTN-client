import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "../components/Button";
import numberWithCommas from "../utils/numberWithCommas";

import Rating from "@mui/material/Rating";

import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";
import pfUser from "../assets/images/UserProfile/man.png";
import admin from "../assets/images/UserProfile/admin.png";

import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/apiCalls.js";

import axios from "axios";

import { message } from "antd";
import UpdateComment from "../pages/Comment/UpdateComment";
import { useCallback } from "react";
import DeleteComment from "../pages/Comment/DeleteComment";
import { totalCartNumber } from "../redux/cartRedux";

const ProductView = (props) => {
  const param = useParams();

  const array = props.arr;

  const [quantity, setQuantity] = useState(1);
  const [commentProduct, setCommentProduct] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const [quantityProduct, setQuantityProduct] = useState([]);

  // const [quantityOptionProduct, setQuantityOptionProduct] = useState([]);

  const [idUserComment, setIdUserComment] = useState([]);

  const [allCommentAdmin, setAllCommentAdmin] = useState([]);

  const [totalPriceProduct, setTotalPriceProduct] = useState({});

  const [idWare, setIdWare] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const dispatch = useDispatch();
  const newCustomer = localStorage.getItem("User");
  // const newItemFromState = useSelector(
  //   (state) => state.cart.numberCartByCartId
  // );
  // const newItemByCartId = newItemFromState[props.id];
  // console.log("asdasdsadasdsadsad", newItemByCartId);

  // const qty = quantityProduct?.map((item, index) => item?.quantity);
  // console.log("Số Lượng", qty);
  // const amount = qty[0];
  // console.log("Số lượng sản phẩm 1", amount);

  const statusProduct = [
    {
      id: 1,
      name: "Còn Hàng",
    },
    {
      id: 2,
      name: "Hết Hàng",
    },
    {
      id: 3,
      name: "Sắp ra mắt",
    },
    {
      id: 4,
      name: "Đang ẩn",
    },
  ];

  const callCartItem = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-cart-by-customer-id/${newCustomer}/`
      )
      .then((res) => {
        // console.log("Tong SP", res.data.quantity);
        dispatch(totalCartNumber(res.data.quantity));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, newCustomer]);

  const callIdUserCommnet = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-all-comment-customer/${newCustomer}/`
      )
      .then((res) => {
        setIdUserComment(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);

  const idUser = idUserComment?.map((item, index) => item.cus_id);
  const idComment = idUser[0];
  // console.log("asdasda12313", idComment);

  const callCommentProduct = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-comment-of-product/${param.category_id}/`
      )
      .then((res) => {
        console.log(res.data.Comment);
        setCommentProduct(res.data.Comment);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.category_id]);

  const callAllFeedBack = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-comment-admin/`)
      .then((res) => {
        setAllCommentAdmin(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const idFeedBack = commentProduct?.map((item, index) => item.id);
  const idAdmin = idFeedBack[0];
  useEffect(
    () => {
      callCommentProduct();
      callIdUserCommnet();
      callAllFeedBack();
    },
    [callCommentProduct, callIdUserCommnet],
    reloadPage
  );

  useEffect(() => {
    if (array.length <= 0) {
      return;
    }
    if (!props.product_id) {
      return;
    }
  }, [array, props.product_id]);

  const callAllOptionProduct = useCallback(async () => {
    const filter = array.filter((item) => item !== null && item !== "");
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/get-product-quantity/`, {
        product_id: props.product_id,
        optionvalue: filter,
      })
      .then((res) => {
        setTotalPriceProduct(res.data.price);
        setQuantityProduct(res.data.qa);
        // setQuantityOptionProduct(res.data.qa);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [array, props.product_id]);
  useEffect(() => {
    if (array.length <= 0) {
      return;
    }
    if (!props.product_id) {
      return;
    }
    callAllOptionProduct();
  }, [array, callAllOptionProduct, props.product_id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity < 2 ? 1 : quantity - 1);
  };

  const handleAddCart = () => {
    const filter = array.filter((item) => item !== null && item !== "");
    console.log("add cart");
    const newProduct = props.product_id;

    addCart(
      dispatch,
      newCustomer,
      newProduct,
      filter,
      quantity,
      idWare,
      callCartItem
    );
  };
  const handleClick = (e) => {
    e.preventDefault();
    message.error("Bạn Chưa Đăng Nhập");
  };

  return (
    <div className="product">
      <div className="product-top">
        <div className="product-top__images">
          <div className="product-top__images__main">
            <img
              src={props.imgProduct}
              alt=""
              onError={(e) => {
                e.target.setAttribute("src", pd);
              }}
            />
          </div>
        </div>
        <div className="product-top__info">
          <div className="product-top__info__title">{props.nameProduct}</div>
          <div className="product-top__info__content">
            <div className="product-top__info__content__desc">
              <div className="product-top__info__content__desc__price">
                {totalPriceProduct
                  ? numberWithCommas(totalPriceProduct)
                  : numberWithCommas(props.priceProduct)}
                {/* {props.priceProduct ? numberWithCommas(props.priceProduct) : ""} */}
                VND
              </div>
              <div className="product-top__info__content__desc__brand">
                Thương hiệu: {props.nameBrand ? props.nameBrand : ""}
              </div>
              <div className="product-top__info__content__desc__category">
                Danh mục: {props.nameCategory ? props.nameCategory : ""}
              </div>

              {statusProduct?.map((item, index) => (
                <div className="product-top__info__status" key={index}>
                  {item.id === props.statusProduct
                    ? `Trạng Thái: ${item.name} `
                    : null}
                  {/* Trạng thái: {props.statusProduct ? props.statusProduct : ""} */}
                </div>
              ))}
              {/* <div className="product-top__info__status">
                Số lượng: {props.current ? props.current : ""} sản phẩm
              </div> */}
              <div className="product-top__info__quantity">
                <i className="bx bx-minus" onClick={decreaseQuantity}></i>
                <div>{quantity || 0}</div>
                <i className="bx bx-plus" onClick={increaseQuantity}></i>
              </div>
              {newCustomer ? (
                <div className="product-top__info__cart">
                  <Button size="sm" animate2={true} onClick={handleAddCart}>
                    thêm vào giỏ hàng
                  </Button>
                </div>
              ) : (
                <div className="product-top__info__cart" onClick={handleClick}>
                  <Link to={"/Login"}>
                    <Button size="sm" animate2={true}>
                      thêm vào giỏ hàng
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="product-top__info__content__option">
              <div className="product-top__info__content__option__left">
                {props.color}
              </div>
              <div className="product-top__info__content__option__left">
                {props.ssd}
              </div>
              <div className="product-top__info__content__option__right">
                {props.screen}
              </div>
              <div className="product-top__info__content__option__right">
                {props.switch}
              </div>
              <div className="product-top__info__content__option__right">
                {props.hdd}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option7}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option8}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option9}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option10}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option11}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option12}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option13}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option14}
              </div>
              <div className="product-top__info__content__option__right">
                {props.option15}
              </div>

              <div className="product-top__info__content__option__right__select">
                <select onChange={(e) => setIdWare(e.target.value)}>
                  <option>Chọn Chi Nhánh</option>
                  {quantityProduct?.map((item, index) => (
                    <>
                      <option
                        setIdWare={index === 0 ? "Chọn Chi Nhánh" : null}
                        value={item.warehouse_id}
                      >
                        {item.UserwarehouseProduct.name}
                      </option>
                    </>
                  ))}
                </select>

                <div className="product-top__info__content__option__right__select">
                  {quantityProduct?.map((item, index) => (
                    <div key={index}>
                      {item.UserwarehouseProduct.name}: {item.quantity} sản phẩm
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* detail Product */}
      <div className="product-bottom">
        <div className="product-bottom__title">chi tiết sản phẩm</div>
        <div className="product-bottom__description">{props.desProduct}</div>
      </div>
      {/* end detail product */}

      {/* start prodcut comment */}

      <div className="product__comment">
        <div className="product__comment__title">Comments</div>
        {commentProduct?.map((item, index) => {
          return (
            <>
              <div className="product__comment__content__desc" key={index}>
                <div className="product__comment__content__desc__img">
                  <img src={pfUser} alt="" />
                </div>
                <div className="product__comment__content__desc__type">
                  <div className="product__comment__content__desc__type__user">
                    {item?.commentUser?.fullname}
                  </div>
                  <div className="product__comment__content__desc__type__key">
                    {item?.description}{" "}
                  </div>
                  <div className="product__comment__content__desc__type__rate">
                    {item?.rate ? (
                      <Rating
                        name="half-rating"
                        defaultValue={item.rate}
                        readOnly
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="product__comment__content__desc__type__features">
                    {item?.cus_id === idComment ? (
                      <DeleteComment
                        idComment={item?.id}
                        parentCallback={callbackFunction}
                      ></DeleteComment>
                    ) : null}
                    {item.cus_id === idComment ? (
                      <UpdateComment
                        idComment={item?.id}
                        idCustomer={item?.cus_id}
                        idProduct={item?.product_id}
                        descProduct={item?.description}
                        rateProduct={item?.rate}
                        idCus={item.idCus}
                        parentCallback={callbackFunction}
                      ></UpdateComment>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Start Feedback Comment */}
              <div className="product__comment__admin">
                {allCommentAdmin?.map((data, index) => (
                  <div className="product__comment__admin__top">
                    <div className="product__comment__admin__top__img">
                      {item.id === data.comment_id ? (
                        <img src={admin} alt="" />
                      ) : null}
                    </div>
                    <div className="product__comment__admin__top__name">
                      {item.id === data.comment_id ? (
                        <span>Quản Trị Viên</span>
                      ) : null}
                      <div className="product__comment__admin__top__name__content">
                        {item.id === data.comment_id ? data.description : null}
                      </div>
                    </div>
                  </div>
                ))}

                {/* <div className="product__comment__admin__bottom"></div> */}
              </div>
              {/* End FeedBack Comment */}
            </>
          );
        })}
      </div>

      {/* end product comment */}
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
