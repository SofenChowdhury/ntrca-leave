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

const updateGrade = ({ token, query }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [branches, setBranch] = useState("");
  const [grade_name, setGradeName] = useState("");
  const [bran_id, setBran_id] = useState("");
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
          res?.data?.data?.map((grade)=> {
            if(grade?.gid == id){
              setLoader(false);
              setGradeName(grade?.grade_name);
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
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const apiGrade = BASE_URL + "grade/update/" + id;
    const grade = {
      grade_name,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiGrade, grade, config).then((response) => {
      if (response.data) {
        toast(`${response?.data?.message} - ${response?.data?.data?.grade_name}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
        Router.push({
          pathname: "/grade/gradeList",
        });
      } else {
        setFormErrors(Object.values(response.data.errors));
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
            Update Grade
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
            value={grade_name}
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
updateGrade.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(updateGrade);
