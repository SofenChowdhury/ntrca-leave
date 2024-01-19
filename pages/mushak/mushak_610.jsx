import React, { useState, useEffect, useRef } from "react";
import Router from "next/router";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import {
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Autocomplete
} from "@mui/material";

// axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Date
import { DatePicker } from "antd";
import moment from "moment";

// Icons
import Print from "@mui/icons-material/Print";

// PRINT
import { useReactToPrint } from "react-to-print";

const Mushak_610 = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Branch Variables
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(0);

  // Date Variable
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const { RangePicker } = DatePicker;

  // Reference Variable
  const printRef = useRef();

  // PRINT
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // FETCH BRANCHES
  useEffect(() => {
    const apiBranches = BASE_URL + "api/v1/branches";

    axios
      .get(apiBranches, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setBranches(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Branch Change
  const handleBranchChange = (event, value) => {
    if (value) {
      setSelectedBranch(value.id);
    } else {
      setSelectedBranch("");
    }
  };

  //Date Handle
  const handleSearch = (e) => {
    if (e == 1) setIsCustom(true);
    else if (e == 2) {
      setIsCustom(false);
      let currentDate = new Date();
      let lastDate = getDateXDaysAgo(7, currentDate);
      setStartDate(moment(lastDate).format("YYYY-MM-DD"));
      setEndDate(moment(currentDate).format("YYYY-MM-DD"));
    } else if (e == 3) {
      setIsCustom(false);
      let currentDate = new Date();
      let lastDate = getDateXDaysAgo(30, currentDate);
      setStartDate(moment(lastDate).format("YYYY-MM-DD"));
      setEndDate(moment(currentDate).format("YYYY-MM-DD"));
    } else if (e == 4) {
      setIsCustom(false);
      let today = new Date();
      let FirstDay = new Date(
        moment(today).format("YYYY"),
        moment(today).format("MM") - 1,
        1
      );
      let LastDay = new Date();
      FirstDay = moment(FirstDay).format("YYYY-MM-DD");
      LastDay = moment(LastDay).format("YYYY-MM-DD");
      setStartDate(FirstDay);
      setEndDate(LastDay);
    } else if (e == 5) {
      setIsCustom(false);
      let today = new Date();
      let firstDay = new Date(
        moment(today).subtract(1, "months").startOf("month")
      );
      let lastDay = new Date(
        moment(today).subtract(1, "months").endOf("month")
      );

      firstDay = moment(firstDay).format("YYYY-MM-DD");
      lastDay = moment(lastDay).format("YYYY-MM-DD");
      setStartDate(firstDay);
      setEndDate(lastDay);
    } else {
      setStartDate("");
      setEndDate("");
      setIsCustom(false);
    }
  };
  function getDateXDaysAgo(numOfDays, date = new Date()) {
    const daysAgo = new Date(date.getTime());

    daysAgo.setDate(date.getDate() - numOfDays);

    return daysAgo;
  }
  function onChange(date, dateString) {
    dateString?.map((date, index) => {
      if (index == 0) setStartDate(date);
      else setEndDate(date);
    });
  }

  return (
    <>
      <div className="row">
        <Typography
          variant="h2"
          className="mb-4"
          color={colors.greenAccent[300]}
        >
          Mushak 6.10
        </Typography>
      </div>

      <div className="row">
        <div className="col-md-3 mt-3">
          <h6 className="text-secondary ms-1">Branch</h6>
          <Autocomplete
            options={branches}
            getOptionLabel={(option) => option.name}
            onChange={handleBranchChange}
            renderInput={(params) => (
              <TextField {...params} label="Branch" className="shadow-input" />
            )}
            size="small"
          />
        </div>
        <div className="col-md-6 mt-3">
          <div className="row">
            <h6 className="text-secondary ms-1">Timeline</h6>
          </div>
          <div className="row">
            <div className="col-md-4">
              <TextField
                onChange={(e) => handleSearch(+e.target.value)}
                select
                size="small"
                fullWidth
                className="shadow-input"
                defaultValue={0}
              >
                <MenuItem value={0}>Select Range</MenuItem>
                <MenuItem value={1}>Custom Range</MenuItem>
                <MenuItem value={2}>Last 7 Days</MenuItem>
                <MenuItem value={3}>Last 30 Days</MenuItem>
                <MenuItem value={4}>Current Month</MenuItem>
                <MenuItem value={5}>Last Month</MenuItem>
              </TextField>
            </div>
            {isCustom && (
              <div className="col-md-8">
                <RangePicker
                  onChange={onChange}
                  size="large"
                  style={{ width: "100%" }}
                  className="shadow-input"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mt-4">
          <Button
            variant="contained"
            size="small"
            className="float-end me-3"
            onClick={handlePrint}
            color="secondary"
          >
            <Print />
            Print
          </Button>
        </div>
      </div>

      <div ref={printRef} className="p-3 mt-5">
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <b>Government of the People's Republic of Bangladesh</b>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <b>National Board of Revenue</b>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-sm-2">
            <b>MUHSAK 6.10</b>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <b>Information regarding Purchase / Sale for 2 lac and more</b>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <b>delivered / received in a Single Challan (Mushak 6.3)</b>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <b>[As per Sub-rule 1 of Rule 42]</b>
          </div>
        </div>
        <div className="row justify-content-md-center mt-1">
          <div className="col-md-auto">
            <b>
              For the Period of {moment("2023-03-01")?.format("DD MMM YY")} to{" "}
              {moment("2023-03-31")?.format("DD MMM YY")}
            </b>
          </div>
        </div>
        <div className="row justify-content-between mt-3">
          <div className="col-4">
            <b>Registered / Enlisted Person's Name: </b>
          </div>
          <div className="col-4">
            <b>BIN: </b>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <b>Part ka - Purchase Account Information</b>
          </div>
        </div>

        {/* TABLE - 1 */}
        <div className="mt-3">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th className="text-center align-middle">SL</th>
                <th className="text-center align-middle">Challan No</th>
                <th className="text-center align-middle">Date of Issue</th>
                <th className="text-center align-middle">Value</th>
                <th className="text-center align-middle">Name of Seller</th>
                <th className="text-center align-middle">Seller's Address</th>
                <th className="text-center align-middle">BIN/NID of Seller</th>
              </tr>
              <tr>
                <th className="text-center align-middle">1</th>
                <th className="text-center align-middle">2</th>
                <th className="text-center align-middle">3</th>
                <th className="text-center align-middle">4</th>
                <th className="text-center align-middle">5</th>
                <th className="text-center align-middle">6</th>
                <th className="text-center align-middle">7</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <b>Part kha - Sales Account Information</b>
          </div>
        </div>

        {/* TABLE - 2  */}
        <div className="mt-3">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th className="text-center align-middle">SL</th>
                <th className="text-center align-middle">Challan No</th>
                <th className="text-center align-middle">Date of Issue</th>
                <th className="text-center align-middle">Value</th>
                <th className="text-center align-middle">Name of Purchaser</th>
                <th className="text-center align-middle">
                  Purchaser's Address
                </th>
                <th className="text-center align-middle">
                  BIN/NID of Purchaser
                </th>
              </tr>
              <tr>
                <th className="text-center align-middle">1</th>
                <th className="text-center align-middle">2</th>
                <th className="text-center align-middle">3</th>
                <th className="text-center align-middle">4</th>
                <th className="text-center align-middle">5</th>
                <th className="text-center align-middle">6</th>
                <th className="text-center align-middle">7</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* FOOTER */}
        <div className="row">
          <div className="col-12">
            <b>Signature of Authorised Person:</b>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <b>Name:</b>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <b>Date:</b>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Mushak_610);
