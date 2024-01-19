// import React, { Component,useState,useEffect } from 'react';
// // import React, { useState, useEffect } from "react";
// import 'datatables.net';
// import $ from 'jquery';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import { BASE_URL } from "../../base";
// //redux imports
// import { connect } from "react-redux";


// const RecorderTable = ({user})=> {


// // var datatable;
// const [Datatable, setDatatable] = useState();


// let reloadTable=()=> {
//   Datatable.ajax.reload();
// }

// useEffect(() => {

//     //  Check if DataTable has already been initialized
//      if (!$.fn.DataTable.isDataTable('#myTable')) {
//       // Initialize DataTable with Bootstrap styling
//     let  datatable= $('#myTable').DataTable({
//         // DataTable options and configurations
//         // For example:
//         paging: true,
//         searching: true,
//         ordering: true,
//         responsive: true,
//         processing: true,
//         serverSide: true,
//         Filter: true,
//         stateSave: true,
//         type: "POST",
//         "ajax": {
//             "url": BASE_URL+'leave/application/for-recorder',
//             "type": "POST",
//               data: function (d) {
//                 d.token= user;
            
//             },
//         },
//         columns: [
//           {data: 'sender_name', name: 'sender_name'},
//           {data: 'full_name', name: 'full_name'},
//           {data: 'start_date', name: 'start_date'},
//           {data: 'end_date', name: 'end_date'},
//           {data: 'reason', name: 'reason'},
//           {data: 'applied_total_days', name: 'applied_total_days'},
//           // {data: 'id', name: 'id'},
   
//             { "data": function(data){
//                             return ' <a href="/application/details/'+data.id+'">Show</a> ';
//                         },
//                         "orderable": false, "searchable":false, "name":"selected_rows" },
//         ]
//         // Add more options based on your requirements
//       });
//       setDatatable(datatable);
//   }

 
// }, []);


//     return (
//       <div>
//       {/* <button onClick={reloadTable}>reload table</button> */}
     
//         <table id="myTable"  className="display" >
//         <thead>
//               <tr>
//                   <th width="15%">Sender</th>
//                   <th width="15%">Approver Name</th>
//                   <th width="10%">Start Date</th>
//                   <th width="10%">End Date</th>
//                   <th width="15%">Reason</th>
//                   <th width="10%">No of Days</th>
//                   <th width="15%">Action</th>

               
                
//               </tr>
//           </thead>
//           <tbody>
          
//           </tbody>
      
//         </table>
//         </div>
     
//     );
    
  
//   }


// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.token
//   };
// };


// export default connect(mapStateToProps)(RecorderTable);


// import React, { Component,useState,useEffect } from 'react';
// // import React, { useState, useEffect } from "react";
// import 'datatables.net';
// import $ from 'jquery';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import { BASE_URL } from "../../base";
// //redux imports
// import { connect } from "react-redux";


// const ApproverTable = ({user})=> {


// // var datatable;
// const [Datatable, setDatatable] = useState();


// let reloadTable=()=> {
//   Datatable.ajax.reload();
// }

// useEffect(() => {

//     //  Check if DataTable has already been initialized
//      if (!$.fn.DataTable.isDataTable('#myTable')) {
//       // Initialize DataTable with Bootstrap styling
//     let  datatable= $('#myTable').DataTable({
//         // DataTable options and configurations
//         // For example:
//         paging: true,
//         searching: true,
//         ordering: true,
//         responsive: true,
//         processing: true,
//         serverSide: true,
//         Filter: true,
//         stateSave: true,
//         type: "POST",
//         "ajax": {
//             "url": BASE_URL+'leave/application/for-approver',
//             "type": "POST",
//               data: function (d) {
//                 d.token= user;
            
//             },
//         },
//         columns: [
//           {data: 'full_name', name: 'full_name'},
//           {data: 'recorder_name', name: 'recorder_name'},
//           {data: 'start_date', name: 'start_date'},
//           {data: 'end_date', name: 'end_date'},
//           {data: 'reason', name: 'reason'},
//           {data: 'applied_total_days', name: 'applied_total_days'},
//           { "data": function(data){
//             return ' <a href="/application/details/'+data.id+'">Show</a> ';
//         },
//         "orderable": false, "searchable":false, "name":"selected_rows" },
//         ]
//         // Add more options based on your requirements
//       });
//       setDatatable(datatable);
//   }

 
// }, []);


//     return (
//       <div>
//       {/* <button onClick={reloadTable}>reload table</button> */}
     
//         <table id="myTable"  className="display" >
//         <thead>
//               <tr>
//                   <th>Sender Name</th>
//                   <th>Recorder Name</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Reason</th>
//                   <th>No of Days</th>
//                   <th>Action</th>
              
                
//               </tr>
//           </thead>
//           <tbody>
          
//           </tbody>
      
//         </table>
//         </div>
     
//     );
    
  
//   }


// const mapStateToProps = (state) => {
//   return {
//     user: state.auth.token
//   };
// };


// export default connect(mapStateToProps)(ApproverTable);

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { format } from 'date-fns';
//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../pages/theme";
import { IconButton, Typography, useTheme } from "@mui/material";
import {   MenuItem, DateField } from "@mui/material";
//axios
import axios from "axios";
import { BASE_URL } from "../../base";
import { IMAGE_URL } from "../../base";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
// Icon import
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import {
  Button,
  CircularProgress,
  Pagination,
  TextField,
} from "@mui/material";
import Router from "next/router";

//Alert
import { toast } from "react-toastify";

const RecorderTable = ({ token,leaveType,leaveStatus,selectedEmp,leaveStartDate,
    leaveEndDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  // console.log(selectedEmp);

  const [approval_id,setApproval_id]=useState("");
  const [approvalName,setApprovalName]=useState([]);




  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);


  function formatDate(dateString){
    const options = { year: "numeric", month: "long", day: "numeric"};
    return new Date(dateString).toLocaleDateString(undefined, options);
  } 

  const getColorByStatus = (statusId) => {
    switch (statusId) {
      case 1:
        return 'black';
      case 2:
        return 'green';
      case 3:
        return 'orange';
      case 4:
        return 'red';
      default:
        return 'black'; // Default color if the status is not 1, 2, 3, or 4
  }};

  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "leave/employee-list";

    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res?.status === 200) {
          console.log(res?.data);
          setApprovalName(res?.data);
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    
    
    const apiUsers =
    BASE_URL + "leave/application/for-recorder?page=" +
    // "leave/application-to-me?page=" +
    // "leave/advance-report?page=" +
    page;
    const param={
      leaveType:leaveType,
      leaveStatus:leaveStatus,
      selectedEmp:selectedEmp,
      leaveStartDate:leaveStartDate,
      leaveEndDate:leaveEndDate
    };
    // axios.post(apiBranch, branch, config).then((response) 
    // console.log(param);
    axios
      .post(apiUsers, param,{
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log("pending res");
        // console.log(res);
        if (res.status == 200) {
          // console.log(res.data.data);
          setUsers(res.data);
          setLastPage(res.data.last_page);
          setTotalData(res.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [approval_id,page,leaveType,leaveStatus,selectedEmp,leaveStartDate,leaveEndDate]);

  const setApproval = (approver_id, application_id) => {
    setApproval_id(approver_id);
    const application = {
      approval_id: approver_id
    };
    const apiLeaveApplication = BASE_URL + "leave/select-approver/" + application_id;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(apiLeaveApplication, application, config).then((response) => {
      if (response?.status == 200) {
        toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
      } else {
        setFormErrors(Object.values(response.data.errors));
      }
    });
  };

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };

  const getButtonsByStatus = (statusId,applicationId) => {
    switch (statusId) {
      case 1:
        return (
          <>
            <Link href={`/application/details/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <InfoIcon cursor="pointer" />
              </button>
            </Link>
            <Link href={`/application/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <VisibilityIcon cursor="pointer" />
              </button>
            </Link>
            {/* <Link href={`/application/edit/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <EditIcon cursor="pointer" />
              </button>
            </Link> */}
            {/* <Button variant="contained" color="primary">
              View
            </Button>
            <Button variant="contained" color="secondary">
              History
            </Button> */}
          </>
        );
      case 2:
        return (
          <>
            <Link href={`/application/details/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <InfoIcon cursor="pointer" />
              </button>
            </Link>
            <Link href={`/application/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <VisibilityIcon cursor="pointer" />
              </button>
            </Link>
            {/* <Button variant="contained" color="primary">
              View
            </Button>
            <Button variant="contained" color="secondary">
              History
            </Button> */}
          </>
        );
      case 3:
        return (
          <>
            <Link href={`/application/details/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <InfoIcon cursor="pointer" />
              </button>
            </Link>
            <Link href={`/application/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <VisibilityIcon cursor="pointer" />
              </button>
            </Link>
            {/* <Button variant="contained" color="primary">
              View
            </Button>
            <Button variant="contained" color="secondary">
              History
            </Button> */}
            {/* <Link href={`/application/edit/${applicationId}`}>
              <Button variant="contained" color="warning">
                Edit
              </Button>
            </Link> */}
          </>
        );
      case 4:
        return (
          <>
            <Link href={`/application/details/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <InfoIcon cursor="pointer" />
              </button>
            </Link>
            <Link href={`/application/${applicationId}`} className="anchor">
              <button className="btn btn-light btn-sm me-1">
                <VisibilityIcon cursor="pointer" />
              </button>
            </Link>
          </>
        );
      default:
        return null; // No buttons if the status is not 1, 2, 3, or 4
    }
  };


  return (
    <>
      
  
   
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead>
            <tr className="table-success">
              {/* <th>#</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Leave Type</th>
              <th>Duration</th>
              <th>Approved Leave</th>
              <th>Leave Location</th>
              <th>Application Date</th>
              <th>Approver Name</th>
              <th>Leave Status</th>
              <th>Actions</th> */}

                
                  <th width="20%">Application ID</th>
                  <th width="10%">Applied Date</th>
                  <th width="15%">Approver Name</th>
                  <th width="10%">Recorder Name</th>
                  <th width="10%">Applied Duration</th>
                  <th width="10%">Approved Duration</th>
                  <th width="10%">Status</th>
                  <th width="15%">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user, index) => ( 
              <tr key={index}>
                {/* <th scope="row">{index + 1}</th> */}
                <td>
                <img height={50} src={IMAGE_URL+user?.sender?.user?.profile_picture}/>
                <br></br>
                Application ID : {user.id}
                <br></br>
                Leave Type : {user?.leave_type?.leave_type_name}
                <br></br>
                
                Sender : <b>{user?.sender?.full_name}</b> <br></br>({user?.sender?.designation?.desg_nm})
                </td>
                <td>{formatDate(user?.created_at)}</td>
                <td>
                {user?.approver?.full_name == null ? 
                  ( 
                  <TextField
                    onChange={(e) => setApproval(+e.target?.value, user?.id)}
                    select
                    label="Approver Name"
                    size="small"
                    fullWidth
                    value={approval_id || ""}
                    className="shadow-input"
                  >
                    {approvalName?.map((option, index) => (
                      <MenuItem key={index} value={option?.emp_id}>
                        {option?.full_name}-({option?.desg_nm})
                      </MenuItem>
                    ))}
                  </TextField>
                  )
                : user?.approver?.full_name}
                
                </td>
                <td>{user?.reviewer?.full_name}</td>
                <td>{user?.start_date} <br></br> {user?.end_date} &nbsp; ({user?.applied_total_days})</td>
                <td>{user?.approved_start_date} <br></br> {user?.approved_end_date} &nbsp; ({user?.approved_total_days})</td>                         
               
                
                <td style={{ color: getColorByStatus(user?.leave_status?.l_stat_id) }}>
                    {user?.leave_status?.leave_status_name}
                </td>
                

                <td>
                  {getButtonsByStatus(user?.leave_status?.l_stat_id,user?.id)}
                  {/* <Link href={`/users/updateUser/${user.employee_id}`} className="anchor"> */}
                  {/* <Link href={`/application/edit/${user?.id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <EditIcon cursor="pointer" />
                    </button>
                  </Link> */}
                  {/* <Link href={`/application/${user?.id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <VisibilityIcon cursor="pointer" />
                    </button>
                  </Link>
                  <Link href={`/application/details/${user?.id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <InfoIcon cursor="pointer" />
                    </button>
                  </Link> */}
                </td>

                {/* <td>
                  <Link href={`/users/updateUser/${user.id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <EditIcon cursor="pointer" />
                    </button>
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row justify-content-center">
            <div className="col-md-12 d-flex justify-content-center">
              <Pagination
                count={lastPage}
                page={page}
                color="secondary"
                size="large"
                onChange={handleChange}
              />
              {page === lastPage ? (
                <span className="ms-3 mt-2">
                  Showing {1 + (page - 1) * 10} - {totalData} out of {totalData}
                </span>
              ) : (
                <>
                  {totalData === 0 ? (
                    <span className="ms-3 mt-2">Showing 0 out of 0</span>
                  ) : (
                    <span className="ms-3 mt-2">
                      Showing {1 + (page - 1) * 10} - {10 + (page - 1) * 10} out
                      of {totalData}
                    </span>
                  )}
                </>
              )}
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

export default connect(mapStateToProps)(RecorderTable);
