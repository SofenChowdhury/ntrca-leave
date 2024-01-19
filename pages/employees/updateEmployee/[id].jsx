import React, { useState, useEffect } from "react";
import Router from "next/router";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../theme";
import {
  Typography,
  useTheme,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";
import EmployeeForm from "../../../components/forms/EmployeeForm";

const EmployeeDetails = ({ query, token,roles }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // DATA FOR POST
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null);
  const [company_id, setCompanyId] = useState(0);
  // const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const id = +query.id;

  // HELPER VARIABLES
  const [allRoles, setAllRoles] = useState([]);
  const [role_id, setRoleId] = useState(null);
  const [allPermissions, setAllPermissions] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [errors, setErrors] = useState("");
  const [loader, setLoader] = useState(true);

  // FETCH USER DETAILS
  useEffect(() => {
    const apiUrl = BASE_URL + "employees";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
        if (res.data) {
          console.log(res);
          setLoader(false);
          setName(res.data.data.full_name);
          setEmail(res.data.data.email_address);
          setPhone(res.data.data.phone_number);
          setCompanyId(res.data.data.company_id);
          setStatus(+res.data.data.status);
          

          // setRoles([]);
          setPermissions([]);

          // res.data.data.roles?.map((role) => {
          //   setRoles((roles) => [...roles, role.id]);
          //   setRoleId(+role.id);
          // });
          // res.data.data.permissions?.map((permission) =>
          //   setPermissions((permissions) => [...permissions, permission.id])
          // );
        } else {
          setErrors(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loader ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          {
            (roles!=3) && 
            <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Update Employee
          </Typography>
          }
          {<EmployeeForm id={id} />}
        </>
      )}
    </>
  );
};

EmployeeDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(EmployeeDetails);
