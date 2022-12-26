import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message } from "antd";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import FormInput from "./../../../components/FormInput";

const ChangePassWord = (props) => {
  const [open, setOpen] = useState(false);
  const [oldPassWord, setOldPassWord] = useState("");
  const [newPassWord, setNewPassWord] = useState("");
  const [reNewPassWord, setReNewPassWord] = useState("");

  const IdCus = localStorage.getItem("User");
  // const [values, setValues] = useState({
  //   username: "",
  //   email: "",
  //   birthday: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const inputs = [
    {
      key: 1,
      name: "oldPassWord",
      type: "password",
      placeholder: "Mật khẩu",
      errorMessage: "Vui lòng nhập mật khẩu cũ",
      value: oldPassWord,
      label: "Mật khẩu cũ",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      key: 2,
      name: "newPassWord",
      type: "password",
      placeholder: "Nhập mật khẩu mới",
      errorMessage: "Hãy nhập mật khẩu mới",
      value: newPassWord,
      label: "Mật khẩu mới",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      key: 3,
      name: "reNewPassWord",
      type: "password",
      placeholder: "Xác nhận mật khẩu",
      errorMessage: "Mật khẩu không trùng",
      value: reNewPassWord,
      label: "Xác nhận mật khẩu",
      pattern: newPassWord,
      required: true,
    },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callChangePassWord = async (idUser, newPw, reNewPw, oldPw) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/udate-password/`, {
        id: idUser,
        newpassword: newPw,
        repassword: reNewPw,
        oldpassword: oldPw,
      })
      .then((res) => {
        if (res.data.errCode === 0) {
          console.log(res.data);
          message.success("Đổi Mật Khẩu Thàn Công");
          return;
        }
        if (res.data.errCode === 2) {
          message.error("Mật Khẩu Cũ Sai");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleOldPw = (e) => {
    e.preventDefault();
    setOldPassWord(e.target.value);
  };
  const handleNewPw = (e) => {
    e.preventDefault();
    setNewPassWord(e.target.value);
  };
  const handleReNewPw = (e) => {
    e.preventDefault();
    setReNewPassWord(e.target.value);
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
        <form>
          <DialogContent maxWidth="xl">
            <div className="form-title">Đổi Mật Khẩu</div>
            <div className="form-input-pw">
              <FormInput {...inputs[0]} onChange={handleOldPw} />
              <FormInput {...inputs[1]} onChange={handleNewPw} />
              <FormInput {...inputs[2]} onChange={handleReNewPw} />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              <span className="name-cancel">Hủy</span>
            </Button>
            <Button
              onClick={() =>
                callChangePassWord(
                  IdCus,
                  newPassWord,
                  reNewPassWord,
                  oldPassWord
                )
              }
            >
              <span className="name-save">Lưu</span>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default ChangePassWord;
