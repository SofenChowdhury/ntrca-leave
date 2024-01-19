import React, { useState, useEffect, useRef } from "react";
//axios
import axios from "axios";
import { BASE_URL } from "../../../../../base";
import moment from "moment";

//redux imports
import { connect } from "react-redux";

const AdjustmentsVat = ({ query, token }) => {
  //Helper variables
  const id = +query.id;
  const [adjustmentDetails, setadjustmentDetails] = useState(null);

  //Fetching Adjustment Details
  useEffect(() => {
    const apiAdjustment = BASE_URL + "api/v1/vat-adjustment/" + id;
    axios
      .get(apiAdjustment, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          //   setLoader(false);
          setadjustmentDetails(res.data.data);
          console.log(res.data.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Price calculation
  function sumPrice(id) {
    let total = 0;
    adjustmentDetails.challans.map((challan) => {
      if (id == challan.id) {
        challan.purchase?.purchase_items.map((item) => {
          total += item.total_price;
        });
      }
    });

    return total.toFixed(2);
  }

  //VAT calculation
  const vatAmmount = (id) => {
    let vat = 0;
    adjustmentDetails?.challans?.map((challan) => {
      if (id == challan.id) {
        challan.purchase?.purchase_items.map((item) => {
          vat += item.vat_amount;
        });
      }
    });

    return vat.toFixed(2);
  };
  const sumVat = () => {
    let t = 0;
    adjustmentDetails?.challans?.map((data) => {
      t += +vatAmmount(data.id);
    });
    return t.toFixed(2);
  };

  const totalValueOfSupply = () => {
    let t = 0;
    adjustmentDetails?.challans?.map((data) => {
      t += +sumPrice(data.id);
    });
    return t.toFixed(2);
  };

  //Total Value of Supply Calculation

  //VDS calculation
  function vatWithheld(id) {
    let total = 0;
    adjustmentDetails?.challans?.map((challan) => {
      if (id == challan.id) {
        challan?.purchase?.purchase_items.map((item) => {
          total += item.vds_receive_amount;
        });
      }
    });
    return total.toFixed(2);
  }

  const amountOfVATwithheld = () => {
    let t = 0;
    adjustmentDetails?.challans?.map((data) => {
      t += +vatWithheld(data.id);
    });
    return t.toFixed(2);
  };

  //Customer Calculatin Section

  //Customer Total Price calculation
  function customerTotalPriceCalculation(id) {
    let total = 0;
    adjustmentDetails.challans.map((challan) => {
      if (id == challan.id) {
        challan.sales?.sales_items.map((item) => {
          total += item.total_price;
        });
      }
    });

    return total.toFixed(2);
  }
  
  //Customer Total VAT calculation
  function customerTotalVatCalculation(id) {
    let total = 0;
    adjustmentDetails.challans.map((challan) => {
      if (id == challan.id) {
        challan.sales?.sales_items.map((item) => {
          total += item.vat_amount;
        });
      }
    });

    return total.toFixed(2);
  }

  //Customer Total Value of Supply
  const customarTotalValueOfSupply = () => {
    let t = 0;
    adjustmentDetails?.challans?.map((data) => {
      t += +customerTotalPriceCalculation(data.id);
    });
    return t.toFixed(2);
  };

  //Customer Total VAT of Supply
  const customarTotalVatOfSupply = () => {
    let t = 0;
    adjustmentDetails?.challans?.map((data) => {
      t += +customerTotalVatCalculation(data.id);
    });
    return t.toFixed(2);
  };

  return (
    <>
      {/* HEADERS */}
      <div className="p-5">
        <div>
          <div className="row">
            <div className="col-md-2">
              {/* <img
                className="ms-5"
                alt="profile-user"
                width="80px"
                height="80px"
                src={`/../../../assets/images/govt.png`}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              /> */}
            </div>
            <div className="col-md-8 text-center">
              <div className="row">
                <b>Government of People's Republic of Bangladesh</b>
              </div>
              <div className="row">
                <b>National Board of Revenue</b>
              </div>
              <div className="row">
                <b>Withholding Certificate</b>
              </div>
              <div className="row">
                <b>[see Clauses (চ) of Sub -Rule (1) of Rule 40]</b>
              </div>
              <div className="row">
                <b>
                  Name of Withholding Entity: {adjustmentDetails?.company?.name}
                </b>
              </div>
              <div className="row">
                <b>
                  Address of Withholding Entity:{" "}
                  {adjustmentDetails?.company?.contact_address}
                </b>
              </div>
              <div className="row">
                <b>
                  BIN of Withholding Entity (If applicable):{" "}
                  {adjustmentDetails?.company?.company_bin}
                </b>
              </div>
            </div>
            <div className="col-md-2 text-end">
              <b>Mushak 6.6</b>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-7"></div>
            <div className="col-md-5">
              {/* <b>Debit Note No -</b> {returnDetails?.return_no} */}
            </div>
          </div>

          <div className="row ">
            <div className="col-md-7">
              <b>Certificate No:</b> {adjustmentDetails?.certificate_no}
            </div>
            <div className="col-md-5">
              <b>Date of Issue: </b> {adjustmentDetails?.certificate_date}
              {/* {moment(returnDetails?.created_at).format("DD MMM YY")} */}
            </div>
          </div>
          <div className="row mt-4">
            <p style={{ textAlign: "justify" }}>
              This is to certified that VAT has been deducted at source from the
              supplier having VAT deductitble at Source in accordance with
              section 49 of the Act. The VAT so deducted has been deposited in
              the government treasury by book transfer/treasury challan in the
              return. A copy has been attached. <b>(If Applicable)</b>
            </p>
          </div>
          <div className="table-responsive mt-3">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th rowSpan={2} className="text-center align-middle">
                    SL No
                  </th>
                  {adjustmentDetails?.type == "increasing" ? (
                    <>
                      <th colSpan={2} className="text-center align-middle">
                        Supplier
                      </th>
                    </>
                  ) : (
                    <>
                      <th colSpan={2} className="text-center align-middle">
                        Customer
                      </th>
                    </>
                  )}

                  <th colSpan={2} className="text-center align-middle">
                    Concerned tax Invoice
                  </th>
                  <th rowSpan={2} className="text-center align-middle">
                    Total Value of Supply (TAKA)
                  </th>
                  <th rowSpan={2} className="text-center align-middle">
                    Amount of VAT (TAKA)
                  </th>
                  <th rowSpan={2} className="text-center align-middle">
                    Amount of VAT withheld at source (TAKA)
                  </th>
                </tr>
                <tr>
                  <th className="text-center align-middle">Name</th>
                  <th className="text-center align-middle">BIN</th>
                  <th className="text-center align-middle">Number</th>
                  <th className="text-center align-middle">Issue Date</th>
                </tr>
              </thead>
              <tbody>
                {adjustmentDetails?.challans?.map((challan, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>

                    {/* <td>{challan.purchase?.vendor?.name}</td>
                    <td>{challan.purchase?.vendor?.vendor_bin}</td>
                    <td>{challan.purchase?.purchase_no}</td>
                    <td>{challan.purchase?.challan_date}</td> */}
                    {adjustmentDetails?.type == "increasing" ? (
                      <>
                        <td>{challan.purchase?.vendor?.name}</td>
                        <td>{challan.purchase?.vendor?.vendor_bin}</td>
                        <td>{challan.purchase?.purchase_no}</td>
                        <td>{challan.purchase?.challan_date}</td>
                        <td className="text-end align-middle">
                          {" "}
                          {sumPrice(challan.id)}{" "}
                        </td>
                        <td className="text-end align-middle">
                          {vatAmmount(challan.id)}{" "}
                        </td>
                        <td className="text-end align-middle">
                          {vatWithheld(challan.id)}
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{challan.sales?.customer?.name}</td>
                        <td>{challan.sales?.customer?.bin}</td>
                        <td>{challan.sales?.customer?.tin}</td>
                        <td>
                          {" "}
                          {moment(challan.sales?.customer?.created_at).format(
                            "MMM DD, YYYY"
                          )}
                        </td>
                        <td className="text-end align-middle">
                          {" "}
                          {customerTotalPriceCalculation(challan.id)}{" "}
                        </td>
                        <td className="text-end align-middle">
                          {customerTotalVatCalculation(challan.id)}{" "}
                        </td>
                        <td className="text-end align-middle">
                          {customerTotalVatCalculation(challan.id)}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
              {/* <tfoot>
                <tr>
                  <th colSpan={5} className="text-end align-middle">
                    Total
                  </th>
                  <th className="text-end align-middle">{totalValueOfSupply()}</th>

                  <th className="text-end align-middle"> {sumVat()} </th>
                  <th className="text-end align-middle">{amountOfVATwithheld()}</th>
                </tr>
              </tfoot> */}
              {adjustmentDetails?.type == "increasing" ? (
                <>
                  <tfoot>
                    <tr>
                      <th colSpan={5} className="text-end align-middle">
                        Total
                      </th>
                      <th className="text-end align-middle">
                        {totalValueOfSupply()}
                      </th>

                      <th className="text-end align-middle"> {sumVat()} </th>
                      <th className="text-end align-middle">
                        {amountOfVATwithheld()}
                      </th>
                    </tr>
                  </tfoot>
                </>
              ) : (
                <>
                  <tfoot>
                    <tr>
                      <th colSpan={5} className="text-end align-middle">
                        Total
                      </th>
                      <th className="text-end align-middle">
                        {customarTotalValueOfSupply()}
                      </th>

                      <th className="text-end align-middle">
                        {" "}
                        {customarTotalVatOfSupply()}{" "}
                      </th>
                      <th className="text-end align-middle">
                        {customarTotalVatOfSupply()}
                      </th>
                    </tr>
                  </tfoot>
                </>
              )}
            </table>
          </div>
          <div className="row ">
            <div className="col-md-7"></div>
            <div className="col-md-5">
              <b>Officer-in-charge:</b>{" "}
            </div>
          </div>
          <div className="row ">
            <div className="col-md-7"></div>
            <div className="col-md-5">
              <b>Signature:</b>{" "}
            </div>
          </div>
          <div className="row ">
            <div className="col-md-7"></div>
            <div className="col-md-5">
              <b>Name:</b>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AdjustmentsVat.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(AdjustmentsVat);
