import React, { useEffect, useState } from "react";
// import img1 from "../assets/images/blog/2.png";
// import img2 from "../assets/images/blog/JBL_Quantum400_Lifestyle1.png";

import axios from "axios";

const Posts = () => {
  const [allBlog, setAllBlog] = useState([]);

  const callAllBlog = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-all-blog/`)
      .then((res) => {
        console.log(res.data.blog);
        setAllBlog(res.data.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllBlog();
  }, []);
  return (
    <div className="post">
      {allBlog?.map((item, index) => (
        <>
          <div className="post__item__title">{item.name}</div>
          <div className="post__item">
            <div className="post__item__image">
              <img src={item.img} alt="" />
            </div>
            <div className="post__item__content">
              <div className="post__item__content__description">
                {item.Description}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Posts;
