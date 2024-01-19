import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Router, {useRouter} from "next/router";
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

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

// PRINT
import Print from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";

const SubForm4 = ({ token, query }) => {
    
    const router = useRouter();
    const theme = useTheme();
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
    const [company, setCompany] = useState({});
    const [loader, setLoader] = useState(false);

    // REFERENCES
    const printRef = useRef();
    const multiselectRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });

    // const {start_date, end_date, seles_vat} = router.query;
    // console.log('start_date');
    // console.log(start_date);
    // console.log(end_date);

    // Bug
    const start_date = query?.start_date;
    const end_date = query?.end_date;
    const seles_vat = query?.seles_vat;
    const seles_vat1 = query?.seles_vat1;
    const seles_vat2 = query?.seles_vat2;
    const seles_vat3 = query?.seles_vat3;
    const seles_vat4 = query?.seles_vat4;
    const form = query?.form
    const note = query?.note
    // console.log("seles_vat");
    // console.log(seles_vat);
    // console.log(seles_vat1);
    // console.log(seles_vat2);
    // console.log(seles_vat3);
    // console.log(seles_vat4);

    // Fetch Company
    useEffect(() => {
        if(seles_vat){
            const apiMushak =
            BASE_URL +
            "api/v1/mushok/sales-sub-form?" +
            "start_date=" +
            start_date +
            "&end_date=" +
            end_date +
            "&percentage=" +
            +seles_vat;
            console.log(apiMushak);
            // console.log(+seles_vat);
            axios
            .get(apiMushak, {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                // console.log('res?.data');
                // console.log(res?.data?.data);
                // console.log(res?.data?.data[0]?.purchase?.company);
                // sum();
                if (res?.data?.status == true) {
                    setMushak(res?.data?.data);
                    setCompany(res?.data?.data[0]?.sales?.company)
                    // console.log(res?.data?.data);
                    // setLoader(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        if(seles_vat1){
            const apiMushak =
            BASE_URL +
            "api/v1/mushok/sales-sub-form?" +
            "start_date=" +
            start_date +
            "&end_date=" +
            end_date +
            "&percentage=" +
            +seles_vat1;
            // console.log(apiMushak);
            // console.log(+seles_vat);
            axios
            .get(apiMushak, {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                // console.log('res?.data');
                // console.log(res?.data?.data);
                // console.log(res?.data?.data[0]?.purchase?.company);
                // sum();
                if (res?.data?.status == true) {
                    setMushak1(res?.data?.data);
                    setCompany(res?.data?.data[0]?.sales?.company)
                    // console.log(res?.data?.data);
                    // setLoader(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        if(seles_vat2){
            const apiMushak =
            BASE_URL +
            "api/v1/mushok/sales-sub-form?" +
            "start_date=" +
            start_date +
            "&end_date=" +
            end_date +
            "&percentage=" +
            +seles_vat2;
            // console.log(apiMushak);
            // console.log(+seles_vat);
            axios
            .get(apiMushak, {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                // console.log('res?.data');
                // console.log(res?.data?.data);
                // console.log(res?.data?.data[0]?.purchase?.company);
                // sum();
                if (res?.data?.status == true) {
                    setMushak2(res?.data?.data);
                    setCompany(res?.data?.data[0]?.sales?.company)
                    // console.log(res?.data?.data);
                    // setLoader(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        if(seles_vat3){
            const apiMushak =
            BASE_URL +
            "api/v1/mushok/sales-sub-form?" +
            "start_date=" +
            start_date +
            "&end_date=" +
            end_date +
            "&percentage=" +
            +seles_vat3;
            // console.log(apiMushak);
            // console.log(+seles_vat);
            axios
            .get(apiMushak, {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                // console.log('res?.data');
                // console.log(res?.data?.data);
                // console.log(res?.data?.data[0]?.purchase?.company);
                // sum();
                if (res?.data?.status == true) {
                    setMushak3(res?.data?.data);
                    setCompany(res?.data?.data[0]?.sales?.company)
                    // console.log(res?.data?.data);
                    // setLoader(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        if(seles_vat4){
            const apiMushak =
            BASE_URL +
            "api/v1/mushok/sales-sub-form?" +
            "start_date=" +
            start_date +
            "&end_date=" +
            end_date +
            "&percentage=" +
            +seles_vat4;
            // console.log(apiMushak);
            // console.log(+seles_vat);
            axios
            .get(apiMushak, {
                headers: { Authorization: "Bearer " + token },
            })
            .then((res) => {
                // console.log('res?.data');
                // console.log(res?.data?.data);
                // console.log(res?.data?.data[0]?.purchase?.company);
                // sum();
                if (res?.data?.status == true) {
                    setMushak4(res?.data?.data);
                    setCompany(res?.data?.data[0]?.sales?.company)
                    // console.log(res?.data?.data);
                    // setLoader(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        setLoader(true);
    }, []);

    const sum = () => {
        let total = 0;
        if(seles_vat){
            mushak?.map((data, index) => {
            total += (data?.price * data?.qty);       
            });
        }
        if(seles_vat1){
            mushak1?.map((data, index) => {
            total += (data?.price * data?.qty);       
            });
        }
        if(seles_vat2){
            mushak2?.map((data, index) => {
            total += (data?.price * data?.qty);       
            });
        }
        if(seles_vat3){
            mushak3?.map((data, index) => {
            total += (data?.price * data?.qty);       
            });
        }
        if(seles_vat4){
            mushak4?.map((data, index) => {
            total += (data?.price * data?.qty);       
            });
        }
        // setTotalAmount(total);
        return total.toFixed(2);
    }

    const sumVat = () => {
        let total = 0;
        if(seles_vat){
            mushak?.map((data, index) => {
            total += (data?.price * data?.qty) * data?.vat_rate / 100;       
            });
        }
        if(seles_vat1){
            mushak1?.map((data, index) => {
            total += (data?.price * data?.qty) * data?.vat_rate / 100;       
            });
        }
        if(seles_vat2){
            mushak2?.map((data, index) => {
            total += (data?.price * data?.qty) * data?.vat_rate / 100;       
            });
        }
        if(seles_vat3){
            mushak3?.map((data, index) => {
            total += (data?.price * data?.qty) * data?.vat_rate / 100;       
            });
        }
        if(seles_vat4){
            mushak4?.map((data, index) => {
            total += (data?.price * data?.qty) * data?.vat_rate / 100;       
            });
        }
        // setTotalAmount(total);
        return total.toFixed(2);
    }

    const getMushak = () => {
        const apiMushak =
        BASE_URL +
        "api/v1/mushok/sales-sub-form?" +
        "start_date=" +
        start_date +
        "&end_date=" +
        end_date; +
        "&percentage=" +
        15;
        axios
        .get(apiMushak, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data.status == true) {
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const submit = (e) => {
        setLoader(true);
        const customerData = {
        name,
        email,
        phone,
        code,
        address,
        tin,
        bin,
        company_id,
        type,
        };
        const apiUrl = BASE_URL + "api/v1/customers/create";
        const config = {
        headers: { Authorization: `Bearer ${token}` },
        };
        console.log(customerData);
        axios.post(apiUrl, customerData, config).then((response) => {
        setLoader(false);
        if (response.data.status) {
            alert("Customer Created");
            Router.push({
            pathname: "/orders/createOrder",
            });
        } else {
            setFormErrors(Object.values(response.data.errors));
        }
        });
    };

    // RETURN TO LIST
    const goBack = () => {
        Router.push({
        pathname: "/customers/customerList",
        });
    };
    //   console.log('Sub-date-s');
    //   console.log(start_date);
    //   console.log('Sub-date-e');
    //   console.log(end_date);
    //   console.log('mushak');
    //   console.log(mushak);
    //   console.log("mushak1");
    //   console.log(mushak1);
    //   console.log("mushak2");
    //   console.log(mushak2);
    //   console.log("mushak3");
    //   console.log(mushak3);
    //   console.log("mushak4");
    //   console.log(mushak4);

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
            {/* <div ref={printRef} className="p-5 m-5"> */}
            <div ref={printRef}>
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
                                Sub-form for the month of {moment(end_date).format("MMMM")} {moment(end_date).format("YYYY")}
                            </small>
                            </div>
                            <div className="row">
                            <small style={{ color: "dodgerblue" }}>
                                Sub-form for local Supply (for note 3,4,5,7,10,12,14,18,19,20 and 21)
                            </small>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <h6 style={{ color: "darkviolet" }}>{form}</h6>
                        </div>
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
                                <th className="pb-0 pt-0">
                                    Serial No.
                                </th>
                                <th className="pb-0 pt-0">
                                    Goods/Service Commercial Description
                                </th>
                                <th className="pb-0 pt-0">
                                    Goods/Service Code
                                </th>
                                <th className="pb-0 pt-0">
                                    Goods/Service Name
                                </th>
                                <th className="pb-0 pt-0">
                                    Value (a)
                                </th>
                                <th className="pb-0 pt-0">
                                    SD (b)
                                </th>
                                <th className="pb-0 pt-0">
                                    VAT (c)
                                </th>
                                <th className="pb-0 pt-0">
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
                                {/* <br/>
                                {data?.info?.details}
                                <br/>
                                {data?.info?.sku}
                                <br/>
                                {data?.info?.slug}
                                <br/>
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
                                    {data?.price * data?.qty}
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {((data?.price * data?.qty) * data?.vat_rate / 100).toFixed(2)}
                                </td>
                                <td
                                    className="text-center pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {/* <Link href={{
                                        pathname: "/mushak/subForms/SubForm4",
                                        query: {
                                            start_date: start_date,
                                            end_date: end_date,
                                            seles_vat: +seles_vat,
                                            form: "Sub-Form-3",
                                            note: "Note-3" 
                                        }
                                        }}
                                        target="_blank"
                                    >
                                        {data?.vat_rate == +seles_vat && "Note-3"}
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
                                {/* <br/>
                                {data?.info?.details}
                                <br/>
                                {data?.info?.sku}
                                <br/>
                                {data?.info?.slug}
                                <br/>
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
                                    {data?.price * data?.qty}
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {((data?.price * data?.qty) * data?.vat_rate / 100).toFixed(2)}
                                </td>
                                <td
                                    className="text-center pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {/* <Link href={{
                                        pathname: "/mushak/subForms/SubForm4",
                                        query: {
                                            start_date: start_date,
                                            end_date: end_date,
                                            seles_vat1: +seles_vat1,
                                            form: "Sub-Form-7",
                                            note: "Note-7" 
                                        }
                                        }}
                                        target="_blank"
                                    >
                                        {data?.vat_rate == +seles_vat1 && "Note-7"}
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
                                {/* <br/>
                                {data?.info?.details}
                                <br/>
                                {data?.info?.sku}
                                <br/>
                                {data?.info?.slug}
                                <br/>
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
                                    {data?.price * data?.qty}
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {((data?.price * data?.qty) * data?.vat_rate / 100).toFixed(2)}
                                </td>
                                <td
                                    className="text-center pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {/* <Link href={{
                                        pathname: "/mushak/subForms/SubForm4",
                                        query: {
                                            start_date: start_date,
                                            end_date: end_date,
                                            seles_vat2: +seles_vat2,
                                            form: "Sub-Form-7",
                                            note: "Note-7" 
                                        }
                                        }}
                                        target="_blank"
                                    >
                                        {data?.vat_rate == +seles_vat2 && "Note-7"}
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
                                {/* <br/>
                                {data?.info?.details}
                                <br/>
                                {data?.info?.sku}
                                <br/>
                                {data?.info?.slug}
                                <br/>
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
                                    {data?.price * data?.qty}
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {((data?.price * data?.qty) * data?.vat_rate / 100).toFixed(2)}
                                </td>
                                <td
                                    className="text-center pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {/* <Link href={{
                                        pathname: "/mushak/subForms/SubForm4",
                                        query: {
                                            start_date: start_date,
                                            end_date: end_date,
                                            seles_vat3: +seles_vat3,
                                            form: "Sub-Form-7",
                                            note: "Note-7" 
                                        }
                                        }}
                                        target="_blank"
                                    >
                                        {data?.vat_rate == +seles_vat3 && "Note-7"}
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
                                {/* <br/>
                                {data?.info?.details}
                                <br/>
                                {data?.info?.sku}
                                <br/>
                                {data?.info?.slug}
                                <br/>
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
                                    {data?.price * data?.qty}
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    
                                </td>
                                <td
                                    className="text-end pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {((data?.price * data?.qty) * data?.vat_rate / 100).toFixed(2)}
                                </td>
                                <td
                                    className="text-center pb-0 pt-0"
                                    style={{ width: "45%" }}
                                >
                                    {/* <Link href={{
                                        pathname: "/mushak/subForms/SubForm4",
                                        query: {
                                            start_date: start_date,
                                            end_date: end_date,
                                            seles_vat4: +seles_vat4,
                                            form: "Sub-Form-4",
                                            note: "Note-4" 
                                        }
                                        }}
                                        target="_blank"
                                    >
                                        {data?.vat_rate == +seles_vat4 && "Note-4"}
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
                                <td className="text-end pb-0 pt-0">
                                    -
                                </td>
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
        </>
      )}
    </>
    )
}

SubForm4.getInitialProps = async ({ query }) => {
    return {
      query,
    };
};

const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
    };
};
  
export default connect(mapStateToProps)(SubForm4);