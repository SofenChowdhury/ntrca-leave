// LeaveEditForm.js

import { useState, useEffect } from 'react';

const LeaveEditForm = ({ leaveDetails }) => {
  const [leaveData, setLeaveData] = useState({});

  useEffect(() => {
    // console.log(leaveDetails);

    setLeaveData(leaveDetails);
    console.log(leaveData);
    

    // Fetch leave details by ID when the component mounts
    // fetchLeaveDetails(leaveId)
    //   .then((data) => {
    //     setLeaveData(data); // Set the fetched leave details in the state
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching leave details:', error);
    //   });
  }, [leaveDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, update the leave details
    console.log('Updated Leave Details:', leaveData);
    // Perform API call to update leave details
    // Example: updateLeaveDetails(leaveId, leaveData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={leaveData.name}
          onChange={handleChange}
          required
        />
      </div>
      {/* Other fields (startDate, endDate, reason) similar to the previous form */}
      <button type="submit">Update</button>
    </form>
  );
};

export default LeaveEditForm;
