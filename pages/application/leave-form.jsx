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

const leave_form = ({ query, token, roles }) => {
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

  console.log(purchase_local15Rat);
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
                        className="table table-hover"
                        style={{ border: "white" }}
                      >
                        <thead>
                          <tr
                            className="text-center pb-0 pt-0"
                            style={{ background: "lightblue" }}
                          >
                            <th colspan={3} className="pb-0 pt-0">
                                নৈমিত্তিক ছুটির আবেদন
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
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
                            </tr> */}
                            <tr>
                                <td
                                className="text-left pb-0 pt-5"
                                style={{ width: "65%" }}
                                >
                                <p>১. আবেদনকারীর নামঃ  <strong>মোঃ মোস্তফা নুরুন্নবি শাকিল</strong></p>
                                </td>
                                {/* <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "70%" }}
                                rowSpan={4}
                                ></td> */}
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "65%" }}
                                >
                                <p>২. পদবিঃ <strong>সিস্টেম এনালিস্ট</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "85%" }}
                                colSpan={2}
                                >
                                <p>৩.  প্রার্থিত ছুতির সময়কালঃ আগামী............নভেম্বর, ২০২৩ থেকে............নভেম্ব্র, ২০২৩ তারিখ পর্যন্ত মোট............দিনের নৈমিত্তিক ছুটি মঞ্জুর/কর্মস্থলত্যাগ/সরকারি ছুটি সংযুক্তি অনুমতিসহ।</p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "25%" }}
                                >
                                <p>৪. প্রার্থিত ছুটির কারনঃ  <strong>পারিবারিক</strong></p>
                                </td>
                            </tr>
                            <tr>
                                <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "25%" }}
                                >
                                <p>৫. ছুটিকালীন ঠিকানাঃ  <strong>......</strong></p>
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
                                    <hr/>
                                <p>আবেদনকারীর স্বাক্ষর ও তারিখ</p>
                                </td>
                            </tr>
                            <br/>
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
                            <br/>
                            <tr>
                            <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "60%" }}
                            >
                                <p>বর্ণিত আবেদনকারীর ২০২৩ সালে এ পর্যন্ত............দিন নৈমিত্তিক ছুটি ভোগ করেছেন।</p>
                            </td>
                            <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "20%" }}
                            >
                            <hr/>
                                <p>(নৈমিত্তিক ছুটি রেকর্ডকারীর স্বাক্ষর)</p>
                            </td>
                            </tr>
                            <br/>
                            <br/>
                            <tr>
                            <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "60%" }}
                            >
                                <p>তাঁকে..................দিনের নৈমিত্তিক ছুটি/ভোগাকৃত নৈমিত্তিক ছুটি দেয়া যেতে পারে/পারে না।</p>
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
                            <br/>
                            <tr>
                            <td
                                className="text-left pb-0 pt-0"
                                style={{ width: "60%" }}
                            >
                                <p>তাঁর....................................................................................দিনের নৈমিত্তিক ছুটি/ভোগাকৃত নৈমিত্তিক ছুটি মঞ্জুর/নামঞ্জুর।</p>
                            </td>
                            <td
                                className="text-center pb-0 pt-0"
                                style={{ width: "20%" }}
                            >
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
