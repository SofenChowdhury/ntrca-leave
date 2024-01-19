import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../../theme";
import { TextField, Button, Typography, useTheme } from "@mui/material";

//Alert
import { toast } from "react-toastify";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

const updateBranch = ({ token, query }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [branches, setBranch] = useState("");
  const [department_name, setDepartmentName] = useState("");
  const [bran_id, setBran_id] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [order_prefix, setOrderPrefix] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setPersonEmail] = useState("");
  const [contact_mobile, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [loader, setLoader] = useState(true);
  const id = query.id;

  //fetching branch details
  // Fetch Company Details
  // useEffect(() => {
  //   const apiUrl = BASE_URL + "api/v1/branches/" + id;
  //   axios
  //     .get(apiUrl, {
  //       headers: { Authorization: "Bearer " + token },
  //     })
  //     .then((res) => {
  //       if (res.data.status == true) {
  //         setLoader(false);
  //         setBranchName(res.data.data.name);
  //         setBranchCode(res.data.data.code);
  //         setOrderPrefix(res.data.data.order_prefix);
  //         setContactPerson(res.data.data.person);
  //         setPersonEmail(res.data.data.email);
  //         setContactPhone(res.data.data.phone);
  //         setContactAddress(res.data.data.address);
  //       } else {
  //         setFormErrors(res.data.message);
  //         console.log(res.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);

  useEffect(() => {
    const apiUrl = BASE_URL + "departments";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res?.status === 200) {
          res?.data?.data?.map((department)=> {
            if(department?.dept_id == id){
              setLoader(false);
              setDepartmentName(department?.department_name);
            }
          })
        } else {
          setFormErrors(res.data.message);
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const apiDepartment = BASE_URL + "department/update/" + id;
    const department = {
      department_name
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiDepartment, department, config).then((response) => {
      if (response.data) {
        toast(`${response?.data?.message} - ${response?.data?.data?.department_name}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
        Router.push({
          pathname: "/department/departmentList",
        });
      } else {
        setFormErrors(Object.values(response.data.errors));
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
        <div className="col-11">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Update Department
          </Typography>
        </div>
        <div className="col-1 mt-1">
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
            value={department_name}
            fullWidth
            onChange={(e) => setDepartmentName(e.target.value)}
            className="shadow-input"
          />
        </div>
        {/* <div className="col-md-6 mt-4">
          <TextField
            label="Company Id"
            variant="outlined"
            size="small"
            type="number"
            value={company_id}
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
            value={order_prefix}
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
            value={contact_person}
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
            value={contact_email}
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
            value={contact_mobile}
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
            value={contact_address}
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
            Update
          </Button>
          <Button variant="contained" color="error" onClick={goBack}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
updateBranch.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(updateBranch);
