import React, { useEffect, useState } from "react";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import { Typography, useTheme, Button, CircularProgress } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Icon import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { red } from "@mui/material/colors";

const companyList = ({ token ,roles}) => {
  console.log(token);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [companies, setCompanies] = useState([]);
  const [loader, setLoader] = useState(true);

  
  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);


  useEffect(() => {
    const apiCompanies = BASE_URL + "companies?page=" +
    page;

    axios
    .get(apiCompanies, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      console.log("res");
      console.log(res.data);
      if (res.status == 200) {
        setLoader(false);
        setCompanies(res.data.data);
        setLastPage(res.data.last_page);
        setTotalData(res.data.total);
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("dddd");
    });
  }, [page]);
  const handleDeleteCompany = (companyId) => {
    const apiUrl = BASE_URL + `company/delete/${companyId}`;
    axios
      .post(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.status === 200) {
          setCompanies(companies.filter((company) => company.comp_id !== companyId));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };
  return (
    <>
      {
        (roles==1)
        ?
        <>
        {loader ? (
          <CircularProgress />
        ) : (
          <>
            <div className="row">
              <div className="col-11">
                <Typography
                  variant="h2"
                  className="mb-4"
                  color={colors.greenAccent[300]}
                >
                  Companies
                </Typography>
              </div>
              <div className="col-1 mb-4">
                <Link href="/companies/createCompany" className="anchor">
                  <Button variant="outlined">Create Company</Button>
                </Link>
              </div>
            </div>
  
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr className="table-success">
                    <th scope="col">#</th>
                    {/* <th scope="col">Company ID</th> */}
                    <th scope="col">Company Name</th>
                    <th scope="col">Company BIN</th>
                    <th scope="col">Contact Person</th>
                    <th scope="col">Contact Email</th>
                    <th scope="col">Contact Phone</th>
                    <th scope="col">Contact Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      {/* <td className="text-center">{company.comp_id}</td> */}
                      <td>{company.company_name}</td>
                      <td>{company.company_bin}</td>
                      <td>{company.contact_person}</td>
                      <td>{company.contact_email}</td>
                      <td>{company.contact_number}</td>
                      <td>{company.contact_address}</td>
                      <td>
                        <Link href={`/companies/updateCompany/${company.comp_id}`}>
                          <button className="btn btn-light btn-sm me-1">
                            <EditIcon cursor="pointer" />
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteCompany(company.comp_id)}
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
          </>
        )}
        </>
        :
        <>
          <Typography
            variant="h2"
            className="mb-4"
            color={red[500]}
            >
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
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(companyList);
