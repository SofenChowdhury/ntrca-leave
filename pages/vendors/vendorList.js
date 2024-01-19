import React, { useEffect, useState } from "react";
import Router from "next/router";
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

// Icon import
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const vendorList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [vendors, setVendors] = useState([]);
  const [loader, setLoader] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // FETCHING VENDORS
  useEffect(() => {
    const apiVendors = BASE_URL + "api/v1/vendors?page=" + page;

    axios
      .get(apiVendors, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setLoader(false);
          setVendors(res.data.data.data);
          setLastPage(res.data.data.last_page);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  // DELETING VENDOR
  const onDelete = (e, id, name) => {
    const vendorData = { id };
    const apiVendor = BASE_URL + "api/v1/vendors/destroy";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiVendor, vendorData, config).then((response) => {
      if (response.data.status) {
        alert(`Deleted Vendor ${name}`);
        Router.reload(window.location.pathname);
      } else {
        console.log(response.data);
      }
    });
  };

  // Pagination
  const handleChange = (e, page) => {
    setPage(page);
  };

  return (
    <>
      {loader ? (
        <CircularProgress />
      ) : (
        <>
          <div className="row">
            <div className="col-10">
              <Typography
                variant="h2"
                className="mb-4"
                color={colors.greenAccent[300]}
              >
                Vendors
              </Typography>
            </div>
            <div className="col-2 mt-1">
              <Link href="/vendors/createVendor" className="anchor float-end">
                <Button variant="outlined">Create Vendor</Button>
              </Link>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr className="table-success">
                  <th scope="col">#</th>
                  <th scope="col">Vendor ID</th>
                  <th scope="col">Vendor Name</th>
                  <th scope="col">Contact Person</th>
                  <th scope="col">Contact Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Contact Email</th>
                  <th scope="col">Vendor BIN</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{vendor.id}</td>
                    <td>{vendor.name}</td>
                    <td>{vendor.contact_person}</td>
                    <td style={{ maxWidth: "300px" }}>
                      {vendor.contact_address}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {vendor.contact_number}
                    </td>
                    <td>{vendor.contact_email}</td>
                    <td>{vendor.vendor_bin}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link href={`/vendors/updateVendor/${vendor.id}`}>
                        <button className="btn btn-light btn-sm me-1">
                          <EditIcon cursor="pointer" />
                        </button>
                      </Link>

                      <button
                        className="btn btn-light btn-sm text-danger"
                        onClick={(e) => onDelete(e, vendor.id, vendor.name)}
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

export default connect(mapStateToProps)(vendorList);
