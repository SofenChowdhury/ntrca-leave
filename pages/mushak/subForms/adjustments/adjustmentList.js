import React, { useEffect, useState } from "react";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../../theme";
import {
  Typography,
  useTheme,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../../../base";

// Date
import moment from "moment";

const adjustmentList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [adjustments, setAdjustments] = useState([]);
  const [loader, setLoader] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // FETCHING HS CODES
  useEffect(() => {
    setLoader(true);
    const apiPayments = BASE_URL + "api/v1/vat-adjustment?page=" + page;
    axios
      .get(apiPayments, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setLoader(false);
          setAdjustments(res.data.data.data);
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

  return (
    <>
      {loader ? (
        <CircularProgress color="success" />
      ) : (
        <>
          <div className="row">
            <div className="col-md-10">
              <Typography
                variant="h2"
                className="mb-4"
                color={colors.greenAccent[300]}
              >
                TAX Adjustment List
              </Typography>
            </div>
            <div className="col-md-2 mt-1 mb-3">
              <Link
                href="/mushak/subForms/adjustments/createAdjustment"
                className="anchor float-end"
              >
                <Button variant="outlined">TAX Adjustment</Button>
              </Link>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr className="table-success">
                  <th>Bank</th>
                  <th>Ledger Month</th>
                  <th>Paid By</th>
                  <th>Adjustment Date</th>
                  <th>Type</th>
                  <th>Note No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adjustments?.map((payment, index) => (
                  <>
                    <tr key={index}>
                      <td>{payment.bank}</td>
                      <td>{moment(payment.ledger_month).format("MMMM")}</td>
                      <td>{payment.admin?.name}</td>
                      <td>
                        {moment(payment.deposit_date).format("DD MMM YY")}
                      </td>
                      <td>{payment.type.toUpperCase()}</td>
                      <td>{payment.note_no}</td>
                      <td>
                        <Link
                          href={`/mushak/subForms/adjustments/adjustmentsVat/${payment.id}`}
                          className="anchor3"
                        >
                          <Button variant="contained" color="secondary">
                            6.6
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  </>
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

export default connect(mapStateToProps)(adjustmentList);
