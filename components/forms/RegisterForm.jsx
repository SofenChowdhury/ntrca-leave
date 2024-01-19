import React, { useState, useEffect } from "react";
import Router from "next/router";

//theme
import { TextField, MenuItem, Button } from "@mui/material";

//redux imports
import { connect } from "react-redux";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

//primereact
import { Dropdown } from 'primereact/dropdown';
import { width } from "@mui/system";

const RegisterForm = ({ token }) => {
  // Variables for POST
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [company_id, setCompanyId] = useState(null);
  const [role_id, setRoleId] = useState(null);
  // const [admin_roles, setSelectedRole] = useState([]);

  // Helper Variables
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const selectedRoleTemplate = (option, props) => {
    if (option) {
      setRoleId(option.role_id);
      return (
          <div className="flex align-items-center" style={{ width: "100%", height: "100%", background:"white"}}>
            <img alt={option.role_name} src={`../../assets/images/user.png`} className={`mr-2 flag flag-${option.role_name.toLowerCase()}`} style={{ width: '18px' }} />
            <span className="ps-2 p-dropdown">{option.role_name}</span>
          </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const roleOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center" style={{ width: "100%", height: "100%", background:"white"}}>
        <img alt={option.role_name} src={`../../assets/images/user.png`} className={`mr-2 flag flag-${option.role_name.toLowerCase()}`} style={{ width: '18px' }} />
        <span className="ps-2" >{option.role_name}</span>
      </div>
    );
  };

  const selectedCompanyTemplate = (option, props) => {
    if (option) {
      setCompanyId(option.comp_id);
      return (
          <div className="flex align-items-center" style={{ width: "100%", height: "100%", background:"white"}}>
            <img alt={option.company_name} src={`../../assets/images/user.png`} className={`mr-2 flag flag-${option.company_name.toLowerCase()}`} style={{ width: '18px' }} />
            <span className="ps-2 p-dropdown">{option.company_name}</span>
          </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const companyOptionTemplate = (option) => {
    return (
      <div className="flex align-items-center" style={{ width: "100%", height: "100%", background:"white"}}>
        <img alt={option.company_name} src={`../../assets/images/user.png`} className={`mr-2 flag flag-${option.company_name.toLowerCase()}`} style={{ width: '18px' }} />
        <span className="ps-2" >{option.company_name}</span>
      </div>
    );
  };

  const rolesAdd = (e) => {
    setRoleId(e.target.value);
    setSelectedRole([]);
    setSelectedRole((admin_roles) => [...admin_roles, Number(e.target.value)]);
  };

  // Fetch Company
  useEffect(() => {
    const apiCompanies = BASE_URL + "companies";
    axios
      .get(apiCompanies, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data) {
          setCompanies(res.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fetch Role
  useEffect(() => {
    const apiRoles = BASE_URL + "role";
    axios
      .get(apiRoles, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data) {
          setRoles(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function register(e) {
    e.preventDefault();
    const apiUrl = BASE_URL + "register";
    const regData = {
      email,
      password,
      name,
      phone,
      role_id,
      company_id,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiUrl, regData, config).then((response) => {
      if (response.data) {
        Router.push({
          pathname: "/users/userList",
        });
      } else {
        console.log(response.data);
      }
    });
  }

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6 mt-4">
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              className="shadow-input"
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-input"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mt-4">
            <Dropdown 
              filter 
              showClear 
              filterBy="role_name"
              className="ps-2 pt-2 shadow-input border"
              style={{ width: "100%", height: "100%", background:"while"}} 
              size="large" 
              variant="filled"
              placeholder="Role" 
              options={roles} 
              optionLabel="role_name" 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.value)} 
              valueTemplate={selectedRoleTemplate} 
              itemTemplate={roleOptionTemplate}  
            />
          </div>
          <div className="col-md-6 mt-4">
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
          
        </div>
        <div className="row">
          <div className="col-md-6 mt-4">
            <Dropdown 
              importent
              filter 
              showClear 
              filterBy="company_name"
              className="ps-2 pt-2 shadow-input border"
              style={{ width: "100%", height: "100%" }} 
              size="large" 
              variant="outlined"
              placeholder="Company" 
              options={companies} 
              optionLabel="company_name" 
              value={selectedCompany} 
              onChange={(e) => setSelectedCompany(e.value)} 
              valueTemplate={selectedCompanyTemplate} 
              itemTemplate={companyOptionTemplate}  
            />
          </div>
          <div className="col-md-6 mt-4">
            <TextField
              label="Phone"
              variant="outlined"
              size="small"
              type="text"
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              className="shadow-input"
            />
          </div>      
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button
              onClick={register}
              variant="contained"
              className="float-end mt-4"
            >
              Create User
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(RegisterForm);
