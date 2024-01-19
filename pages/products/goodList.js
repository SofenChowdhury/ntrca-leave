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
} from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// date format
import moment from "moment/moment";

const GoodList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [goods, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  //Pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const apiProducts = BASE_URL + "api/v1/goods?page=" + page;

    axios
      .get(apiProducts, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setLoader(false);
          setProducts(res.data.data.data);
          setLastPage(res.data.data.last_page);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handleChange = (e, page) => {
    setPage(page);
  };

  console.log(goods);

  return (
    <>
      {loader ? (
        <CircularProgress color="success" />
      ) : (
        <>
          <div className="row"></div>
          <div className="row">
            <div className="col-md-6">
              <Typography
                variant="h2"
                className="mb-4"
                color={colors.greenAccent[300]}
              >
                Received Finished Goods
              </Typography>
            </div>
            <div className="col-md-6 mt-1">
              <Link href="/products/receiveGood" className="anchor">
                <Button variant="outlined" className="float-end">
                  Receive New Product
                </Button>
              </Link>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr className="table-success">
                  <th scope="col">#</th>
                  <th scope="col">Goods No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Company</th>
                  <th scope="col">Branch</th>
                </tr>
              </thead>
              <tbody>
                {goods.map((good, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        href={`/products/goodDetails/${good.id}`}
                        className="anchor3"
                      >
                        {good.goods_no}
                      </Link>
                    </td>
                    <td>{good.item.title}</td>
                    <td>{moment(good.created_at).format("DD MMM YY")}</td>
                    <td>{good.qty}</td>
                    <td>{good.price}</td>
                    <td>{good.company.name}</td>
                    <td>{good.branch.name}</td>
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

export default connect(mapStateToProps)(GoodList);
