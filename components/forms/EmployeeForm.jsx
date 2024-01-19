import React, { useState, useEffect } from "react";
import Router from "next/router";

//theme
import { TextField, MenuItem, Button,Modal,Paper ,Box ,Typography} from "@mui/material";

//redux imports
import { connect } from "react-redux";

import { toast } from "react-toastify";
//axios
import axios from "axios";
import { BASE_URL } from "../../base";
import { tokens } from "../../pages/theme";
import { useTheme } from "@mui/material";


const EmployeeForm = ({ token, id,roles }) => {
    const [full_name, setFull_name] = useState("");
    const [gender, setGender] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [email_address, setEmail_address] = useState("");
    const [office_id, setOffice_id] = useState("");
    const [branch_id, setBranch_id] = useState("");
    const [designation_id, setDesignation_id] = useState("");
    const [department_id, setDepartment_id] = useState("");
    const [password, setPassword] = useState("");
    const [user_id, setUser_id] = useState("");
    const [branches, setBranches] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isRecorrder, setRecorderChecked] = useState(false); 
    const [isApprover, setApproverChecked] = useState(false); 
    const [selectDesignationName,setselectDesignationName]=useState("");
    const [selectBranchName,setselectBranchName]=useState("");
    const [selectDepartmentName,setselectDepartmentName]=useState("");

    const genders = [
        {
            "gender": "Male",
        },
        {
            "gender": "Female",
        },
        {
            "gender": "Others",
        },
    ];
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
      
        // Convert designation_id to number
        const numericDesignationId = parseInt(designation_id, 10);
      
        const foundDesignation = designations.find((d) => d.desg_id === numericDesignationId);
      
        setselectDesignationName((foundDesignation?.desg_nm) || " ");
        
        const numericDepartmentId = parseInt(department_id, 10);
      
        const foundDepartment = departments.find((d) => d.dept_id === numericDepartmentId);
      
        setselectDepartmentName((foundDepartment?.department_name) || " ");

        const numericBranchId = parseInt(branch_id, 10);
      
        const foundBranch = branches.find((d) => d.bran_id === numericBranchId);
      
        setselectBranchName((foundBranch?.branch_name) || " ");
        
        setModalOpen(true);
      };
            
      
    const closeModal = () => setModalOpen(false);

    // Fetch Employees
    useEffect(() => {
        const apiBranches = BASE_URL + "employees";
        axios
        .get(apiBranches, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data) {
                if(id){
                    res.data?.data.map((data)=>{
                        if (data.emp_id == id) {
                            console.log(data);
                            setDepartment_id(data.department_id);
                            setDesignation_id(data.designation_id);
                            setBranch_id(data.branch_id);
                            setOffice_id(data.office_id);
                            setEmail_address(data.email_address);
                            setPhone_number(data.phone_number);
                            setGender(data.gender);
                            setFull_name(data.full_name);
                            setUser_id(data.user_id);
                            setApproverChecked(data.isApprover);
                            setRecorderChecked(data.isRecorder);
                        }
                    })
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    // Fetch Branches
    useEffect(() => {
        const apiBranches = BASE_URL + "branches";
        axios
        .get(apiBranches, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data) {
                setBranches(res.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    // Fetch Designations
    useEffect(() => {
        const apiBranches = BASE_URL + "designations";
        axios
        .get(apiBranches, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
      
            if (res.data) {
               
                setDesignations(res.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    // Fetch Departments
    useEffect(() => {
        const apiDepartments = BASE_URL + "departments";
        axios
        .get(apiDepartments, {
            headers: { Authorization: "Bearer " + token },
        })
        .then((res) => {
            if (res.data) {
                setDepartments(res.data.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    function handleRecorderChange(e) {
        setRecorderChecked(e.target.checked);
 
        // setRecorderChecked((state) => ({recorderChecked: !state.recorderChecked}));
     }

     function handleApproverChange(e) {
       
        setApproverChecked(e.target.checked);
 
        // setRecorderChecked((state) => ({recorderChecked: !state.recorderChecked}));
     }
     function handleRecorderChange(e) {
        setRecorderChecked(e.target.checked);
      }
    
      function handleApproverChange(e) {
        setApproverChecked(e.target.checked);
      }
    
      async function register(e) {
        e.preventDefault();
        // Validate form fields...
        if (!full_name) {
            toast("Please enter the Full Name", { hideProgressBar: true, autoClose: 2000, type: 'error' });
            return;
        }
    
        if (!gender) {
            toast("Please select the Gender", { hideProgressBar: true, autoClose: 2000, type: 'error' });
            return;
        }
    
        if (!phone_number) {
            toast("Please enter the Phone Number", { hideProgressBar: true, autoClose: 2000, type: 'error' });
            return;
        }
    
        if (!designation_id) {
            toast("Please select the Designation", { hideProgressBar: true, autoClose: 2000, type: 'error' });
            return;
        }
    
        if (!department_id) {
            toast("Please select the Department", { hideProgressBar: true, autoClose: 2000, type: 'error' });
            return;
        }
        // Open the modal for confirmation
        openModal();
      }
    
      const confirmSubmit = () => {
        // Close the modal
        closeModal();
    
        // Determine whether it's an update or create action
        if (id) {
          // For update action
          updateEmployee();
        } else {
          // For create action
          createEmployee();
        }
      };
    
      const updateEmployee = () => {
        const apiUrl = BASE_URL + "employees/update/" + id;
        const empData = {
          full_name,
          gender,
          phone_number,
          email_address,
          office_id,
          branch_id,
          designation_id,
          department_id,
          isApprover,
          isRecorrder,
        };
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
    
        axios.post(apiUrl, empData, config).then((response) => {
          if (response.data) {
            toast(`${response?.data?.message}`, {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
            Router.push({
              pathname: "/employees/employeeList",
            });
          } else {
            console.log(response.data);
          }
        });
      };
    
      const createEmployee = () => {
        const apiUrl = BASE_URL + "employees/create";
        const empData = {
          full_name,
          gender,
          phone_number,
          email_address,
          office_id,
          branch_id,
          designation_id,
          department_id,
          password,
          isApprover,
          isRecorrder,
        };
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
    
        axios.post(apiUrl, empData, config).then((response) => {
          if (response.data) {
            toast(`${response?.data?.message}`, {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
            Router.push({
              pathname: "/employees/employeeList",
            });
          } else {
            console.log(response.data);
          }
        });
      };
    
    if(token){
        return (
           <>
            {
                (roles!=3) ?
                <>
                <div>
                <form>
                    <div className="row">
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Full Name"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        value={full_name || ""}
                        onChange={(e) => setFull_name(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                        select
                        label="Gender"
                        size="small"
                        fullWidth
                        value={gender || ""}
                        className="shadow-input"
                        >
                        {genders?.map((option, index) => (
                            <MenuItem key={index} value={option.gender}>
                            {option.gender} 
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Phone Number (01XXXXXXXXX)"
                        variant="outlined"
                        size="small"
                        type="number"
                        fullWidth
                        value={phone_number || ""}
                        onChange={(e) => setPhone_number(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Email"
                        variant="outlined"
                        size="small"
                        type="email"
                        fullWidth
                        value={email_address || ""}
                        onChange={(e) => setEmail_address(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        label="Office ID"
                        variant="outlined"
                        size="small"
                        type="text"
                        fullWidth
                        value={office_id || ""}
                        onChange={(e) => setOffice_id(e.target.value)}
                        className="shadow-input"
                        />
                    </div>
                    <div className="col-md-4 mt-4">
                        <TextField
                        onChange={(e) => {
                            setBranch_id(+e.target.value);
                        }}
                        select
                        label="Branch"
                        size="small"
                        fullWidth
                        value={branch_id || ""}
        
                        className="shadow-input"
                        >
                        {branches?.map((option, index) => (
                            <MenuItem key={index} value={option.bran_id}>
                            {option.branch_name}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mt-4">
                            <TextField
                            onChange={(e) => {
                                setDesignation_id(+e.target.value);
                            }}
                            select
                            label="Designation"
                            size="small"
                            fullWidth
                            value={designation_id || ""}
        
                            className="shadow-input"
                            >
                            {designations?.map((option, index) => (
                                <MenuItem key={index} value={option.desg_id}>
                                {option.desg_nm}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                        <div className="col-md-4 mt-4">
                            <TextField
                            onChange={(e) => {
                                setDepartment_id(+e.target.value);
                            }}
                            select
                            label="Department"
                            size="small"
                            fullWidth
                            value={department_id || ""}
                            className="shadow-input"
                            >
                            {departments?.map((option, index) => (
                                <MenuItem key={index} value={option.dept_id}>
                                {option.department_name}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                        {!id && 
                            <div className="col-md-4 mt-4">
                            <TextField
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow-input"
                            />
                            </div>
                        }
                        {id && 
                            <div className="col-md-4 mt-4">
                                <TextField
                                label="User ID"
                                variant="outlined"
                                size="small"
                                type="text"
                                fullWidth
                                // onChange={(e) => setPassword(e.target.value)}
                                value={user_id || ""}
                                className="shadow-input"
                                readOnly
                                />
                            </div>
                        }
                    <div className="col-md-4 mt-4">
                        <input value="test" type="checkbox" checked={isRecorrder} defaultChecked={isRecorrder}  onChange = {handleRecorderChange} />   
                    
                        {isRecorrder ? (
                            <div> Recorder is checked. </div>
                        ) : (
                            <div> Recorder is not checked. </div>
                        )}  
                    </div>
    
                    <div className="col-md-4 mt-4">
                        <input value="approver" checked={isApprover} type="checkbox"  onChange = {handleApproverChange} />   
                    
                        {isApprover ? (
                            <div> Approver is checked. </div>
                        ) : (
                            <div> Approver is not checked. </div>
                        )}  
                    </div>
                   
                    </div>
                    
                    <div className="row">
                    <div className="col-md-12">
                        <Button
                        onClick={register}
                        variant="contained"
                        className="float-end mt-4"
                        >
                            {id ?  ("Update Employee") : ("Create Employee")
                        }
                        </Button>
                    </div>
                    </div>
                </form>
                </div>
                {/* Modal for Confirmation */}
                    <Modal 
                    open={isModalOpen} 
                    onClose={closeModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    >
                        <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '80%', // Adjusted width for small screens
                            maxWidth: 600, // Maximum width for larger screens
                            bgcolor: 'white',
                            boxShadow: 6,
                            p: 4,
                            borderRadius: 12,
                            textAlign: 'center', // Center text for small screens
                            '@media (min-width: 600px)': {
                            width: 600,
                            textAlign: 'left', // Align text to the left for larger screens
                            },
                        }}
                        >
                        <Typography variant="h2"
                        className="mb-4"
                        color={colors.greenAccent[300]}>
                            {id ? <>Confirm Update</>:<>Confirm Submission</>}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Full Name:</strong> {full_name}
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Phone Number:</strong> {phone_number}
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Email Address:</strong> {email_address}
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Designation:</strong> {selectDesignationName}
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Department:</strong> {selectDepartmentName}
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Branch:</strong> {selectBranchName}
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Role : </strong> 
                            {isApprover && <>{isRecorrder ? ", Approver" : "Approver"}</>} 
                            {isRecorrder && <>{isApprover ? ", Recorder" : "Recorder"}</>}
                            {!(isApprover || isRecorrder) && <>Employee</>}
                            
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Gender:</strong> {gender}
                            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            <strong>Office ID:</strong> {office_id}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button onClick={closeModal} color="primary" sx={{ mr: 2 }}>
                            Cancel
                            </Button>
                            <Button onClick={confirmSubmit} variant="contained" color="primary">
                                {id ?  <>Update</>:<>Confirm</>}
                            </Button>
                        </Box>
                        </Box>
                    </Modal>
                </>:
                <>
                
                    <h2
                        style={{
                            color:"red"
                        }}
                    >
                    Access Denied
                    </h2>
                </>
            }
           </>
        );
    }else{
        console.log("Token Empty");
    }
};
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        roles: state.auth.roles,
    };
};
export default connect(mapStateToProps)(EmployeeForm);
