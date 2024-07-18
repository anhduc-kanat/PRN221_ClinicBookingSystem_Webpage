import { useState, useEffect } from 'react';
import * as React from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box'
import Autocomplete from '@mui/material/Autocomplete';

import { message } from "antd";

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from './table-no-data';
import TableEmptyRows from './table-empty-rows';
import AppointmentTableRow from './appointment-table-rows';
import AppointmentTableHead from './appointment-table-head';
import { emptyRows, applyFilter, getComparator } from './utils';
import AppointmentTableToolbar from './appointment-table-toolbar';
import axios from 'axios';

// ----------------------------------------------------------------------

const token = localStorage.getItem('accessToken');
const apiRoot = import.meta.env.VITE_API_ROOT;

export default function AppointmentTablePage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //----------------------------------------------------------------------
  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().slice(0, 10));
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  //Booking data ---------------------------------------
  const [service, setService] = useState('');
  const [services, setServices] = useState([]);
  const [dentist, setDentist] = useState('');
  const [dentists, setDentists] = useState([]);
  const [slot, setSlot] = useState('');
  const [slots, setSlots] = useState([]);
  const [userAccount, setUserAccount] = useState(null);
  const [userAccounts, setUserAccounts] = useState([]);
  const [patient, setPatient] = useState('');
  const [patients, setPatients] = useState([]);
  const [date, setDate] = useState('');
  const [dates, setDates] = useState([]);

  //---------------------------------------------------

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = appointments.map((n) => n.patientName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: appointments,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const PageNumber = 1;
    const PageSize = 100;
    console.log(dateFilter); ///api/appointment/staff-get-appointment-by-date
    axios
      .get(`${apiRoot}/appointment/staff-get-appointment-by-date`, {
        params: {
          PageNumber,
          PageSize,
          date: dateFilter,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAppointments(response.data.data);
      });
  }, [dateFilter, search]);

  const updateRow = (id, newData) => {
    const updatedData = dataFiltered.map((row) => {
      if (row.id === id) {
        return { ...row, ...newData };
      }
      return row;
    });
    dataFiltered(updatedData);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const results = appointments.filter((appointment) =>
      appointment.patientPhoneNumber.includes(search)
    );
    setAppointments(results);
  };

  useEffect(() => {
    axios.get(`${apiRoot}/service/get-all-exam-services`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setServices(response.data.data)
    })
  }, [])
  const handleBooking = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    const data = {
      date: date,
      serviceId: service,
      isReExam: false,
      slotId: slot,
      dentistId: dentist,
      userAccountId: userAccount,
      patientId: patient
    }
    console.log(data)
    axios.post(`${apiRoot}/appointment/staff-booking-appointment`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.data.statusCode === 200) {
        window.location.href = response.data.data.url
        message.success(response.data.message)
      } else if (response.data.statusCode === 400) {
        message.error(response.data.message)

      }
    }).catch(error => {
      message.error(error.response.data.error)

    })
  }


  const handleServiceChange = (event) => {
    axios.get(`${apiRoot}/dentist/get-dentist-service/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      
      setDentists(response.data.data);
    })

    console.log(event.target.value)
    setService(event.target.value)
  };
  const handleDentistChange = (event) => {
    axios.get(`${apiRoot}/dentist/get-date/`, {
      params: {
        id: event.target.value
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setDates(response.data.data)
    })
    setDentist(event.target.value)
  };
  const handleSlotChange = (event) => {
    axios.get(`${apiRoot}/customer/get-all-customers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      
        setUserAccounts(response.data.data)
    })
    setSlot(event.target.value)
  };
  const handleUserAccountChange = (event, account) => {
    console.log(account.id)
    axios.get(`${apiRoot}/user-profile/get-profile-by-user-account-id`, {
      params: {
        userId: account.id,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setPatients(response.data.data)
    })
    setUserAccount(account.id)
  };
  const handlePatientChange = (event) => setPatient(event.target.value);

  const handleDateChange = (event) => {
    console.log(event.target.value)
    console.log(dentist)
    axios.get(`${apiRoot}/slot/get-all-available-slots`, {
      params: {
        dentistId: dentist,
        date: event.target.value
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setSlots(response.data.data)
      console.log(slots)
      setDate(event.target.value)
    })
    // setDates(event.target.value)
    // for (let date of dates) {
    //   if (date.Date === event.target.value.Date) {
    //     console.log(`Found a match: ${date}`);
    //   }else{
    //     setDate(event.target.value)
    //   }
    // };


  }
  //----------------------------------------------------------------------
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Appointment</Typography>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleBooking} >
            New Appointment
          </Button>
        </Stack>

        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <form onSubmit={handleSearch} className="mb-8 max-w-3xl w-2/5">
              <label
                for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white bg-pink-500"
              >
                Tìm kiếm
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className=" rounded-xl block w-full p-4 ps-10 text-sm text-gray-900 border mt-5 ml-2"
                  placeholder="Search by phone number"
                  required
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  Search
                </button>
              </div>
            </form>

          <input
            className="border rounded-md px-3 py-1 text-neutral-500 w-1/5 mr-5"
            placeholder="filter theo ngày"
            type="date"
            value={dateFilter}
            onChange={(event) => {
              setDateFilter(event.target.value);
              console.log(event.target.value);
            }}
          />
        </div>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <AppointmentTableHead
                order={order}
                orderBy={orderBy}
                rowCount={appointments.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'patientName', label: 'Name Patient' },
                  { id: 'patientPhoneNumber', label: 'Phone' },
                  { id: 'date', label: 'Visit Date' },
                  { id: 'startAt', label: 'Time Range' },
                  { id: 'slot', label: 'Slot' },
                  { id: 'isClinicalExamPaid', label: 'Pre-medical paid' },
                  { id: 'isFullyPaid', label: 'Fully Paid Service'},
                  { id: '' },
                ]}
              />
              <TableBody>
                {appointments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <AppointmentTableRow
                      key={row.id}
                      id = {row.id}
                      patientName={row.patientName}
                      patientPhoneNumber={row.patientPhoneNumber}
                      slotName={row.slotName}
                      date={row.date}
                      startAt={row.startAt}
                      endAt={row.endAt}
                      status={row.status}
                      isFullyPaid={row.isFullyPaid}
                      isClinicalExamPaid = {row.isClinicalExamPaid}
                      //

                        appointmentServices={row.appointmentServices}
                        dentistTreatmentName={row.dentistTreatmentName}
                        serviceName={row.serviceName}
                        description={row.description}
                        serviceId={row.serviceId}
                        slotId={row.slotId}
                        isPeriod={row.isPeriod}
                        dentistId={row.dentistTreatmentId}
                        patientId={row.patientId}
                        selected={selected.indexOf(row.serviceName) !== -1}
                        handleClick={(event) => handleClick(event, row.patientName)}
                        updateRow={() => updateRow(row.id, {})}
                      />
                    ))}
                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, appointments.length)}
                  />
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            page={page}
            component="div"
            count={appointments.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Booking Appointment</DialogTitle>
        <DialogContent>

          <Box sx={{}}>
            <Box sx={{ minWidth: 120, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="service-select-label">Service</InputLabel>
                <Select
                  labelId="service-select-label"
                  id="service-select"
                  label="Service"
                  onChange={handleServiceChange}
                >
                  {services.map((service) => (
                    <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="dentist-select-label">Dentist</InputLabel>
                <Select
                  labelId="dentist-select-label"
                  id="dentist-select"
                  label="Dentist"
                  onChange={handleDentistChange}
                >
                  {dentists.map((dentist) => (
                    <MenuItem key={dentist.id} value={dentist.id}>{dentist.lastName} {dentist.firstName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, mb: 2 }}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  label="Date"
                  type="date"
                  onChange={handleDateChange}
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="slot-select-label">Slot</InputLabel>
                <Select
                  labelId="slot-select-label"
                  id="slot-select"
                  label="Slot"
                  onChange={handleSlotChange}
                >
                  {slots.map((slot) => (
                    <MenuItem key={slot.id} value={slot.id}>{slot.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* <Box sx={{ minWidth: 120, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="user-account-select-label">User Account</InputLabel>
                <Select
                  labelId="user-account-select-label"
                  id="user-account-select"
                  label="User Account"
                  onChange={handleUserAccountChange}
                >
                  {userAccounts.map((userAccount) => (
                    <MenuItem key={userAccount.id} value={userAccount.id}>{userAccount.phoneNumber}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box> */}
            <Box sx={{ minWidth: 120, mb: 2 }}>
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={userAccounts}
                  getOptionLabel={(option) => option.phoneNumber}
                  sx={{ width: 300 }}
                  onChange={handleUserAccountChange}
                  renderInput={(params) => <TextField {...params} label="Phone" />}
                />
              </FormControl>
            </Box>


            <Box sx={{ minWidth: 120, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="patient-select-label">Patient</InputLabel>
                <Select
                  labelId="patient-select-label"
                  id="patient-select"
                  label="Patient"
                  onChange={handlePatientChange}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>{patient.lastName} {patient.firstName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleSave} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
