import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
//redux imports
import { connect } from "react-redux";

//theme imports
import { tokens } from "./theme";
import {
  Typography,
  useTheme,
  Card,
  CardActions,
  CardContent,
  Button,
} from "@mui/material";

import { ProSidebarProvider } from "react-pro-sidebar";

//icons
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import FaceIcon from "@mui/icons-material/Face";
import BusinessIcon from "@mui/icons-material/Business";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ExtensionIcon from "@mui/icons-material/Extension";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

//mock data
import { dataset } from "../components/charts/data";
// import { useState } from "react";
import BarChart from "../components/charts/BarChart";
import Tree from "../components/global/Tree"
import { BASE_URL } from "../base";

//axios
import axios from "axios";

export function Home({roles,token}) {
  // console.log("roles");
  // console.log(token);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [details, setDetails] = useState([]);

  const [chartData, setChartData] = useState({
    labels: dataset.map((data) => data.year),
    datasets: [
      {
        label: "Users gained",
        data: dataset.map((data) => data.gain),
        backgroundColor: [colors.greenAccent[300], colors.greenAccent[400]],
      },
    ],
  });
  useEffect(() => {
    
    const apiUrl = BASE_URL + "leave/approve-leave-count";
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
          console.log(res.data);
        //   setLoader(false);
          setDetails(res.data.totalApprovedDays)
       })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <>
      <Typography variant="h2" color={colors.greenAccent[300]}>
        Welcome to NTRCA Leave Management System
      </Typography>

      

      {(roles == 1) ? 
        <>
        <div className="row">
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ShoppingBagIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Sales
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/orders/OrderList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
              <Link href="/orders/returnList" className="anchor">
                <Button size="small" variant="contained">
                  Returns
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ShoppingCartIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Purchases
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/purchases/purchaseList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
              <Link href="/purchases/returnList" className="anchor">
                <Button size="small" variant="contained">
                  Returns
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <FaceIcon fontSize="large" color="secondary" className="mb-3" />
              <Typography variant="h3" color={colors.primary[600]}>
                Customers
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/customers/customerList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <StoreIcon fontSize="large" color="secondary" className="mb-3"/>
              <Typography variant="h3" color={colors.primary[600]}>
                Vendors
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/vendors/vendorList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        
      </div>
      <div className="row">
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ReceiptIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Mushak
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/mushak/report" className="anchor">
                <Button size="small" variant="contained">
                  Report
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ReceiptIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                BOM
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/bom/bomList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
              <Link href="/bom/bomTemplate" className="anchor">
                <Button size="small" variant="contained">
                  Upload
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <AccountTreeIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Users
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/users/userList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <BusinessIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Companies
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/companies/companyList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        
        <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <AccountTreeIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Branches
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/branch/branchList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
      
      <div className="row">
      <div className="col-md-2"></div>
          {/* {(roles == 1) &&
            <div className="col-md-8">
              <Card className="mt-5">
                <Tree />
              </Card>
            </div>
          } */}
        {/* <Tree /> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <ExtensionIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Finished Goods
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/finishedGoodList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <FormatPaintIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Raw Materials
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/rawMaterialList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
              <DesignServicesIcon
                fontSize="large"
                color="secondary"
                className="mb-3"
              />
              <Typography variant="h3" color={colors.primary[600]}>
                Services
              </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/serviceList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
        {/* <div className="col-md-3">
          <Card className="mt-5">
            <CardContent className="text-center">
                  <BeachAccessIcon fontSize="large" color="secondary" className="mb-3"/>
                  <Typography variant="h3" color={colors.primary[600]}>
                    Accessories
                  </Typography>
            </CardContent>
            <CardActions className="justify-content-center">
              <Link href="/products/accessoriesList" className="anchor">
                <Button size="small" variant="contained">
                  List
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div> */}
      </div>

      </> :
      <>
      <div className="table-responsive" style={{ padding: '2em 0' }}>
        <table className="table table-hover table-striped">
          <thead>
            <tr className="table-success">
              <th>#</th>
              <th>Leave Type</th>
              <th>Total leave</th>
              <th>Remaining Leave</th>
            </tr>
          </thead>
          <tbody>
          {details?.map((detail, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{detail?.leave_type?.leave_type_name}</td>
              <td>{detail?.approved_total_days}</td>
              <td>{detail?.remainingDays}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      </>
        }
      {/* <BarChart chartData={chartData} /> */}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.auth.name,
    token: state.auth.token,
    roles: state.auth.roles,
    company: state.auth.company,
    isCollapsed: state.collapse.isCollapse,
    
  };
};

// export default Home;
export default connect(mapStateToProps)(Home);
