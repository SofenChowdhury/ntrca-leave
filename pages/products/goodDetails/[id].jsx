import React, { useState, useEffect } from "react";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../theme";
import {
  CircularProgress,
  Typography,
  useTheme,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

// date format
import moment from "moment/moment";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";

const GoodDetails = ({ query, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // HELPER VARIABLES
  const [goodDetails, setGoodDetails] = useState({});
  const [value, setValue] = useState("one");
  const id = +query.id;
  const [loader, setLoader] = useState(true);

  // FETCH GOOD DETAILS
  useEffect(() => {
    const apiUrl = BASE_URL + "api/v1/goods/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status) {
          setLoader(false);
          setGoodDetails(res.data.data);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // HANDLE TAB CHANGE
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(goodDetails);

  return (
    <>
      {loader ? (
        <CircularProgress />
      ) : (
        <>
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Good Received Details
          </Typography>

          {/* COMPANY DETAILS */}
          <Typography variant="h4" color={colors.greenAccent[300]}>
            {goodDetails?.company?.name}
          </Typography>
          <Typography
            variant="h5"
            className="mt-1"
            color={colors.greenAccent[300]}
          >
            {goodDetails?.branch?.name}
          </Typography>
          <Typography
            variant="h5"
            className="mt-2"
            color={colors.greenAccent[300]}
          >
            <LocationOnIcon />
            {goodDetails?.branch?.address}
          </Typography>

          {/* PRODUCT DETAILS */}
          <Typography
            variant="h4"
            color={colors.greenAccent[300]}
            className="mt-5"
          >
            {goodDetails?.item?.title}
          </Typography>
          <Typography
            variant="h5"
            className="mt-1"
            color={colors.greenAccent[300]}
          >
            {goodDetails?.item?.sku}
          </Typography>
          <Typography
            variant="h5"
            className="mt-1"
            color={colors.greenAccent[300]}
          >
            Date - {moment(goodDetails?.created_at).format("DD MMM YYYY")}
          </Typography>

          {/* TABS */}
          <Box sx={{ width: "100%" }} className="mt-4">
            <Tabs value={value} onChange={handleChange}>
              <Tab value="one" label="Raw Materials" />
              <Tab value="two" label="Mushak 6.1" />
            </Tabs>
          </Box>

          {/* TAB 1 */}
          {value === "one" && (
            <>
              <div className="table-responsive mt-4 p-2">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr className="table-success">
                      <th>#</th>
                      <th>Name</th>
                      <th>SKU</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goodDetails?.materials?.map((material, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{material.info?.title}</td>
                        <td>{material.info?.sku}</td>
                        <td>{material.qty}</td>
                        <td>{material.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 2 */}
          {value === "two" && (
            <>
              <div className="table-responsive mt-4 p-2">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr className="table-success">
                      <th>#</th>
                      <th>Name</th>
                      <th>SKU</th>
                      <th>Price</th>
                      <th>Opening Quantity</th>
                      <th>Quantity</th>
                      <th>Closing Quantity</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {goodDetails?.six_one?.map((mushak, index) => (
                      <tr
                        key={index}
                        className={mushak.type == "credit" ? "table-info" : ""}
                      >
                        <td>{index + 1}</td>
                        <td>{mushak.info?.title}</td>
                        <td>{mushak.info?.sku}</td>
                        <td>{mushak.price}</td>
                        <td>{mushak.opening_qty}</td>
                        <td>{mushak.qty}</td>
                        <td>{mushak.closing_qty}</td>
                        <td>{mushak.nature}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

GoodDetails.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(GoodDetails);
