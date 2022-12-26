import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";
import "./style.scss";
import TextArea from "antd/lib/input/TextArea";

import Rating from "@mui/material/Rating";

const AddComment = (props) => {
  const img = props.img;
  const idProduct = props.idProduct;
  console.log("MSP", idProduct);
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [rate, setRate] = useState(0);
  const idCus = localStorage.getItem("User");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddComment = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/add-comment`, {
        cus_id: idCus,
        product_id: idProduct,
        description: desc,
        rate: rate,
      })
      .then((res) => {
        console.log(res.data);
        message.success("Đánh Giá Sản Phẩm Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">ĐÁNH GIÁ</div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">ĐÁNH GIÁ SẢN PHẨM</div>

          <div className="product-img">
            <img className="product-img" src={img} alt="" />
          </div>
          <div className="form-input">
            <form>
              <label>Nội dung đánh giá</label>
              <TextArea
                rows="8"
                cols="500"
                type="text"
                onChange={(e) => setDesc(e.target.value)}
              />
            </form>
          </div>
          <div>
            <Rating
              name="half-rating-read"
              defaultValue={0}
              precision={1}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => handleAddComment(idCus, idProduct, desc, rate)}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddComment;
