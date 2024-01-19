import React, { useState, useEffect } from "react";
import Router from "next/router";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../../theme";
import { Typography, useTheme } from "@mui/material";
import Multiselect from "multiselect-react-dropdown";

//axios
import axios from "axios";
import { BASE_URL } from "../../../base";

// Icon imports
import PersonIcon from "@mui/icons-material/Person";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const UpdateRole = ({ token, query }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // DATA FOR POST
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState([]);
  const id = +query.id;

  // HELPER VARIABLES
  const [roleDetails, setRoleDetails] = useState({});
  const [allPermissions, setAllPermissions] = useState([]);
  const [errors, setErrors] = useState("");
  const [sp, setSp] = useState([]);

  // FETCH ROLE DETAILS
  useEffect(() => {
    const apiUrl = "http://52.66.207.126/api/v1/roles/" + id;
    // const apiUrl = BASE_URL + "role/edit/"+id;
        // const apiUrl = BASE_URL + `role/edit/${id}`;
    axios
      .get(apiUrl, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setRoleDetails(res.data.data);

          setName(res.data.data.name);
          setDescription(res.data.data.description);
          setPermissions([]);
          setSp([]);

          console.log(res.data.data);

          res.data.data.permissions.map(
            (permission) => (
              setSp((sp) => [...sp, permission]),
              setPermissions((permissions) => [...permissions, permission.id])
            )
          );
        } else {
          setErrors(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // FETCH ALL PERMISSIONS
  useEffect(() => {
    const apiPermissions = BASE_URL + "api/v1/permissions";
    axios
      .get(apiPermissions, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.status == true) {
          setAllPermissions(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // SELECTED PERMISSIONS
  const permissionsAdd = (list, item) => {
    setPermissions((permissions) => [...permissions, item.id]);
  };
  const permissionsRemove = (list, item) => {
    setPermissions(permissions.filter((i) => i !== item.id));
  };

  // UPDATE ROLE
  const update = () => {
    const updatedValues = {
      name,
      description,
      permissions,
      id,
    };
    const apiUpdate = BASE_URL + "api/v1/roles/update";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(apiUpdate, updatedValues, config).then((response) => {
      if (response.data.status) {
        alert("Information Updated!");
        Router.push({
          pathname: "/roles/roleList",
        });
      } else {
        setErrors(Object.values(response.data.errors));
      }
    });
  };

  return (
    <>
      {errors.length ? (
        <>
          <h1 className="text-danger mt-2 mb-3" style={{ fontWeight: 200 }}>
            {errors}
          </h1>
        </>
      ) : (
        <>
          <Typography
            variant="h2"
            className="mb-4"
            color={colors.greenAccent[300]}
          >
            Update Details of {roleDetails.name} Role
          </Typography>

          {/* Name */}
          <div className="input-group mt-2">
            <small className="text-secondary">Name</small>
          </div>
          <div className="input-group mb-3 mt-2">
            <span className="input-group-text">
              <PersonIcon />
            </span>
            <input
              type="text"
              className="form-control"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>

          {/* Description */}
          <div className="input-group mt-2">
            <small className="text-secondary">Description</small>
          </div>
          <div className="input-group mb-3 mt-2">
            <span className="input-group-text">
              <PersonIcon />
            </span>
            <input
              type="text"
              className="form-control"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          {/* permissions */}
          <div className="input-group mt-2">
            <small className="text-secondary">Permissions</small>
          </div>
          <div className="input-group mb-3 mt-2">
            <span className="input-group-text">
              <Diversity3Icon />
            </span>
            <span className="form-control">
              <Multiselect
                placeholder="Select Permissions ▼"
                id="p"
                cursor="pointer"
                displayValue="name"
                selectedValues={sp}
                onRemove={permissionsRemove}
                onSelect={permissionsAdd}
                options={allPermissions}
                showCheckbox
              />
            </span>
          </div>

          <button onClick={update} className="btn btn-success mb-3 mt-3">
            Update Role
          </button>
        </>
      )}
    </>
  );
};

UpdateRole.getInitialProps = async ({ query }) => {
  return {
    query,
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(UpdateRole);
