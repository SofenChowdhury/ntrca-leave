import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//redux imports
import { useDispatch } from "react-redux";
import { logout, setCollapse } from "../../store/actions/auth";
import { connect } from "react-redux";

//theme imports
import {
  Box,
  useTheme,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import { tokens } from "../../pages/theme";
// import { InputBase } from "@mui/material";

// Icon Imports
// import SearchIcon from "@mui/icons-material/Search";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyIcon from "@mui/icons-material/Key";

//Notification
import Notify from "./Notify";


const Topbar = ({ token, isCollapsed, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Responsive
  const [width, setWidth] = useState(window.innerWidth);
  // const [showMessage, setShowMessage] = useState(false);

  // const toggleMessage = () => {
  //   setShowMessage(!showMessage);
  // };
  

  // SET WINDOW SIZE
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch();

  const submitHandler = () => {
    const apiUrl = BASE_URL + "logout";
    console.log("logout");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(apiUrl, "", config)
      .then(() => {
        Router.push({
          pathname: "/",
        });
        dispatch(logout());
      })
      .catch((error) => {
        if (error.response.status == 401) {
          dispatch(logout());
          Router.push({
            pathname: "/",
          });
        }
      });
  };

  // SET COLLAPSED
  const change = () => {
    dispatch(setCollapse(!isCollapsed));
  };

  // Dropdown

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        backgroundColor="white"
      >
        {isCollapsed && width < 600 && (
          <Button
            style={{ background: "transparent", color: colors.grey[100] }}
          >
            <MenuOutlinedIcon onClick={change} />
          </Button>
        )}
        <Box
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          display="flex"
        >
          {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton> */}
        </Box>

        <Box display="flex">
          {/* <Link href="/users/userProfile">
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton onClick={submitHandler}>
            <LogoutIcon />
          </IconButton> */}

          <Notify/>
          <Button
            endIcon={<ArrowDropDownIcon />}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            {name}
          </Button>
          {/*<Box position="relative" display="inline-block" marginLeft="10px">
          <IconButton onClick={toggleMessage}>
            <MessageOutlinedIcon />
          </IconButton>
      
          {showMessage && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              border="1px solid #ccc"
              padding="10px"
              backgroundColor="white"
              zIndex="1"
              whiteSpace="nowrap"
            >
              <p style={{ margin: 0 }}>This is a dummy message!</p>
              
              <p style={{ margin: 0 }}>This is a dummy message!</p>
              <p style={{ margin: 0 }}>This is a dummy message!</p>
              <p style={{ margin: 0 }}>This is a dummy message!</p>
            </Box>
          )}
        </Box>   */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link href="/users/userProfile" className="anchor">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonOutlinedIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
            </Link>
            <Link href="/users/changePassword" className="anchor">
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <KeyIcon />
                </ListItemIcon>
                Change Password
              </MenuItem>
            </Link>
            <MenuItem onClick={submitHandler}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    isCollapsed: state.collapse.isCollapse,
    name: state.auth.name,
    designation: state.auth.designation,
  };
};

export default connect(mapStateToProps)(Topbar);
