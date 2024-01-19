import axios from "axios";
import * as actionTypes from "./actionTypes";
import Router from "next/router";
import { BASE_URL } from "../../base";
import { toast } from "react-toastify";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, name, email, phone,  roles, company, profile_picture, signature, isApprover, isRecorder) => {
  Router.push({
    pathname: "/",
  });
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    name: name,
    email: email,
    phone: phone,
    roles: roles,
    company: company,
    profile_picture: profile_picture,
    signature: signature,
    isApprover: isApprover,
    isRecorder: isRecorder,
  };
};

export const setAuthImage = (profile_picture, signature) => {
  return {
    type: actionTypes.AUTH_IMAGE,
    profile_picture: profile_picture,
    signature: signature,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authNotValid = (message) => {
  return {
    type: actionTypes.AUTH_VALIDATION,
    message: message,
  };
};

export const setCollapse = (isCollapse) => {
  return {
    type: actionTypes.SIDEBAR_COLLPASE,
    isCollapse: isCollapse,
  };
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    // const apiUrl = BASE_URL + "api/v1/auth/login";
    const apiUrl = "https://ntrcaleave.xyz/api/login";
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(apiUrl, authData)
      .then((response) => {
        if (response.status===200) {
          toast(`Login Successfully done by - ${response?.data?.user?.name}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
          dispatch(
            authSuccess(
              response?.data?.access_token,
              response?.data?.user?.id,
              response?.data?.employee?.full_name,
              response?.data?.user?.email,
              response?.data?.user?.phone,
              response?.data?.user?.role_id,
              response?.data?.user?.company,
              response?.data?.user?.profile_picture,
              response?.data?.user?.signature,
              response?.data?.employee?.isApprover,
              response?.data?.employee?.isRecorder,
            )
          );
          dispatch(checkAuthTimeout(60 * 60 * 2));
          dispatch(setCollapse(false));
        } else {
          dispatch(authNotValid(response?.data?.message));
        }
      })
      .catch((err) => {
        alert(`'Login credential does not match!!!'`);
        // toast(`${err?.response?.data?.error} 'Credential does not match!'`, { hideProgressBar: true, autoClose: 2000, type: 'error' })
        console.log(err);
        // dispatch(authNotValid(err?.response?.data?.error));
        // dispatch(authFail(`${err?.response?.data?.error} 'Credential does not match!'`));
      });
  };
};
 

