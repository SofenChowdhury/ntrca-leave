import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import {
  Typography,
  useTheme,
  CircularProgress,
  Button,
  Pagination,
  TextField,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// icons
import { Edit } from "@mui/icons-material";
import moment from 'moment';

const log = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [keyword, setKeyword] = useState([]);

  const [logs, setLogs] = useState([]);
  const [loader, setLoader] = useState(true);

  const router = useRouter();
  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  useEffect(() => {
    // Get the current page from the query params
    const currentPage = Number(router.query.page) || 1;

    // Update the page state only if it's different from the current page
    if (currentPage !== page) {
      setPage(currentPage);
    }

    const fetchData = () => {
      setLoader(true);
      const apiLog =
        // BASE_URL + "api/v1/boms?page=" + currentPage + "&keyword=" + keyword;
        BASE_URL + "activity-log";

      axios
        .get(apiLog, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            console.log("log");
            console.log(res.status);
            console.log(res.data);
          if (res?.status === 200) {
            setLoader(false);
            setLogs(res?.data);
            // const lastPage = res.data.data.last_page;
            // const totalData = res.data.data.total;

            // // Reset the page to 1 if there's only one page of data
            // if (lastPage === 1 && currentPage !== 1) {
            //   router.push({ pathname: router.pathname, query: { page: 1 } });
            //   return;
            // }

            // // Update the lastPage and totalData states
            // setLastPage(lastPage);
            // setTotalData(totalData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [router.query.page, keyword]);

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);

    router.push({ pathname: router.pathname, query: { page } });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Activity Log List
          </Typography>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-md-4 mb-4">
          <TextField
            label="Sku/Name"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setKeyword(e.target.value)}
            className="shadow-input"
          />
        </div>
      </div> */}
      {loader ? (
        <CircularProgress />
      ) : (
        <>
          {logs.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr className="table-success">
                      <th>Log NO.</th>
                      <th>Responsible User</th>
                      <th>Date Time</th>
                      <th>User Activity</th>
                      <th>Log Name</th>
                      <th>Activity Table Path</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs?.map((log, index) => (
                      <tr key={index}>
                        <td className="align-middle">
                            {log?.id}
                        </td>
                        <td className="align-middle">
                            <p>User Name: {log?.user?.name}</p>
                            <p>Office Id: {log?.user?.employee?.office_id}</p>
                            <p>Designation: {log?.user?.employee?.designation?.desg_nm}</p>
                            <p>Department: {log?.user?.employee?.department?.department_name}</p>
                            <p>Branch: {log?.user?.employee?.branch?.branch_name}</p>
                            <p>Company: {log?.user?.employee?.branch?.company?.company_name}</p>
                        </td>
                        <td className="align-middle">
                            {moment(log?.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </td>
                        <td className="align-middle">
                            {log?.description}
                        </td>
                        <td className="align-middle">
                            {log?.log_name}
                        </td>
                        <td className="align-middle">
                            ({log?.subject_id}){log?.subject_type}
                        </td>
                        <td className="align-middle">
                            {log?.properties}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="row justify-content-center">
                <div className="col-md-12 d-flex justify-content-center">
                  <Pagination
                    count={lastPage}
                    page={page}
                    color="secondary"
                    size="large"
                    onChange={handleChange}
                  />
                  {page === lastPage ? (
                    <>
                      {totalData === 0 ? (
                        <span className="ms-3 mt-2">Showing 0 out of 0</span>
                      ) : (
                        <span className="ms-3 mt-2">
                          Showing {1 + (page - 1) * 20} - {totalData} out of{" "}
                          {totalData}
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      {totalData === 0 ? (
                        <span className="ms-3 mt-2">Showing 0 out of 0</span>
                      ) : (
                        <span className="ms-3 mt-2">
                          Showing {1 + (page - 1) * 20} - {20 + (page - 1) * 20}{" "}
                          out of {totalData}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div> */}
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-md-12">
                  <Typography
                    variant="h3"
                    className="mb-4"
                    color={colors.greenAccent[300]}
                  >
                    The list is empty!
                  </Typography>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

// export default bomList
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(log);
