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
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//date
import moment from "moment";

const ReturnListPurchase = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [returns, setReturns] = useState([]);
  const [loader, setLoader] = useState(true);

  //Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const apiReturns = BASE_URL + "api/v1/purchases/return?page=" + page;

    axios
      .get(apiReturns, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          setLoader(false);
          setReturns(res.data.data.data);
          setLastPage(res.data.data.last_page);
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

  console.log(returns);

  return (
    <>
      {loader ? (
        <CircularProgress color="success" />
      ) : (
        <>
          <div className="row">
            <div className="col-md-6">
              <Typography
                variant="h2"
                className="mb-4"
                color={colors.greenAccent[300]}
              >
                Purchase Return List
              </Typography>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr className="table-success">
                  <th>#</th>
                  <th>Return No</th>
                  <th>Purchase No</th>
                  <th>Challan No</th>
                  <th>Challan Date</th>
                  <th>Issue Date</th>
                  <th>Issued By</th>
                  <th>Company</th>
                  <th>Vendor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {returns.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.return_no}</td>
                    <td>
                      <Link
                        href={`/purchases/purchaseDetails/${item.purchase?.id}`}
                        className="anchor3"
                      >
                        {item.purchase?.purchase_no}
                      </Link>
                    </td>
                    {item.purchase ? (
                      <>
                        <td>{item.purchase?.challan_no}</td>
                        <td>
                          {moment(item.purchase?.challan_date).format(
                            "DD MMM YYYY"
                          )}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.challan_no}</td>
                        <td>
                          {moment(item.challan_date).format("DD MMM YYYY")}
                        </td>
                      </>
                    )}
                    <td>{moment(item.created_at).format("DD MMM YYYY")}</td>
                    <td>{item.user?.name}</td>
                    <td>{item.company?.name}</td>
                    <td>{item.vendor?.name}</td>
                    <td>
                      <Link
                        href={`/purchases/returnVat/${item.id}`}
                        className="anchor3"
                      >
                        <Button variant="contained" color="secondary">
                          6.8
                        </Button>
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

export default connect(mapStateToProps)(ReturnListPurchase);
