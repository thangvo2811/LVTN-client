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

const UpdateComment = (props) => {
  const [open, setOpen] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [newRate, setNewRate] = useState(0);
  const idCus = localStorage.getItem("User");
  const idComment = props.idComment;
  const idCUs = props.idCustomer;
  console.log("ID CUSTOMER", idCUs);
  console.log("ID comment", idComment);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateComment = async () => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-comment`, {
        id: props.idComment,
        cus_id: idCus,
        product_id: props.idProduct,
        description: newDesc,
        rate: newRate,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Đánh Giá Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>
        <div className="form-name">Sửa</div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">CẬP NHẬT ĐÁNH GIÁ</div>
          <div className="form-input">
            <form>
              <label>Nội dung cập nhật</label>
              <TextArea
                rows="8"
                cols="500"
                type="text"
                defaultValue={props.descProduct}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </form>
          </div>
          <div>
            <Rating
              name="half-rating-read"
              defaultValue={props.rateProduct}
              precision={1}
              onChange={(e) => setNewRate(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleUpdateComment(
                props.idComment,
                idCus,
                props.idProduct,
                newDesc,
                newRate
              )
            }
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateComment;
