import React, { Component,useState,useEffect } from 'react';
// import React, { useState, useEffect } from "react";
import 'datatables.net';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { BASE_URL } from "../../base";
//redux imports
import { connect } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";

import axios from "axios";
const MyDataTable = ({user})=> {


// var datatable;
const [Datatable, setDatatable] = useState();


let reloadTable=()=> {
  Datatable.ajax.reload();
}

useEffect(() => {
  // Attach click event to the link and handle navigation using jQuery
  $('.custom-link').on('click', function (e) {
    e.preventDefault(); // Prevent the default action of the link
    const href = $(this).attr('href'); // Get the href attribute
    // Perform the navigation using Next.js router
    window.location.href = href; // Use window.location.href to navigate
  });
}, []);

useEffect(() => {

  // const apiUrl =BASE_URL+'leave/applied-list';

  //   const config = {
  //     headers: { Authorization: `Bearer ${user}` },
  //     };
  //   axios.post(apiUrl, [], config).then((response) => {
  //     console.log(response);
        
  //       });

    //  Check if DataTable has already been initialized
     if (!$.fn.DataTable.isDataTable('#myTable')) {
      // Initialize DataTable with Bootstrap styling
    let  datatable= $('#myTable').DataTable({
        // DataTable options and configurations
        // For example:
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        processing: true,
        serverSide: true,
        Filter: true,
        stateSave: true,
        type: "POST",
        "ajax": {
            "url": BASE_URL+'leave/applied-list',
            "type": "POST",
              data: function (d) {
                d.token= user;
            
            },
        },
        columns: [
          {data: 'full_name', name: 'full_name'},
          {data: 'recorder_name', name: 'recorder_name'},
          {data: 'start_date', name: 'start_date'},
          {data: 'end_date', name: 'end_date'},
          {data: 'reason', name: 'reason'},
          {data: 'applied_total_days', name: 'applied_total_days'},
          {data: 'leave_status_name', name: 'leave_status_name'},
          { "data": function(data){
            console.log(data);
            if(data.status == 2 || data.status == 4 || data.status == 1){
              return '';
            }
            else{
              return ' <a className="custom-link" href="/application/edit/'+data.id+'"><button className="btn btn-light btn-sm me-1">Edit</button></a> ';
            }
            // return ' <a className="custom-link" href="/application/edit/'+data.id+'"><button className="btn btn-light btn-sm me-1">Edit</button></a> ';
            // return '<Link><a className="custom-link" href="/application/edit/'+data.id+'" ><button className="btn btn-light btn-sm me-1">Edit</button></a></Link>';
        },
        "orderable": true, "searchable":true, "name":"selected_rows" },
        ]
        // Add more options based on your requirements
        //Add this edit link
        // <Link href={`/application/details/${id}`} className="anchor">
        //   <button className="btn btn-light btn-sm me-1">
        //     <EditIcon cursor="pointer" />
        //   </button>
        // </Link>
      });
      setDatatable(datatable);
  }

}, []);
// console.log(Datatable);

    return (
      <div className='table-responsive'>
      {/* <button onClick={reloadTable}>reload table</button> */}
     
        <table id="myTable"  className="display table table-bordered" >
        <thead>
              <tr>
                  <th>Approver Name</th>
                  <th>Recorder Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reasonn</th>
                  <th>No of Days</th>
                  <th>Status</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>
          {/* {Datatable.data?.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company_name}</td>
                <td>{user.role_name}</td>
                <td>
                  <Link href={`/users/updateUser/${user.id}`} className="anchor">
                    <button className="btn btn-light btn-sm me-1">
                      <EditIcon cursor="pointer" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))} */}
          </tbody>
      
        </table>
        </div>
     
    );
    
  
  }


const mapStateToProps = (state) => {
  return {
    user: state.auth.token
  };
};


export default connect(mapStateToProps)(MyDataTable);