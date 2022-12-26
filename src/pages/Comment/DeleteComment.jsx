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

const DeleteComment = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteComment = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}/api/delete-comment/${id}/`)
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Xóa Đánh Giá Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>Xóa</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>Bạn có muốn xóa không ?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleDeleteComment(props.idComment)}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteComment;
