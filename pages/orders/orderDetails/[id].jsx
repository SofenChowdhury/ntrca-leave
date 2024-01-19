import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../theme";
import { CircularProgress, Typography, useTheme, Button } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

// PRINT
import { useReactToPrint } from "react-to-print";

//date format
import moment from "moment";
import converter from "number-to-words";

// PDF
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

//Icons
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Download from "@mui/icons-material/Download";
import Print from "@mui/icons-material/Print";

const OrderDetails = ({ query, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orderDetails, setOrderDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const id = +query.id;

  const router = useRouter();
  
  const printRef = useRef();

  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/sales/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setLoader(false);
          setOrderDetails(res.data.data);
          console.log(res.data.data);
        } else {
          setFormErrors(res.data.message);
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const calculate = () => {
    let total = 0;
    orderDetails?.sales_items?.map((product) => {
      total += product.total_price + product.vat_amount;
    });
    return total.toFixed(2);
  };

  const calculateVat = (vat) => {
    let total = 0;
    orderDetails?.sales_items?.map((product) => {
      total += ((product.price * product.qty) / 100) * +product.vat_rate;
    });
    return total.toFixed(2);
  };

  const calculateTotal = () => {
    let total = 0;
    orderDetails?.sales_items?.map((product) => {
      total +=
        ((product.price * product.qty) / 100) * +product.vat_rate +
        product.price * product.qty;
    });
    return total.toFixed(2);
  };

  const calculateQty = () => {
    let total = 0;
    orderDetails?.sales_items?.map((product) => {
      total += product.qty;
    });
    return total;
  };

  // PRINT
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const downloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    const name = orderDetails?.sales_no + "_invoice.pdf";

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save(name);
  };

  // Return
  const goBack = () => {
    router.back();
  };

  return (
    <>
      {loader ? (
        <CircularProgress />
      ) : (
        <>
          <div className="row justify-content-between">
            <div className="col-md-6">
              <Button variant="outlined" size="small" onClick={goBack}>
                <ArrowLeftIcon />
                Sales List
              </Button>
            </div>
            <div className="col-md-6">
              <Button
                variant="outlined"
                size="small"
                className="float-end"
                onClick={downloadPdf}
              >
                <Download />
                Download
              </Button>
              <Button
                variant="outlined"
                size="small"
                className="float-end me-3"
                onClick={handlePrint}
              >
                <Print />
                Print
              </Button>
            </div>
          </div>
          <br />
          <div ref={printRef} className="p-5">
            {/* <div className="row mb-4">
              <div className="col-md-12">
                <img
                  alt="profile-user"
                  width="200px"
                  height="50px"
                  src={`../../assets/images/hyundai_logo.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  className="mt-2"
                />
                <img
                  alt="profile-user"
                  width="230px"
                  height="50px"
                  src={`../../assets/images/ftl_logo.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  className="float-end mt-2"
                />
              </div>
            </div> */}
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 text-center">
                <Typography
                  variant="h6"
                  className="mb-2"
                  color={colors.primary[300]}
                >
                  <b>{orderDetails?.company?.name}</b>
                </Typography>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8 text-center">
                <Typography
                  variant="h6"
                  className="mb-2"
                  color={colors.primary[300]}
                >
                  <b>{orderDetails?.company?.contact_address}</b>
                </Typography>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4 text-center">
                <Typography
                  variant="h6"
                  className="mb-2"
                  color={colors.primary[300]}
                >
                  <b>Contact No. {orderDetails?.company?.contact_number}</b>
                </Typography>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4"></div>
              <div className="col-md-4 text-center">
                <Typography
                  variant="h4"
                  className="mb-4"
                  color={colors.primary[300]}
                >
                  Sales Invoice
                </Typography>
              </div>
              <div className="col-md-4"></div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <Typography variant="h6" color={colors.primary[300]}>
                  <b>Invoice No:</b> {orderDetails?.sales_no}
                </Typography>
              </div>

              <div className="col-md-4">
                <Typography variant="h6" color={colors.primary[300]}>
                  <b>Date:</b>{" "}
                  {moment(orderDetails?.created_at).format("DD MMM YYYY")}
                </Typography>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <Typography variant="h6" color={colors.primary[300]}>
                  <b>Customer Name:</b> {orderDetails?.customer_name}
                </Typography>
              </div>

              <div className="col-md-4">
                <Typography variant="h6" color={colors.primary[300]}>
                  <b>Time:</b>{" "}
                  {moment(orderDetails?.created_at).format("hh:mm A")}
                </Typography>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <Typography variant="h6" color={colors.primary[300]}>
                  <b>Customer Address:</b> {orderDetails?.customer_address}
                </Typography>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <Typography
                  variant="h6"
                  className="mb-2"
                  color={colors.primary[300]}
                >
                  <b>Mobile:</b> {orderDetails?.customer_phone}
                </Typography>
              </div>
            </div>
            <div className="row mt-2">
              <div className="table-responsive">
                <table
                  className="table table-bordered"
                  style={{ border: "black" }}
                >
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        Product Description
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        SKU
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        Unit Price
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        Sub Total
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        Vat Rate
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        Vat Amount
                      </th>
                      <th
                        scope="col"
                        style={{ padding: "4px" }}
                        className="text-center"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails?.sales_items?.map((item, index) => (
                      <tr key={index}>
                        <th style={{ padding: "4px" }}>{index + 1}</th>
                        <td style={{ padding: "4px" }}>
                          {item.item_info.title}
                        </td>
                        <td style={{ padding: "4px" }}>{item.item_info.sku}</td>
                        <td style={{ padding: "4px" }} className="text-center">
                          {item.qty}
                        </td>
                        <td style={{ padding: "4px" }} className="text-end">
                          {Intl.NumberFormat().format(item.price.toFixed(2))}
                        </td>
                        <td style={{ padding: "4px" }} className="text-end">
                          {Intl.NumberFormat().format(
                            item.total_price.toFixed(2)
                          )}
                        </td>
                        <td style={{ padding: "4px" }} className="text-center">
                          {(+item.vat_rate).toFixed(1)}%
                        </td>
                        <td style={{ padding: "4px" }} className="text-end">
                          {Intl.NumberFormat().format(item.vat_amount)}
                        </td>
                        <td style={{ padding: "4px" }} className="text-end">
                          {Intl.NumberFormat().format(
                            (item.price * item.qty + item.vat_amount).toFixed(2)
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td style={{ padding: "4px" }} colSpan={5}></td>
                      <td style={{ padding: "4px" }} colSpan={3}>
                        <b>Total Amount:</b>
                      </td>
                      <td style={{ padding: "4px" }} className="text-end">
                        {Intl.NumberFormat().format(calculate())}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "4px" }} colSpan={5}></td>
                      <td style={{ padding: "4px" }} colSpan={3}>
                        <b>Discount:</b>
                      </td>
                      <td style={{ padding: "4px" }} className="text-end">
                        0.00
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "4px" }} colSpan={5}></td>
                      <td style={{ padding: "4px" }} colSpan={3}>
                        <b>Cash/Card Received:</b>
                      </td>
                      <td style={{ padding: "4px" }} className="text-end"></td>
                    </tr>
                    <tr>
                      <td style={{ padding: "4px" }} colSpan={5}></td>
                      <td style={{ padding: "4px" }} colSpan={3}>
                        <b>Outstanding Balance:</b>
                      </td>
                      <td style={{ padding: "4px" }} className="text-end"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-md-8 capital">
                <Typography variant="h6" color={colors.primary[300]}>
                  <b>Quantity in Words:</b> {converter.toWords(calculateQty())}{" "}
                  Piece(s) Only
                </Typography>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 capital">
                <Typography variant="h6" color={colors.primary[300]}>
                  <b>Amount in Words:</b> {converter.toWords(calculate())} Taka
                  Only
                </Typography>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

OrderDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(OrderDetails);
