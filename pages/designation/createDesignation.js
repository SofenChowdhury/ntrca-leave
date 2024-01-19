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

const createDesignation = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [desg_nm, setDesignationName] = useState("");
  const [grade_id, setGrade_id] = useState("");
  const [grades, setGrades] = useState([]);
  const [contact_address, setContactAddress] = useState("");
  const [order_prefix, setOrderPrefix] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setPersonEmail] = useState("");
  const [contact_mobile, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState("");


  // Fetch Grade
  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "grades";

    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data) {
          setGrades(res.data?.data);
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
    const designation = {
      desg_nm,
      grade_id,
    };
    const apiDesignation = BASE_URL + "designation/create";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiDesignation, designation, config).then((response) => {
      if (response.data) {
        console.log(response.data.data);
        alert("Designation Information Created!");
        Router.push({
          pathname: "/designation/designationList",
        });
      } else {
        setFormErrors(Object.values(response.data));
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
        <div className="col-10">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Create Designation
          </Typography>
        </div>
        <div className="col-2 mt-1">
          <Link href="/designation/designationList" className="anchor">
            <Button variant="outlined"> Designation List</Button>
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
                  {/* ({option.company_bin}) */}
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

export default connect(mapStateToProps)(createDesignation);
