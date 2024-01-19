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

// Date
import { DatePicker } from "antd";

// Excel
import ExportExcel from "../../components/services/ExportExcel";
import moment from "moment";

const purchaseList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { RangePicker } = DatePicker;

  // Search
  const [purchase_no, setPurchaseNo] = useState("");
  const [challan_no, setChallanNo] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [vendor_id, setVendorId] = useState("");

  // Helper
  const [purchases, setPurchases] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loader, setLoader] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  // Fetch Purchase List
  useEffect(() => {
    const apiOrders = BASE_URL + "api/v1/purchases?page=" + page;

    axios
      .get(apiOrders, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == true) {
          setLoader(false);
          setPurchases(res.data.data.data);
          setLastPage(res.data.data.last_page);
          setTotalData(res.data.data.total);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // Date Change
  function onChange(date, dateString) {
    dateString?.map((date, index) => {
      if (index == 0) setStartDate(date);
      else setEndDate(date);
    });
  }

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };

  const downloadPurchases = async () => {
    const apiPurchaseDownload = BASE_URL + "api/v1/purchases-download";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .get(apiPurchaseDownload, config)
      .then((response) => {
        if (response.data.status) {
          // console.log(response.data.data);

          let index = 0;
          let temp = {};
          let data = [];
          response.data.data.map((purchase) => {
            purchase.purchase_items.map((item) => {
              index++;
              const date = moment(purchase.created_at).format("DD MMM YYYY");
              const time = moment(purchase.created_at).format("hh:mm A");
              temp = {
                SL: index,
                "Purchase No": purchase.purchase_no,
                "Challan No": purchase.challan_no,
                Date: date,
                Time: time,
                "Vendor Name": purchase.vendor.name,
                "Vendor Mobile": purchase.vendor.contact_number,
                "Vendor BIN": purchase.vendor.vendor_bin,
                "Vendor TIN": purchase.vendor.vendor_tin,
                "Item SKU": item.info.sku,
                "Item Title": item.info.title,
                "Item Price": item.price,
                "Item Quantity": item.qty,
                "Total Price": item.total_price,
                CD: item.cd,
                RD: item.rd,
                SD: item.sd,
                "VAT Rate": item.vat_rate,
                "VAT Amount": item.vat_amount,
                AT: item.at,
                AIT: item.ait,
                "Total TAX": item.tti,
                "Sub Total": +(item.total_price + +item.tti),
                "VAT Rebatabale Amount": item.vat_rebetable_amount,
                "VDS Receive Amount": item.vds_receive_amount,
              };
              data.push(temp);
            });
          });
          console.log(data);
          const fileName = "PurchaseList";
          const exportType = "csv";
          ExportExcel(data, fileName, exportType);
        } else {
          // setFormErrors(Object.values(response.data.errors));
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Purchase List
          </Typography>
        </div>
        <div className="col-md-6">
          <Button
            variant="outlined"
            className="float-end me-2"
            onClick={downloadPurchases}
          >
            Download
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 mt-2">
          <TextField
            label="Purchase No."
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setPurchaseNo(e.target.value)}
            className="shadow-input"
          />
        </div>
        <div className="col-md-3 mt-2">
          <TextField
            label="Challan No."
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setChallanNo(e.target.value)}
            className="shadow-input"
          />
        </div>
        <div className="col-md-3 mt-2"></div>
        <div className="col-md-3 mt-2">
          <RangePicker
            onChange={onChange}
            size="large"
            style={{ width: "100%" }}
            className="shadow-input"
          />
        </div>
      </div>
      {loader ? (
        <CircularProgress color="success" className="mt-5" />
      ) : (
        <>
          <div className="table-responsive mt-4">
            <table className="table table-striped table-hover">
              <thead>
                <tr className="table-success">
                  <th>Purchase No.</th>
                  <th>Challan No.</th>
                  <th>Challan Date</th>
                  <th>Stock Branch</th>
                  <th>Vendor Name</th>
                  <th>Created By</th>
                  <th>Created At</th>
                  <th>Type</th>
                  <th>Return</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        href={`/purchases/purchaseDetails/${purchase.id}`}
                        className="anchor3"
                      >
                        {purchase.purchase_no}
                      </Link>
                    </td>
                    <td>{purchase.challan_no}</td>
                    <td>
                      {moment(purchase.challan_date).format("DD MMM YYYY")}
                    </td>
                    <td>{purchase.branch.name}</td>
                    <td>{purchase.vendor.name}</td>
                    <td>{purchase.user.name}</td>
                    <td>
                      {moment(purchase.created_at).format(
                        "DD MMM YYYY - hh:mm A"
                      )}
                    </td>
                    <td>{purchase.type}</td>
                    <td>
                      <Link
                        className="anchor"
                        href={`/purchases/purchaseReturn/${purchase.id}`}
                      >
                        <Button variant="contained">Return</Button>
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

export default connect(mapStateToProps)(purchaseList);
