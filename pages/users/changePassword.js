import React, { useState } from "react";
import Router from "next/router";

//theme imports
import { tokens } from "../theme";
import {
  Typography,
  useTheme,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";

//redux imports
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Icons imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const ChangePassword = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [password, setPassword] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);

  // HELPERS
  const [oldPasswordType, setOldPasswordType] = useState("password");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmType, setPasswordConfirmType] = useState("password");

  const toggleOldPassword = () => {
    if (oldPasswordType === "password") {
      setOldPasswordType("text");
      return;
    }
    setOldPasswordType("password");
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const togglePasswordConfirm = () => {
    if (passwordConfirmType === "password") {
      setPasswordConfirmType("text");
      return;
    }
    setPasswordConfirmType("password");
  };

  const onSubmit = () => {
    if (password === password_confirmation) {
      const data = {
        oldPassword,
        password,
        password_confirmation,
      };
      const apiPassword = BASE_URL + "auth/change-password";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.post(apiPassword, data, config).then((response) => {
        console.log(response);
       

        // return false;
        if (response.status==200) {
          alert(response.data.message);
          Router.push({
            pathname: "/",
          });
        } else {
          alert(response.data.message);
        }
      });
    } else {
      alert("Password and Password Confirmation does not match!");
    }
  };

  return (
    <>
      <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
        Change Password
      </Typography>

      <div className="row">
        <div className="col-md-6">
          <TextField
            label="Previous Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleOldPassword}>
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            type={oldPasswordType}
            fullWidth
            onChange={(e) => setOldPassword(e.target.value)}
            className="shadow-input"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6  mt-4">
          <TextField
            label="Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword}>
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            type={passwordType}
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-input"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-4">
          <TextField
            label="Confirm Password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordConfirm}>
                    <VisibilityIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
            type={passwordConfirmType}
            fullWidth
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="shadow-input"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mt-4">
          <Button
            variant="contained"
            color="secondary"
            className="float-end"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(ChangePassword);
