import React, { useRef, useState, useEffect } from "react";
import Helmet from "../../components/Helmet";

import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";

import asus from "../../assets/images/banner/asus.jpg";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useCallback } from "react";

const FindCategory = () => {
  const filterToggleRef = useRef(null);
  const param = useParams();
  console.log(param);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [brand, setBrand] = useState({
    id: "",
    name: "",
  });
  const [category, setCategory] = useState({
    idCate: "",
    nameCate: "",
  });

  const callFindIdCategory = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-all-product?brand_id=&category_id=${param.id}`
      )
      .then((res) => {
        setAllProduct(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id]);

  useEffect(() => {
    const callAllProduct = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/get-all-product?brand_id=${brand.id}&category_id=${category.idCate}`
        )
        .then((res) => {
          setAllProduct(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    callAllProduct();
  }, [brand, category]);

  useEffect(() => {
    callAllCategory();
    callAllBrand();
    callFindIdCategory();
  }, [callFindIdCategory]);

  const callAllCategory = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-Category/`)
      .then((res) => {
        setAllCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callAllBrand = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-brand/`)
      .then((res) => {
        setAllBrand(res.data.brand);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Helmet name="Danh mục">
      <div className="category-banner">
        <img src={asus} alt="" />
      </div>
      <div className="category-title">
        {category.idCate
          ? `Danh mục ${category.nameCate}`
          : "Danh sách Sản Phẩm"}
      </div>
      <div className="category">
        <div className="category__filters" ref={filterToggleRef}>
          <div className="category__filters__close">
            <i className="bx bx-chevrons-left"></i>
          </div>

          <div className="category__filters__item">
            <div className="category__filters__item__title">thương hiệu</div>
            <select
              className="category__filters__item__select"
              onChange={(e) => {
                setCategory((category) => ({
                  ...category,
                  ...{
                    idCate: "",
                  },
                }));
                setBrand((brand) => ({
                  ...brand,
                  ...{
                    id: e.target.value,
                    name: e.target.value,
                  },
                }));
              }}
            >
              <option value="">Tất cả</option>
              {allBrand?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="category__filters__content">
            <div className="category__filters__item">
              <div className="category__filters__item__title">Danh mục</div>
              <div className="category__filters__item__checkbox">
                <li
                  className="header-bottom__dropdown__left__list__item"
                  onClick={() => {
                    setBrand((brand) => ({
                      ...brand,
                      ...{ id: "" },
                    }));
                    setCategory((category) => ({
                      ...category,
                      ...{
                        idCate: "",
                      },
                    }));
                  }}
                >
                  Tất cả
                </li>
                {allCategory?.map((item, index) => {
                  return (
                    <>
                      <li
                        className="header-bottom__dropdown__left__list__item"
                        key={index}
                        onClick={() => {
                          setCategory(() => ({
                            idCate: item.id,
                            nameCate: item.name,
                          }));
                          setBrand({
                            id: "",
                            name: brand.name,
                          });
                        }}
                      >
                        {item.name}
                      </li>
                      {item?.ChildrenCategoty?.map((data, index) => (
                        <li
                          className="header-bottom__dropdown__left__list__item"
                          key={index}
                          onClick={() => {
                            setCategory(() => ({
                              idCate: data.id,
                              nameCate: data.name,
                            }));
                            setBrand({
                              id: "",
                              name: brand.name,
                            });
                          }}
                        >
                          {data.name}
                        </li>
                      ))}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="category__products">
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {allProduct?.map((item, index) => {
              return <ProductCard product={item} key={index}></ProductCard>;
            })}
          </Grid>
        </div>
      </div>
    </Helmet>
  );
};

export default FindCategory;
