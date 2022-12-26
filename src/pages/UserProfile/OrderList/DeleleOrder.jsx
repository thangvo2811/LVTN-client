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

const DeleteOrder = (props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteOrder = async (id) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/cancel-order/${id}/`)
      .then((res) => {
        console.log(res.data);
        props.reloadPage(Date.now());
        message.success("Hủy Đơn Hàng Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleClickOpen}>
        <span className="delete-order">Hủy Đơn Hàng</span>
      </Button>
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
          <Button onClick={() => handleDeleteOrder(props.id)}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteOrder;
