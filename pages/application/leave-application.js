import React, { useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
//redux imports
import { connect } from "react-redux";

//theme
import { tokens } from "../theme";
import { TextField, Button, Typography, useTheme, MenuItem, DateField } from "@mui/material";
// import { DateField } from '@mui/x-date-pickers/DateField';
// import { DateField } from '@mui/x-date-pickers';
// import { DateField } from '@mui/x-date-pickers-pro';
import AntdMomentWebpackPlugin from '@ant-design/moment-webpack-plugin';

//Alert
import { toast } from "react-toastify";

// Date
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CustomModal from "../../components/CustomModal/CustomModal";
// import { DatePicker } from '@mui/x-date-pickers-pro';
// import { DatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers-pro';
// Datatable
//axios
import axios from "axios";
import { BASE_URL } from "../../base";
//import MyDataTable from "../../components/data-table/MyDataTable";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

const leaveApplication = ({ token, roles }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [approvalName,setApprovalName]=useState([]);
  const [approval_id,setApproval_id]=useState("");

  const [reasons,setReasons]=useState([{id:1, name:"Physical Problen"},{id:2, name:"Family Issue"},{id:3, name:"Others"}]);
  const [reason_id,setReason_id]=useState("");

  const [recorderName,setRecorderName]=useState([]);
  const [recorder_id,setRecorder_id]=useState("");

  const [application_Reason, setApplicationReason] = useState("");
  const [application_ReasonText, setApplicationReasonText] = useState("");
  const [leaveTypes, setLeaveType] = useState([]);
  const [leave_type_id, setLeaveType_id] = useState("");
  const [stayLocation, setStayLocation] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [approvedLeave, setApprovedLeave] = useState(0);
  const { RangePicker } = DatePicker;

  const [openModal, setOpenModal] = useState(false);
  const [selectedApprovalName, setSelectedApprovalName] = useState("");
  const [selectedRecorderName, setSelectedRecorderName] = useState("");
  
  const [selectedApprovalDesignation, setSelectedApprovalDesignation] = useState("");
  const [selectedRecorderDesignation, setSelectedRecorderDesignation] = useState("");
  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [file, setFile] = useState(null);

  // const [reasonOptions] = useState(["Physical Illness", "Family Issue", "Others"]);
  // const [selectedReason, setSelectedReason] = useState("");
  // const [openOthersField, setOpenOthersField] = useState(false);

  // // ... (Your other functions)

  const onChangeFile = async (e) => {
    const acceptedImageTypes = [
      "application/pdf"
    ];
    let files = e.target.files || e.dataTransfer.files;
    console.log("files");
    console.log(files);
    console.log(files.length);

    if (files.length > 0) {
      console.log("e.target.files[0].size");
      console.log(e.target.files[0].size);
      if (e.target.files[0].size > 3 * 1000 * 1024){
        alert("File with maximum size of 3MB is allowed !!");
      }else{
        if (acceptedImageTypes.includes(files[0].type)) {
          uploadDocuments(e, files[0]);
        } else {
          alert("Please only enter PDF file (Others file is not allowed)!");
          e.target.value = "";
          setFile(null);
        }
      }
    }
  };

  const uploadDocuments = async (event, file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const response = await submitImageFile(reader.result, file.name);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const submitImageFile = (result, name) => {
    setFile(result);
  };

  // const handleReasonChange = (e) => {
  //   const selectedValue = e.target.value;
  //   setSelectedReason(selectedValue);
  //   setOpenOthersField(selectedValue === "Others");
  // };
  function onChange(date, dateString) {
    // console.log("date");
    // console.log(date);
    // console.log("dateString");

    datediff(dateString[0],dateString[1]);
    dateString?.map((date, index) => {
      if (index == 0) {
        setLeaveStartDate(date);
      }
      else{
        setLeaveEndDate(date);
      } 
    });
  }

  const disabledDate = (current) => {
    // console.log("current");
    // console.log(current);
    // Can not select days before today and today
    return current == dayjs().endOf("day");
  };

  function setLeaveStartDateOnChange(value){
    // console.log("value");
    // console.log(value);
    setLeaveStartDate(value);

    if(value && leaveEndDate){

        datediff(value,leaveStartDate);
    }

  }

  function setLeaveEndDateOnChange(value){
    setLeaveEndDate(value);


    if(leaveStartDate && value){
        datediff(leaveStartDate,value);
    }


  }

  function datediff (date_one, date_two) {

    const currentDate = new Date(date_one);
    const examDate = new Date(date_two); // Replace with your desired exam date
    if(examDate<currentDate){
        alert('End Date Can not be less than Start Date');
        return false;
    }
    const timeDifference = Math.abs(examDate - currentDate);
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    setNumberOfDays(daysRemaining+1);
  
 }

 useEffect(() => {
  // Approved Leave

  const apiGrade =
    BASE_URL +
    "leave/approve-count";

  axios
    .get(apiGrade, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => {
      // console.log(res);
     
      if (res.data) {
        setApprovedLeave(res.data);
      
      }
    })
    .catch((error) => {
      console.log(error);
    });
}, []);


  useEffect(() => {
    const calculateDaysRemaining = () => {
        const currentDate = new Date();
        const examDate = new Date('2023-11-12'); // Replace with your desired exam date
        const timeDifference = Math.abs(examDate - currentDate);
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      
    };

    // calculateDaysRemaining();
}, []);


  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "leave-type";

    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
       
        if (res.data) {
          setLeaveType(res.data);
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "leave/employee-list";

    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res?.status === 200) {
          console.log(res?.data);
          setApprovalName(res?.data);
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const apiGrade =
      BASE_URL +
      "leave/recorder-list";
    axios
      .get(apiGrade, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        // console.log('data');
        // console.log(res);
        if (res.data) {
         // console.log(res.data.data);
          setRecorderName(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOpenModal = () => {
    setSelectedApprovalName(approvalName?.find((option) => option?.emp_id === +approval_id)?.full_name || "");
    setSelectedRecorderName(recorderName?.find((option) => option?.emp_id === +recorder_id)?.full_name || "");
    
    setSelectedApprovalDesignation(approvalName?.find((option) => option?.emp_id === +approval_id)?.desg_nm || "");
    setSelectedRecorderDesignation(recorderName?.find((option) => option?.emp_id === +recorder_id)?.desg_nm || "");
    
    setSelectedLeaveType(leaveTypes?.find((option) => option?.l_type_id === +leave_type_id)?.leave_type_name || "");
    setSelectedStartDate(leaveStartDate);
    setSelectedEndDate(leaveEndDate);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = (e) => {
    if (application_Reason == "Others") {
      setApplicationReason(application_ReasonText);
    }
    e.preventDefault();
    const validationErrors = [];

    // Check each required field and update validationErrors array
    // if (!approval_id) {
    //   validationErrors.push("Please select an Approver Name");
    // }
  
    if (!recorder_id) {
      validationErrors.push("Please select a Recorder Name");
    }
  
    if (!application_Reason) {
      validationErrors.push("Please enter a Reason");
    }
  
    if (!leave_type_id) {
      validationErrors.push("Please select a Leave Type");
    }
  
    if (!leaveStartDate) {
      validationErrors.push("Please select a Start Date");
    }
  
    if (!leaveEndDate) {
      validationErrors.push("Please select an End Date");
    }
  
    if (!stayLocation) {
      validationErrors.push("Please enter a Stay Location");
    }
  
    // Check if there are any validation errors
    if (validationErrors.length > 0) {
      // Display the first validation error
      toast(validationErrors[0], { type: 'error' });
      return;
    }
  
    // Open the confirmation modal
    handleOpenModal();
  };

  const handleSubmitConfirmation = () => {
    const application = {
      approval_id: approval_id,
      reason: application_Reason,
      leave_type_id: leave_type_id,
      start: leaveStartDate,
      end: leaveEndDate,
      stay_location: stayLocation,
      reviewer_id: recorder_id,
      files: file
    };
    const apiLeaveApplication = BASE_URL + "leave/create";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(apiLeaveApplication, application, config).then((response) => {
      if (response?.status === 201) {
        toast(`${response?.data?.message}`, { hideProgressBar: true, autoClose: 2000, type: 'success' })
        if (response?.data?.status === 1) {
          Router.push({
            pathname: "/application/leave-application",
          });
        } else {
          Router.push({
            pathname: "/application/applied-list",
          });
        }
      } else {
        setFormErrors(Object.values(response.data.errors));
      }
    });

    // Close the modal after submission
    handleCloseModal();
  };
  // RETURN TO LIST
  const goBack = () => {
    Router.push({
      pathname: "/",
    });
  };

  return (
    // (roles != 1) &&
    <>
    <div className="mt-2">
    <div className="row">
      <div className="col-10">
        <Typography
          variant="h2"
          className="mb-4"
          color={colors.greenAccent[300]}
        >
          Create Leave Application
        </Typography>
      </div>
    </div>
  
    <div className="row mt-4">
      <div className="col-md-3">
        {/* Leave Type Selection */}
        <TextField
          onChange={(e) => setLeaveType_id(+e?.target?.value)}
          select
          label="Leave Type"
          size="small"
          fullWidth
          value={leave_type_id || ""}
          className="shadow-input"
        >
          {leaveTypes?.map((option, index) => (
            <MenuItem key={index} value={option?.l_type_id}>
              {option?.leave_type_name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-3">
        {/* File Selection */}
        <TextField
          variant="outlined"
          className="shadow-input"
          size="small"
          fullWidth
          accept="application/*"
          type="file"
          onChange={onChangeFile}
        >
        </TextField>
      </div>
      <div className="col-md-6">
        {/* View Selection File*/}
        {file ? (
          <div>
            <iframe src={file} width="100%" height="200px" display="block" position="relative" />
          </div>
          ) : (
          <div
            style={{
              textAlign: "center",
              padding: "10px",
              background: "",
            }}
          >
            <p>Upload file shown here</p>
          </div>
          )
        }
      </div>
    </div>
  
    <div className="row mt-4">
      <div className="col-md-6">
        {/* Approver Name Selection */}
        <TextField
          onChange={(e) => setApproval_id(+e.target?.value)}
          select
          label="Approver Name (Optional)"
          size="small"
          fullWidth
          value={approval_id || ""}
          className="shadow-input"
        >
          {approvalName?.map((option, index) => (
            <MenuItem key={index} value={option?.emp_id}>
              {option?.full_name}-({option?.desg_nm})
            </MenuItem>
          ))}
        </TextField>
      </div>
  
      <div className="col-md-6">
        {/* Recorder Name Selection */}
        <TextField
          onChange={(e) => setRecorder_id(+e?.target?.value)}
          select
          label="Select Recorder"
          size="small"
          fullWidth
          value={recorder_id || ""}
          className="shadow-input"
        >
          {recorderName?.map((option, index) => (
            <MenuItem key={index} value={option?.emp_id}>
              {option?.full_name}-({option?.desg_nm})
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-md-12 text-center">
      {/* Centered and Bold "Leave details" */}
      <h5 className="font-weight-bold">Leave details</h5>
      </div>
    </div>

    <div className="row mt-4">
      <div className="col-md-12">
        {/* Date Range Picker for Start and End Date */}
        <RangePicker
          showTime
          format="YYYY/MM/DD"
          label="Date"
          variant="outlined"
          fullWidth
          onChange={onChange}
          size="large"
          style={{ width: "100%" }}
          className="shadow-input"
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
            </DemoContainer>
          </LocalizationProvider> */}
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        {/* <DatePicker
          label="Controlled picker"
          // value={value}
          onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
        /> */}
        {/* <DatePicker
          onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
          size="large"
          // picker="month"
          style={{ width: "100%" }}
          className="shadow-input"
          // disabledDate={disabledDate}
          fullWidth
        /> */}
        {/* <TextField
          label="Start Date"
          variant="outlined"
          size="small"
          type="date"
          fullWidth
          onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
          className="shadow-input"
        /> */}
        {/* <DatePicker
          label="Start Date"
          views={"Start Date"}
          variant="outlined"
          size="large"
          style={{ width: "100%" }}
          fullWidth
          // value={leaveStartDate}
          onChange={(e) => setLeaveStartDateOnChange(e.target.value)}
          className="shadow-input"
          defaultValue={"Start"}
        /> */}
        {/* <div className="col-md-4 mt-4">
        <DatePicker
          label="End Date"
          variant="outlined"
          size="large"
          // type="text"
          style={{ width: "100%" }}
          fullWidth
          onChange={(e) => setLeaveEndDateOnChange(e.target.value)}
          className="shadow-input"
        />
      </div> */}
      </div>
    </div>
    <div className="row mt-4">
      <div className="col-md-12 text-center">
      {/* Centered and Bold "Leave details" */}
      <h5 className="font-weight-bold">Duration : {numberOfDays} {numberOfDays === 1 ? 'day' : 'days'}</h5>
      </div>
    </div>

    <div className="row mt-4">
      <div className="col-md-12">
        {/* Stay Location TextField */}
        <TextField
          label="Stay Location"
          variant="outlined"
          size="small"
          type="text"
          fullWidth
          onChange={(e) => setStayLocation(e?.target?.value)}
          className="shadow-input"
        />
      </div>
    </div>

    <div className="row mt-4">
      <div className="col-md-12">
        
        <TextField
          onChange={(e) => setApplicationReason(e.target.value)}
          select
          label="Reason"
          size="small"
          fullWidth
          value={application_Reason || ""}
          className="shadow-input"
        >
          {reasons?.map((option, index) => (
            <MenuItem key={index} value={option?.name}>
              {option?.name}
            </MenuItem>
          ))}
        </TextField> 

        { (application_Reason == "Others") &&
          <TextField
            label="Reason"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            onChange={(e) => setApplicationReasonText(e?.target?.value)}
            className="shadow-input mt-3"
          /> 
        }
     
      </div>
    </div>
  
    <div className="row mt-4">
      <div className="col-md-12">
        {/* Submit and Cancel Buttons */}
        <Button
          variant="contained"
          color="success"
          className="float-end"
          onClick={onSubmit}
        >
          Create
        </Button>
        <Button variant="contained" color="error" onClick={goBack}>
          Cancel
        </Button>
      </div>
    </div>
    
  </div>
      {/* Modal */}
     <CustomModal 
        open={openModal}
        onClose={handleCloseModal}
        actionType="submit"
        selectedApprovalName={selectedApprovalName}
        selectedRecorderName={selectedRecorderName}
        selectedApprovalDesignation={selectedApprovalDesignation}
        selectedRecorderDesignation={selectedRecorderDesignation}
        selectedLeaveType={selectedLeaveType}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        application_Reason={application_Reason}
        stayLocation={stayLocation}
        numberOfDays={numberOfDays}
        handleSubmitConfirmation={handleSubmitConfirmation}
     >
     </CustomModal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    roles: state.auth.roles,
  };
};

export default connect(mapStateToProps)(leaveApplication);
