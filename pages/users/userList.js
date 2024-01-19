import React, { useEffect, useState } from "react";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import { Typography, useTheme } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Icon import
import EditIcon from "@mui/icons-material/Edit";

import {
  Button,
  CircularProgress,
  Pagination,
  TextField,
} from "@mui/material";

const userList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    
    const apiUsers =
    BASE_URL +
    "users?page=" +
    page;

    axios
      .get(apiUsers, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setUsers(res.data.users);
          setLastPage(res.data.users.last_page);
          setTotalData(res.data.users.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };

  return (
    <>
      <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
        User List
      </Typography>
      <div className="table-responsive">
        <table className="table table-hover table-striped">
          <thead>
            <tr className="table-success">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Role</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company_name}</td>
                <td>{user.role_name}</td>
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

export default connect(mapStateToProps)(userList);
