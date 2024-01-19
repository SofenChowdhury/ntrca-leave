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
import { BASE_URL, MUSHAK_91_api } from "../../base";
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

// Modal
// import Modal from "../../components/services/Modal";

//Components
// import MushakModal4Form from "../../components/forms/MushakModal4Form";

// Icons
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import Download from "@mui/icons-material/Download";
import Print from "@mui/icons-material/Print";
import Search from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import CreateCustomer from "../../components/forms/CreateCustomer";

const mushak_91 = ({ query, token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // HELPER VARIABLES
  let date = moment().format("DD MMM YYYY");
  const [mushakDetails, setMushakDetails] = useState({});
  const [supply0, setSupply0] = useState(0.0);
  const [supply0Rat, setSupply0Rat] = useState(0.0);
  const [supply5, setSupply5] = useState(0.0);
  const [supply5Rat, setSupply5Rat] = useState(0.0);
  const [supply75, setSupply75] = useState(0.0);
  const [supply75Rat, setSupply75Rat] = useState(0.0);
  const [supply10, setSupply10] = useState(0.0);
  const [supply10Rat, setSupply10Rat] = useState(0.0);
  const [supply15, setSupply15] = useState(0.0);
  const [supply15Rat, setSupply15Rat] = useState(0.0);
  const [purchase_local0, setPurchase_local0] = useState(0.0);
  const [purchase_local0Rat, setPurchase_local0Rat] = useState(0.0);
  const [purchase_local5, setPurchase_local5] = useState(0.0);
  const [purchase_local5Rat, setPurchase_local5Rat] = useState(0.0);
  const [purchase_local75, setPurchase_local75] = useState(0.0);
  const [purchase_local75Rat, setPurchase_local75Rat] = useState(0.0);
  const [purchase_local10, setPurchase_local10] = useState(0.0);
  const [purchase_local10Rat, setPurchase_local10Rat] = useState(0.0);
  const [purchase_local15, setPurchase_local15] = useState(0.0);
  const [purchase_local15Rat, setPurchase_local15Rat] = useState(0.0);
  const [purchase_local_nonrebateable15, setPurchase_local_nonrebateable15] = useState(0.0);
  const [purchase_imported_nonrebateable15, setPurchase_imported_nonrebateable15] = useState(0.0);
  const [purchase_local_nonrebateable15Rat, setPurchase_local_nonrebateable15Rat] = useState(0.0);
  const [purchase_imported_nonrebateable15Rat, setPurchase_imported_nonrebateable15Rat] = useState(0.0);
  const [purchase_imported0, setPurchase_imported0] = useState(0.0);
  const [purchase_imported0Rat, setPurchase_imported0Rat] = useState(0.0);
  const [purchase_imported5, setPurchase_imported5] = useState(0.0);
  const [purchase_imported5Rat, setPurchase_imported5Rat] = useState(0.0);
  const [purchase_imported75, setPurchase_imported75] = useState(0.0);
  const [purchase_imported75Rat, setPurchase_imported75Rat] = useState(0.0);
  const [purchase_imported10, setPurchase_imported10] = useState(0.0);
  const [purchase_imported10Rat, setPurchase_imported10Rat] = useState(0.0);
  const [purchase_imported15, setPurchase_imported15] = useState(0.0);
  const [purchase_imported15Rat, setPurchase_imported15Rat] = useState(0.0);
  const [paid_vat58, setPaid_vat58] = useState(0.0);
  const [paid_vat58Rat, setPaid_vat58Rat] = useState(0.0);
  const [paid_vat59, setPaid_vat59] = useState(0.0);
  const [paid_vat59Rat, setPaid_vat59Rat] = useState(0.0);
  const [paid_vat60, setPaid_vat60] = useState(0.0);
  const [paid_vat61, setPaid_vat61] = useState(0.0);
  const [paid_vat62, setPaid_vat62] = useState(0.0);
  const [paid_vat63, setPaid_vat63] = useState(0.0);
  const [paid_vat64, setPaid_vat64] = useState(0.0);
  const [vds_increasing_amount_24, setvds_increasing_amount_24] = useState(0.0);
  const [vds_decreasing_amount_29, setvds_decreasing_amount_29] = useState(0.0);
  const [debit_note_amount_26, setdebit_note_amount_26] = useState(0.0);
  const [other_increasing_amount_27, setother_increasing_amount_27] = useState(0.0);
  const [credit_note_amount_31, setcredit_note_amount_31] = useState(0.0);
  const [other_decreasing_amount_32, setother_decreasing_amount_32] = useState(0.0);

  //Currency
  let formatCurrency = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "BDT",
  })

  function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
  // .resolvedOptions().maximumFractionDigits;

  // DATE
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const { RangePicker } = DatePicker;
  const [isCustom, setIsCustom] = useState(false);
  const [isCustomMonth, setIsCustomMonth] = useState(false);

  // BOOLEANS
  const [loader, setLoader] = useState(true);
  const [loaderCustomers, setLoaderCustomers] = useState(false);

  // MODALS
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  // REFERENCES
  const printRef = useRef();
  const multiselectRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // FETCH MUSHAK DETAILS
  useEffect(() => {
    getApi();
  }, []);

  // Date function
  function onChangeStart(date, dateString) {
    setStartDate("");
    setEndDate("");

    let FirstDay = new Date(
      moment(dateString).format("YYYY"),
      moment(dateString).format("MM") - 1,
      1
    );
    
    let LastDay = new Date(
      moment(dateString).format("YYYY"),
      moment(dateString).format("MM"),
      0
    );

    FirstDay = moment(FirstDay).format("YYYY-MM-DD");
    LastDay = moment(LastDay).format("YYYY-MM-DD");

    setStartDate(FirstDay);
    setEndDate(LastDay);
  }

  const handleSearch = (e) => {
    // if (e == 0) {
    //   let currentDate = new Date();
    //   let lastDate = getDateXDaysAgo(90, currentDate);
    //   setStartDate(moment(lastDate).format("YYYY-MM-DD"));
    //   setEndDate(moment(currentDate).format("YYYY-MM-DD"));
    // }
    if (e == 1) {
      setIsCustom(true);
      setIsCustomMonth(false);
    } else if (e == 5) {
      setIsCustom(false);
      setIsCustomMonth(true);
    } else if (e == 2) {
      setIsCustom(false);
      setIsCustomMonth(false);
      let currentDate = new Date();
      let lastDate = getDateXDaysAgo(7, currentDate);
      setStartDate(moment(lastDate).format("YYYY-MM-DD"));
      setEndDate(moment(currentDate).format("YYYY-MM-DD"));
    } else if (e == 3) {
      setIsCustom(false);
      setIsCustomMonth(false);
      let currentDate = new Date();
      let lastDate = getDateXDaysAgo(30, currentDate);
      setStartDate(moment(lastDate).format("YYYY-MM-DD"));
      setEndDate(moment(currentDate).format("YYYY-MM-DD"));
    } else if (e == 4) {
      setIsCustom(false);
      setIsCustomMonth(false);
      let today = new Date();
      let FirstDay = new Date(
        moment(today).format("YYYY"),
        moment(today).format("MM") - 1,
        1
      );
      // let LastDay = new Date(
      //   moment(today).format("YYYY"),
      //   moment(today).format("MM"),
      //   0
      // );
      let LastDay = new Date();
      FirstDay = moment(FirstDay).format("YYYY-MM-DD");
      LastDay = moment(LastDay).format("YYYY-MM-DD");
      setStartDate(FirstDay);
      setEndDate(LastDay);
    } else if (e == 6) {
      setIsCustom(false);
      setIsCustomMonth(false);
      let today = new Date();
      let firstDay = new Date(
        moment(today).subtract(1, "months").startOf("month")
      );
      let lastDay = new Date(
        moment(today).subtract(1, "months").endOf("month")
      );

      firstDay = moment(firstDay).format("YYYY-MM-DD");
      lastDay = moment(lastDay).format("YYYY-MM-DD");
      setStartDate(firstDay);
      setEndDate(lastDay);
    } else {
      setStartDate("");
      setEndDate("");
      setIsCustom(false);
      setIsCustomMonth(false);
    }
  };

  function getDateXDaysAgo(numOfDays, date = new Date()) {
    const daysAgo = new Date(date.getTime());

    daysAgo.setDate(date.getDate() - numOfDays);

    return daysAgo;
  }

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

  // Refresh
  const resetSelectField = () => {
    setStartDate("");
    setEndDate("");
    setLoader(true);
    getApi();
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  // hover functions
  const handleMouseOver = () => {
    setLoaderCustomers(false);
  };

  const handleMouseOut = () => {
    setLoaderCustomers(false);
  };

  const getApi = () => {
    const apiUrlMushak = BASE_URL + "api/v1/mushok/nine-one";

    axios
      .get(apiUrlMushak, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == true) {
          setMushakDetails(res?.data?.data);
          setStartDate(moment(res?.data?.data?.generated_by?.created_at).format("YYYY-MM-DD"));
          setEndDate(moment(new Date()).format("YYYY-MM-DD"));
          // setEndDate(moment(res?.data?.data?.company?.updated_at).format("YYYY-MM-DD"));

          //vds_amount
          setvds_increasing_amount_24(res?.data?.data?.vds_increasing_amount_24);
          setvds_decreasing_amount_29(res?.data?.data?.vds_decreasing_amount_29);
          setdebit_note_amount_26(res?.data?.data?.debit_note_amount_26);
          setother_increasing_amount_27(res?.data?.data?.other_increasing_amount_27);
          setcredit_note_amount_31(res?.data?.data?.credit_note_amount_31);
          setother_decreasing_amount_32(res?.data?.data?.other_decreasing_amount_32);

          //paid_vat
          if (res?.data?.data?.paid_vat?.["58"] == undefined) {
            setPaid_vat58(0.0);
          } else {
            setPaid_vat58(parseFloat(res?.data?.data?.paid_vat?.["58"]));
          }

          if (res?.data?.data?.paid_vat?.["59"] == undefined) {
            setPaid_vat59(0.0);
          } else {
            setPaid_vat59(parseFloat(res?.data?.data?.paid_vat?.["59"]));
          }

          if (res?.data?.data?.paid_vat?.["60"] == undefined) {
            setPaid_vat60(0.0);
          } else {
            setPaid_vat60(parseFloat(res?.data?.data?.paid_vat?.["60"]));
          }

          if (res?.data?.data?.paid_vat?.["61"] == undefined) {
            setPaid_vat61(0.0);
          } else {
            setPaid_vat61(parseFloat(res?.data?.data?.paid_vat?.["61"]));
          }

          if (res?.data?.data?.paid_vat?.["62"] == undefined) {
            setPaid_vat62(0.0);
          } else {
            setPaid_vat62(parseFloat(res?.data?.data?.paid_vat?.["62"]));
          }

          if (res?.data?.data?.paid_vat?.["63"] == undefined) {
            setPaid_vat63(0.0);
          } else {
            setPaid_vat63(parseFloat(res?.data?.data?.paid_vat?.["63"]));
          }

          if (res?.data?.data?.paid_vat?.["64"] == undefined) {
            setPaid_vat64(0.0);
          } else {
            setPaid_vat64(parseFloat(res?.data?.data?.paid_vat?.["64"]));
          }

          if (res?.data?.data?.supplies?.["0.00"] == undefined) {
            setSupply0(0.0);
            setSupply0Rat(0.0);
          } else {
            setSupply0(parseFloat(res?.data?.data?.supplies?.["0.00"]));
            setSupply0Rat(
              (parseFloat(res?.data?.data?.supplies?.["0.00"]) * 0.0) / 100
            );
          }

          if (res?.data?.data?.supplies?.["5.00"] == undefined) {
            setSupply5(0.0);
            setSupply5Rat(0.0);
          } else {
            setSupply5(parseFloat(res?.data?.data?.supplies?.["5.00"]));
            setSupply5Rat(
              (parseFloat(res?.data?.data?.supplies?.["5.00"]) * 5.0) / 100
            );
          }

          if (res.data.data.supplies?.["7.50"] == undefined) {
            setSupply75(0.0);
            setSupply75Rat(0.0);
          } else {
            setSupply75(parseFloat(res.data.data.supplies?.["7.50"]));
            setSupply75Rat(
              (parseFloat(res?.data?.data?.supplies?.["7.50"]) * 7.5) / 100
            );
          }

          if (res?.data?.data?.supplies?.["10.00"] == undefined) {
            setSupply10(0.0);
            setSupply10Rat(0.0);
          } else {
            setSupply10(parseFloat(res?.data?.data?.supplies?.["10.00"]));
            setSupply10Rat(
              (parseFloat(res?.data?.data?.supplies?.["10.00"]) * 10.0) / 100
            );
          }

          if (res?.data?.data?.supplies?.["15.00"] == undefined) {
            setSupply15(0.0);
            setSupply15Rat(0.0);
          } else {
            setSupply15(parseFloat(res?.data?.data?.supplies?.["15.00"]));
            setSupply15Rat(
              (parseFloat(res?.data?.data?.supplies?.["15.00"]) * 15.0) / 100
            );
          }

          ///Purchase_local

          if (res?.data?.data?.purchase_local?.["0.00"] == undefined) {
            setPurchase_local0(0.0);
            setPurchase_local0Rat(0.0);
          } else {
            setPurchase_local0(parseFloat(res?.data?.data?.purchase_local?.["0.00"]));
            setPurchase_local0Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["0.00"]) * 0.0) / 100
            );
          }

          if (res?.data?.data?.purchase_local?.["5.00"] == undefined) {
            setPurchase_local5(0.0);
            setPurchase_local5Rat(0.0);
          } else {
            setPurchase_local5(parseFloat(res?.data?.data?.purchase_local?.["5.00"]));
            setPurchase_local5Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["5.00"]) * 5.0) / 100
            );
          }

          if (res.data.data.purchase_local?.["7.50"] == undefined) {
            setPurchase_local75(0.0);
            setPurchase_local75Rat(0.0);
          } else {
            setPurchase_local75(parseFloat(res.data.data.purchase_local?.["7.50"]));
            setPurchase_local75Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["7.50"]) * 7.5) / 100
            );
          }

          if (res?.data?.data?.purchase_local?.["10.00"] == undefined) {
            setPurchase_local10(0.0);
            setPurchase_local10Rat(0.0);
          } else {
            setPurchase_local10(parseFloat(res?.data?.data?.purchase_local?.["10.00"]));
            setPurchase_local10Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["10.00"]) * 10.0) / 100
            );
          }

          if (res?.data?.data?.purchase_local?.["15.00"] == undefined) {
            setPurchase_local15(0.0);
            setPurchase_local15Rat(0.0);
          } else {
            setPurchase_local15(parseFloat(res?.data?.data?.purchase_local?.["15.00"]));
            setPurchase_local15Rat(
              (parseFloat(res?.data?.data?.purchase_local_vat_amount?.["15.00"]))
            );
          }

          if (res?.data?.data?.purchase_local_nonrebateable == null) {
            setPurchase_local_nonrebateable15(0.0);
            setPurchase_local_nonrebateable15Rat(0.0);
          } else {
            setPurchase_local_nonrebateable15(parseFloat(res?.data?.data?.purchase_local_nonrebateable));
            setPurchase_local_nonrebateable15Rat(
              (parseFloat(res?.data?.data?.purchase_local_nonrebateable) * 15.0) / 100
            );
          }

          // purchase_imported

          if (res?.data?.data?.purchase_imported_nonrebateable == null) {
            setPurchase_imported_nonrebateable15(0.0);
            setPurchase_imported_nonrebateable15Rat(0.0);
          } else {
            setPurchase_imported_nonrebateable15(parseFloat(res?.data?.data?.purchase_imported_nonrebateable));
            setPurchase_imported_nonrebateable15Rat(
              (parseFloat(res?.data?.data?.purchase_imported_nonrebateable) * 15.0) / 100
            );
          }

          if (res?.data?.data?.purchase_imported?.["0.00"] == undefined) {
            setPurchase_imported0(0.0);
            setPurchase_imported0Rat(0.0);
          } else {
            setPurchase_imported0(parseFloat(res?.data?.data?.purchase_imported?.["0.00"]));
            setPurchase_imported0Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["0.00"]) * 0.0) / 100
            );
          }

          if (res?.data?.data?.purchase_imported?.["5.00"] == undefined) {
            setPurchase_imported5(0.0);
            setPurchase_imported5Rat(0.0);
          } else {
            setPurchase_imported5(parseFloat(res?.data?.data?.purchase_imported?.["5.00"]));
            setPurchase_imported5Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["5.00"]) * 5.0) / 100
            );
          }

          if (res.data.data.purchase_imported?.["7.50"] == undefined) {
            setPurchase_imported75(0.0);
            setPurchase_imported75Rat(0.0);
          } else {
            setPurchase_imported75(parseFloat(res.data.data.purchase_imported?.["7.50"]));
            setPurchase_imported75Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["7.50"]) * 7.5) / 100
            );
          }

          if (res?.data?.data?.purchase_imported?.["10.00"] == undefined) {
            setPurchase_imported10(0.0);
            setPurchase_imported10Rat(0.0);
          } else {
            setPurchase_imported10(parseFloat(res?.data?.data?.purchase_imported?.["10.00"]));
            setPurchase_imported10Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["10.00"]) * 10.0) / 100
            );
          }

          if (res?.data?.data?.purchase_imported?.["15.00"] == undefined) {
            setPurchase_imported15(0.0);
            setPurchase_imported15Rat(0.0);
          } else {
            setPurchase_imported15(parseFloat(res?.data?.data?.purchase_imported?.["15.00"]));
            setPurchase_imported15Rat(
              (parseFloat(res?.data?.data?.purchase_imported_vat_amount?.["15.00"])));
          }
          setLoader(false);
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const suppliedVat = () => {
    return supply0Rat + supply5Rat + supply75Rat + supply10Rat + supply15Rat;
  }

  const purchasedVat = () => {
    return purchase_local0Rat +
    purchase_local5Rat +
    purchase_local75Rat +
    purchase_local10Rat +
    purchase_local15Rat + 
    purchase_imported0Rat +
    purchase_imported5Rat +
    purchase_imported75Rat +
    purchase_imported10Rat +
    purchase_imported15Rat;
  }

  const increasingAdjustmentTotal = () => {
    return vds_increasing_amount_24 + debit_note_amount_26 + other_increasing_amount_27;
  }

  const decreasingAdjustmentTotal = () => {
    return vds_decreasing_amount_29 + credit_note_amount_31 + other_decreasing_amount_32;
  }

  const supplySD_9b = () => {
    return 0.00;
  }

  const netPayable_34 = () => {
    return suppliedVat() -  (purchasedVat() + (increasingAdjustmentTotal() - decreasingAdjustmentTotal()));
  }

  const netPayable_35 = () => {
    return netPayable_34() -  (closingBalance_52() + remainingClossingBalane_56());
  }

  const netPayableSD_36 = () => {
    return supplySD_9b() + sdForDebit_38() - ( sdForCredit_39() + sdAmountOfExport_40());
  }

  const netPayableAfterAdjustment_37 = () => {
    return netPayableSD_36() - (closingBalanceOfSD_53() + decreasingAdjustment_57());
  }

  const sdForDebit_38 = () => {
    return 0.00;
  }

  const sdForCredit_39 = () => {
    return 0.00;
  }

  const sdAmountOfExport_40 = () => {
    return 0.00;
  }

  const interestOfVat_41 = () => {
    return 0.00;
  }

  const interestOfSD_42 = () => {
    return 0.00;
  }

  const fineNotSubmit_43 = () => {
    return 0.00;
  }

  const otherfine_44 = () => {
    return 0.00;
  }

  const netPayableTreasuryDeposit_50 = () => {
    return netPayable_35() + interestOfVat_41() + fineNotSubmit_43() + otherfine_44();
  }

  const netPayableSDTreasuryDeposit_51 = () => {
    return netPayableAfterAdjustment_37() + interestOfSD_42();
  }

  const closingBalance_52 = () => {
    return 0.00;
  }

  const closingBalanceOfSD_53 = () => {
    return 0.00;
  }

  const adjustmentOfClossingBalane_54 = () => {
    return 0.00;
  }

  const remainingOldSD_55 = () => {
    return 0.00;
  }

  const remainingClossingBalane_56 = () => {
    return 0.00;
  }

  const decreasingAdjustment_57 = () => {
    return 0.00;
  }

  const vatDeposit_58 = () => {
    return paid_vat58;
  }

  const SDDeposit_59 = () => {
    return paid_vat59;
  }

  const clossingBalanceVat_65 = () => {
    return vatDeposit_58() - (netPayableTreasuryDeposit_50() + requestAmountForRefundVat_67());
  }

  const clossingBalanceSD_66 = () => {
    return SDDeposit_59() - (netPayableSDTreasuryDeposit_51() + requestAmountForRefundSD_68());
  }

  const requestAmountForRefundVat_67 = () => {
    return 0.00;
  }

  const requestAmountForRefundSD_68 = () => {
    return 0.00;
  }

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current > dayjs().endOf("day");
  };

  const getMushak = () => {
    const apiMushak =
      BASE_URL +
      "api/v1/mushok/nine-one?" +
      "start_date=" +
      start_date +
      "&end_date=" +
      end_date;
    axios
      .get(apiMushak, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setMushakDetails(res?.data?.data);

          if (res?.data?.data?.supplies?.["0.00"] == undefined) {
            setSupply0(0.0);
            setSupply0Rat(0.0);
          } else {
            setSupply0(parseFloat(res?.data?.data?.supplies?.["0.00"]));
            setSupply0Rat(
              (parseFloat(res?.data?.data?.supplies?.["0.00"]) * 0.0) / 100
            );
          }

          if (res?.data?.data?.supplies?.["5.00"] == undefined) {
            setSupply5(0.0);
            setSupply5Rat(0.0);
          } else {
            setSupply5(parseFloat(res?.data?.data?.supplies?.["5.00"]));
            setSupply5Rat(
              (parseFloat(res?.data?.data?.supplies?.["5.00"]) * 5.0) / 100
            );
          }

          if (res.data.data.supplies?.["7.50"] == undefined) {
            setSupply75(0.0);
            setSupply75Rat(0.0);
          } else {
            setSupply75(parseFloat(res.data.data.supplies?.["7.50"]));
            setSupply75Rat(
              (parseFloat(res?.data?.data?.supplies?.["7.50"]) * 7.5) / 100
            );
          }

          if (res?.data?.data?.supplies?.["10.00"] == undefined) {
            setSupply10(0.0);
            setSupply10Rat(0.0);
          } else {
            setSupply10(parseFloat(res?.data?.data?.supplies?.["10.00"]));
            setSupply10Rat(
              (parseFloat(res?.data?.data?.supplies?.["10.00"]) * 10.0) / 100
            );
          }

          if (res?.data?.data?.supplies?.["15.00"] == undefined) {
            setSupply15(0.0);
            setSupply15Rat(0.0);
          } else {
            setSupply15(parseFloat(res?.data?.data?.supplies?.["15.00"]));
            setSupply15Rat(
              (parseFloat(res?.data?.data?.supplies?.["15.00"]) * 15.0) / 100
            );
          }

          // Purchase_local

          if (res?.data?.data?.purchase_local?.["0.00"] == undefined) {
            setPurchase_local0(0.0);
            setPurchase_local0Rat(0.0);
          } else {
            setPurchase_local0(parseFloat(res?.data?.data?.purchase_local?.["0.00"]));
            setPurchase_local0Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["0.00"]) * 0.0) / 100
            );
          }

          if (res?.data?.data?.purchase_local?.["5.00"] == undefined) {
            setPurchase_local5(0.0);
            setPurchase_local5Rat(0.0);
          } else {
            setPurchase_local5(parseFloat(res?.data?.data?.purchase_local?.["5.00"]));
            setPurchase_local5Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["5.00"]) * 5.0) / 100
            );
          }

          if (res.data.data.purchase_local?.["7.50"] == undefined) {
            setPurchase_local75(0.0);
            setPurchase_local75Rat(0.0);
          } else {
            setPurchase_local75(parseFloat(res.data.data.purchase_local?.["7.50"]));
            setPurchase_local75Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["7.50"]) * 7.5) / 100
            );
          }

          if (res?.data?.data?.purchase_local?.["10.00"] == undefined) {
            setPurchase_local10(0.0);
            setPurchase_local10Rat(0.0);
          } else {
            setPurchase_local10(parseFloat(res?.data?.data?.purchase_local?.["10.00"]));
            setPurchase_local10Rat(
              (parseFloat(res?.data?.data?.purchase_local?.["10.00"]) * 10.0) / 100
            );
          }

          if (res?.data?.data?.purchase_local?.["15.00"] == undefined) {
            setPurchase_local15(0.0);
            setPurchase_local15Rat(0.0);
          } else {
            setPurchase_local15(parseFloat(res?.data?.data?.purchase_local?.["15.00"]));
            setPurchase_local15Rat(
              (parseFloat(res?.data?.data?.purchase_local_vat_amount?.["15.00"])) 
            );
          }

          if (res?.data?.data?.purchase_local_nonrebateable == null) {
            setPurchase_local_nonrebateable15(0.0);
            setPurchase_local_nonrebateable15Rat(0.0);
          } else {
            setPurchase_local_nonrebateable15(parseFloat(res?.data?.data?.purchase_local_nonrebateable));
            setPurchase_local_nonrebateable15Rat(
              (parseFloat(res?.data?.data?.purchase_local_nonrebateable) * 15.0) / 100
            );
          }

          // purchase_imported

          if (res?.data?.data?.purchase_imported?.["0.00"] == undefined) {
            setPurchase_imported0(0.0);
            setPurchase_imported0Rat(0.0);
          } else {
            setPurchase_imported0(parseFloat(res?.data?.data?.purchase_imported?.["0.00"]));
            setPurchase_imported0Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["0.00"]) * 0.0) / 100
            );
          }

          if (res?.data?.data?.purchase_imported?.["5.00"] == undefined) {
            setPurchase_imported5(0.0);
            setPurchase_imported5Rat(0.0);
          } else {
            setPurchase_imported5(parseFloat(res?.data?.data?.purchase_imported?.["5.00"]));
            setPurchase_imported5Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["5.00"]) * 5.0) / 100
            );
          }

          if (res.data.data.purchase_imported?.["7.50"] == undefined) {
            setPurchase_imported75(0.0);
            setPurchase_imported75Rat(0.0);
          } else {
            setPurchase_imported75(parseFloat(res.data.data.purchase_imported?.["7.50"]));
            setPurchase_imported75Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["7.50"]) * 7.5) / 100
            );
          }

          if (res?.data?.data?.purchase_imported?.["10.00"] == undefined) {
            setPurchase_imported10(0.0);
            setPurchase_imported10Rat(0.0);
          } else {
            setPurchase_imported10(parseFloat(res?.data?.data?.purchase_imported?.["10.00"]));
            setPurchase_imported10Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["10.00"]) * 10.0) / 100
            );
          }

          if (res?.data?.data?.purchase_imported?.["15.00"] == undefined) {
            setPurchase_imported15(0.0);
            setPurchase_imported15Rat(0.0);
          } else {
            setPurchase_imported15(parseFloat(res?.data?.data?.purchase_imported?.["15.00"]));
            setPurchase_imported15Rat(
              (parseFloat(res?.data?.data?.purchase_imported?.["15.00"]) * 15.0) / 100
            );
          }

          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log("vds_increasing_amount");
  // console.log(vds_increasing_amount);
  // console.log(start_date, end_date); //moment(date).format("YYYY")
  // console.log('moment(mushakDetails?.company?.created_at).format("YYYY-MM-DD")');
  // console.log(moment(mushakDetails?.company?.created_at).format("YYYY-MM-DD"));
  // console.log(moment(mushakDetails?.company?.updated_at).format("YYYY-MM-DD"));


  console.log(purchase_local15Rat);
  return (
    <>
      {loader ? (
        <CircularProgress />
      ) : (
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
          <div className="row">
            <Typography
              variant="h2"
              className="mb-2"
              color={colors.greenAccent[300]}
            >
              Mushak 9.1
            </Typography>
            </div>
              <div className="row">
                <div className="col-md-6 mt-2">
                  {isCustom && (
                    <div className="row">
                      <h6 className="text-secondary">Search by Custom-Date</h6>
                      <div className="input-group">
                        <RangePicker
                          onChange={onChange}
                          size="large"
                          style={{ width: "100%" }}
                          className="shadow-input"
                          disabledDate={disabledDate}
                        />
                      </div>
                    </div>
                  )}
                  {isCustomMonth && (
                    <div className="row">
                      <h6 className="text-secondary">Search by Specific Month</h6>
                      <div className="input-group">
                        <DatePicker
                          onChange={onChangeStart}
                          size="large"
                          picker="month"
                          style={{ width: "100%" }}
                          className="shadow-input"
                          disabledDate={disabledDate}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-5 mt-2">
                  <div className="row">
                    <h6 className="text-secondary">Search by Date</h6>
                  </div>
                  <TextField
                    onChange={(e) => handleSearch(+e.target.value)}
                    select
                    size="small"
                    fullWidth
                    className="shadow-input"
                    defaultValue={0}
                  >
                    <MenuItem value={0}>ALL</MenuItem>
                    <MenuItem value={1}>Custom Range</MenuItem>
                    <MenuItem value={2}>Last Seven Days</MenuItem>
                    <MenuItem value={3}>Last Thirty Days</MenuItem>
                    <MenuItem value={4}>Current Month</MenuItem>
                    <MenuItem value={5}>Specific Month</MenuItem>
                    <MenuItem value={6}>Last Month</MenuItem>
                  </TextField>
                </div>

                <div className="col-md-1 mt-2">
                  <div className="row">
                    <h6 className="text-secondary">Search</h6>
                    <div className="input-group ">
                      <Button
                        style={{ width: "100%", height: "42px" }}
                        size="large"
                        color="secondary"
                        variant="contained"
                        onClick={searchSelectField}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        className=""
                      >
                        <Search />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* <div className="col-md-1">
                  <div className="row">
                    <h6 className="text-secondary">Reset</h6>
                    <div className="input-group">
                      <Button
                        style={{ width: "100%" }}
                        size="large"
                        color="secondary"
                        variant="contained"
                        onClick={resetSelectField}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        <RotateLeftIcon />
                      </Button>
                    </div>
                  </div>
                </div> */}
              </div>

              <div
                className="mt-5"
                style={{
                  background: "rgb(230, 228, 228)",
                  marginLeft: "-20px",
                  marginRight: "-20px",
                }}
              >
                <br />
              </div>
              <div className="mt-3">
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

              <div ref={printRef} className="p-5">
                {/* HEADERS */}
                {loaderCustomers ? (
                  <div className="text-center">
                    <CircularProgress />
                  </div>
                ) : (
                  <>
                    <div>
                      <br/>
                      <br/>
                    
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
                              GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH
                            </small>
                          </div>
                          <div className="row">
                            <small style={{ color: "dodgerblue" }}>
                              NATIONAL BOARD OF REVENUE
                            </small>
                          </div>
                          <div className="row">
                            <small style={{ color: "darkviolet" }}>
                              VALUE ADDED TAX RETURN FORM
                            </small>
                          </div>
                          <div className="row">
                            <small style={{ color: "dodgerblue" }}>
                              [See rule 47(1)]
                            </small>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <h6 style={{ color: "darkviolet" }}>MUSHAK 9.1</h6>
                        </div>
                      </div>
                    </div>

                    {/* MUSHAK 9.1 TABLE-1 */}
                    <div className="table-responsive mt-3">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={4} className="pb-0 pt-0">
                              PART-1: TAXPAYER'S INFORMATION
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              1
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              BIN
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              {mushakDetails?.company?.company_bin}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              2
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Name of Taxpayer
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              {mushakDetails?.company?.name}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              3
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Address of Taxpayer
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              {mushakDetails?.company?.contact_address}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              3
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Type of Ownership
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Private Limited
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              3
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Economic Activity
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Retail/Wholesale Trading, Imports.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* MUSHAK 9.1 TABLE-2 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={5} className="pb-0 pt-0">
                              PART-2: RETURN SUBMISSION DATA
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              1
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Tax Preiod
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                              colSpan={2}
                            >
                              Start Date: {moment(start_date).format("MMMM-YYYY")} AND End Date: {moment(end_date).format("MMMM-YYYY")};
                              {/* Month : {moment(date).format("MMMM")}
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Year:{" "}
                              {moment(date).format("YYYY")} */}
                            </td>
                          </tr>
                          <tr className="text-left pb-0 pt-0">
                            <td
                              className="text-center pb-0 pt-4"
                              style={{ width: "5%" }}
                              rowSpan={4}
                            >
                              2
                            </td>
                            <td
                              className="text-left pb-0 pt-4"
                              style={{ width: "45%" }}
                              rowSpan={4}
                            >
                              Type of Return [Please select your desired option]
                            </td>
                            <td
                              className="text-center pb-0 pt-4"
                              style={{ width: "5%" }}
                              rowSpan={4}
                            >
                              :
                            </td>
                            <td className="text-left pb-0 pt-0" style={{ width: "5%" }}>
                              <tr className="text-left pb-0 pt-0">
                                <td
                                  className="text-center pb-0 pt-1"
                                  style={{ width: "2%" }}
                                >
                                  <input type="checkbox" />
                                </td>
                              </tr>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "43%" }}
                            >
                              (A) Main/Orginal Return (PART 64)
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">
                              <td
                                className="text-center pb-0 pt-1"
                                style={{ width: "2%" }}
                              >
                                <input type="checkbox" />
                              </td>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "43%" }}
                            >
                              (B) Late Return (PART 65)
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">
                              <td
                                className="text-center pb-0 pt-1"
                                style={{ width: "2%" }}
                              >
                                <input type="checkbox" />
                              </td>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "43%" }}
                            >
                              (C)Amend Return (PART 66)
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">
                              <td
                                className="text-center pb-0 pt-1"
                                style={{ width: "2%" }}
                              >
                                <input type="checkbox" />
                              </td>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "43%" }}
                            >
                              (D) Full or Additional or Alternative Return (PART 67)
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center pb-0 pt-3"
                              style={{ width: "5%" }}
                            >
                              2.a
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Economic Activity is Trader or approved wholsealer and
                              want to pay VAT at the rate of 5% or 1.5% [If ''No" is
                              selected please fill up the full Mushak-9.1 form]
                            </td>
                            <td
                              className="text-center pb-0 pt-3"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-3"
                              style={{ width: "45%" }}
                              colSpan={2}
                            >
                              <tr>
                                <td className="text-left pb-0 pt-0 pe-5">
                                  <input type="checkbox" />
                                  &nbsp; YES
                                </td>
                                <td className="text-left pb-0 pt-0">
                                  <input type="checkbox" />
                                  &nbsp; NO
                                </td>
                              </tr>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center pb-0 pt-1"
                              style={{ width: "5%" }}
                            >
                              3
                            </td>
                            <td
                              className="text-left pb-0 pt-1"
                              style={{ width: "45%" }}
                            >
                              Any activites in this Tax Preiod?
                            </td>
                            <td
                              className="text-center pb-0 pt-1"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                              colSpan={2}
                            >
                              <tr>
                                <td className="text-left pb-0 pt-1 pe-5">
                                  <input type="checkbox" />
                                  &nbsp; YES
                                </td>
                                <td className="text-left pb-0 pt-1 pe-5">
                                  <input type="checkbox" />
                                  &nbsp; NO{" "}
                                </td>
                                <span >
                                  <input
                                    name="tax_period"
                                    size="small"
                                    type="text"
                                    fullWidth
                                    placeholder="input Tax Preiod Reason..."
                                  />
                                </span>
                              </tr>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              4
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Date of Submission
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              :
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                              colSpan={2}
                            >
                              {moment(date).format("DD-MM-YYYY")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* MUSHAK 9.1 TABLE-3 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={7} className="pb-0 pt-0">
                              PART-3: SUPPLY OUTPUT TAX
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              colSpan={2}
                              style={{ width: "35%" }}
                            >
                              Nature of Supply
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              Value (a)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              SD (b)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              VAT (c)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              Sub-Form
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-2"
                              rowSpan={2}
                              style={{ width: "20%" }}
                            >
                              Zero Rated Goods/Service
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              Direct Export
                            </td>
                            <td className="text-center pb-0 pt-0">1</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm4",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        seles_vat1: 0,
                                        form: "Sub-Form-1",
                                        note: "Note-1" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-1
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">Deemed Export</td>
                            <td className="text-center pb-0 pt-0">2</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm4",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        seles_vat2: 0,
                                        form: "Sub-Form-2",
                                        note: "Note-2" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-2
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              Exempted Goods/Service
                            </td>
                            <td className="text-center pb-0 pt-0">3</td>
                            <td className="text-end pb-0 pt-0">{supply0.toFixed(2)}</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">
                              {supply0Rat.toFixed(2)}
                            </td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm4",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        seles_vat: 0,
                                        form: "Sub-Form-3",
                                        note: "Note-3" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-3
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              Standard Rated Goods/Service
                            </td>
                            <td className="text-center pb-0 pt-0">4</td>
                            <td className="text-end pb-0 pt-0">
                              {supply15.toFixed(2)}
                            </td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">
                              {supply15Rat.toFixed(2)}
                            </td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm4",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        seles_vat4: 15,
                                        form: "Sub-Form-4",
                                        note: "Note-4" 
                                      }
                                    }}
                                    target="_blank"
                                // legacyBehavior
                              >Note-4
                                {/* <a target="_blank">Note-14</a> */}
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              Goods Based on MRP
                            </td>
                            <td className="text-center pb-0 pt-0">5</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm4",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        seles_vat5: 0,
                                        form: "Sub-Form-5",
                                        note: "Note-5" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-5
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              Goods/Service Based on Specific VAT
                            </td>
                            <td className="text-center pb-0 pt-0">6</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm4",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        seles_vat6: 0,
                                        form: "Sub-Form-6",
                                        note: "Note-6" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-6
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              Goods/Service Other than Standard Rate
                            </td>
                            <td className="text-center pb-0 pt-0">7</td>
                            <td className="text-end pb-0 pt-0">
                              {(supply10 + supply75).toFixed(2)}
                              {/* {(supply10 + supply75 + supply5).toFixed(2)} */}
                            </td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">
                              {(supply10Rat + supply75Rat).toFixed(2)}
                              {/* {(supply10Rat + supply75Rat + supply5Rat).toFixed(2)} */}
                            </td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm4",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    // seles_vat1: 5,
                                    seles_vat2: 7.5,
                                    seles_vat3: 10,
                                    form: "Sub-Form-7",
                                    note: "Note-7"
                                  }
                                }}
                                target="_blank"
                              >Note-7
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              Retail/Wholesale/Trade Based Supply
                            </td>
                            <td className="text-center pb-0 pt-0">8</td>
                            <td className="text-end pb-0 pt-0">{(supply5).toFixed(2)}</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">{(supply5Rat).toFixed(2)}</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm4",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        // seles_vat8: 5,
                                        seles_vat1: 5,
                                        form: "Sub-Form-8",
                                        note: "Note-8" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-8
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              <strong>Total Sales Value & Total Payable Taxes</strong>
                            </td>
                            <td className="text-center pb-0 pt-0">9</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lightpink" }}
                            >
                              <strong>
                                {formatMoney(
                                  supply0 +
                                  supply5 +
                                  supply75 +
                                  supply10 +
                                  supply15
                                )}
                                {/* formatCurrency.format(sum()) */}
                              </strong>
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lightpink" }}
                            >
                              <strong>
                                {formatMoney(supplySD_9b())}
                              </strong>
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lightpink" }}
                            >
                              <strong>
                                {formatMoney(
                                  suppliedVat()
                                )}
                              </strong>
                            </td>
                            <td className="text-center pb-0 pt-0">
                              {/* <Link href={{
                                  pathname: "/mushak/subForms/SubForm4",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    seles_vat: 0,
                                    seles_vat1: 5,
                                    seles_vat2: 7.5,
                                    seles_vat3: 10,
                                    seles_vat4: 15,
                                    form: "Sub-Form-Total",
                                    note: "Note-9"
                                  }
                                }}
                                target="_blank"
                              >Note-9
                              </Link> */}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    
                    
                    

                    <div className="text-left pb-0 pt-0">
                      <small>
                        (1) If all the products/services you supply are standard
                        rated.fill up note 10-20.
                        <br />
                        (2) All the products/services you supply are not standard rated
                        or input tax credit not taken within stipulated time period
                        under PART 46,fill up note 21-22.
                        <br />
                        (3) If the products/services you supply consist of both standard
                        rated and non-standard rated,then fill up note 10-20 for the raw
                        materials that ware used to produce/supply standard rated
                        goods/services and fill up note 21-22 for the raw materials that
                        ware used to produce/supply non-standard rated goods/services
                        and show the value proportionately in note 10-22 as applicable.
                      </small>
                    </div>
                    <br />
                    <br />

                    {/* MUSHAK 9.1 TABLE-4 */}
                    <div className="table-responsive mt-1">
                    
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={6} className="pb-0 pt-0">
                              PART-4: SUPPLY INPUT TAX
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              colSpan={2}
                              style={{ width: "55%" }}
                            >
                              Nature of Purchase
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              Value (a)
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              VAT (b)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              Sub-Form
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              rowSpan={2}
                              style={{ width: "35%" }}
                            >
                              Zero Rated Goods/Service
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              Local Purchase
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              10
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "15%" }}>
                              {purchase_local0.toFixed(2)}
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "15%" }}>
                              {purchase_local0Rat.toFixed(2)}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm14",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        purchase_vat_n_10: 0,
                                        form: "Sub-Form-10",
                                        note: "Note-10"
                                        
                                      }
                                    }}
                                    target="_blank"
                              >Note-10
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">Import</td>
                            <td className="text-center pb-0 pt-0">11</td>
                            <td className="text-end pb-0 pt-0">{purchase_imported0.toFixed(2)}</td>
                            <td className="text-end pb-0 pt-0">{purchase_imported0Rat.toFixed(2)}</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm14",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        purchaseImported_vat12: 0,
                                        form: "Sub-Form-11",
                                        note: "Note-11"
                                        
                                      }
                                    }}
                                    target="_blank"
                              >Note-11
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" rowSpan={2}>
                              Exempted Goods/Service
                            </td>
                            <td className="text-left pb-0 pt-0">Local Purchase</td>
                            <td className="text-center pb-0 pt-0">12</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm14",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        purchase_vat12: 0,
                                        form: "Sub-Form-12",
                                        note: "Note-12"
                                        
                                      }
                                    }}
                                    target="_blank"
                              >Note-12
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">Import</td>
                            <td className="text-center pb-0 pt-0">13</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm14",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        purchaseImported_vat13: 0,
                                        form: "Sub-Form-13",
                                        note: "Note-13"
                                        
                                      }
                                    }}
                                    target="_blank"
                              >Note-13
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" rowSpan={2}>
                              Standard Rated Goods/Service
                            </td>
                            <td className="text-left pb-0 pt-0">Local Purchase</td>
                            <td className="text-center pb-0 pt-0">14</td>
                            <td className="text-end pb-0 pt-0">
                              {purchase_local15.toFixed(2)}
                            </td>
                            <td className="text-end pb-0 pt-0">
                              {purchase_local15Rat.toFixed(2)}
                            </td>
                            <td className="text-center pb-0 pt-0">
                              {/* <Link href={"/mushak/subForms/MushakModal4Form"} start_date={start_date} end_date={end_date}> */}
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm14",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        purchase_vat_n_14: 14,
                                        form: "Sub-Form-14",
                                        note: "Note-14"
                                      }
                                    }}
                                    target="_blank"
                                // legacyBehavior
                              >Note-14
                                {/* <a target="_blank">Note-14</a> */}
                              </Link>
                                {/* <button onClick={() => {
                                  setShowCustomerModal(true);
                                  }} >
                                  Note-14
                                </button> */}
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">Import</td>
                            <td className="text-center pb-0 pt-0">15</td>
                            <td className="text-end pb-0 pt-0">{purchase_imported15.toFixed(2)}</td>
                            <td className="text-end pb-0 pt-0">{purchase_imported15Rat.toFixed(2)}</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchaseImported_vat_n_15: 15,
                                    form: "Sub-Form-15",
                                    note: "Note-15"
                                  }
                                }}
                                target="_blank"
                              >Note-15
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" rowSpan={2}>
                              Goods/Service Other than Standard Rate
                            </td>
                            <td className="text-left pb-0 pt-0">Local Purchase</td>
                            <td className="text-center pb-0 pt-0">16</td>
                            <td className="text-end pb-0 pt-0">
                              {(purchase_local10 + purchase_local75 + purchase_local5).toFixed(2)}
                            </td>
                            <td className="text-end pb-0 pt-0">
                              {(purchase_local10Rat + purchase_local75Rat + purchase_local5Rat).toFixed(2)}
                            </td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchase_vat1: 5,
                                    purchase_vat2: 7.5,
                                    purchase_vat3: 10,
                                    form: "Sub-Form-16",
                                    note: "Note-16"
                                  }
                                }}
                                target="_blank"
                              >Note-16
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">Import</td>
                            <td className="text-center pb-0 pt-0">17</td>
                            <td className="text-end pb-0 pt-0">{(purchase_imported10 + purchase_imported75 + purchase_imported5).toFixed(2)}</td>
                            <td className="text-end pb-0 pt-0">{(purchase_imported10Rat + purchase_imported75Rat + purchase_imported5Rat).toFixed(2)}</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchaseImported_vat1: 5,
                                    purchaseImported_vat2: 7.5,
                                    purchaseImported_vat3: 10,
                                    form: "Sub-Form-17",
                                    note: "Note-17"
                                  }
                                }}
                                target="_blank"
                              >Note-17
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">
                              Goods/Service Based on Specific VAT
                            </td>
                            <td className="text-left pb-0 pt-0">Local Purchase</td>
                            <td className="text-center pb-0 pt-0">18</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchase_vat18: 0,
                                    form: "Sub-Form-18",
                                    note: "Note-18"
                                  }
                                }}
                                target="_blank"
                              >Note-18
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" rowSpan={2}>
                              Goods/Service Not Admissible for Credit (Local Purchase)
                            </td>
                            <td className="text-left pb-0 pt-0">
                              From Turnover Tax Units
                            </td>
                            <td className="text-center pb-0 pt-0">19</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lavender" }}
                            >0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchase_vat19: 0,
                                    form: "Sub-Form-19",
                                    note: "Note-19"
                                  }
                                }}
                                target="_blank"
                              >Note-19
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">
                              From Unregistered Entities
                            </td>
                            <td className="text-center pb-0 pt-0">20</td>
                            <td className="text-end pb-0 pt-0">0.00</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lavender" }}
                            >0.00</td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchase_vat20: 0,
                                    form: "Sub-Form-20",
                                    note: "Note-20"
                                  }
                                }}
                                target="_blank"
                              >Note-20
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0" rowSpan={2}>
                              Goods/Service Not Admissible for Credit (Taxpayers who
                              sell only Exempted/ Specific VAT and Goods/Service Other
                              than Standard Rate/Credits not taken within stipulated
                              time)
                            </td>
                            <td className="text-left pb-0 pt-0">Local Purchase</td>
                            <td className="text-center pb-0 pt-0">21</td>
                            <td className="text-end pb-0 pt-0">{purchase_local_nonrebateable15?.toFixed(2)}</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lavender" }}
                            >
                              0.00
                            </td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchase_vat21: 0,
                                    form: "Sub-Form-21",
                                    note: "Note-21"
                                  }
                                }}
                                target="_blank"
                              >Note-21
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-left pb-0 pt-0">Import</td>
                            <td className="text-center pb-0 pt-0">22</td>
                            <td className="text-end pb-0 pt-0">{purchase_imported_nonrebateable15?.toFixed(2)}</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lavender" }}
                            >
                              0.00
                            </td>
                            <td className="text-center pb-0 pt-0">
                              <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchaseImported_vat22: 0,
                                    form: "Sub-Form-22",
                                    note: "Note-22"
                                  }
                                }}
                                target="_blank"
                              >Note-22
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className="text-left pb-0 pt-0" colSpan={2}>
                              <strong>Total Input Tax Credit</strong>
                            </td>
                            <td className="text-center pb-0 pt-0">23</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lightpink" }}
                            >
                              <strong>
                                {formatMoney(
                                  purchase_local0 +
                                  purchase_local5 +
                                  purchase_local75 +
                                  purchase_local10 +
                                  purchase_local15 +
                                  purchase_local_nonrebateable15 +
                                  purchase_imported_nonrebateable15 +
                                  purchase_imported0 +
                                  purchase_imported5 +
                                  purchase_imported75 +
                                  purchase_imported10 +
                                  purchase_imported15
                                )}
                              </strong>
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ background: "lightpink" }}
                            >
                              <strong>
                                {formatMoney(
                                  purchasedVat()
                                )}
                              </strong>
                            </td>
                            <td className="text-center pb-0 pt-0">
                              {/* <Link href={{
                                  pathname: "/mushak/subForms/SubForm14",
                                  query: {
                                    start_date: start_date,
                                    end_date: end_date,
                                    purchase_vat: 0,
                                    purchase_vat1: 5,
                                    purchase_vat2: 7.5,
                                    purchase_vat3: 10,
                                    purchase_vat4: 15,
                                    purchaseImported_vat4: 15,
                                    form: "Sub-Form-Total",
                                    note: "Note-23"
                                  }
                                }}
                                target="_blank"
                              >Note-23
                              </Link> */}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                   

                    {/* MUSHAK 9.1 TABLE-5 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={4} className="pb-0 pt-0">
                              PART-5: INCREASING ADJUSTMENTS (VAT)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Adjustments Details
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "25%" }}
                            >
                              VAT Amount
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              Sub-Form
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              VAT Deducted at Source from Suppliers
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              24
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "25%" }}>
                              {vds_increasing_amount_24?.toFixed(2)}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        vds_increasing_amount_24: 24,
                                        supplier: "Supplier's",
                                        form: "Sub-Form-24",
                                        note: "Note-24" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-24
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Payment Not Made Through Banking Channel
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              25
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "25%" }}
                            >0.00</td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        adjustment_vat25: 25,
                                        supplier: "Supplier's",
                                        form: "Sub-Form-25",
                                        note: "Note-25" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-25
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Issuance of Debit Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              26
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "25%" }}>
                              {debit_note_amount_26?.toFixed(2)}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        debit_note_amount_26: 26,
                                        debit: "Debit",
                                        increasing: "Increasing",
                                        form: "Sub-Form-26",
                                        note: "Note-26" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-26
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Any Other Adjustments (please specify below)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              27
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "25%" }}>
                              {other_increasing_amount_27.toFixed(2)}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        other_increasing_amount_27: 27,
                                        supplier: "Supplier's",
                                        form: "Sub-Form-27",
                                        note: "Note-27" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-27
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              <strong>Total Increasing Adjustment</strong>
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              28
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "25%", background: "lightpink" }}
                            >
                              <strong>{formatMoney(increasingAdjustmentTotal())}</strong>
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              {/* <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        vds_increasing_amount_24: 24,
                                        debit_note_amount_26: 26,
                                        other_increasing_amount_27: 27,
                                        supplier: "Supplier's",
                                        form: "Sub-Form-28",
                                        note: "Note-28" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-28
                              </Link> */}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    

                    {/* MUSHAK 9.1 TABLE-6 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={4} className="pb-0 pt-0">
                              PART-6: DECREASING ADJUSTMENTS (VAT)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Adjustments Details
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "25%" }}
                            >
                              VAT Amount
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              Sub-Form
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Due to VAT Deducted at Source from the Suppliers delivered
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              29
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "25%" }}>
                              {vds_decreasing_amount_29?.toFixed(2)}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        vds_decreasing_amount_29: 29,
                                        buyer: "Buyer's",
                                        form: "Sub-Form-29",
                                        note: "Note-29" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-29
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Advance Tax Paid at Import Stage
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              30
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "25%" }}>
                              0.00
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        adjustment_vat30: 30,
                                        buyer: "Buyer's",
                                        form: "Sub-Form-30",
                                        note: "Note-30" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-30
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Issuance of Credit Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              31
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "25%" }}>
                              {credit_note_amount_31?.toFixed(2)}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        credit_note_amount_31: 31,
                                        credit: "Credit",
                                        decreasing: "Decreasing",
                                        form: "Sub-Form-31",
                                        note: "Note-31" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-31
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              Any Other Adjustments (please specify below)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              32
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "25%" }}>
                              {other_decreasing_amount_32?.toFixed(2)}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        other_decreasing_amount_32: 32,
                                        buyer: "Buyer's",
                                        form: "Sub-Form-32",
                                        note: "Note-32" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-32
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "60%" }}
                            >
                              <strong>Total Decreasing Adjustment</strong>
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              33
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "25%", background: "lightpink" }}
                            >
                              <strong>{formatMoney(decreasingAdjustmentTotal())}</strong>
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "10%" }}
                            >
                              {/* <Link href={{
                                      pathname: "/mushak/subForms/AdjustmentSubForm",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        vds_decreasing_amount_29: 29,
                                        credit_note_amount_31: 31,
                                        other_decreasing_amount_32: 32,
                                        buyer: "Buyer's",
                                        form: "Sub-Form-33",
                                        note: "Note-33" 
                                      }
                                    }}
                                    target="_blank"
                                >Note-33
                              </Link> */}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* MUSHAK 9.1 TABLE-7 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={3} className="pb-0 pt-0">
                              PART-7: NET TAX CALCULATION
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Items
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              Amount (Tax)
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Net Payable VAT for the Tax Period (PART- 45)
                              (9C-23B+28-33)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              34
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                              {netPayable_34()?.toFixed(2) < 0 ? (`(${netPayable_34()?.toFixed(2)})`) : (netPayable_34()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Net Payable VAT for the Tax Period after Adjusted with
                              Closing Balance and Balance of from 18.6 [34-(52+56)]
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              35
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                            {netPayable_35() < 0 ? (`(${netPayable_35()?.toFixed(2)})`) : (netPayable_35()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Net Payable Supplementary Duty for the Tax Period (Before
                              adjustment with Closing Balance) [9B+38-(39+40)]
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              36
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                              {netPayableSD_36() < 0 ? (`(${netPayableSD_36()?.toFixed(2)})`) : (netPayableSD_36()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Net Payable Supplementary Duty for the Tax Period after
                              Adjusted with Closing Balance and Balance of from 18.6
                              [36-(53+57)]
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              37
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                            {netPayableAfterAdjustment_37() < 0 ? (`(${netPayableAfterAdjustment_37()?.toFixed(2)})`) : (netPayableAfterAdjustment_37()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Supplementary Duty Against Issuance of Debit Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              38
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {sdForDebit_38() < 0 ? (`(${sdForDebit_38()?.toFixed(2)})`) : (sdForDebit_38()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Supplementary Duty Against Issuance of Credit Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              39
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {sdForCredit_39() < 0 ? (`(${sdForCredit_39()?.toFixed(2)})`) : (sdForCredit_39()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Supplementary Duty Paid on Inputs Against Exports
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              40
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {sdAmountOfExport_40() < 0 ? (`(${sdAmountOfExport_40()?.toFixed(2)})`) : (sdAmountOfExport_40()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Interest on Overdue VAT (Based on note -35)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              41
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {interestOfVat_41() < 0 ? (`(${interestOfVat_41()?.toFixed(2)})`) : (interestOfVat_41()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Interest on Overdue SD (Based on note -37)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              42
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {interestOfSD_42() < 0 ? (`(${interestOfSD_42()?.toFixed(2)})`) : (interestOfSD_42()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Fine/Penalty for Non-submission of Return
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              43
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {fineNotSubmit_43() < 0 ? (`(${fineNotSubmit_43()?.toFixed(2)})`) : (fineNotSubmit_43()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Other Fine/Penalty/Interest
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              44
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                            {otherfine_44() < 0 ? (`(${otherfine_44()?.toFixed(2)})`) : (otherfine_44()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Payable Excise Duty
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              45
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              0.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Payable Development Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              46
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              0.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Payable ICT Development Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              47
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              0.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Payable Health Care Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              48
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              0.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Payable Environmental Protection Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              49
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              0.00
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Net Payable VAT for treasury Deposit (35+41+43+44)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              50
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                            {netPayableTreasuryDeposit_50() < 0 ? (`(${netPayableTreasuryDeposit_50()?.toFixed(2)})`) : (netPayableTreasuryDeposit_50()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Net Payable SD for treasury Deposit (37+42)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              51
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                            {netPayableSDTreasuryDeposit_51() < 0 ? (`(${netPayableSDTreasuryDeposit_51()?.toFixed(2)})`) : (netPayableSDTreasuryDeposit_51()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Closing Balance of Last Tax Period (VAT)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              52
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "20%" }}>
                              {closingBalance_52()?.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Closing Balance of Last Tax Period (SD)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              53
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {closingBalanceOfSD_53() < 0 ? (`(${closingBalanceOfSD_53()?.toFixed(2)})`) : (closingBalanceOfSD_53()?.toFixed(2))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    

                    {/* MUSHAK 9.1 TABLE-8 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={3} className="pb-0 pt-0">
                              PART-8: ADJUSTMENT OF OLD ACCOUNT CURRENT BALANCE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Items
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              Amount (Tax)
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Remaining Balance (VAT) from Mushak-18.6,[Rule 118(5)]
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              54
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {adjustmentOfClossingBalane_54()?.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Remaining Balance (SD) 2019 from Mushak-18.6,[Rule 118(5)]
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              55
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {remainingOldSD_55()?.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Decreasing Adjustment for Note 54 (up to 30% of Note 34)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              56
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {remainingClossingBalane_56()?.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "75%" }}
                            >
                              Decreasing Adjustment for Note 55 (up to 30% of Note 36)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              57
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {decreasingAdjustment_57()?.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    
                    

                    {/* MUSHAK 9.1 TABLE-9 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={5} className="pb-0 pt-0">
                              PART-9: ACCOUNT CODE WISE PAYMENT SCHEDULE (TREASURY DEPOSIT)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Items
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              Account Code
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "15%" }}>
                              Amount (Tax)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              Sub-Form
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              VAT Deposit for the Current Tax Period
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              58
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              1-1133-0030-0311
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "15%" }}>
                            {formatCurrency.format(vatDeposit_58()?.toFixed(2))}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm58",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        note_no58: 58,
                                        form: "SubForm-58",
                                        note: "Note-58"
                                      }
                                    }}
                                    target="_blank"
                              >
                                Note-58
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              SD Deposit for the Current Tax Period
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              59
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              1-1133-0030-0312
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              {formatCurrency.format(SDDeposit_59().toFixed(2))}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm58",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        note_no59: 59,
                                        form: "Form-59",
                                        note: "Note-59"
                                      }
                                    }}
                                    target="_blank"
                              >
                                Note-59
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Excise Duty
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              60
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >1-1133-0030-0313</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              {formatCurrency.format(paid_vat60.toFixed(2))}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm58",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        note_no60: 60,
                                        form: "SubForm-60",
                                        note: "Note-60"
                                      }
                                    }}
                                    target="_blank"
                              >
                                Note-60
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Development Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              61
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >1-1133-0030-0314</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              {formatCurrency.format(paid_vat61.toFixed(2))}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm58",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        note_no61: 61,
                                        form: "SubForm-61",
                                        note: "Note-61"
                                      }
                                    }}
                                    target="_blank"
                              >
                                Note-61
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              ICT Development Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              62
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >1-1133-0030-0315</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              {formatCurrency.format(paid_vat62.toFixed(2))}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm58",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        note_no62: 62,
                                        form: "SubForm-62",
                                        note: "Note-62"
                                      }
                                    }}
                                    target="_blank"
                              >
                                Note-62
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Health Care Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              63
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >1-1133-0030-0316</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              {formatCurrency.format(paid_vat63.toFixed(2))}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm58",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        note_no63: 63,
                                        form: "SubForm-63",
                                        note: "Note-63"
                                      }
                                    }}
                                    target="_blank"
                              >
                                Note-63
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "45%" }}
                            >
                              Environmental Protection Surcharge
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              64
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >1-1133-0030-0317</td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              {formatCurrency.format(paid_vat64.toFixed(2))}
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "15%" }}
                            >
                              <Link href={{
                                      pathname: "/mushak/subForms/SubForm58",
                                      query: {
                                        start_date: start_date,
                                        end_date: end_date,
                                        note_no64: 64,
                                        form: "SubForm-64",
                                        note: "Note-64"
                                      }
                                    }}
                                    target="_blank"
                              >
                                Note-64
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* MUSHAK 9.1 TABLE-10 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={3} className="pb-0 pt-0">
                              PART-10: CLOSING BALANCE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ background: "lightgreen" }}>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "65%" }}
                            >
                              Items
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "30%" }}
                            >
                              Amount
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "65%" }}
                            >
                              Closing Balance (VAT) [58-(50+67)+ the refund amount not
                              approved]
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              65
                            </td>
                            <td className="text-end pb-0 pt-0" style={{ width: "30%" }}>
                            {clossingBalanceVat_65() < 0 ? (`(${clossingBalanceVat_65()?.toFixed(2)})`) : (clossingBalanceVat_65()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "65%" }}
                            >
                              Closing Balance (SD) [59-(51+68)+ the refund amount not
                              approved]
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              66
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "30%" }}
                            >
                              {clossingBalanceSD_66() < 0 ? (`(${clossingBalanceSD_66()?.toFixed(2)})`) : (clossingBalanceSD_66()?.toFixed(2))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* MUSHAK 9.1 TABLE-11 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={4} className="pb-0 pt-0">
                              PART-11: REFUND
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "40%" }}
                              rowSpan={3}
                            >
                              <p className="mt-4">
                                I am interested to get refund of my Closing Balance
                              </p>
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "35%", background: "lightgreen" }}
                            >
                              Items
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%", background: "lightgreen" }}
                            >
                              Note
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              <input type="checkbox" /> YES &nbsp;&nbsp;&nbsp;&nbsp;
                              <input type="checkbox" /> NO
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "35%" }}
                            >
                              Requested Amount for Refund (VAT)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              67
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {requestAmountForRefundVat_67() < 0 ? (`(${requestAmountForRefundVat_67()?.toFixed(2)})`) : (requestAmountForRefundVat_67()?.toFixed(2))}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "35%" }}
                            >
                              Requested Amount for Refund (SD)
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "5%" }}
                            >
                              68
                            </td>
                            <td
                              className="text-end pb-0 pt-0"
                              style={{ width: "20%" }}
                            >
                              {requestAmountForRefundSD_68() < 0 ? (`(${requestAmountForRefundSD_68()?.toFixed(2)})`) : (requestAmountForRefundSD_68()?.toFixed(2))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* MUSHAK 9.1 TABLE-12 */}
                    <div className="table-responsive mt-1">
                      <table
                        className="table table-bordered table-hover"
                        style={{ border: "black" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={3} className="pb-0 pt-0">
                              PART-12: DECLARATION
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-center pb-0 pt-0" colSpan={3}>
                              <p>
                                I hereby declare that all information provided in this
                                Return Form are complete, true & accurate.In case of any
                                untrue/incomplete statement.I may be subjected to penal
                                action under the Value Added Tax and Supplementary Duty
                                Act,2012 or any other applicable Act prevailing at
                                present
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "25%" }}
                            >
                              <strong>Name:</strong>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "35%" }}
                            >
                              Md. Rafiqul Islam
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "40%" }}
                              rowSpan={4}
                            ></td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "25%" }}
                            >
                              <strong>Designation:</strong>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "35%" }}
                            >
                              Sr. Manager- VAT
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "25%" }}
                            >
                              <strong>Mobile Number:</strong>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "35%" }}
                            >
                              01777702082
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "25%" }}
                            >
                              <strong>National ID/Passport Number:</strong>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "35%" }}
                            >
                              6816315183152
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "25%" }}
                            >
                              <strong>Email:</strong>
                            </td>
                            <td
                              className="text-left pb-0 pt-0"
                              style={{ width: "35%" }}
                            >
                              r.islam@fel.com.bd
                            </td>
                            <td
                              className="text-center pb-0 pt-0"
                              style={{ width: "40%" }}
                            >
                              <strong>Signature</strong>
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

mushak_91.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(mushak_91);
