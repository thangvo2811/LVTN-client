import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import pd from "../../../assets/images/products/ban-phim-apple-magic-keyboard-2021.jpg";
import Grid from "../../../components/Grid";
import ProductCard from "../../../components/ProductCard";
import ProductCardList from "../../../components/ProductCardList";
import { SectionBody, SectionTitle } from "../../../components/Section";

const WishList = () => {
  const [allList, setAllList] = useState([]);
  const idCus = localStorage.getItem("User");
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllList = useCallback(async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/api/get-all-product-by-cus/${idCus}/`
      )
      .then((res) => {
        setAllList(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idCus]);
  useEffect(() => {
    callAllList();
  }, [reloadPage, callAllList]);
  return (
    <>
      <SectionTitle>Danh Sách Yêu Thích</SectionTitle>
      <SectionBody>
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          {allList?.map((item, index) => (
            <ProductCardList
              product={item}
              key={index}
              idWishList={item.id}
              parentCallback={callbackFunction}
              id={parseInt(item.ProductWishlist.id)}
            ></ProductCardList>
          ))}
        </Grid>
      </SectionBody>
    </>
  );
};

export default WishList;
