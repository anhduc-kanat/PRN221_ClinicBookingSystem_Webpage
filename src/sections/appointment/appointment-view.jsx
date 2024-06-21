import { useState, useEffect  } from 'react'; 
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

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from './table-no-data';
import TableEmptyRows from './table-empty-rows';
import AppointmentTableRow from './appointment-table-rows';
import AppointmentTableHead from './appointment-table-head';
import { emptyRows, applyFilter, getComparator } from './utils';
import AppointmentTableToolbar from './appointment-table-toolbar';

// ----------------------------------------------------------------------

export default function AppointmentTablePage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);  
    const [orderBy, setOrderBy] = useState('name');  
    const [filterName, setFilterName] = useState('');  
    const [rowsPerPage, setRowsPerPage] = useState(10);
    //----------------------------------------------------------------------
    const [appointments, setAppointments] = useState([]);

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
    
    const dataFiltered=applyFilter({
      inputData: appointments,
      comparator: getComparator(order, orderBy),
      filterName,
    });
  
    const notFound = !dataFiltered.length && !!filterName;

    const updateAppointment = (updatedAppointment) => {
      setAppointments(prevAppointments => 
          prevAppointments.map(appointment =>
              appointment.id === updatedAppointment.id ? updatedAppointment : appointment
          )
      );
  };
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://api-prn.zouzoumanagement.xyz/api/appointment/get-all-appointment');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAppointments(data.data); // Assuming the API returns an array of appointments
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    useEffect(() => {
      fetchAppointments();
    }, []);
    const updateRow = (id, newData) => {
      const updatedData = dataFiltered.map(row => {
        if (row.id === id) {
          return { ...row, ...newData };
        }
        return row;
      });
      dataFiltered(updatedData);
    };
    //----------------------------------------------------------------------
    return (
      <Container>
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Appointment</Typography>

          <Button           
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Appointment
          </Button>
        </Stack>

        <Card>
          <AppointmentTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <AppointmentTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={appointments.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: "patientName", label: "Name Patient" },
                    { id: "patientPhoneNumber", label: "Phone" },
                    { id: "slotName", label: "Slot" },
                    { id: "date", label: "Visit Date", align: "center" },
                    { id: "startAt", label: "Visit Time", align: "center" },
                    { id: "endAt", label: "End Time", align: "center" },
                    { id: "status", label: "Status" },
                    { id: "dentistTreatmentName", label: "Dentist" },
                    { id: "serviceName", label: "Service Name" },
                    { id: "description", label: "Description" },
                    { id: "" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <AppointmentTableRow
                        key={row.id}
                        patientName={row.patientName}
                        patientPhoneNumber={row.patientPhoneNumber}                   
                        slotName={row.slotName}
                        date={row.date}
                        startAt={row.startAt}
                        endAt={row.endAt}
                        status={row.status}
                        dentistTreatmentName={row.dentistTreatmentName}
                        serviceName={row.serviceName}
                        description={row.description}
                        selected={selected.indexOf(row.serviceName) !== -1}                       
                        handleClick={(event) => handleClick(event, row.patientName)}
                        updateRow={() => updateRow(row.id, { })}
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
    );
  }