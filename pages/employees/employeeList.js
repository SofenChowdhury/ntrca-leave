import React, { useEffect, useState } from "react";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import { greenAccent } from '@mui/material/colors';

import { toast } from "react-toastify";
import { Typography, useTheme } from "@mui/material";
//axios
import axios from "axios";
import { BASE_URL,IMAGE_URL } from "../../base";

// Icon import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Person2Icon from '@mui/icons-material/Person2';
import {
  Button,
  CircularProgress,
  TextField,
  Pagination,
} from "@mui/material";

const employeeList = ({ token,roles}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employees, setEmployees] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, [page, searchQuery]); // Call fetchEmployees when page or searchQuery changes

  const fetchEmployees = () => {
    const apiUsers = `${BASE_URL}employees?page=${page}&searchQuery=${searchQuery}`;

    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.status === 200) {
          setEmployees(res.data.data);
          setLastPage(res.data.last_page);
          setTotalData(res.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query state
  };
  // DeleteHandle
  const handleDelete = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")){
    const apiUrl = BASE_URL + `employees/${employeeId}`;
    axios
    .post(apiUrl, {
    headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
    if (res.status === 200) {
      console.log(res);
      setEmployees(employees.filter((employee) => employee.emp_id !== employeeId));
    }
    })
    .catch((error) => {
      console.log(error);
    });
    }
  
  };

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };

  return (
    <>  
      {
        (roles!=3) ? 
        <>
        <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
        Employee List
        </Typography>
        <div className="d-flex justify-content-end mb-3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control w-auto"
            style={{
              width: "300px", // Set your desired width
              height: "40px", // Set your desired height
              fontSize: "16px", // Set your desired font size
              // Add any other inline styles as needed
            }}
          />
        </div>
      
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr className="table-success">
                <th>#</th>
                <th>Picture</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>Email Address</th>
            {/*   // <th>Office ID</th>*/}
                <th>Branch</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employee, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {
                      (employee.profile_picture == null ? 
                        <>
                        <img height={50} src="/assets/images/user.png"/>
                        </> 
                        :
                        <>
                        <img height={50} src={IMAGE_URL+employee.profile_picture}/>
                        </>)
                    }
                    
                  </td>
                  <td>{employee.full_name}</td>
                  <td>
                    
                      {
                        (employee.isRecorder==0) && (employee.isApprover == 0) && <>Employee</>
                      }
                      {
                        (employee.isRecorder==0) && (employee.isApprover == 1) && <>Approver</>
                      }
                      {
                        (employee.isRecorder==1) && (employee.isApprover == 0) && <>Recorder</>
                      }
                      {
                        (employee.isRecorder==1) && (employee.isApprover == 1) && <>Approver , Recorder</>
                      }
                    
                    
                  </td>
                  <td>{employee.phone_number}</td>
                  <td>{employee.email_address}</td>
                  {/*<td>{employee.office_id}</td>*/}
                  <td>{employee?.branch?.branch_name}</td>
                  <td>{employee?.designation?.desg_nm}</td>
                  <td>{employee?.department?.department_name}</td>
                  <td>
                    <Link href={`/employees/updateEmployee/${employee.emp_id}`} className="anchor">
                      <button className="btn btn-light btn-sm me-1">
                        <EditIcon cursor="pointer" />
                      </button>
                    </Link>
                    <Link href={`/users/updateUser/${employee.emp_id}`} className="anchor">
                      <button className="btn btn-light btn-sm me-1">
                        <Person2Icon cursor="pointer" />
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(employee.emp_id)}
                      >
                        <DeleteIcon cursor="pointer" />
                    </button>
                  </td>
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
  
        </>:
        <>
        <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
            Access Denied
        </Typography>
        </>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    roles: state.auth.roles
  };
};

export default connect(mapStateToProps)(employeeList);
