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

const updateDesignation = ({ token, query }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [designations, setDesignations] = useState([]);
  const [grades, setGrades] = useState([]);
  const [desg_nm, setDesignationName] = useState("");
  const [grade_id, setGrade_id] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [order_prefix, setOrderPrefix] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setPersonEmail] = useState("");
  const [contact_mobile, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [loader, setLoader] = useState(true);
  const id = query.id;

  useEffect(() => {
    const apiUrl = BASE_URL + "grades";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res?.status === 200) {
          setGrades(res?.data?.data);
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
    const apiUrl = BASE_URL + "designations";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res?.status === 200) {
          setDesignations(res?.data?.data);
          res?.data?.data?.map((designation)=> {
            if(designation?.desg_id == id){
              setLoader(false);
              setDesignationName(designation?.desg_nm);
              setGrade_id(designation?.grade_id);
            }
          })
        } else {
          setFormErrors(res?.data?.message);
          console.log(res?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const apiDesignation = BASE_URL + "designation/update/" + id;
    const designation = {
      desg_nm,
      grade_id,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiDesignation, designation, config).then((response) => {
      if (response.data) {
        toast(`${response?.data?.message} - ${response?.data?.data?.desg_nm}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
        Router.push({
          pathname: "/designation/designationList",
        });
      } else {
        setFormErrors(Object.values(response.data.errors));
      }
    });
  };

  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/designation/designationList",
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
            Update Branch
          </Typography>
        </div>
        <div className="col-1 mt-1">
          <Link href="/designation/designationList" className="anchor">
            <Button variant="outlined"> Branch List</Button>
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mt-4">
          <TextField
            label="Designation Name"
            variant="outlined"
            size="small"
            type="text"
            value={desg_nm}
            fullWidth
            onChange={(e) => setDesignationName(e.target.value)}
            className="shadow-input"
          />
        </div>
        <div className="col-md-6 mt-4">
            <TextField
              onChange={(e) => {
                setGrade_id(+e.target.value);
              }}
              select
              label="Grade"
              size="small"
              fullWidth
              value={grade_id || ""}
              className="shadow-input"
            >
              {grades?.map((option, index) => (
                <MenuItem key={index} value={option.gid}>
                  {option.grade_name} 
                </MenuItem>
              ))}
            </TextField>
          </div>
      </div>
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
updateDesignation.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(updateDesignation);
