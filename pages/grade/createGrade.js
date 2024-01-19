import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../theme";
import { TextField, Button, Typography, useTheme } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

const createGrade = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [grade_name, setGradeName] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [contact_address, setContactAddress] = useState("");
  const [order_prefix, setOrderPrefix] = useState("");
  const [contact_person, setContactPerson] = useState("");
  const [contact_email, setPersonEmail] = useState("");
  const [contact_mobile, setContactPhone] = useState("");
  const [formErrors, setFormErrors] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const grade = {
      grade_name,
    };
    const apiGrade = BASE_URL + "grade/create";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(grade);
    axios.post(apiGrade, grade, config).then((response) => {
      console.log(response.data);
      if (response.data) {
        console.log(response.data.data);
        alert("Grade Information Created!");
        Router.push({
          pathname: "/grade/gradeList",
        });
      } else {
        setFormErrors(Object.values(response.data));
      }
    });
  };

  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/grade/gradeList",
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
            Create Grade
          </Typography>
        </div>
        <div className="col-2 mt-1">
          <Link href="/grade/gradeList" className="anchor">
            <Button variant="outlined"> Grade List</Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4">
          <TextField
            label="Grade Name"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setGradeName(e.target.value)}
            className="shadow-input"
          />
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

export default connect(mapStateToProps)(createGrade);
