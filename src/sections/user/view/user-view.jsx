import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// const API_URL = process.env.REACT_APP_API_ROOT;
const API_URL = 'https://api-prn.zouzoumanagement.xyz/api';
// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [getAppointments, setAppointments] = useState([]);
  const [, setPagingAppointment] = useState({});
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`${API_URL}/appointment/get-all-appointment`);
        const data = await response.json();
        setAppointments(data.data);
        setPagingAppointment(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAppointment();
  },
    [])
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
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
    inputData: users,
    comparator: getComparator(order, orderBy),

    filterName,
  }); const notFound = !dataFiltered.length && !!filterName;



  return (
    <>
      <Typography variant="h4">Users</Typography>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: 'ID' },
                    { id: 'patientId', label: 'Patient ID' },
                    { id: 'patientName', label: 'Patient Name' },
                    { id: 'dentistId', label: 'Dentist ID' },
                    { id: 'dentistName', label: 'Dentist Name' },
                    { id: 'description', label: 'Description' },
                    { id: 'date', label: 'Date' },
                    { id: 'serviceName', label: 'Service Name' },
                    { id: 'serviceType', label: 'Service Type' },
                    { id: 'slotName', label: 'Slot Name' },
                    { id: 'startAt', label: 'Start At' },
                    { id: 'endAt', label: 'End At' },
                    { id: 'isTreatment', label: 'Is Treatment?' },
                    { id: 'status', label: 'Status' },
                    { id: 'isApproved', label: 'Is Approved?' },
                    { id: 'isPeriod', label: 'Is Period?' },
                    { id: 'reExamUnit', label: 'Re-Exam Unit' },
                    { id: 'reExamNumber', label: 'Re-Exam Number' },
                    { id: 'feedBack', label: 'Feedback' },
                  ]}
                />
                <TableBody>
                  {getAppointments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((appointment) => {
                      // Transform the datetime strings to date-only strings
                      const FullDateTimeData = new Date(appointment.date);
                      const DateOnly = `${FullDateTimeData.getFullYear()}-${String(FullDateTimeData.getMonth() + 1).padStart(2, '0')}-${String(FullDateTimeData.getDate()).padStart(2, '0')}`;

                      return (
                        <UserTableRow
                          id={appointment.id}
                          date={DateOnly}
                          isPeriod={appointment.isPeriod}
                          reExamUnit={appointment.reExamUnit}
                          reExamNumber={appointment.reExamNumber}
                          isApproved={appointment.isApproved}
                          status={appointment.status}
                          description={appointment.description}
                          feedBack={appointment.feedBack}
                          isTreatment={appointment.isTreatment}
                          dentistId={appointment.dentistId}
                          dentistName={appointment.dentistName}
                          patientId={appointment.patientId}
                          patientName={appointment.patientName}
                          serviceName={appointment.serviceName}
                          serviceType={appointment.serviceType}
                          slotName={appointment.slotName}
                          startAt={appointment.startAt}
                          endAt={appointment.endAt}
                          selected={selected.indexOf(appointment.id) !== -1}
                          handleClick={(event) => handleClick(event, appointment.id)}
                        />
                      );
                    })}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>

            </TableContainer>
          </Scrollbar>
          <TablePagination
            page={page}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
