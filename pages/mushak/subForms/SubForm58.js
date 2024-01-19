import React, {useEffect, useState} from "react";
import Link from "next/link";

// Theme imports
import { tokens } from "../../theme";

//redux imports
import { connect } from "react-redux";

import {
  Typography,
  useTheme,
  Button,
  CircularProgress,
  Pagination,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

const SubForm58 = ({token, query}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mushak58, setMushak58] = useState([]);
  const [mushak59, setMushak59] = useState([]);
  const [mushak60, setMushak60] = useState([]);
  const [mushak61, setMushak61] = useState([]);
  const [mushak62, setMushak62] = useState([]);
  const [mushak63, setMushak63] = useState([]);
  const [mushak64, setMushak64] = useState([]);

  //Currency
  let formatCurrency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BDT",
  });

  //Query subform data
  const form = query?.form
  const note = query?.note
  const start_date = query?.start_date;
  const end_date = query?.end_date;
  const note_no58 = query?.note_no58;
  const note_no59 = query?.note_no59;
  const note_no60 = query?.note_no60;
  const note_no61 = query?.note_no61;
  const note_no62 = query?.note_no62;
  const note_no63 = query?.note_no63;
  const note_no64 = query?.note_no64;

  useEffect(() => {
    if(note_no58){
      const apiMushak =
      BASE_URL +
      "api/v1/vat-payment-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note_no=" +
      +note_no58;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak58(res?.data?.data);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(note_no59){
      const apiMushak =
      BASE_URL +
      "api/v1/vat-payment-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note_no=" +
      +note_no59;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak59(res?.data?.data);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(note_no60){
      const apiMushak =
      BASE_URL +
      "api/v1/vat-payment-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note_no=" +
      +note_no60;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak60(res?.data?.data);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(note_no61){
      const apiMushak =
      BASE_URL +
      "api/v1/vat-payment-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note_no=" +
      +note_no61;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak61(res?.data?.data);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(note_no62){
      const apiMushak =
      BASE_URL +
      "api/v1/vat-payment-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note_no=" +
      +note_no62;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak62(res?.data?.data);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(note_no63){
      const apiMushak =
      BASE_URL +
      "api/v1/vat-payment-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note_no=" +
      +note_no63;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak63(res?.data?.data);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(note_no64){
      const apiMushak =
      BASE_URL +
      "api/v1/vat-payment-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note_no=" +
      +note_no64;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak64(res?.data?.data);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    
    // setLoader(true);
  }, []);

  const sum = () => {
    let total = 0;
    if(note_no58){
      mushak58?.map((data, index) => {
        total += data?.amount;
      });
    }
    if(note_no59){
      mushak59?.map((data, index) => {
        total += data?.amount;
      });
    }
    if(note_no60){
      mushak60?.map((data, index) => {
        total += data?.amount;
      });
    }
    if(note_no61){
      mushak61?.map((data, index) => {
        total += data?.amount;
      });
    }
    if(note_no62){
      mushak62?.map((data, index) => {
        total += data?.amount;
      });
    }
    if(note_no63){
      mushak63?.map((data, index) => {
        total += data?.amount;
      });
    }
    if(note_no64){
      mushak64?.map((data, index) => {
        total += data?.amount;
      });
    }
    return total.toFixed(2);
  };

  return (
    <>
      <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
        {form}
      </Typography>
      <div>
        <div className="row justify-content-md-center mt-2">
          <div className="col-md-12 text-center">
            <b>Fair Disribution Ltd</b>
          </div>
        </div>
        <div className="row justify-content-md-center mt-1">
          <div className="col-md-12 text-center">
            Rupganj, Narayanganj
          </div>
        </div>
        <div className="row justify-content-md-center mt-1">
          <div className="col-md-12 text-center">
            BIN - 000237751-0303
          </div>
        </div>
        <div className="row justify-content-md-center mt-1">
          <div className="col-md-12 text-center">
            <b>Sub-form for the month of October-2022</b>
          </div>
        </div>
        <div className="row justify-content-md-center mt-1">
          <div className="col-md-12 text-center">
            <b>Sub form (for note 58,59,60,61,62,63 and 64)</b>
          </div>
        </div>
        <table className="table table-bordered mt-2">
          <thead>
            <tr className="table-success">
              <th className="text-center align-middle">SL</th>
              <th className="text-center align-middle">
                Treasury Challan No/ Token No
              </th>
              <th className="text-center align-middle">Bank/ CGA</th>
              <th className="text-center align-middle">Branch/ CAFO/ DCO</th>
              <th className="text-center align-middle">Date</th>
              <th className="text-center align-middle">
                Tax Deposit Account Code
              </th>
              <th className="text-center align-middle">Amount</th>
              <th className="text-center align-middle">Notes</th>
            </tr>
          </thead>
          <tbody>
            {mushak58 && mushak58?.map((data, index) => 
            <tr>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="text-center align-middle">{data?.treasury_challan_no}</td>
              <td className="text-center align-middle">{data?.bank}</td>
              <td className="text-center align-middle">{data?.branch}</td>
              <td className="text-center align-middle">{data?.payment_date}</td>
              <td className="text-center align-middle">{data?.account_code}</td>
              <td className="text-end align-middle">{formatCurrency.format(data?.amount)}</td>
              <td className="text-center align-middle">{data?.remarks}</td>
            </tr>
            )}
            {mushak59 && mushak59?.map((data, index) => 
            <tr>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="text-center align-middle">{data?.treasury_challan_no}</td>
              <td className="text-center align-middle">{data?.bank}</td>
              <td className="text-center align-middle">{data?.branch}</td>
              <td className="text-center align-middle">{data?.payment_date}</td>
              <td className="text-center align-middle">{data?.account_code}</td>
              <td className="text-end align-middle">{formatCurrency.format(data?.amount)}</td>
              <td className="text-center align-middle">{data?.remarks}</td>
            </tr>
            )}
            {mushak60 && mushak60?.map((data, index) => 
            <tr>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="text-center align-middle">{data?.treasury_challan_no}</td>
              <td className="text-center align-middle">{data?.bank}</td>
              <td className="text-center align-middle">{data?.branch}</td>
              <td className="text-center align-middle">{data?.payment_date}</td>
              <td className="text-center align-middle">{data?.account_code}</td>
              <td className="text-end align-middle">{formatCurrency.format(data?.amount)}</td>
              <td className="text-center align-middle">{data?.remarks}</td>
            </tr>
            )}
            {mushak61 && mushak61?.map((data, index) => 
            <tr>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="text-center align-middle">{data?.treasury_challan_no}</td>
              <td className="text-center align-middle">{data?.bank}</td>
              <td className="text-center align-middle">{data?.branch}</td>
              <td className="text-center align-middle">{data?.payment_date}</td>
              <td className="text-center align-middle">{data?.account_code}</td>
              <td className="text-end align-middle">{formatCurrency.format(data?.amount)}</td>
              <td className="text-center align-middle">{data?.remarks}</td>
            </tr>
            )}
            {mushak62 && mushak62?.map((data, index) => 
            <tr>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="text-center align-middle">{data?.treasury_challan_no}</td>
              <td className="text-center align-middle">{data?.bank}</td>
              <td className="text-center align-middle">{data?.branch}</td>
              <td className="text-center align-middle">{data?.payment_date}</td>
              <td className="text-center align-middle">{data?.account_code}</td>
              <td className="text-end align-middle">{formatCurrency.format(data?.amount)}</td>
              <td className="text-center align-middle">{data?.remarks}</td>
            </tr>
            )}
            {mushak63 && mushak63?.map((data, index) => 
            <tr>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="text-center align-middle">{data?.treasury_challan_no}</td>
              <td className="text-center align-middle">{data?.bank}</td>
              <td className="text-center align-middle">{data?.branch}</td>
              <td className="text-center align-middle">{data?.payment_date}</td>
              <td className="text-center align-middle">{data?.account_code}</td>
              <td className="text-end align-middle">{formatCurrency.format(data?.amount)}</td>
              <td className="text-center align-middle">{data?.remarks}</td>
            </tr>
            )}
            {mushak64 && mushak64?.map((data, index) => 
            <tr>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="text-center align-middle">{data?.treasury_challan_no}</td>
              <td className="text-center align-middle">{data?.bank}</td>
              <td className="text-center align-middle">{data?.branch}</td>
              <td className="text-center align-middle">{data?.payment_date}</td>
              <td className="text-center align-middle">{data?.account_code}</td>
              <td className="text-end align-middle">{formatCurrency.format(data?.amount)}</td>
              <td className="text-center align-middle">{data?.remarks}</td>
            </tr>
            )}
            <tr className="table-success">
              <td className="text-end align-middle" colSpan={6}><strong>Total</strong></td>
              <td className="text-end align-middle"><strong>{formatCurrency.format(sum())}</strong></td>
              <td className="text-center align-middle">

                {/* <Link href={{
                        pathname: "/mushak/mushak_91",
                      }}
                      target="_blank"
                >
                  Mushak-9.1
                </Link> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
// export default SubForm58;

SubForm58.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(SubForm58);