import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function AppointmentTableRow({
  id,
  slotId,
  serviceId,
  dentistId,
  selected,
  patientName,
  patientPhoneNumber,
  appointmentServices,
  isFullyPaid,
  //
  date,
  startAt,
  endAt,
  status,
  isPeriod,
  patientId,
  handleClick,
}) {
  const [dateEdit, setDate] = useState(date);
  const [serviceIdEdit, setServiceId] = useState(serviceId);
  const [slotIdEdit, setSlotId] = useState(slotId);
  const [dentistIdEdit, setDentistId] = useState(dentistId);
  const [statusEdit, setStatusEdit] = useState(status);
  const [meetingStatusEdit, setMeetingStatusEdit] = useState();
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  //
  const getStatusText = (statusMeeting) => {
    switch (statusMeeting) {
      case 1:
        return 'Done';
      case 2:
        return 'Check in';
      case 3:
        return 'Waiting';
      case 4:
        return 'Future';
      default:
        return 'Unknown';
    }
  };

  const getStatusClasses = (statusApp) => {
    switch (statusApp) {
      case 1:
        return 'text-green-500 border-green-500'; // Assuming green for 'Done'
      case 2:
        return 'text-blue-500 border-blue-500'; // Assuming blue for 'OnGoing'
      case 3:
        return 'text-orange-500 border-orange-500'; // Assuming orange for 'Scheduled'
      case 4:
        return 'text-red-500 border-red-500'; // Assuming red for 'Rejected'
      default:
        return 'text-gray-500 border-gray-500'; // Assuming grey for 'Unknown'
    }
  };

  const getStatusTextApp = (statusApp) => {
    switch (statusApp) {
      case 1:
        return 'Done';
      case 2:
        return 'OnGoing';
      case 3:
        return 'Scheduled';
      case 4:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };
  // call API to get all
  const [slots, setSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [dentists, setDentists] = useState([]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
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

  //
  const [openModalStatus, setOpenModalStatus] = React.useState(false);
  const handleOpenEditModalStatus = () => setOpenModalStatus(true);
  const handleCloseModalStatus = () => setOpenModalStatus(false);
  //
  const [openModalService, setOpenModalService] = React.useState(false);
  const handleOpenEditModalService = () => setOpenModalService(true);
  const handleCloseModalService = () => setOpenModalService(false);
  //
  const [openModalStatusMeeting, setOpenModalStatusMeeting] = React.useState(false);
  const handleOpenEditModalStatusMeeting = () => setOpenModalStatusMeeting(true);
  const handleCloseModalStatusMeeting = () => setOpenModalStatusMeeting(false);
  //
  useEffect(() => {
    fetch('https://api-prn.zouzoumanagement.xyz/api/slot/get-all-slots')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSlots(data.data);
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);
  useEffect(() => {
    fetch('https://api-prn.zouzoumanagement.xyz/api/service/get-all-services')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setServices(data.data);
      })
      .catch((error) => {
        console.error('There was a problem with your fetch operation:', error);
      });
  }, []);

  const fetchDentists = async () => {
    try {
      const response = await fetch('https://api-prn.zouzoumanagement.xyz/api/dentist/get-dentists');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDentists(data.data); // Assuming the API returns an array of appointments
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  useEffect(() => {
    fetchDentists();
  }, []);
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  const updateAppointmentStatus = async (appointmentId, appointmentStatus) => {
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoic3RhZmYxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU1RBRkYiLCJUaW1lc3RhbXAiOiIyMDI0LTA3LTA5IDA4OjU1OjIyLjA4NjQ1NzEiLCJqdGkiOiJjNmYwNTY5ZS0xYTJiLTRmNTUtOGUxNi1mMTMzZWM1YmJjYjIiLCJleHAiOjE3MjA1NzUzMjIsImlzcyI6Imh0dHBzOi8vYXBpLXBybi56b3V6b3VtYW5hZ2VtZW50Lnh5eiIsImF1ZCI6Imh0dHBzOi8vYXBpLXBybi56b3V6b3VtYW5hZ2VtZW50Lnh5eiJ9.LmfSTC_-4-witsCRXjWiABuyeoabVoMGDkdlsOdYB_U';
    const url = `https://api-prn.zouzoumanagement.xyz/api/appointment/staff-update-customer-appointment/${appointmentId}?appointmentStatus=${appointmentStatus}`;

    try {
      const response = await fetch(url, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Assuming Bearer token, adjust if needed
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Process your data here
      alert('Appointment status updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update appointment status.');
    }
  };
  const updateAppointment = {
    patientId,
    slotIdEdit,
    serviceIdEdit,
    dentistIdEdit,
    dateEdit,
    isPeriod,
  };
  const handleUpdateAppointment = async ({ apppointmentId, updateAppointment1 }) => {
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMTEzMTEzMTEzMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlNUQUZGIiwiVGltZXN0YW1wIjoiMjAyNC0wNi0yNSAwNzoxNzowNS4xMjIzNjg5IiwianRpIjoiYjczYWQ3NTEtNGQxYi00NDdiLWJjNzAtODk3Yzk2ZGVjZTBlIiwiZXhwIjoxNzE5MzAwNDI1LCJpc3MiOiJodHRwczovL2FwaS1wcm4uem91em91bWFuYWdlbWVudC54eXoiLCJhdWQiOiJodHRwczovL2FwaS1wcm4uem91em91bWFuYWdlbWVudC54eXoifQ.EAQLHFLqFA3DkOdKvexffB9Ly0DwTntK7_oIrbSPelk';
    const url = `https://api-prn.zouzoumanagement.xyz/api/appointment/staff-update-customer-appointment/${apppointmentId}`;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateAppointment1),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Process your data here
      alert('Appointment updated successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update appointment.');
    }
  };
  //
 const updateStatusMeeting = async (meetingId, statusMeeting) => {
  const token = '';
  try{
    const response = await fetch(`https://api-prn.zouzoumanagement.xyz/api/meeting/update-meeting-status/${meetingId}?status=${statusMeeting}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to update meeting status.');
  }
 };
  //
  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        onClick={handleOpenEditModalService}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>{patientName}</TableCell>

        <TableCell>{patientPhoneNumber}</TableCell>

        <TableCell>{date}</TableCell>

        <TableCell>
          {startAt}-{endAt}
        </TableCell>

        {/* <TableCell>{dentistTreatmentName}</TableCell>

        <TableCell>{serviceName}</TableCell>

        <TableCell>{description}</TableCell> */}

        <TableCell>
          <Button
            onClick={handleOpenEditModalStatus}
            variant="outlined"
            size="medium"
            className={`border ${getStatusClasses(status)} w-11 text-xs`}
          >
            {getStatusText(status)}
          </Button>
        </TableCell>
        <TableCell>
          <TableCell>
            {isFullyPaid ? (
              <span style={{ color: 'blue', border: '1px solid blue', padding: '2px' }}>Pay</span>
            ) : (
              <button
                style={{
                  color: 'white',
                  backgroundColor: 'blue',
                  padding: '5px',
                  border: 'none',
                  borderRadius: '5px',
                }}
              >
                Checkout
              </button>
            )}
          </TableCell>
        </TableCell>
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
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
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
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Item>
                  <InputLabel style={{ margin: '5px' }} id="demo-simple-select-label">
                    Treatment
                  </InputLabel>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <InputLabel style={{ margin: '5px' }} id="demo-simple-select-label">
                    Slot
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={slotIdEdit}
                    label="Slot"
                    onChange={(event) => setSlotId(event.target.value)}
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{ width: '300px', margin: '5px' }}
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
            {/* row 2 */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item>
                  <InputLabel style={{ margin: '5px' }} id="demo-simple-select-label">
                    Service Type
                  </InputLabel>
                  <Select
                    labelId="service-type-select-label"
                    id="service-type-select"
                    value={serviceIdEdit}
                    onChange={(newValue) => setServiceId(newValue.target.value)}
                    style={{ width: '300px', margin: '5px' }}
                  >
                    <MenuItem value="" disabled>
                      Select Service
                    </MenuItem>
                    {services.map((service) => (
                      <MenuItem key={service.id} value={service.id}>
                        {service.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <label htmlFor="date-visit" style={{ margin: '20px' }}>
                    Date Visit
                  </label>
                  <input
                    type="date"
                    id="date-visit"
                    name="date-visit"
                    value={dateEdit}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '300px',
                      margin: '5px',
                      padding: '5px',
                      borderRadius: '10px',
                      height: '55px',
                      marginTop: '15px',
                      color: 'grey',
                    }}
                  />
                </Item>
              </Grid>
            </Grid>
            {/* row 3 */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item>
                  <InputLabel style={{ margin: '5px' }} id="demo-simple-select-label">
                    Dentist
                  </InputLabel>
                  <Select
                    labelId="dentist-select-label"
                    id="dentist-select"
                    value={dentistIdEdit}
                    onChange={(event) => setDentistId(event.target.value)}
                    style={{ width: '300px', margin: '5px' }}
                  >
                    <MenuItem value="" disabled>
                      Select Dentist
                    </MenuItem>
                    {dentists.map((dentists) => (
                      <MenuItem key={dentists.id} value={dentists.id}>
                        {dentists.firstName} {dentists.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </Item>
              </Grid>
              <Grid item xs={6}>
                <Item>
                  <Item></Item>
                </Item>
              </Grid>
            </Grid>

            <br />
            <Button
              onClick={() => handleUpdateAppointment({ id, updateAppointment })}
              variant="contained"
              color="primary"
              style={{ marginLeft: '87%', width: '70px', height: '40px', borderRadius: '10px' }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      {/* ============================================ */}
      <Modal
        open={openModalService}
        onClose={handleCloseModalService}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Item>
                <TableContainer component={Paper}>
                  <Table aria-label="appointment table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Service Name</TableCell>
                        <TableCell>Service Price</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Meetings</TableCell>
                        <TableCell>Meeting History</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointmentServices.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.serviceName}</TableCell>
                          <TableCell>{service.servicePrice}</TableCell>
                          <TableCell>{service.status}</TableCell>
                          <TableCell>
                            {service.meetingCount}/{service.totalMeetingDate}
                          </TableCell>
                          <TableCell>
                            {service.meetings.map((meeting) => (
                              <TableRow key={meeting.id}>
                                <TableCell>{meeting.date}</TableCell>
                                <Button
                                  onClick={handleOpenEditModalStatusMeeting}
                                  variant="outlined"
                                  size="medium"
                                  className={`border ${getStatusClasses(status)} w-11 text-xs`}
                                  style={{ marginTop: '30px' }}
                                >
                                  {getStatusText(meeting.status)}                                  
                                </Button>
                                <TableCell>
                                  {service.dentistName != null ? (
                                    service.dentistName
                                  ) : (
                                    <Select
                                      labelId="dentist-select-label"
                                      id="dentist-select"
                                      value={dentistIdEdit}
                                      onChange={(event) => setDentistId(event.target.value)}
                                      style={{ width: '150px', margin: '5px' }}
                                    >
                                      <MenuItem value="" disabled>
                                        Select Dentist
                                      </MenuItem>
                                      {dentists.map((dentists) => (
                                        <MenuItem key={dentists.id} value={dentists.id}>
                                          {dentists.firstName} {dentists.lastName}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* ============================================ */}
      <Modal
        open={openModalStatus}
        onClose={handleCloseModalStatus}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5"> Check in - out</Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Item>
                  <InputLabel style={{ margin: '5px' }} id="demo-simple-select-label">
                    Status Appointment
                  </InputLabel>
                  <Select
                    labelId="treatment-select-label"
                    value={statusEdit}
                    onChange={(event) => setStatusEdit(event.target.value)} // Giả sử setTreatment là hàm cập nhật state
                    style={{ width: '300px', margin: '5px' }}
                  >
                    <MenuItem value={0}>Cancelled (Bị hủy bởi customer)</MenuItem>
                    <MenuItem value={1}>Done (Đã hoàn thành cuộc hẹn)</MenuItem>
                    <MenuItem value={2}>
                      OnGoing (Staff check-in customer, bắt đầu cuộc hẹn)
                    </MenuItem>
                    <MenuItem value={3}>
                      Scheduled (Hệ thống tự động tạo ra khi customer đặt lịch)
                    </MenuItem>
                    <MenuItem value={4}>Rejected (Staff hủy cuộc hẹn của customer)</MenuItem>
                  </Select>
                </Item>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: '61%', width: '70px', height: '40px', borderRadius: '10px' }}
              onClick={() => updateAppointmentStatus(id, statusEdit)}
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
      {/* ============================================ */}
      <Modal
        open={openModalStatusMeeting}
        onClose={handleCloseModalStatusMeeting}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5">Status Meeting</Typography>
          <form>
            <Grid container spacing={3}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Item>
                  <InputLabel style={{ margin: '5px' }} id="demo-simple-select-label">
                    Status meeting
                  </InputLabel>
                  <Select
                    labelId="treatment-select-label"
                    value={statusEdit}
                    onChange={(event) => setMeetingStatusEdit(event.target.value)} // Giả sử setTreatment là hàm cập nhật state
                    style={{ width: '300px', margin: '5px' }}
                  >             
                    <MenuItem value={2}>
                      Check in 
                    </MenuItem>
                    <MenuItem value={3}>
                      Waiting
                    </MenuItem>
                    <MenuItem value={4}>
                      Future
                    </MenuItem>
                  </Select>
                </Item>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: '61%', width: '70px', height: '40px', borderRadius: '10px' }}
              onClick={() => updateStatusMeeting(id, meetingStatusEdit)}
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

AppointmentTableRow.propTypes = {
  appointmentServices: PropTypes.any,
  isFullyPaid: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.any,
  slotId: PropTypes.any,
  serviceId: PropTypes.any,
  dentistId: PropTypes.any,
  patientName: PropTypes.any,
  patientPhoneNumber: PropTypes.any,
  slotName: PropTypes.any,
  date: PropTypes.any,
  startAt: PropTypes.any,
  endAt: PropTypes.any,
  status: PropTypes.any,
  dentistTreatmentName: PropTypes.any,
  serviceName: PropTypes.any,
  isPeriod: PropTypes.any,
  patientId: PropTypes.any,
  handleClick: PropTypes.func,
};
