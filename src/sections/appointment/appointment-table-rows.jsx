import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { DateField } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function AppointmentTableRow({
  id,
  selected,
  patientName,
  patientPhoneNumber,
  slotName,
  date,
  startAt,
  endAt,
  status,
  dentistTreatmentName,
  serviceName,
  description,
  handleClick,
  updateRow,
}) 
{
  
  const handleUpdate = () => {
    const newData = { /* newData here */ };
    updateRow(id, newData);
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    borderRadius: '30px',
    
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  
  const [selectedDentist, setSelectedDentist] = useState('');
  const handleDentistChange = (event) => {
  setSelectedDentist(event.target.value);
};
  
const [open, setOpen] = useState(null);
const handleOpenMenu = (event) => {
  setOpen(event.currentTarget);
};
const handleCloseMenu = () => {
  setOpen(null);
};
  
const [openModal, setOpenModal] = React.useState(false);
const handleOpenEditModal = () => setOpenModal(true); 
const handleCloseModal = () => setOpenModal(false);

const [dateOfBirth, setDateOfBirth] = useState(null);

const [serviceType, setServiceType] = useState(null);
    

    
    useEffect(() => {
      fetch('https://api-prn.zouzoumanagement.xyz/api/slot/get-all-slots')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setSlots(data.data);
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    }, []);

    const handleChange = (event) => {
      setSelectedSlot(event.target.value);
    };
    
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{patientName}</TableCell>

        <TableCell>{patientPhoneNumber}</TableCell>

        <TableCell>{slotName}</TableCell>

        <TableCell>{date}</TableCell>

        <TableCell>{startAt}</TableCell>   

        <TableCell>{endAt}</TableCell>          

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>{dentistTreatmentName}</TableCell>

        <TableCell>{serviceName}</TableCell>

        <TableCell>{description}</TableCell>

          

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpenEditModal}>
          <Iconify 
          
          icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h5"> Edit Appointment</Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <InputLabel style={{ margin: "5px" }} id="demo-simple-select-label">
                      Name
                    </InputLabel>
                    <TextField
                      style={{ width: "300px", margin: "5px" }}
                      type="text"
                      label="Name"
                      variant="outlined"
                      value={patientName}
                      onChange={(newValue) => {handleChange(newValue.target.value )}}
                    />
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <InputLabel style={{ margin: "5px" }} id="demo-simple-select-label">
                      Phone
                    </InputLabel>
                    <TextField
                      style={{ width: "300px", margin: "5px" }}
                      type="text"
                      label="Phone Number"
                      variant="outlined"
                      value={patientPhoneNumber}
                    />
                  </Item>
                </Grid>
              </Grid>
              {/* row 2 */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <InputLabel style={{ margin: "5px" }} id="demo-simple-select-label">
                      Dentist
                    </InputLabel>
                    <Select
                      labelId="dentist-select-label"
                      id="dentist-select"
                      value={selectedDentist}
                      onChange={handleDentistChange}
                      style={{ width: "300px", margin: "5px" }}
                    >
                      <MenuItem>1</MenuItem>
                      <MenuItem>2</MenuItem>
                    </Select>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                    <InputLabel style={{ margin: "5px" }} id="demo-simple-select-label">
                      Date Visit
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}
                    style={{ width: "300px", margin: "5px" }}
                    >
                      <DatePicker
                        label="Date visit"
                        defaultValue={dayjs('2022-04-17')}
                        
                      />
                    </LocalizationProvider>
                  </Item>
                </Grid>
              </Grid>
              {/* row 3 */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Item>
                    <InputLabel style={{ margin: "5px" }} id="demo-simple-select-label">
                      Service Type
                    </InputLabel>
                    <Select
                        labelId="service-type-select-label"
                        id="service-type-select"
                        value={serviceType}
                        onChange={(newValue) => setServiceType(newValue.target.value)}
                        style={{ width: "300px", margin: "5px" }}
                      >
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                    </Select>
                  </Item>
                </Grid>
                <Grid item xs={6}>
                  <Item>
                  <InputLabel style={{ margin: "5px" }} id="demo-simple-select-label">
                      Slot
                    </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedSlot}
                    label="Slot"
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ width: "300px", margin: "5px" }}
                  >
                    <MenuItem value="" disabled>
                    Select a slot
                  </MenuItem>
                  {slots.map((slot) => (
                    <MenuItem key={slot.id} value={slot.id}>
                      {slot.name}
                    </MenuItem>
                  ))}
                  </Select>
                  </Item>
                </Grid>  
              </Grid>
              
              <br />
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Item>
              <TextField
                style={{ width: "665px", margin: "5px" }}
                type="text"
                label="Description"
                variant="outlined"
                value={description}
              />
              </Item>
              </Grid>
              </Grid>
              
              <br />

              <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
        >
          Save
        </Button>
            </form>
          </Box>
        </Modal>
    </>
  );
}

AppointmentTableRow.propTypes = {
    selected : PropTypes.any,
    id : PropTypes.any,
    patientName: PropTypes.any,
    patientPhoneNumber: PropTypes.any,
    slotName : PropTypes.any,
    date : PropTypes.any,
    startAt : PropTypes.any,
    endAt : PropTypes.any,
    status : PropTypes.any,
    dentistTreatmentName  : PropTypes.any,
    serviceName : PropTypes.any,
    description  : PropTypes.any,
    handleClick : PropTypes.func,
    updateRow : PropTypes.func
};
