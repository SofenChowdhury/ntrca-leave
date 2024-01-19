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

const createBranch = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [branch_name, setBranchName] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [companies, setCompanies] = useState([]);
  const [contact_address, setContactAddress] = useState("");
  const [order_prefix, setOrderPrefix] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setPersonEmail] = useState("");
  const [contact_mobile, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState("");

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const branch = {
  //     name,
  //     code,
  //     contact_address,
  //     order_prefix,
  //     contact_person,
  //     contact_email,
  //     contact_mobile,
  //     formErrors,
  //   };
  //   const apiBranch = BASE_URL + "api/v1/branches/create";
  //   const config = {
  //     headers: { Authorization: `Bearer ${token}` },
  //   };
  //   console.log(branch);
  //   axios.post(apiBranch, branch, config).then((response) => {
  //     console.log(response.data);
  //     if (response.data.status) {
  //       alert("Branch Information Created!");
  //       Router.push({
  //         pathname: "/branch/branchList",
  //       });
  //     } else {
  //       setFormErrors(Object.values(response.data.errors));
  //     }
  //   });
  // };

  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "companies";

    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data) {
          setCompanies(res.data?.data);
          // setLastPage(res.data.data.last_page);
          // setTotalData(res.data.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const branch = {
      branch_name,
      // company_id,
    };
    const apiBranch = BASE_URL + "branch/create";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(branch);
    axios.post(apiBranch, branch, config).then((response) => {
      console.log(response.data);
      if (response.data) {
        console.log(response.data.data);
        alert("Branch Information Created!");
        Router.push({
          pathname: "/branch/branchList",
        });
      } else {
        setFormErrors(Object.values(response.data));
      }
    });
  };

  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/branch/branchList",
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
            Create Branch
          </Typography>
        </div>
        <div className="col-2 mt-1">
          <Link href="/branch/branchList" className="anchor">
            <Button variant="outlined"> Branch List</Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4">
          <TextField
            label="Branch Name"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setBranchName(e.target.value)}
            className="shadow-input"
          />
        </div>
        
        {/*<div className="col-md-6 mt-4">
          <TextField
            onChange={(e) => {
              setCompany_id(+e.target.value);
            }}
            select
            label="Company"
            size="small"
            fullWidth
            value={company_id || ""}

            className="shadow-input"
          >
            {companies?.map((option, index) => (
              <MenuItem key={index} value={option.comp_id}>
                {option.company_name} 
                {/* ({option.company_bin}) */}
            {/*</MenuItem>*/}
           {/* ))}
          </TextField>
            </div>*/}
        {/* <div className="col-md-6 mt-4">
          <TextField
            label="Company Id"
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

export default connect(mapStateToProps)(createBranch);
