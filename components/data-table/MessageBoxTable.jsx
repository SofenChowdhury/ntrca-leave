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
import moment from 'moment';

const MessageBoxTable = ({ token,leaveType,leaveStatus,selectedEmp,leaveStartDate,
    leaveEndDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  // console.log(selectedEmp);




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
        return 'gray';
      case 2:
        return 'green';
      case 3:
        return 'orange';
      case 4:
        return 'red';
      case 5:
        return 'blue';
      default:
        return 'black'; // Default color if the status is not 1, 2, 3, or 4
    }};

  useEffect(() => {
    
    
    const apiUsers =
    BASE_URL +
    "leave/messages?page=" +
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
    console.log("message");
    axios
      .get(apiUsers,{
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log("message");
        console.log(res.data);
        console.log(res?.data?.data);
        if (res.status === 200) {
        //   console.log(res.data.data);
          setUsers(res.data);
          setLastPage(res.data.last_page);
          setTotalData(res.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page,leaveType,leaveStatus,selectedEmp,leaveStartDate,
    leaveEndDate]);

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
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

                
                  {/* <th width="20%">Application ID</th>
                  <th width="10%">Applied Date</th>
                  <th width="7%">Approver Name</th>
                  <th width="7%">Recorder Name</th>
                  <th width="15%">Applied Duration</th>
                  <th width="15%">Approved Duration</th>
                  <th width="10%">Status</th>
                  <th width="15%">Action</th> */}

                <th className="text-center" width="15%">Application ID</th>
                <th className="text-center" width="40%">Message</th>
                <th className="text-center" width="15%">View Message</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.map((user, index) => ( 
              <tr key={index}>
                <th className="text-center" scope="row">{`${user?.application?.id}`}</th>
                {(user?.application?.status == 1) &&
                    <td className="text-center">{`An applicant has sent application for `}<span style={{ color: getColorByStatus(user?.application?.leave_status?.l_stat_id) }}>{user?.application?.leave_status?.leave_status_name.toUpperCase()}</span><p className="small text-end">({moment(user?.application?.updated_at).format('MMMM Do YYYY, h:mm:ss a')})</p></td>
                }
                {(user?.application?.status == 2) &&
                    <td className="text-center">{`You have `}<span style={{ color: getColorByStatus(user?.application?.leave_status?.l_stat_id) }}>{user?.application?.leave_status?.leave_status_name.toUpperCase()}</span> an application<p className="small text-end">({moment(user?.application?.updated_at).format('MMMM Do YYYY, h:mm:ss a')})</p></td>
                }
                {(user?.application?.status == 3) &&
                    <td className="text-center">{`Your application has been `}<span style={{ color: getColorByStatus(user?.application?.leave_status?.l_stat_id) }}>{user?.application?.leave_status?.leave_status_name.toUpperCase()}</span><p className="small text-end">({moment(user?.application?.updated_at).format('MMMM Do YYYY, h:mm:ss a')})</p></td>
                }
                {(user?.application?.status == 4) &&
                    <td className="text-center">{`Your application has been `}<span style={{ color: getColorByStatus(user?.application?.leave_status?.l_stat_id) }}>{user?.application?.leave_status?.leave_status_name.toUpperCase()}</span> has applicant's application<p className="small text-end">({moment(user?.application?.updated_at).format('MMMM Do YYYY, h:mm:ss a')})</p></td>
                }
                {(user?.application?.status == 5) &&
                    <td className="text-center">{`Your application has been `}<span style={{ color: getColorByStatus(user?.application?.leave_status?.l_stat_id) }}>{user?.application?.leave_status?.leave_status_name.toUpperCase()}</span><p className="small text-end">({moment(user?.application?.updated_at).format('MMMM Do YYYY, h:mm:ss a')})</p></td>
                }
                {/* <td>{formatDate(user?.created_at)}</td> */}
                {/* <td>{user.start_date} <br></br> {user.end_date} &nbsp; ({user.applied_total_days})</td>
                <td>{user.approved_start_date} <br></br> {user.approved_end_date} &nbsp; ({user.approved_total_days})</td>*/}
               
                
                {/* <td style={{ color: getColorByStatus(user?.application?.leave_status?.l_stat_id) }}>
                    {user?.application?.leave_status?.leave_status_name}
                </td> */}

                <td className="text-center">
                  {/* <Link href={`/users/updateUser/${user.employee_id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <EditIcon cursor="pointer" />
                    </button>
                  </Link>
                  <Link href={`/application/${user.id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <VisibilityIcon cursor="pointer" />
                    </button>
                  </Link> */}
                  <Link href={`/application/view/${user?.application_id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <VisibilityIcon cursor="pointer" />
                    </button>
                  </Link>
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

export default connect(mapStateToProps)(MessageBoxTable);
