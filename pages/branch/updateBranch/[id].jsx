import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../../theme";
import { TextField, Button, Typography, useTheme, MenuItem } from "@mui/material";

//Alert
import { toast } from "react-toastify";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

const updateBranch = ({ token, query }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [branches, setBranch] = useState("");
  const [branch_name, setBranchName] = useState("");
  const [bran_id, setBran_id] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [companies, setCompanies] = useState([]);
  const [order_prefix, setOrderPrefix] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setPersonEmail] = useState("");
  const [contact_mobile, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [loader, setLoader] = useState(true);
  const id = query.id;

  useEffect(() => {
    const apiUrl = BASE_URL + "companies";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res?.status === 200) {
          setCompanies(res?.data?.data);
        } else {
          setFormErrors(res?.data?.message);
          console.log(res?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = BASE_URL + "branches";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res?.status === 200) {
          res?.data?.data?.map((branch)=> {
            if(branch.bran_id == id){
              setLoader(false);
              setBranchName(branch.branch_name);
              setBran_id(branch.bran_id);
              setCompany_id(branch.company_id);
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
    const apiBranch = BASE_URL + "branch/update/" + id;
    const branch = {
      branch_name,
      // company_id,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(apiBranch, branch, config).then((response) => {
      if (response.data) {
        toast(`${response?.data?.message} - ${response?.data?.data?.branch_name}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
        Router.push({
          pathname: "/branch/branchList",
        });
      } else {
        setFormErrors(Object.values(response.data.errors));
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
            Update Branch
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
            value={branch_name}
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
                </MenuItem>
              ))}
            </TextField>
              </div>*/}
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
