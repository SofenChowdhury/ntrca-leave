// CustomModal.js
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import { TextField, Button, Typography, useTheme, MenuItem, DateField } from "@mui/material";

import { tokens } from '../../pages/theme';
const CustomModal = ({
  token,
  open,
  onClose,
  actionType,
  selectedApprovalName,
  selectedRecorderName,
  
  selectedApprovalDesignation,
  selectedRecorderDesignation,
  selectedLeaveType,
  selectedStartDate,
  selectedEndDate,
  application_Reason,
  stayLocation,
  numberOfDays,
  handleSubmitConfirmation,
}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Modal
      open={open}
      onClose={onClose}
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
        {/* ... Your modal content here ... */}
        <Typography variant="h2" className="mb-4" color={colors.greenAccent[300]}>
        {actionType === 'submit'
        ? 'Are you sure to submit the application?'
        : 'Are you sure to update the application?'}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Leave Type:</strong> {selectedLeaveType}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Approver Name:</strong> {selectedApprovalName}-({selectedApprovalDesignation})
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Recorder Name:</strong> {selectedRecorderName}-({selectedRecorderDesignation})
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
            <strong>Duration: </strong> 
            Start Date: {selectedStartDate}
            <p style={{ marginLeft: "65px" }}>End Date: {selectedEndDate}</p>
            <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>



        <Typography variant="body1" paragraph>
          <strong>Reason:</strong> {application_Reason}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Stay Location:</strong> {stayLocation}
          <Box sx={{ borderTop: '1px solid #ccc', paddingTop: 1, marginBottom: 1 }} />
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Number of Days:</strong> {numberOfDays}
        </Typography>{/**/}
        {actionType === 'submit' ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitConfirmation}
              sx={{ mt: 2, mr: 2 }}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitConfirmation}
              sx={{ mt: 2, mr: 2 }}
            >
              Update
            </Button>
          )}
        <Button
          variant="contained"
          color="secondary"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
