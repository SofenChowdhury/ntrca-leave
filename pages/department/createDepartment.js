import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../theme";
import { TextField, Button, Typography, useTheme, MenuItem } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

const createDepartment = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [department_name, setDepartmentName] = useState("");
  const [branch_id, setBranch_id] = useState("");
  const [branches, setBranches] = useState([]);
  const [contact_address, setContactAddress] = useState("");
  const [order_prefix, setOrderPrefix] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setPersonEmail] = useState("");
  const [contact_mobile, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState("");


  // useEffect(() => {
  //   const apiGrade =
  //     BASE_URL +
  //     "branches";

  //   axios
  //     .get(apiGrade, {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       if (res.data) {
  //         setBranches(res.data);
  //         // setLastPage(res.data.data.last_page);
  //         // setTotalData(res.data.data.total);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const branch = {
      department_name
    };
    const apiBranch = BASE_URL + "department/create";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiBranch, branch, config).then((response) => {
      if (response.data) {
        alert("Department Information Created!");
        Router.push({
          pathname: "/department/departmentList",
        });
      } else {
        setFormErrors(Object.values(response.data));
        console.log(response.data);
      }
    });
  };

  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/department/departmentList",
    });
  };

  return (
    <div className="mt-2">
      <div className="row">
        <div className="col-10">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Create Department
          </Typography>
        </div>
        <div className="col-2 mt-1">
          <Link href="/department/departmentList" className="anchor">
            <Button variant="outlined"> Department List</Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4">
          <TextField
            label="Department Name"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setDepartmentName(e.target.value)}
            className="shadow-input"
          />
        </div>
        {/* <div className="col-md-6 mt-4">
          <TextField
            onChange={(e) => {
              branch_id(+e.target.value);
            }}
            select
            label="Branch"
            size="small"
            fullWidth
            value={branch_id || ""}

            className="shadow-input"
          >
            {branches?.map((option, index) => (
              <MenuItem key={index} value={option.bran_id}>
                {option.branch_name} 
              </MenuItem>
            ))}
          </TextField>
        </div> */}
        {/* <div className="col-md-6 mt-4">
          <TextField
            label="Branch Id"
            variant="outlined"
            size="small"
            type="number"
            fullWidth
            onChange={(e) => setCompany_id(e.target.value)}
            className="shadow-input"
          />
        </div> */}
        {/* <div className="col-md-4 mt-4">
          <TextField
            label="Order Prefix"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setOrderPrefix(e.target.value)}
            className="shadow-input"
          />
        </div> */}
      </div>

      {/* <div className="row">
        <div className="col-md-4 mt-4">
          <TextField
            label="Contact Person"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setContactPerson(e.target.value)}
            className="shadow-input"
          />
        </div>
        <div className="col-md-4 mt-4">
          <TextField
            label="Contact Email"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setPersonEmail(e.target.value)}
            className="shadow-input"
          />
        </div>
        <div className="col-md-4 mt-4">
          <TextField
            label="Contact Phone"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setContactPhone(e.target.value)}
            className="shadow-input"
          />
        </div>
      </div> */}
      {/* <div className="row">
        <div className="col-md-12 mt-4">
          <TextField
            label="Address"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={4}
            onChange={(e) => {
              setContactAddress(e.target.value);
            }}
            className="shadow-input"
          />
        </div>
      </div> */}
      <div className="row mt-4">
        <div className="col-md-12">
          <Button
            variant="contained"
            color="success"
            className="float-end"
            onClick={onSubmit}
          >
            Create
          </Button>
          <Button variant="contained" color="error" onClick={goBack}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(createDepartment);
