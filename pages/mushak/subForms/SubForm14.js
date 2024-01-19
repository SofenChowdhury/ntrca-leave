import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
// bootstarp
import {
  Button,
  CircularProgress,
  useTheme,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../theme";

//redux imports
import { connect } from "react-redux";

//Date
import moment from "moment/moment";

// PRINT
import { useReactToPrint } from "react-to-print";
import Print from "@mui/icons-material/Print";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";
import { Margin } from "@mui/icons-material";

const SubForm14 = ({ query, token }) => {
  const theme = useTheme();
  const router = useRouter();
  const colors = tokens(theme.palette.mode);

  // Variables for POST
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company_id, setCompanyId] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalAmountVat, setTotalAmountVat] = useState(0);
  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [tin, setTin] = useState("");
  const [bin, setBin] = useState("");
  const [type, setType] = useState("");

  // Helper variables
  const [formErrors, setFormErrors] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [mushak, setMushak] = useState([]);
  const [mushak1, setMushak1] = useState([]);
  const [mushak2, setMushak2] = useState([]);
  const [mushak3, setMushak3] = useState([]);
  const [mushak4, setMushak4] = useState([]);
  const [mushakImported15, setMushakImported15] = useState([]);
  const [mushakImported4, setMushakImported4] = useState([]);
  const [company, setCompany] = useState({});
  const [loader, setLoader] = useState(false);
  const [vat, setVat] = useState(0);

  // Bug
  const start_date = query?.start_date;
  const end_date = query?.end_date;
  const purchase_vat_n_10 = query?.purchase_vat_n_10;
  const purchase_vat1 = query?.purchase_vat1;
  const purchase_vat2 = query?.purchase_vat2;
  const purchase_vat3 = query?.purchase_vat3;
  const purchase_vat_n_14 = query?.purchase_vat_n_14;
  const purchaseImported_vat_n_15 = query?.purchaseImported_vat_n_15;
  const form = query?.form
  const note = query?.note

  // useEffect(() => {
  //   const start_date  = getQueryParams(window.location.search);
  // }, []);

  // REFERENCES
  const printRef = useRef();
  const multiselectRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // console.log('start_date');
  // console.log(start_date);
  // console.log(end_date);

  // const { start_date, end_date, purchase_vat } = router.query;

  // Fetch Company
  useEffect(() => {
    if(purchase_vat_n_10){
      const apiMushak =
      BASE_URL +
      "api/v1/mushok/purchase-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note=" +
      +purchase_vat_n_10;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak(res?.data?.data?.purchase);
          setCompany(res?.data?.data?.company);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(purchase_vat1){
      const apiMushak =
      BASE_URL +
      "api/v1/mushok/purchase-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note=" +
      +purchase_vat1;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak1(res?.data?.data);
          setCompany(res?.data?.data[0]?.purchase?.company);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(purchase_vat2){
      const apiMushak =
      BASE_URL +
      "api/v1/mushok/purchase-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note=" +
      +purchase_vat2;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak2(res?.data?.data);
          setCompany(res?.data?.data[0]?.purchase?.company);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(purchase_vat3){
      const apiMushak =
      BASE_URL +
      "api/v1/mushok/purchase-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note=" +
      +purchase_vat3;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak3(res?.data?.data);
          setCompany(res?.data?.data[0]?.purchase?.company);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(purchase_vat_n_14){
      const apiMushak =
      BASE_URL +
      "api/v1/mushok/purchase-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note=" +
      +purchase_vat_n_14;
      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          setMushak4(res?.data?.data?.purchase);
          setCompany(res?.data?.data?.company);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    if(purchaseImported_vat_n_15){
      const apiMushak =
      BASE_URL +
      "api/v1/mushok/purchase-sub-form?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date +
      "&note=" +
      +purchaseImported_vat_n_15;

      axios.get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      }).then((res) => {
        if (res?.data?.status) {
          // console.log("check");
          // console.log(res?.data?.data);
          setMushakImported15(res?.data?.data?.purchase);
          setCompany(res?.data?.data?.company);
          // setLoader(true);
        }
      }).catch((error) => {
        console.log(error);
      });
    }
    setLoader(true);
  }, []);

  // console.log('mushak');
  // console.log(mushak);
  // console.log("mushak1");
  // console.log(mushak1);
  // console.log("mushak2");
  // console.log(mushak2);
  // console.log("mushak3");
  // console.log(mushak3);
  // console.log("mushak4");
  // console.log(mushak4);
  console.log('mushakImported15')
  console.log(mushakImported15)
  console.log('company')
  console.log(company)
  console.log('mushak')
  console.log(mushak)


  const sum = () => {
    let total = 0;
    if(purchase_vat_n_10){
      mushak?.map((data, index) => {
        total += data?.price * data?.qty;
      });
    }
    if(purchase_vat1){
      mushak1?.map((data, index) => {
        total += data?.price * data?.qty;
      });
    }
    if(purchase_vat2){
      mushak2?.map((data, index) => {
        total += data?.price * data?.qty;
      });
    }
    if(purchase_vat3){
      mushak3?.map((data, index) => {
        total += data?.price * data?.qty;
      });
    }
    if(purchase_vat_n_14){
      mushak4?.map((data, index) => {
        total += data?.price * data?.qty;
      });
    }
    if(purchaseImported_vat_n_15){
      mushakImported15?.map((data, index) => {
        total += data?.price * data?.qty;
      });
    }
    return total.toFixed(2);
  };

  const sumVat = () => {
    let total = 0;
    if(purchase_vat_n_10){
      mushak?.map((data, index) => {
        total += data?.vat_amount;
      });
    }
    if(purchase_vat1){
      mushak1?.map((data, index) => {
        total += (data?.price * data?.qty * data?.vat_rate) / 100;
      });
    }
    if(purchase_vat2){
      mushak2?.map((data, index) => {
        total += (data?.price * data?.qty * data?.vat_rate) / 100;
      });
    }
    if(purchase_vat3){
      mushak3?.map((data, index) => {
        total += (data?.price * data?.qty * data?.vat_rate) / 100;
      });
    }
    if(purchase_vat_n_14){
      mushak4?.map((data, index) => {
        total += (data?.vat_amount);
      });
    }
    if(purchaseImported_vat_n_15){
      mushakImported15?.map((data, index) => {
        total += data?.vat_amount;
      });
    }
    return total.toFixed(2);
  };

  // console.log("mushakImported15");
  // console.log(mushakImported15);
  // console.log(company);


  return (
    <>
      {!loader ? (
        <CircularProgress />
      ) : (
        <>
          {/* <div>{start_date}</div>
              <div>{end_date}</div> */}
          <div>
            <Button
              variant="contained"
              size="small"
              className="float-end"
              onClick={handlePrint}
              // onClick={downloadPdf}
            >
              <Print />
              Print
            </Button>
          </div>
          <div ref={printRef}>
            {/* <div ref={printRef} className="p-5 m-5"> */}
            <div>
              <div className="row">
                <div className="col-md-2">
                  <img
                    className="ms-5"
                    alt="profile-user"
                    width="80px"
                    height="80px"
                    src={`../../assets/images/govt.png`}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </div>
                <div className="col-md-8 text-center">
                  <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                      {company?.name}
                    </small>
                  </div>
                  <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                      {company?.contact_address}
                    </small>
                  </div>
                  <div className="row">
                    <small style={{ color: "darkviolet" }}>
                      BIN-{company?.company_bin}
                    </small>
                  </div>
                  <div className="row">
                    <small style={{ color: "darkviolet" }}>
                      Sub-form for the month of{" "}
                      {moment(end_date).format("MMMM")}{" "}
                      {moment(end_date).format("YYYY")}
                    </small>
                  </div>
                  <div className="row">
                    <small style={{ color: "dodgerblue" }}>
                      Sub-form for local Supply (for note
                      3,4,5,7,10,12,14,18,19,20 and 21)
                    </small>
                  </div>
                </div>
                <div className="col-md-2">
                  <h6 style={{ color: "darkviolet" }}>{form}</h6>
                </div>
              </div>
              <div className="table-responsive mt-2">
                <table
                  className="table table-bordered table-hover"
                  style={{ border: "black" }}
                >
                  <thead>
                    <tr
                      className="text-center"
                      style={{ background: "lightblue" }}
                    >
                      <th className="pb-0 pt-0" style={{ maxWidth: "5%" }}>
                        Serial No.
                      </th>
                      <th className="pb-0 pt-0" style={{ maxWidth: "20%" }}>
                        Goods/Service Commercial Description
                      </th>
                      <th className="pb-0 pt-0" style={{ maxWidth: "20%" }}>
                        Goods/Service Code
                      </th>
                      <th className="pb-0 pt-0">Goods/Service Name</th>
                      <th className="pb-0 pt-0" style={{ maxWidth: "20%" }}>
                        Value (a)
                      </th>
                      <th className="pb-0 pt-0">SD (b)</th>
                      <th className="pb-0 pt-0" style={{ maxWidth: "20%" }}>
                        VAT (c)
                      </th>
                      <th className="pb-0 pt-0" style={{ maxWidth: "5%" }}>
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mushak && mushak?.map((data, index) => (
                      <tr>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.title}
                          {/* <br />
                          {data?.info?.details}
                          <br />
                          {data?.info?.sku}
                          <br />
                          {data?.info?.slug}
                          <br />
                          {data?.info?.model} */}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {data?.info?.hs_code}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.details}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(data?.price * data?.qty).toFixed(2)}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        ></td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(
                            data?.vat_amount
                          ).toFixed(2)}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {/* <Link href={{
                              pathname: "/mushak/subForms/SubForm14",
                              query: {
                                  start_date: start_date,
                                  end_date: end_date,
                                  purchase_vat: +purchase_vat,
                                  form: "Sub-Form-10",
                                  note: "Note-10" 
                              }
                              }}
                              target="_blank"
                          >
                              {data?.vat_rate == +purchase_vat && "Note-10"}
                          </Link><br/>
                          ({data?.vat_rate}) */}
                        </td>
                      </tr>
                    ))}
                    {mushak1 && mushak1?.map((data, index) => (
                      <tr>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.title}
                          {/* <br />
                          {data?.info?.details}
                          <br />
                          {data?.info?.sku}
                          <br />
                          {data?.info?.slug}
                          <br />
                          {data?.info?.model} */}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {data?.info?.hs_code}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.details}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(data?.price * data?.qty).toFixed(2)}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        ></td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(
                            (data?.price * data?.qty * data?.vat_rate) /
                            100
                          ).toFixed(2)}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {/* <Link href={{
                              pathname: "/mushak/subForms/SubForm14",
                              query: {
                                  start_date: start_date,
                                  end_date: end_date,
                                  purchase_vat1: +purchase_vat1,
                                  form: "Sub-Form-16",
                                  note: "Note-16" 
                              }
                              }}
                              target="_blank"
                          >
                              {data?.vat_rate == +purchase_vat1 && "Note-16"}
                          </Link><br/>
                          ({data?.vat_rate}) */}
                        </td>
                      </tr>
                    ))}
                    {mushak2 && mushak2?.map((data, index) => (
                      <tr>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.title}
                          {/* <br />
                          {data?.info?.details}
                          <br />
                          {data?.info?.sku}
                          <br />
                          {data?.info?.slug}
                          <br />
                          {data?.info?.model} */}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {data?.info?.hs_code}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.details}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(data?.price * data?.qty).toFixed(2)}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        ></td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(
                            (data?.price * data?.qty * data?.vat_rate) /
                            100
                          ).toFixed(2)}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {/* <Link href={{
                              pathname: "/mushak/subForms/SubForm14",
                              query: {
                                  start_date: start_date,
                                  end_date: end_date,
                                  purchase_vat2: +purchase_vat2,
                                  form: "Sub-Form-16",
                                  note: "Note-16" 
                              }
                              }}
                              target="_blank"
                          >
                              {data?.vat_rate == +purchase_vat2 && "Note-16"}
                          </Link><br/>
                          ({data?.vat_rate}) */}
                        </td>
                      </tr>
                    ))}
                    {mushak3 && mushak3?.map((data, index) => (
                      <tr>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.title}
                          {/* <br />
                          {data?.info?.details}
                          <br />
                          {data?.info?.sku}
                          <br />
                          {data?.info?.slug}
                          <br />
                          {data?.info?.model} */}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {data?.info?.hs_code}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.details}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(data?.price * data?.qty).toFixed(2)}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        ></td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(
                            (data?.price * data?.qty * data?.vat_rate) /
                            100
                          ).toFixed(2)}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {/* <Link href={{
                              pathname: "/mushak/subForms/SubForm14",
                              query: {
                                  start_date: start_date,
                                  end_date: end_date,
                                  purchase_vat3: +purchase_vat3,
                                  form: "Sub-Form-16",
                                  note: "Note-16" 
                              }
                              }}
                              target="_blank"
                          >
                              {data?.vat_rate == +purchase_vat3 && "Note-16"}
                          </Link><br/>
                          ({data?.vat_rate}) */}
                        </td>
                      </tr>
                    ))}
                    {mushak4 && mushak4?.map((data, index) => (
                      <tr>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.title}
                          {/* <br />
                          {data?.info?.details}
                          <br />
                          {data?.info?.sku}
                          <br />
                          {data?.info?.slug}
                          <br />
                          {data?.info?.model} */}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {data?.info?.hscode?.code}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.hscode?.description}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(data?.price * data?.qty).toFixed(2)}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        ></td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(
                            (data?.price * data?.qty * data?.vat_rate) /
                            100
                          ).toFixed(2)}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {/* <Link href={{
                              pathname: "/mushak/subForms/SubForm14",
                              query: {
                                  start_date: start_date,
                                  end_date: end_date,
                                  purchase_vat4: +purchase_vat4,
                                  form: "Sub-Form-14",
                                  note: "Note-14" 
                              }
                              }}
                              target="_blank"
                          >
                            {data?.vat_rate == +purchase_vat4 && "Note-14"}
                          </Link><br/>
                          ({data?.vat_rate}) */}
                        </td>
                      </tr>
                    ))}
                    {mushakImported15 && mushakImported15?.map((data, index) => (
                      <tr>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.title}
                          {/* <br />
                          {data?.info?.details}
                          <br />
                          {data?.info?.sku}
                          <br />
                          {data?.info?.slug}
                          <br />
                          {data?.info?.model} */}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "5%" }}
                        >
                          {data?.info?.hs_code}
                        </td>
                        <td
                          className="text-left pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {data?.info?.details}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(data?.price * data?.qty).toFixed(2)}
                        </td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        ></td>
                        <td
                          className="text-end pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {(
                            (data?.vat_amount)
                          ).toFixed(2)}
                        </td>
                        <td
                          className="text-center pb-0 pt-0"
                          style={{ width: "45%" }}
                        >
                          {/* <Link href={{
                              pathname: "/mushak/subForms/SubForm14",
                              query: {
                                  start_date: start_date,
                                  end_date: end_date,
                                  purchaseImported_vat4: +purchaseImported_vat4,
                                  form: "Sub-Form-15",
                                  note: "Note-15" 
                              }
                              }}
                              target="_blank"
                          >
                            {data?.vat_rate == +purchaseImported_vat4 && "Note-15"}
                          </Link><br/>
                          ({data?.vat_rate}) */}
                        </td>
                      </tr>
                    ))}
                    <tr
                      className="text-center"
                      style={{ background: "lightblue" }}
                    >
                      <td className="text-end pb-0 pt-0" colSpan={4}>
                        <strong>TOTAL</strong>
                      </td>
                      <td className="text-end pb-0 pt-0">
                        <strong>{sum()}</strong>
                      </td>
                      <td className="text-end pb-0 pt-0">-</td>
                      <td className="text-end pb-0 pt-0">
                        <strong>{sumVat()}</strong>
                      </td>
                      <td className="text-center pb-0 pt-0">
                        {/* <strong>{note}</strong> */}
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

SubForm14.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(SubForm14);
