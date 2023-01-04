import React, { useRef, useEffect, useState, useCallback } from "react";

import { Link, useNavigate } from "react-router-dom";

import dd1 from "../assets/images/dropdown-images/729_x_356.jpg";
import dd2 from "../assets/images/dropdown-images/Artboard-4-copy-8-2.png";
import dd3 from "../assets/images/dropdown-images/Artboard-7-8.png";
import dd4 from "../assets/images/dropdown-images/Artboard-7-copy-8.png";
import dd5 from "../assets/images/dropdown-images/Artboard-8-8-1.png";
import dd6 from "../assets/images/dropdown-images/Artboard-8-copy-2-8.png";
import pt from "../assets/images/UserProfile/pt.png";

import axios from "axios";

import { Menu, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const newItem = useSelector((state) => state.cart.numberCart);

  const navigate = useNavigate();
  const headerContentRef = useRef(null);
  const headerShrink = useRef(null);
  const [totalItem, setTotalItem] = useState({});

  const [searchKey, setSearchKey] = useState("");
  const [allCategory, setAllCategory] = useState([]);

  const [idcart, setIdCart] = useState([]);

  // const newUser = useSelector((state) => state.user.currentUser);
  const newCustomer = localStorage.getItem("User");

  const nameCustomer = localStorage.getItem("nameUser");
  const newNameUser = localStorage.getItem("updateName");

  console.log("Update Name User", newNameUser);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const totalNumber = useSelector((state) => state.cart.totalNumberCart);
  console.log("ASDAS231231ASDZXCZXC", totalNumber);

  const callSearchProduct = async (searchK) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/findbykeyword/${searchK}`)
      .then((res) => {
        setSearchKey(res.data.listProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callTotalItems = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-cart-by-customer-id/${newCustomer}`
      )
      .then((res) => {
        setTotalItem(res.data.quantity);
        setIdCart(res.data.cartitem);
        localStorage.setItem("cartItem", res.data.quantity);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);

  // const totalIdCart = useSelector((state) => state.cart.numberCartByCartId);
  // console.log("ppppppppp", totalIdCart);
  // const idCartItem = idcart?.map((item, index) => item.id);
  // const totalNum = idcart.reduce((sum, item) => sum + totalIdCart[item.id], 0);
  // console.log("qweqweqweqwe", totalNum);
  // console.log("asdasdasdasdas", idCartItem);

  const callAllCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-Category/`)
      .then((res) => {
        console.log(res.data.category);
        setAllCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    callSearchProduct();
    if (newCustomer !== "") {
      return callTotalItems();
    }
  }, [callTotalItems, newCustomer]);
  useEffect(() => {
    callAllCategory();
  }, []);

  // useEffect(() => {
  //   callReloadUser();
  // }, [callReloadUser, reloadUser]);

  const handleSearch = (e) => {
    let pattern = /^[a-zA-Z0-9_ ]*$/g;
    e.preventDefault();
    if (searchKey && pattern.test(searchKey) && searchKey !== "") {
      navigate(`/findproduct/${searchKey}`);
    } else {
      navigate("/");
      message.error("SẢN PHẨM KHÔNG TỒN TẠI");
    }
    // if (searchKey === "") {
    //   navigate("/");
    //   message.error("Chưa Nhập Sản Phẩm");
    //   return;
    // } else {
    //   navigate(`/findproduct/${searchKey}`);
    // }
  };

  const openMenuHandler = () => {
    headerContentRef.current.classList.toggle("active");
  };
  const handleCartClick = () => {
    message.error("Bạn Chưa Đăng Nhập");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerShrink.current.classList.add("shrink");
      } else {
        headerShrink.current.classList.remove("shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  const handleCart = () => {
    message.error("Không Có Sản Phẩm Trong Giỏ Hàng");
  };

  return (
    <div className="header" ref={headerShrink}>
      <div className="container">
        <div className="header__toggle">
          <div className="header__toggle__logo">
            <Link to="/">
              {/* <h1>PT</h1> */}
              <img src={pt} alt="" />
            </Link>
          </div>
          <div className="header__toggle__button" onClick={openMenuHandler}>
            <i className="bx bx-menu"></i>
          </div>
        </div>
        <div className="header-content" ref={headerContentRef}>
          <span className="header-content__close" onClick={openMenuHandler}>
            <i className="bx bx-x-circle"></i>
          </span>
          <div className="header-top">
            <div className="header-top__logo">
              <Link to="/">
                <img src={pt} alt="" />
              </Link>
            </div>
            <div className="header-top__search">
              <form onSubmit={handleSearch}>
                <div className="header-top__search__input">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <i className="bx bx-search-alt"></i>
                </div>
              </form>
            </div>
            <div className="header-top__cart">
              <ul className="header-top__cart__list">
                <div className="dropdown">
                  {newCustomer ? (
                    <>
                      <li className="header-top__cart__list__item">
                        <i className="bx bx-user icon"></i>
                        <span>
                          Xin Chào <span> {nameCustomer}</span>
                        </span>
                      </li>
                      <ul className="dropdown__list">
                        <Link to={"/userprofile"}>
                          <li className="dropdown__item">
                            <i class="bx bxs-user-circle drop__icon"></i>
                            <span className="dropdown__text">
                              Thông Tin Cá Nhân
                            </span>
                          </li>
                        </Link>
                        <Link to={"/wishlist"}>
                          <li className="dropdown__item">
                            <i class="bx bxs-heart-circle drop__icon"></i>

                            <span className="dropdown__text">
                              Danh Sách Yêu Thích
                            </span>
                          </li>
                        </Link>
                        <Link to={"/view"}>
                          <li className="dropdown__item">
                            <i class="bx bx-hide drop__icon"></i>
                            <span className="dropdown__text">
                              Sản Phẩm Đã Xem
                            </span>
                          </li>
                        </Link>

                        <li
                          className="dropdown__item"
                          onClick={() => {
                            localStorage.setItem("User", "");
                            navigate("/");
                          }}
                        >
                          <i class="bx bx-log-out drop__icon"></i>
                          <span className="dropdown__text">Đăng Xuất</span>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <Link to={"/login"}>
                        <li className="header-top__cart__list__item">
                          <i className="bx bx-user icon"></i>
                          <span>Đăng nhập</span>
                        </li>
                      </Link>
                    </>
                  )}
                </div>
                {newCustomer ? (
                  <>
                    {totalNumber === null ? (
                      <li
                        className="header-top__cart__list__item header-top__cart__list__item__main"
                        onClick={() => handleCart()}
                      >
                        <i className="bx bx-cart"></i>
                        <span>Giỏ hàng</span>
                        <div className="notification">
                          <span>{totalNumber || 0}</span>
                        </div>
                      </li>
                    ) : (
                      <Link to={"/cart"}>
                        <li className="header-top__cart__list__item header-top__cart__list__item__main">
                          <i className="bx bx-cart"></i>
                          <span>Giỏ hàng</span>
                          <div className="notification">
                            <span>{totalNumber || 0}</span>
                          </div>
                        </li>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <li
                        className="header-top__cart__list__item"
                        onClick={handleCartClick}
                      >
                        <i className="bx bx-cart"></i>
                        <span>Giỏ hàng</span>
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="header-bottom">
            <ul className="header-bottom__list">
              <li className="header-bottom__list__item">
                <Link to={"/"}>Trang chủ</Link>
              </li>
              <li className="header-bottom__list__item header-bottom__list__item__main">
                <Link to={"/product"}>
                  Sản phẩm
                  <i className="bx bx-chevron-down"></i>
                </Link>
                <div className="header-bottom__dropdown">
                  <div className="header-bottom__dropdown__left">
                    <div className="header-bottom__dropdown__left__list__title">
                      Danh mục sản phẩm
                    </div>
                    <ul className="header-bottom__dropdown__left__list">
                      {allCategory?.map((item, index) => (
                        <>
                          <li
                            className="header-bottom__dropdown__left__list__item"
                            onClick={() => navigate("/findcategory/" + item.id)}
                          >
                            {item.name}
                          </li>
                          {item.ChildrenCategoty.map((data, index) => (
                            <li
                              className="header-bottom__dropdown__left__list__item"
                              onClick={() =>
                                navigate("/findcategory/" + data.id)
                              }
                            >
                              {data.name}
                            </li>
                          ))}
                        </>
                      ))}
                    </ul>
                    {/* Start Category sub Category */}
                    {/* <div className="header-bottom__dropdown__left__sub">
                      {allCategory?.map((item, index) => (
                        <>
                          <div className="header-bottom__dropdown__left__sub__btn">
                            <div
                              className="header-bottom__dropdown__left__sub__btn__text"
                              key={index}
                              value={item.id}
                            >
                              {item.name}
                            </div>
                            <div className="header-bottom__dropdown__left__sub__btn__icon">
                              <i
                                class="bx bx-chevron-down"
                                onClick={() => handleOpen(item.id)}
                              ></i>
                            </div>
                          </div>
                          {item.id && open ? (
                            <ul className="header-bottom__dropdown__left__sub__item">
                              {item?.ChildrenCategoty?.map((data, i) => (
                                <li
                                  className="header-bottom__dropdown__left__sub__item__list"
                                  key={index}
                                  value={data.id}
                                >
                                  <div className="header-bottom__dropdown__left__sub__item__list__text">
                                    {data.name}
                                  </div>
                                </li>
                              ))}

                              <li className="header-bottom__dropdown__left__sub__item__list">
                                <div className="header-bottom__dropdown__left__sub__item__list__text">
                                  2
                                </div>
                              </li>
                            </ul>
                          ) : null}
                        </>
                      ))}
                    </div> */}
                    {/* end Category sub category */}
                  </div>
                  <div className="header-bottom__dropdown__right">
                    <div className="header-bottom__dropdown__right__grid">
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd1} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd2} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd3} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd4} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd5} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd6} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="header-bottom__list__item">
                <Link to={"/blog"}>Tin Tức</Link>
              </li>
              <li className="header-bottom__list__item">
                <Link to={"/"}>Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
