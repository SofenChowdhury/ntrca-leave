import React, { useState, useEffect } from "react";
import Router from "next/router";
import { connect } from "react-redux";
import {
  Typography,
  useTheme,
  Box,
  Paper,
  Grid,
  Avatar,
  TextField,
  Pagination,
  MenuItem,
} from "@mui/material"; 

import { tokens } from "../../theme";
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../base";
import { Padding } from "@mui/icons-material";
import { DatePicker } from "antd";
import AdvanceReportTable from "../../../components/data-table/AdvanceReportTable";
const { RangePicker } = DatePicker;
const UserDetails = ({ query, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [users, setUsers] = useState([]);

  const [employeeDetails, setEmployeeDetails] = useState(null);

  const [leaveType, setLeaveType] = useState();
  const [leaveTypeList,setleaveTypeList]=useState([]);
  const [leaveStatus,setLeaveStatus] =useState();
  const [leaveStatusList,setLeaveStatusList] =useState([]);
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [dateRange,setDateRange] = useState([]);

  const id = +query.id;

  const [leaves,setLeaves]=useState([]);
  function formatDate(dateString){
    const options = { year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

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

  function resetFilter(){
    // setSelectedEmp("");
    setLeaveType("");
    setLeaveStatus("");
    setLeaveStartDate("");
    setLeaveEndDate("");
    setDateRange("");
  }







  useEffect(() => {
    const apiUrl = BASE_URL + "employee/details/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        setEmployeeDetails(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    const apiUsers =
    BASE_URL +
    "employee/total-casual-leave/"+id;
   
    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
           console.log(res);
          setLeaves(res.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  return (
    <>
    <Box p={3}>
      <Typography variant="h2" mb={4} color={colors.greenAccent[300]}>
        User Details
      </Typography>
      {employeeDetails && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <img height={250} alt="User Profile" src={IMAGE_URL + employeeDetails?.user?.profile_picture} />
            </Grid>
            <Grid item xs={12} sm={3} sx={{ textAlign: "left" }}>
              <Typography variant="h4" color={colors.greenAccent[300]}>Employee ID: {employeeDetails?.emp_id}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Full Name: {employeeDetails?.full_name}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Gender: {employeeDetails?.gender}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Phone number: {employeeDetails?.phone_number}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Email: {employeeDetails?.email_address}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Office ID: {employeeDetails?.office_id}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Branch: {employeeDetails?.branch?.branch_name}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Designation Name: {employeeDetails?.designation?.desg_nm}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Department Name: {employeeDetails?.department?.department_name}</Typography>
              <Typography variant="h4" color={colors.greenAccent[300]}>Company Name: {employeeDetails?.branch?.company?.company_name}</Typography>
              
              {/* Add more details as needed */}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
    <Box p={3} display="flex" justifyContent="space-between">
      <Typography variant="h4" color={colors.greenAccent[300]}>Total Casual leave : {leaves?.totalApprovedLeave}</Typography>
      <Typography variant="h4" color={colors.greenAccent[300]}>Remaining leave : {leaves?.remainingLeave}</Typography>
    </Box>
    <Box p={3}>
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
      
       <div className="col-md-4 mt-4">
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

       <div className="col-md-2 mt-4">
         <button className="btn btn-info"  onClick={resetFilter}>reset</button>
       </div>

   </div>

    </Box>
    <Box p={3}>  

        
            <AdvanceReportTable leaveType={leaveType} leaveStatus={leaveStatus} selectedEmp={id} leaveStartDate={leaveStartDate}
              leaveEndDate={leaveEndDate}></AdvanceReportTable>
   
    </Box>
    </>
  );
};

UserDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(UserDetails);
