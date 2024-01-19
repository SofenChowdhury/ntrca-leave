import React, { useEffect, useState } from "react";
import Link from "next/link";

//redux imports
import { connect } from "react-redux";

// Theme imports
import { tokens } from "../theme";
import { Typography, useTheme, Button } from "@mui/material";

//axios
import axios from "axios";
import { BASE_URL } from "../../base";

// Icon import
import EditIcon from "@mui/icons-material/Edit";

const roleList = ({ token }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const apiRoles = BASE_URL + "role";

    axios
      .get(apiRoles, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
    
        if (res.status == 200) {
          setRoles(res.data.data);
              // console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
        Role List
      </Typography>
      <table className="table table-striped">
        <thead>
          <tr className="table-success">
            <th>#</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{role.role_name}</td>
              <td>
                <Link href={`/roles/updateRole/${role.role_id}`}>
                  <Button>
                    <EditIcon cursor="pointer" />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(roleList);
