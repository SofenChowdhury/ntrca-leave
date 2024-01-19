import React, { useState, useEffect } from "react";

import Link from "next/link";

//redux imports
import { useDispatch } from "react-redux";
import { auth } from "../../store/actions/";
import { authFail } from "../../store/actions/";
import { connect } from "react-redux";

// Themes import
import { tokens } from "../../pages/theme";

// Icons imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Design Components imports
import { 
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton, 
  Typography, 
  useTheme
} from "@mui/material";

import KeyIcon from "@mui/icons-material/Key";

// Components import
// import useKey, { test } from "../services/KeyEvent";
// import { toast } from "react-toastify";


const LoginForm = ({ token, message }) => {
  // console.log(message);
  // THEME
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // VARIABLES FOR POST
  const [email, setEmail] = useState(null);
  const [emailCheck, setEmailCheck] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [contact, setContact] = useState("");
  // Helper Variables
  const isValidPhoneNumber = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
  const isValidEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;


  // REDUX
  const dispatch = useDispatch(auth(email, password));

  // HELPERS
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const submitHandler = () => {
    dispatch(auth(email, password));
  };

  const logInput = (e) => {
    setEmail(e);
    setEmailCheck(true)
    // if (e == 0) {
    //   console.log("000");
    //   setContact(e);
    // }else{
    //   console.log("111");
    //   setEmail(e)
    // }
  };

  const passInput = (e) => {
    setPassword(e);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    alert("Are you sure?")
    setAnchorEl(null);
  };

  return (
    <div className="mt-1">
      <Typography
        variant="h5"
        color={colors.primary[200]}
        className="ms-2 mb-1"
        style={{ fontWeight: "400" }}
      >
        Email
      </Typography>
      <input
        type="email"
        className="form-control mb-2 mt-2"
        id="email"
        // onChange={(e) => logInput(e.target.value)}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {email && !isValidEmail.test(email) && (
        <span style={{ color: "red" }}><p className="text-end">Invalid Email Address</p></span>
      )}
      {/* {contact && !isValidPhoneNumber.test(contact) && (
        <span style={{ color: "red" }}><p className="text-end">Invalid Contact</p></span>
      )} */}

      <Typography
        variant="h5"
        color={colors.primary[200]}
        className="ms-2 mb-1"
        style={{ fontWeight: "400" }}
      >
        Password
      </Typography>
      <div className="input-group mb-2 mt-2">
        <input
          type={passwordType}
          className="form-control"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          // onChange={(e) => passInput(e.target.value)}
          required
        />

        <span className="input-group-text" onClick={togglePassword}>
          {passwordType === "password" ? (
            <VisibilityIcon cursor="pointer" />
          ) : (
            <VisibilityOffIcon cursor="pointer" />
          )}
        </span>
      </div>
      {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="check"
          />
        </div> */}
      {/* <button onClick={login} className="btn btn-success mb-3"> */}
      <Link href="/forgotPassword" className="anchor text-center">
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <KeyIcon />
          </ListItemIcon>
          Forgotten password?
        </MenuItem>
      </Link>
      <Button
        onClick={submitHandler}
        variant="contained"
        className="float-end mt-1"
        style={{ backgroundColor: "#255288" }}
      >
        Login
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    token: state?.auth?.token,
    message: state?.authMsg?.message
  };
};

export default connect(mapStateToProps)(LoginForm);
