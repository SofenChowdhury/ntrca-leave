import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from 'date-fns';
//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";
import {   MenuItem, DateField } from "@mui/material";
//axios
import axios from "axios";
import { BASE_URL } from "../../base";
import { IMAGE_URL } from "../../base";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
// Icon import
import EditIcon from "@mui/icons-material/Edit";

import {
  Button,
  CircularProgress,
  Pagination,
  TextField,
} from "@mui/material";
import ApplicationReportTable from "../../components/data-table/ApplicationReportTable";

const leaveApplicationReport = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [users, setUsers] = useState([]);

  // // Pagination
  // const [page, setPage] = useState(1);
  // const [lastPage, setLastPage] = useState(1);
  // const [totalData, setTotalData] = useState(0);
  const [leaveType, setLeaveType] = useState();
  const [leaveTypeList,setleaveTypeList]=useState([]);
  const [leaveStatus,setLeaveStatus] =useState();
  const [leaveStatusList,setLeaveStatusList] =useState([]);
  const [employeeList,setemployeeList]=useState([]);
  const [selectedEmp, setSelectedEmp] = useState();
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [dateRange,setDateRange] = useState([]);
  const [appliedDate, setAppliedDate] = useState("");

  function formatDate(dateString){
    const options = { year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  } 

  useEffect(() => {
    const apiUsers =
    BASE_URL +
    "employees?isPaginate=false";
   
    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          // console.log(res);
          setemployeeList(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  useEffect(() => {
    const apiUsers =
    BASE_URL +
    "leave-type";
   
    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
        if (res.status === 200) {
          // console.log(res);
          setleaveTypeList(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  useEffect(() => {
    const apiUsers =
    BASE_URL +
    "leave-status";
   
    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
        if (res.status === 200) {
          console.log(res.data);
          setLeaveStatusList(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);




  const changeLeaveType = (value) => {
    // const { name, value } = e.target;
    setLeaveType(value);
    // console.log(value);
  };
  const changeLeaveStatus = (value) => {
    // const { name, value } = e.target;
    setLeaveStatus(value);
    // console.log(value);
  };

  const changeSelectedEmp = (value) => {
    // const { name, value } = e.target;
    setSelectedEmp(value);
    // console.log(value);
  };
  function onDateChange(date, dateString) {
    // console.log("date");
    // console.log(date);
    // console.log("dateString");
    setDateRange(date);
  
    dateString?.map((date, index) => {
      if (index == 0) {
        setLeaveStartDate(date);
      }
      else{
        setLeaveEndDate(date);
      } 
    });
  }
  const handleAppliedDateChange = (date) => {
    console.log(date);
    setAppliedDate(date);
  };
  
  function resetFilter(){
    setSelectedEmp("");
    setLeaveType("");
    setLeaveStatus("");
    setLeaveStartDate("");
    setLeaveEndDate("");
    setDateRange("");
    setAppliedDate("");
  }



  return (
    <>
      <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
        All Leave List
      </Typography>
      <div className="row">
       
       <div className="col-md-3 mt-4">
         <TextField
           onChange={(e) => {
             changeLeaveType(+e.target.value);
           }}
           select
           label="Leave Type"
           size="small"
           fullWidth
           value={leaveType || ""}

           className="shadow-input"
         >
           {leaveTypeList?.map((option, index) => (
             <MenuItem key={index} value={option.l_type_id}>
               {option.leave_type_name} 
             </MenuItem>
           ))}
         </TextField>
       </div>
       <div className="col-md-3 mt-4">
        <TextField
          onChange={(e) => {
            changeLeaveStatus(+e.target.value);
          }}
          select
          label="Leave Status"
          size="small"
          fullWidth
          value={leaveStatus || ""}

          className="shadow-input"
        >
          {leaveStatusList?.map((option, index) => (
            <MenuItem key={index} value={option.l_stat_id}>
              {option.leave_status_name} 
            </MenuItem>
          ))}
        </TextField>
      </div>
       <div className="col-md-3 mt-4">
         <TextField
           onChange={(e) => {
             changeSelectedEmp(+e.target.value);
           }}
           select
           label="Employee List"
           size="small"
           fullWidth
           value={selectedEmp || ""}

           className="shadow-input"
         >
           {employeeList?.map((option, index) => (
             <MenuItem key={index} value={option.emp_id}>
               {option.full_name} 
             </MenuItem>
           ))}
         </TextField>
       </div>
       <div className="col-md-3 mt-4">
         <RangePicker
           label="Date"
           variant="outlined"
           fullWidth
           onChange={onDateChange}
           size="large"
           style={{ width: "100%"}}
           value={dateRange}
           className="shadow-input"
           // disabledDate={disabledDate}
         />
         </div>
         {/* <div className="col-md-3 mt-4">
          <DatePicker
            onChange={handleAppliedDateChange}
            label="Applied Date"
            variant="outlined"
            fullWidth
            size="large"
            style={{ width: "100%" }}
            value={appliedDate}
            className="shadow-input"
          />
          </div> */}


       <div className="col-md-2 mt-4">
         <button className="btn btn-info"  onClick={resetFilter}>reset</button>
       </div>

   </div>
   <br></br>
      <AdvanceReportTable leaveType={leaveType} leaveStatus={leaveStatus} selectedEmp={selectedEmp} leaveStartDate={leaveStartDate}
      leaveEndDate={leaveEndDate}  appliedDate={appliedDate}></AdvanceReportTable>
   
     
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(leaveApplicationReport);
