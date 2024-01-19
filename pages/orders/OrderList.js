import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
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
  Autocomplete,
  MenuItem,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Date
import { DatePicker } from "antd";
import moment from "moment";

// Excel
import ExportExcel from "../../components/services/ExportExcel";

// Icon import
import DeleteIcon from "@mui/icons-material/Delete";

const OrderList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { RangePicker } = DatePicker;

  // VARIABLE FOR POST
  const [branch_id, setBranchId] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [mobile, setMobile] = useState("");
  const [reference_no, setReferenceNo] = useState("");
  const [sales_no, setSalesNo] = useState("");
  const [status, setStatus] = useState(1);

  const [orders, setOrders] = useState([]);
  const [branches, setBranches] = useState([]);

  //BOOLEAN
  const [search, setSearch] = useState(false);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  //Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(0);

  // FETCH BRANHCES
  useEffect(() => {
    const apiBranches = BASE_URL + "api/v1/branches";

    axios
      .get(apiBranches, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setBranches(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // FETCH ORDERS
  useEffect(() => {
    // Get the current page from the query params
    const currentPage = Number(router.query.page) || 1;

    // Update the page state only if it's different from the current page
    if (currentPage !== page) {
      setPage(currentPage);
    }

    const fetchData = () => {
      setLoader(true);
      const apiOrders =
        BASE_URL +
        "api/v1/sales/search?branch_id=" +
        branch_id +
        "&sales_no=" +
        sales_no +
        "&reference_no=" +
        reference_no +
        "&mobile=" +
        mobile +
        "&status=" +
        status +
        "&start_date=" +
        start_date +
        "&end_date=" +
        end_date +
        "&page=" +
        currentPage;

      axios
        .get(apiOrders, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
          if (res.data.status == true) {
            setLoader(false);
            setOrders(res.data.data.data);
            const lastPage = res.data.data.last_page;
            const totalData = res.data.data.total;

            // Reset the page to 1 if there's only one page of data
            if (lastPage === 1 && currentPage !== 1) {
              router.push({ pathname: router.pathname, query: { page: 1 } });
              return;
            }

            // Update the lastPage and totalData states
            setLastPage(lastPage);
            setTotalData(totalData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [
    router.query.page,
    branch_id,
    sales_no,
    mobile,
    status,
    start_date,
    end_date,
    reference_no,
  ]);

  // Branch Change
  const handleBranchChange = (event, value) => {
    if (value) {
      setBranchId(value.id);
    } else {
      setBranchId("");
    }
  };

  // Date Change
  function onChange(date, dateString) {
    dateString?.map((date, index) => {
      if (index == 0) setStartDate(date);
      else setEndDate(date);
    });
  }

  const clear = () => {
    setBranchId("");
    setSalesNo("");
    setMobile("");
    setStatus("");
    setStartDate("");
    setEndDate("");
  };

  const downloadOrders = async () => {
    const apiOrderSearch =
      BASE_URL +
      "api/v1/sales/download?branch_id=" +
      branch_id +
      "&sales_no=" +
      sales_no +
      "&mobile=" +
      mobile +
      "&status=" +
      status +
      "&start_date=" +
      start_date +
      "&end_date=" +
      end_date;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .get(apiOrderSearch, config)
      .then((response) => {
        if (response.data.status) {
          let index = 0;
          let temp = {};
          let data = [];
          response.data.data.map((sales) => {
            sales.sales_items.map((item) => {
              index++;
              const date = moment(sales.created_at).format("DD MMM YYYY");
              const time = moment(sales.created_at).format("hh:mm A");
              temp = {
                SL: index,
                "Sales No": sales.sales_no,
                "Reference No": sales.reference_no,
                "Challan No": sales.id,
                Date: date,
                Time: time,
                "Customer Name": sales.customer_name,
                "Customer Mobile": sales.customer_phone,
                "Customer BIN": sales.customer?.bin,
                "Customer TIN": sales.customer?.tin,
                "Item SKU": item.item_info.sku,
                "Item Model": item.item_info?.model,
                "Item Title": item.item_info.title,
                "Item Price": item.price,
                "Item Quantity": item.qty,
                "Total Price": item.total_price,
                "VAT Rate": item.vat_rate,
                "Total VAT": item.vat_amount,
                "Sub Total": +(item.total_price + +item.vat_amount),
                "Company Name": sales.company.name,
                "Branch Name": sales.branch.name,
                "Branch Contact Person": sales.branch.person,
                "Branch Contact No": sales.branch.phone,
                "Branch Address": sales.branch.address,
              };
              data.push(temp);
            });
          });
          const date = new Date();
          const fileName = "SalesList_" + date.toDateString();
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

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);

    router.push({ pathname: router.pathname, query: { page } });
  };

  // Delete
  const handleDelete = (id) => {
    const salesData = { id };
    const apiSales = BASE_URL + "api/v1/sales/delete";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiSales, salesData, config).then((response) => {
      if (response.data.status) {
        alert(`Deleted Sales ${id}`);
        Router.reload(window.location.pathname);
      } else {
        console.log(response.data);
      }
    });
  }

  return (
    <>
      <div className="row">
        <div className="col-md-2">
          <Typography variant="h2" className="" color={colors.greenAccent[300]}>
            Orders
          </Typography>
        </div>
        <div className="col-md-10">
          {search ? (
            <Button
              variant="contained"
              color="error"
              className="float-end"
              onClick={(e) => {
                setSearch(false);
                clear();
              }}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outlined"
              className="float-end"
              onClick={(e) => {
                setSearch(true);
              }}
            >
              Search
            </Button>
          )}
          <Button
            variant="outlined"
            className="float-end me-2"
            onClick={downloadOrders}
          >
            Download
          </Button>
        </div>
      </div>
      {search && (
        <>
          <div className="row">
            <div className="col-md-4 mt-4">
              <TextField
                label="Customer Phone"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                onChange={(e) => setMobile(e.target.value)}
                className="shadow-input"
              />
            </div>
            <div className="col-md-4 mt-4">
              <TextField
                label="Sales No"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                onChange={(e) => setSalesNo(e.target.value)}
                className="shadow-input"
              />
            </div>
            <div className="col-md-4 mt-4">
              <TextField
                label="Reference No"
                variant="outlined"
                size="small"
                type="text"
                fullWidth
                onChange={(e) => setReferenceNo(e.target.value)}
                className="shadow-input"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mt-4">
              <TextField
                onChange={(e) => setStatus(e.target.value)}
                select
                label="Order Status"
                size="small"
                fullWidth
                value={status}
                className="shadow-input"
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </TextField>
            </div>
            <div className="col-md-4 mt-4">
              <Autocomplete
                options={branches}
                getOptionLabel={(option) => option.name}
                onChange={handleBranchChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Branch"
                    className="shadow-input"
                  />
                )}
                size="small"
              />
            </div>
            <div className="col-md-4 mt-4">
              <RangePicker
                onChange={onChange}
                size="large"
                style={{ width: "100%" }}
                className="shadow-input"
              />
            </div>
          </div>
          <div
            className="mt-4"
            style={{
              background: "rgb(230, 228, 228)",
              marginLeft: "-20px",
              marginRight: "-20px",
            }}
          >
            <br />
          </div>
        </>
      )}
      {loader ? (
        <CircularProgress color="success" className="mt-4" />
      ) : (
        <>
          <div className="table-responsive mt-5">
            <table className="table table-striped table-hover">
              <thead>
                <tr className="table-success">
                  <th>Challan Number</th>
                  <th>Reference</th>
                  <th>Order Date & Time</th>
                  <th>Challan Date</th>
                  <th>Customer Name</th>
                  <th>Customer Phone</th>
                  <th>Status</th>
                  <th>VAT</th>
                  <th>Return (Credit Note)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        href={`/orders/orderDetails/${order.id}`}
                        className="anchor3"
                      >
                        {order.sales_no}
                      </Link>
                    </td>
                    <td>{order.reference_no}</td>
                    <td>
                      {moment(order.created_at).format("DD MMM YYYY - hh:mm A")}
                    </td>
                    {order.challan_date ? (
                      <td>
                        {moment(order.challan_date).format("DD MMM YYYY")}
                      </td>
                    ) : (
                      <td></td>
                    )}

                    <td>{order.customer_name}</td>
                    <td>{order.customer_phone}</td>
                    {order.status ? (
                      <>
                        <td>Order</td>
                        <td>
                          <Link
                            href={`/orders/orderVat/${order.id}`}
                            className="anchor"
                          >
                            <Button variant="contained" color="secondary">
                              6.3
                            </Button>
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="anchor"
                            href={`/orders/orderReturn/${order.id}`}
                          >
                            <Button variant="contained" color="secondary">
                              Return (Credit Note)
                            </Button>
                          </Link>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>Draft</td>
                        <td>
                          <Link
                            href={`/orders/draftUpdate/${order.id}`}
                            className="anchor"
                          >
                            <Button variant="contained" color="secondary">
                              Update
                            </Button>
                          </Link>
                        </td>
                        <th>N/A</th>
                      </>
                    )}
                    <td>
                      <Button variant="contained" color="error" onClick={(e) => {handleDelete(order.id)}}>
                        <DeleteIcon cursor="pointer" />
                      </Button>
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

export default connect(mapStateToProps)(OrderList);
