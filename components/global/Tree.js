// REACT
import React, { useEffect, useState } from "react";

import axios from "axios";

// Sidebar Import
// import {
//   Sidebar,
//   Menu,
//   MenuItem,
//   SubMenu,
//   useProSidebar,
// } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import data from "../../data";
import Link from "next/link";

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { color } from "@mui/system";



// Process data array
function buildTree(data, parent = 0) {
//   console.log('data');
//   console.log(data);
  const tree = [];

  for (const item of data) {
    if (item.parent === parent) {
      const children = buildTree(data, item.id);
      if (children.length > 0) {
        item.children = children;
      }
      tree.push(item);
    }
  }

  // console.log('tree');
  // console.log(tree);
  return tree;
}

// Generate items for sidebar
function generateMenuItems(nodes) {
  return nodes.map((node) => {
    // console.log('node');
    // console.log(node.url);
    
    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      console.log(node.parent && node.url !== "#");
      return (<SubMenu key={node.id} icon={<HomeOutlinedIcon />} title={node.name}>
        {generateMenuItems(node.children)}
      </SubMenu>)
    } else {
      return (
        <MenuItem key={node.id} icon={<PeopleOutlinedIcon />}>
          <Link href={`${node.url}`}>{node.name}</Link>
        </MenuItem>
      );
    }
  });
}

const Tree = () => {
  const [apidata, setapidata] = useState([]);
  useEffect(() => {
    // const api = "http://10.100.17.22:880/test/public/api/index-user";
    const api = "http://10.100.17.125:8600/acl/api/v1/menu/list";
    // const api = "http://10.100.18.206:8080/";

    axios
      .get(api, {
        "headers": [
          {
            // source: "/api/:path*",
            "source": "/api/(.*)",
            "headers": [
              { "key": "Access-Control-Allow-Credentials", "value": "true" },
              { "key": "Access-Control-Allow-Origin", "value": "*" },
              { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
            ]
          }
        ]
      })
      .then((res) => {
        // console.log("res");
        // console.log(res.data);
        setapidata(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const treeData = buildTree(data);
  // const treeData = buildTree(apidata);

  // Sidebar Variables
//   const { collapseSidebar, toggleSidebar, toggled, broken } = useProSidebar();

  // Sidebar Toggle
  const toggle = () => {
    // toggleSidebar();
    // if (toggled) {
    //   collapseSidebar();
    // } else {
    //   collapseSidebar();
    // }
    // collapseSidebar();
  };

  // console.log(toggled, broken);
//   console.log("treeData");
//   console.log(treeData);

  return (
    <>
      <div className="rectangle">
      {/* <Sidebar
        breakPoint="md"
        transitionDuration={400}
        backgroundColor="white"
        width="400px"
        rtl={false}
        style={{ height: "100vh" }}
      > */}
      <ProSidebar width="1150px" 
        // breakPoint="md"
        // transitionDuration={400}
        backgroundColor="white"
        // rtl={false}
        style={{ color: "seagreen" }}
        >
        <Menu iconShape="square">
          <MenuItem
            // icon={<MenuOutlinedIcon />}
            onClick={() => {
              toggle();
            }}
            style={{ textAlign: "left",  }}
          >
            {" "}
            <h2>Tree</h2>
          </MenuItem>

          {generateMenuItems(data)}
        </Menu>
        </ProSidebar>
      {/* </Sidebar> */}
      {/* {broken && (
        <button onClick={toggle} style={{ float: "right", margin: "15px" }}>
          <MenuOutlinedIcon />
        </button>
      )} */}
      </div>
    </>
  );
};

export default Tree;
