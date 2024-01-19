import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import Link from "next/link";

// Redux
import { connect } from "react-redux";

// Themes
// import {
//   Typography,
//   useTheme,
//   Snackbar,
//   Alert,
//   AlertTitle,
//   IconButton,
// } from "@mui/material";
// import { tokens } from "./theme";

// Components
import LoginForm from "../components/forms/LoginForm";

// bg
// import bg from "../public/assets/images/vat3.png";

// ICONS
// import CloseIcon from "@mui/icons-material/Close";

const Login = ({ isLoggedIn, message }) => {
  const router = useRouter();
  
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  // const [formErrors, setFormErrors] = useState("");
  // const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [yes, setYes] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    if (message = "Unauthorized") {
      setYes(false);
    }
    if (isLoggedIn) {
      router.push("/");
    }
  }, []);

  // Toast error
  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  const handleClickEvent = () => {
    setOpen(true);
  };

  return (
    <>
        <div
          style={{
            height: "100vh",
            // backgroundImage: `url(${bg.src})`,
            backgroundSize: "cover",
          }}
        >
          {/* <Snackbar
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
            open={open}
            // autoHideDuration={5000}
            // onClose={handleToClose}
            // action={
            //   <React.Fragment>
            //     <IconButton
            //       size="small"
            //       aria-label="close"
            //       color="inherit"
            //       onClick={handleToClose}
            //     >
            //       <CloseIcon fontSize="small" />
            //     </IconButton>
            //   </React.Fragment>
            // }
          >
            <Alert
              // onClose={handleToClose}
              variant="filled"
              severity="error"
            >
              <div className="text-center">{formErrors}</div>
            </Alert>
          </Snackbar> */}
          <div className="container">
            <div className="row">
              <div className="col-md-4">
              </div>
              <div className="col-md-4 text-center mt-5 d-flex align-items-center justify-content-center custom-text">
                <strong>Welcome to NTRCA Leave Management System</strong>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row mt-5">
              <div className="col-md-4">
              </div>
              <div className="col-md-4 pt-4 ps-5 pe-5 pb-4 rounded shadow-box"
                // style={{
                //   position: "",
                //   top: "50%",
                //   left: "50%",
                //   transform: "translate(-50%, -50%)",
                // }}
              >
                <div className="text-center">
                  <img
                    className="img-fluid"
                    alt="fairvat-logo"
                    width={190}
                    height={190}
                    src={`../../assets/images/logo.jpg`}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <LoginForm />
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.token,
    message: state.authMsg.message,
  };
};

export default connect(mapStateToProps)(Login);
