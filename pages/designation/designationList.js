import React, { useEffect, useState } from "react";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import {
  Typography,
  useTheme,
  Button,
  CircularProgress,
  Pagination,
  TextField,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Icon import
import EditIcon from "@mui/icons-material/Edit";

const designationList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Helper
  const [designations, setDesignations] = useState([]);
  const [loader, setLoader] = useState(true);

  // Search
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    const apiBranch =
      BASE_URL +
      "designations";

    axios
      .get(apiBranch, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data) {
          setLoader(false);
          setDesignations(res.data.data);
          setLastPage(res.data.last_page);
          setTotalData(res.data.total);
          // setLastPage(res.data.data.last_page);
          // setTotalData(res.data.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, name, code]);

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };

  return (
    <>
      {loader ? (
        <CircularProgress />
      ) : (
        <>
          <div className="row">
            <div className="col-md-6">
              <Typography
                variant="h2"
                className="mb-4"
                color={colors.greenAccent[300]}
              >
                Designation List
              </Typography>
            </div>
            <div className="col-md-6 mt-1">
              <Link href="/branch/createBranch" className="anchor">
                <Button variant="outlined" className="float-end">
                  Create Designation
                </Button>
              </Link>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-3 mb-4">
              <TextField
                label="Name"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                onChange={(e) => setName(e.target.value)}
                className="shadow-input"
              />
            </div>
            <div className="col-md-3 mb-4">
              <TextField
                label="Code"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                onChange={(e) => setCode(e.target.value)}
                className="shadow-input"
              />
            </div>
          </div> */}

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr className="table-success">
                  <th scope="col">#</th>
                  <th scope="col">Designation Name</th>
                  <th scope="col">Grade Name</th>
                  {/* <th scope="col">Branch ID</th> */}
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {designations?.map((designation, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{designation.desg_nm}</td>
                    <td>{designation.grade.grade_name}</td>
                    {/* <td>{branch.bran_id}</td> */}
                   
                    <td>
                      <Link href={`/designation/updateDesignation/${designation.desg_id}`}>
                        <button className="btn btn-light btn-sm me-1">
                          <EditIcon cursor="pointer" />
                        </button>
                      </Link>
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
                  Showing {1 + (page - 1) * 20} - {totalData} out of {totalData}
                </span>
              ) : (
                <>
                  {totalData === 0 ? (
                    <span className="ms-3 mt-2">Showing 0 out of 0</span>
                  ) : (
                    <span className="ms-3 mt-2">
                      Showing {1 + (page - 1) * 20} - {20 + (page - 1) * 20} out
                      of {totalData}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(designationList);
