//react
import React, { useState, useEffect } from "react";

//redux imports
import { connect } from "react-redux";

//theme imports
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";

//component
import EmployeeForm from "../../components/forms/EmployeeForm";

const createEmployee = ({ roles }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [superAdmin, setSuperAdmin] = useState(false);
  return (
    <>
      {!superAdmin ? (
        <>
          {
            (roles != 3) && 
            <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Create Employee
          </Typography>
        }
          {!superAdmin && <EmployeeForm />}
        </>
      ) : (
        <Typography variant="h3" color={colors.greenAccent[300]}>
          Permission required!
        </Typography>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(createEmployee);
