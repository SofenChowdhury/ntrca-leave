import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";
// Theme imports
import { tokens } from "../theme";
import {
  CircularProgress,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
//axios
import axios from "axios";
import { BASE_URL, MUSHAK_91_api,IMAGE_URL,SIGN_URL } from "../../base";
// PDF
import { jsPDF } from "jspdf";
import * as htmlToImage from "html-to-image";
// Date
import moment from "moment/moment";
// import Moment from 'moment';

// PRINT
import { useReactToPrint } from "react-to-print";
import { border } from "@mui/system";

// Date
import { DatePicker } from "antd";
import dayjs from "dayjs";



// Icons
import Print from "@mui/icons-material/Print";


const leave_form = ({ query, token, roles }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // HELPER VARIABLES
  let date = moment().format("DD MMM YYYY");



  const id = +query.id;
  const [errors, setErrors] = useState("");

  const [details, setDetails] = useState({});


  // DATE
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const { RangePicker } = DatePicker;
  const [isCustom, setIsCustom] = useState(false);
  const [isCustomMonth, setIsCustomMonth] = useState(false);

  // BOOLEANS
  const [loader, setLoader] = useState(true);
  const [loaderCustomers, setLoaderCustomers] = useState(false);
  const currentYear = new Date().getFullYear();
  const convertToBanglaNumber = (number) => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    
    // Check if 'number' is defined and not null before conversion
    if (typeof number !== 'undefined' && number !== null) {
      return number.toString().replace(/\d/g, (digit) => {
        return banglaNumbers[parseInt(digit)];
      });
    }
    
    // Return a default value or an empty string if 'number' is undefined or null
    return ''; // You can adjust the default value as needed
  };
  // MODALS
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // REFERENCES
  const printRef = useRef();
  const multiselectRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
const convertToBanglaDate = (isoDate) => {
  const monthsInBangla = {
    January: 'জানুয়ারি',
    February: 'ফেব্রুয়ারি',
    March: 'মার্চ',
    April: 'এপ্রিল',
    May: 'মে',
    June: 'জুন',
    July: 'জুলাই',
    August: 'অগাস্ট',
    September: 'সেপ্টেম্বর',
    October: 'অক্টোবর',
    November: 'নভেম্বর',
    December: 'ডিসেম্বর',
  };

  const dateObj = new Date(isoDate);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();
  const banglaDay=convertToBanglaNumber(day);
  const banglaMonth = monthsInBangla[month];
  const banglaYear = convertToBanglaNumber(year);
  return `${banglaDay} ${banglaMonth}, ${banglaYear}`;
};
  useEffect(() => {
    
    const apiUrl = BASE_URL + "leave/details/" + id;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
       
        if (res.data) {
          console.log(res.data);
        //   setLoader(false);
          setDetails(res.data)
        } else {
          setErrors(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);





  function onChange(date, dateString) {
    dateString?.map((date, index) => {
      if (index == 0) setStartDate(date);
      else setEndDate(date);
    });
  }

  // Search Button
  const searchSelectField = () => {
    setLoaderCustomers(true);
    setTimeout(() => {
      setLoaderCustomers(false);
    }, 1000);
    getMushak();
    
    // multiselectRef?.current?.resetSelectedValues();
  };

 
  // hover functions
  const handleMouseOver = () => {
    setLoaderCustomers(false);
  };

  const handleMouseOut = () => {
    setLoaderCustomers(false);
  };


  return (
    <>
      {!loader ? (
        <CircularProgress />
      ) : (
        (roles != 1) &&
        <>
        {/* {showCustomerModal ? (
        <div>
          <Modal
            onClose={() => setShowCustomerModal(false)}
            show={showCustomerModal}
          >
            <MushakModal4Form start_date={start_date} end_date={end_date} companyName={mushakDetails?.company?.name} company_bin={mushakDetails?.company?.company_bin} />
          </Modal>
        </div>
        ) : ( */}
        <div>
              <div className="mt-3">
                <Button
                  variant="contained"
                  size="small"
                  className="float-end"
                  onClick={handlePrint}
                //   onClick={downloadPdf}
                >
                  <Print />
                  Print
                </Button>
              </div>

              <div ref={printRef} className="px-5 py-2">
                {/* HEADERS */}
                {loaderCustomers ? (
                  <div className="text-center">
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    <div>
               
                      <br/>
                    
                      <div className="row">
                        <div className="col-2">
                          <img
                            className="ms-2"
                            alt="profile-user"
                            width="80px"
                            height="80px"
                            src={`../../assets/images/govt.png`}
                            style={{ cursor: "pointer", borderRadius: "50%" }}
                          />
                        </div>
                        <div className="col-8 text-center">
                          <div className="row">
                            <small style={{ color: "dodgerblue" }}>
                                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                            </small>
                          </div>
                          <div className="row">
                            <small style={{ color: "dodgerblue" }}>
                                মাধ্যমিক ও উচ্চ শিক্ষা বিভাগ, শিক্ষা মন্ত্রণালয়
                            </small>
                          </div>
                          <div className="row">
                            <small style={{ color: "dodgerblue" }}>
                                বেসরকারি শিক্ষক নিবন্ধন ও প্রত্যয়ন কর্তৃপক্ষ(NTRCA)
                            </small>
                          </div>
                          <div className="row">
                            <small style={{ color: "darkviolet" }}>
                            রেড ক্রিসেন্ট বোরাক টাওয়ার (৪র্থ তলা) ৩৭/৩/এ, ইস্কাটন গার্ডেন রোড, রমনা, ঢাকা-১০০০।
                            </small>
                          </div>
                          <div className="row">
                            <small style={{ color: "dodgerblue" }}>
                                [www.ntrca.gov.bd]
                            </small>
                          </div>
                        </div>
                        <div className="col-2">
                          {/* <h6 style={{ color: "darkviolet" }}>আবেদন-পত্র</h6> */}
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive mt-1">
                      <table
                        className=""
                        style={{ border: "white" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={3} className="pb-0 pt-0">
                            {details?.application?.leave_type?.leave_type_name}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                         
                            <tr>
                                <td
                                className="text-left pb-0 pt-5"
                                style={{ width: "65%" }}
                                >
                                <p>১. আবেদনকারীর নামঃ  <strong>{details?.application?.sender?.full_name}</strong></p>
                                </td>
                              
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "65%" }}
                                >
                                <p>২. পদবিঃ <strong>{details?.application?.sender?.designation?.desg_nm}</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "85%" }}
                                colSpan={2}
                                >
                                <p>৩.  প্রার্থিত ছুতির সময়কালঃ আগামী {convertToBanglaDate(details?.application?.start_date)} থেকে {convertToBanglaDate(details?.application?.end_date)} তারিখ পর্যন্ত মোট {convertToBanglaNumber(details?.application?.applied_total_days)} দিনের নৈমিত্তিক ছুটি মঞ্জুর/কর্মস্থলত্যাগ/সরকারি ছুটি সংযুক্তি অনুমতিসহ।</p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "25%" }}
                                >
                                <p>৪. প্রার্থিত ছুটির কারনঃ  <strong>{details?.application?.reason}</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "25%" }}
                                >
                                <p>৫. ছুটিকালীন ঠিকানাঃ  <strong>{details?.application?.stay_location}</strong></p>
                                </td>
                                <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "40%" }}
                                >
                                </td>
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "70%" }}
                                >
                                <p>৬. কর্মস্থল ত্যাগের সময়কালঃ   <strong>......</strong></p>
                                </td>
                                <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "20%" }}
                                >
                            {/*{details?.application?.sender?.user?.signature} */} 
                                {details?.application?.sender?.user?.signature != null ? <img src={SIGN_URL+details?.application?.sender?.user?.signature} alt="Signature" height={75} width={50}/> : 'No sign'}
                                 <br/>
                                    {convertToBanglaDate(details?.application?.created_at)}   
                                 <hr/>
                                <p>আবেদনকারীর স্বাক্ষর ও তারিখ</p>
                                </td>
                            </tr>
                            <br/>
                           
                            <tr>
                            <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "60%" }}
                            >
                            </td>
                            <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "20%" }}
                            >
                                <hr/>
                                <p>বিকল্প কর্মকর্তা/কর্মচারীর নাম ও স্বাক্ষর</p>
                            </td>
                            </tr>
                        
                            <br/>
                            <tr>
                            <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "60%" }}
                            >
                                <p>বর্ণিত আবেদনকারীর {convertToBanglaNumber(currentYear)} সালে এ পর্যন্ত {convertToBanglaNumber(details?.totalApprovedDays)} দিন নৈমিত্তিক ছুটি ভোগ করেছেন।</p>
                            </td>
                            <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "20%" }}
                            >
                            {details?.application?.reviewer?.user?.signature != null ? <img src={SIGN_URL+details?.application?.reviewer?.user?.signature} alt="Signature" height={75} width={50}/> : ''}
                      
                            <hr/>
                                <p>(নৈমিত্তিক ছুটি রেকর্ডকারীর স্বাক্ষর)</p>
                            </td>
                            </tr>
                          
                            <br/>
                            <tr>
                            <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "60%" }}
                            >
                                <p>তাঁকে {convertToBanglaNumber(details?.application?.applied_total_days)} দিনের নৈমিত্তিক ছুটি/ভোগাকৃত নৈমিত্তিক ছুটি দেয়া যেতে পারে/পারে না।</p>
                            </td>
                            <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "20%" }}
                            >
                            <hr/>
                                <p>(নিয়ন্ত্রণকারী কর্মকর্তার স্বাক্ষর)</p>
                            </td>
                            </tr>
                      
                            <br/>
                            <tr>
                            <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "60%" }}
                            >
                                <p>তাঁর {convertToBanglaNumber(details?.application?.approved_total_days) } দিনের নৈমিত্তিক ছুটি/ভোগাকৃত নৈমিত্তিক ছুটি মঞ্জুর/নামঞ্জুর।</p>
                            </td>
                            <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "20%" }}
                            >
                            {
                              (details?.application?.status == 2)
                              && 
                              <>
                              {details?.application?.approver?.user?.signature != null ? <img src={SIGN_URL+details?.application?.approver?.user?.signature} alt="Signature" height={75} width={50}/> : ''}
                              </>
                            }
                            <hr/>
                                <p>(ছুটির মঞ্জরকারীর কর্মকর্তার স্বাক্ষর)</p>
                            </td>
                            </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* END TABLE */}
                  </>
                )}
              </div>
        </div>
        {/* // )} */}
      </>
      )}
    </>
  );
};

leave_form.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(leave_form);
