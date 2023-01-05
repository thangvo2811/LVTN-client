import React, { useState, useEffect, useCallback } from "react";
import Helmet from "../../components/Helmet";

import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";

import asus from "../../assets/images/banner/asus.jpg";

import axios from "axios";
import { useParams } from "react-router-dom";

const FindProdcut = () => {
  const param = useParams();
  const [allProduct, setAllProduct] = useState([]);
  const callAllProduct = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/findbykeyword/${param.keyword}`
      )
      .then((res) => {
        setAllProduct(res.data.listProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.keyword]);

  useEffect(() => {
    callAllProduct();
  }, [callAllProduct, param]);
  return (
    <Helmet name="Sản phẩm tìm kiếm">
      <div className="category-banner">
        <img src={asus} alt="" />
      </div>
      <div className="category-title">sản phẩm tìm kiếm</div>
      <div className="category">
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

export default FindProdcut;
