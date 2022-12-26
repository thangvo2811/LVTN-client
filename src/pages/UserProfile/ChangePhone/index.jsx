import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";

const ChangePhone = (props) => {
  const [open, setOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const IdCus = localStorage.getItem("User");
  const nameCus = props.name;
  console.log(IdCus);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callChangePhone = async (idCustomer, newPhone) => {
    console.log(newPhone);
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-user/`, {
        id: idCustomer,
        fullname: nameCus,
        phonenumber: newPhone,
        avatar: "",
      })
      .then((res) => {
        console.log(res.data);
        props.refresh();
        message.success("CẬP NHẬT THÀNH CÔNG");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handlePhone = (e) => {
    e.preventDefault();
    setNewPhone(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Cập Nhật
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="form-title">Cập Nhật Số Điện Thoại</div>
          <div className="form-input">
            <form>
              <Input
                type="text"
                defaultValue={props.phone}
                onChange={handlePhone}
                pattern="[0-9]{10}"
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span className="name-cancel">Hủy</span>
          </Button>
          <Button onClick={() => callChangePhone(IdCus, newPhone)} autoFocus>
            <span className="name-save">Lưu</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePhone;
