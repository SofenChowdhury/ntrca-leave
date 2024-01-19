import React, { useState, useEffect } from "react";
import Router from "next/router";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../theme";
import { CircularProgress, Typography, useTheme, Button } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

//date format
import moment from "moment";
import converter from "number-to-words";
import { Calculate } from "@mui/icons-material";

const PurchaseDetails = ({ query, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [purchaseDetails, setPurchaseDetails] = useState({});
  const [loader, setLoader] = useState(true);
  const id = +query.id;

  let formatCurrency = new Intl.NumberFormat();

  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/purchases/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setLoader(false);
          setPurchaseDetails(res.data.data);
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

  // Calculations
  const calculate = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += product.tti + +product.total_price;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateQty = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.qty;
    });
    return total;
  };
  const calculatePrice = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.total_price;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateCD = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.cd;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateRD = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.rd;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateSD = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.sd;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateAT = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.at;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateAIT = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.ait;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateVAT = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.vat_amount;
    });
    return formatCurrency.format(total.toFixed(2));
  };
  const calculateTax = () => {
    let total = 0;
    purchaseDetails?.purchase_items?.map((product) => {
      total += +product.tti;
    });
    return formatCurrency.format(total.toFixed(2));
  };

  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/purchases/purchaseList",
    });
  };

  return (
    <>
      {loader ? (
        <CircularProgress />
      ) : (
        <>
          <div className="row">
            <div className="col-md-12">
              <Button variant="contained" onClick={goBack}>
                Purchase List
              </Button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-sm-3">
              <Typography
                variant="h3"
                className="mb-4"
                color={colors.blueAccent[300]}
              >
                Fair VAT
              </Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 text-center">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                {purchaseDetails?.company?.name}
              </Typography>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 text-center">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                {purchaseDetails?.company?.contact_address}
              </Typography>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 text-center">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                Contact No. {purchaseDetails?.company?.contact_number}
              </Typography>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row mt-3">
            <div className="col-sm-4"></div>
            <div className="col-sm-4 text-center">
              <Typography
                variant="h3"
                className="mb-4"
                color={colors.primary[300]}
              >
                Purchase Details
              </Typography>
            </div>
            <div className="col-sm-4"></div>
          </div>

          <div className="row">
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Purchase No.</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                : {purchaseDetails?.purchase_no}
              </Typography>
            </div>
            <div className="col-sm-2"></div>
            {purchaseDetails?.type === "Imported" ? (
              <>
                <div className="col-sm-2">
                  <Typography
                    variant="h5"
                    className="mb-2"
                    color={colors.primary[300]}
                  >
                    <b>Custom House</b>
                  </Typography>
                </div>
                <div className="col-sm-3">
                  <Typography
                    variant="h5"
                    className="mb-2"
                    color={colors.primary[300]}
                  >
                    : {purchaseDetails?.custom_house}
                  </Typography>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="row">
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Challan Date</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                : {moment(purchaseDetails?.challan_date).format("DD MMMM YYYY")}
              </Typography>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Challan No</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                : {purchaseDetails?.challan_no}
              </Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Vendor Name</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                : {purchaseDetails?.vendor?.name}
              </Typography>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Vendor Code</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                : {purchaseDetails?.vendor?.vendor_code}
              </Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Vendor Bin</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                : {purchaseDetails?.vendor?.vendor_bin}
              </Typography>
            </div>
            <div className="col-sm-2"></div>
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Vendor Tin</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                : {purchaseDetails?.vendor?.vendor_tin}
              </Typography>
            </div>
            <div className="col-sm-2">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Created At</b>
              </Typography>
            </div>
            <div className="col-sm-3">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                {moment(purchaseDetails.created_at).format(
                  "DD MMM YYYY - hh:mm A"
                )}
              </Typography>
            </div>
          </div>

          {/* TABLE */}
          <div className="row mt-5">
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th className="align-middle">#</th>
                    <th className="align-middle">Product Description</th>
                    <th className="align-middle">SKU</th>
                    <th className="align-middle">HS Code</th>
                    <th className="align-middle">Unit Price</th>
                    <th className="align-middle">Quantity</th>
                    <th className="align-middle">Total Price</th>

                    {purchaseDetails?.type === "Imported" ? (
                      <>
                        <th className="align-middle">CD</th>
                        <th className="align-middle">RD</th>
                        <th className="align-middle">SD</th>
                        <th className="align-middle">AT</th>
                        <th className="align-middle">AIT</th>
                      </>
                    ) : (
                      <th className="align-middle">SD</th>
                    )}

                    <th className="align-middle">Vat Rate</th>
                    <th className="align-middle">Vat Amount</th>
                    <th className="align-middle">Total TAX</th>
                    <th className="align-middle">SUB Total</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseDetails?.purchase_items?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.info?.title}</td>
                      <td>{item?.info?.sku}</td>
                      <td>{item?.info?.hscode?.code_dot}</td>
                      <td className="text-end">
                        {formatCurrency.format((+item.price).toFixed(2))}
                      </td>
                      <td className="text-center">{item.qty}</td>
                      <td className="text-end">
                        {formatCurrency.format((+item.total_price).toFixed(2))}
                      </td>
                      {purchaseDetails?.type === "Imported" ? (
                        <>
                          <td className="text-end">
                            {formatCurrency.format((+item.cd).toFixed(2))}
                          </td>
                          <td className="text-end">
                            {formatCurrency.format((+item.rd).toFixed(2))}
                          </td>
                          <td className="text-end">
                            {formatCurrency.format((+item.sd).toFixed(2))}
                          </td>
                          <td className="text-end">
                            {formatCurrency.format((+item.at).toFixed(2))}
                          </td>
                          <td className="text-end">
                            {formatCurrency.format((+item.ait).toFixed(2))}
                          </td>
                        </>
                      ) : (
                        <td className="text-end">
                          {formatCurrency.format((+item.sd).toFixed(2))}
                        </td>
                      )}
                      <td>{+item.vat_rate}%</td>
                      <td className="text-end">
                        {formatCurrency.format((+item.vat_amount).toFixed(2))}
                      </td>

                      <td className="text-end">
                        {formatCurrency.format((+item.tti).toFixed(2))}
                      </td>
                      <td className="text-end">
                        {formatCurrency.format(
                          (item.tti + +item.total_price).toFixed(2)
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    {purchaseDetails?.type === "Imported" ? (
                      <>
                        <td className="text-end" colSpan={6}>
                          <b>Total Amount:</b>
                        </td>
                        <td className="text-end">{calculatePrice()}</td>
                        <td className="text-end">{calculateCD()}</td>
                        <td className="text-end">{calculateRD()}</td>
                        <td className="text-end">{calculateSD()}</td>
                        <td className="text-end">{calculateAT()}</td>
                        <td className="text-end">{calculateAIT()}</td>
                      </>
                    ) : (
                      <>
                        <td className="text-end" colSpan={6}>
                          <b>Total Amount:</b>
                        </td>
                        <td className="text-end">{calculatePrice()}</td>
                        <td className="text-end">{calculateSD()}</td>
                      </>
                    )}
                    <td></td>
                    <td className="text-end">{calculateVAT()}</td>
                    <td className="text-end">{calculateTax()}</td>
                    <td className="text-end">{calculate()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FOOTER */}
          <div className="row mt-5">
            <div className="col-sm-12 capital">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Quantity in Words:</b> {converter.toWords(calculateQty())}{" "}
                Piece's Only
              </Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 capital">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Amount in Words:</b> Taka {converter.toWords(calculate())}{" "}
                Only
              </Typography>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 capital">
              <Typography
                variant="h5"
                className="mb-2"
                color={colors.primary[300]}
              >
                <b>Created By: </b>
                {purchaseDetails.user.name}
              </Typography>
            </div>
          </div>
        </>
      )}
    </>
  );
};

PurchaseDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(PurchaseDetails);
