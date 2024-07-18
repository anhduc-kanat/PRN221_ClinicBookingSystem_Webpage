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
  //----------------------------------------------------------------------
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Appointment</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
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
                  { id: 'date', label: 'Visit Date', align: 'center' },
                  { id: 'startAt', label: 'Time Range', align: 'center' },
                  { id: 'isFullyPaid', label: 'Paid' },
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
  );
}
