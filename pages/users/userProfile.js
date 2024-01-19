import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

//redux imports
// import { auth } from "../../store/actions/";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { setAuthImage, logout, authSuccess } from "../../store/actions/auth";

import { toast } from "react-toastify";
// Theme imports
import { tokens } from "../theme";

// bootstarp
import { 
  Typography, 
  useTheme, 
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  MenuItem, } from "@mui/material";

// axios
import axios from "axios";

//Base url
import { BASE_URL, SIGN_URL } from "../../base";
import { IMAGE_URL } from "../../base";

const userProfile = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [photo, setPhoto] = useState(user?.profile_picture);
  const [pt, setPt] = useState();
  const [sign, setPhotoSign] = useState(user?.signature);
  const [sn, setSn] = useState();
  const [check, setCheck] = useState(0);
  const [checkSign, setCheckSign] = useState(0);
  // REDUX
  const dispatch = useDispatch(setAuthImage(photo, sign));

  // PHOTO Profile
  const submit = () => {
    const profileData = {
      photo
    };
    const apiProfile = BASE_URL + "upload/image";
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    if (photo == "") {
      alert("Please select an Image!");
    } else {
      axios
        .post(apiProfile, profileData, config)
        .then((response) => {
          if (response.data.status == 200) {
            // alert("Profile Photo Uploaded!");
            toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
              
            setPhoto(response.data.user?.profile_picture);
            setCheck(3);
            dispatch(setAuthImage(response.data?.profile_picture, sign));
          }
          else if(response.data.status == 500)
          {
            toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'error' });
          } 
          else {
            setFormErrors(Object.values(response.data.errors));
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          setCheck(3);
        });
    }
  };

  const onChange = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      uploadDocuments(e, files[0]);
    }
  };

  const uploadDocuments = async (event, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = submitFile(reader.result, file.name);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const submitFile = (result, name) => {
    setPhoto(result);
    setCheck(1)
  };

  // PHOTO Signature
  const submitSign = () => {
    const profileData = {
      sign
    };
    const apiProfile = BASE_URL + "upload/sign";
    const config = {
      headers: { Authorization: `Bearer ${user?.token}` },
    };
    if (sign == "") {
      alert("Please select an Image!");
    } else {
      axios
        .post(apiProfile, profileData, config)
        .then((response) => {
          // console.log(response);
          if (response.data.status == 200) {
            // alert("Profile Sign Uploaded!");
            toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
            setPhotoSign(response.data?.signature);
            setCheckSign(3)
            dispatch(setAuthImage(photo, response.data?.signature));
          }else if(response.data.status == 500)
          {
            toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
           
          }
           else {
            setFormErrors(Object.values(response.data.errors));
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          setCheckSign(3);
        });
    }
  };

  const onChangeSign = async (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (files.length > 0) {
      uploadSignDocuments(e, files[0]);
    }
  };

  const uploadSignDocuments = async (event, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = submitSignFile(reader.result, file.name);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const submitSignFile = (result, name) => {
    setPhotoSign(result);
    setCheckSign(1)
  };

  return (
    <div className="row">
      <div className="col-md-4 text-center">
        <img
          alt="profile-user"
          width={200}
          height={200}
          src={pt ? pt : (`${IMAGE_URL}${photo}`||`../../assets/images/user.png`)}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
        <Typography
          variant="h4"
          className="mt-3"
          color={colors.blueAccent[300]}
        >
          {user?.name}
        </Typography>
        <Typography
          variant="h5"
          className="mt-3"
          color={colors.grey[300]}
        >
        {!(check == 1) && <Button
          variant="contained"
          component="label"
          color="secondary"
          fullWidth
        >
          
          <input
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={(e)=>{
            setPt(URL.createObjectURL(e.target.files[0]));
            onChange(e);
          }}
          />
          Change Profile Picture
        </Button>
        }
        {!(check == 0 || check == 3) && <Button
          variant="contained"
          component="label"
          color="secondary"
          fullWidth
          onClick={submit}
        >
          Confirm Change Profile Picture
        </Button>
        }
          
          {/* {user?.roles[0]?.name} */}
        </Typography>
        <div className="mt-4">
          <img
            alt="profile-user-signature"
            width={200}
            height={200}
            src={sn ? sn : (`${SIGN_URL}${sign}` || `../../assets/images/govt.png`)}
            style={{ cursor: "pointer" }}
          />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.grey[300]}
          >
            {!(checkSign == 1) && <Button
              variant="contained"
              component="label"
              color="secondary"
              fullWidth
            >
              <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e)=>{
                setSn(URL.createObjectURL(e.target.files[0]));
                onChangeSign(e);
              }}
              />
              Change Signature
            </Button>
            }
            {!(checkSign == 0 || checkSign == 3) && <Button
              variant="contained"
              component="label"
              color="secondary"
              fullWidth
              onClick={submitSign}
            >
              Confirm Change Signature
            </Button>
            }
          </Typography>
        </div>
        
      </div>
      <div className="col-md-2 text-center"></div>
      <div className="col-md-6">
        <div className="mt-5">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            User Profile
          </Typography>
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Email
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.email || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Phone
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.phone || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Role
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.roles || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Company
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.company || "Not Set Yet"} disabled />
          <Typography
            variant="h5"
            className="mt-3"
            color={colors.primary[300]}
          >
            Name
          </Typography>
          <input type="text" className="form-control mt-2" value={user?.name || "Not Set Yet"} disabled />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(userProfile);
