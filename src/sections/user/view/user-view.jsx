import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import UserTableToolbar from '../user-table-toolbar';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import './user-view.css'
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------
const apiRoot = import.meta.env.VITE_API_ROOT;
const token = localStorage.getItem("accessToken");
export default function UserPage() {
  const [dentist, setDentist] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedCurrentDate = formatDate(Date.now());

  useEffect(() => {
    axios.get(`${apiRoot}/dentist/get-dentists`, {} ,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    },
    )
      .then(res => {
        console.log("response data:", res.data);
        if (res.data.statusCode === 200) {
          setAppointment(res.data.data);
        } else {
          console.error('Failed to fetch appointments:', response.data.message);
        }
      }).catch(error => console.log("Error at fetching appointments: ", error));
  }, [])

  const handleRowClick = (id) => {
    navigate(`/dentist/appointment/${id}`);
  };

  const handlePreviousPage = () => {
    setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  }

  const handleNextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Dentist Management </Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Dentist
        </Button>
      </Stack>

      <Card>
        <Toolbar
          sx={{
            height: 96,
            display: 'flex',
            justifyContent: 'space-between',
            p: (theme) => theme.spacing(0, 1, 0, 3),
          }}
        >
          <OutlinedInput
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />

        </Toolbar>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                headLabel={[
                  { id: 'firstName', label: 'First Name', align: 'center' },
                  { id: 'lastName', label: 'Last Name', align: 'center' },
                  { id: 'email', label: 'Email', align: 'center' },
                  { id: 'phoneNumber', label: 'Phone Number', align: 'center' },
                  { id: 'address', label: 'Address', align: 'center' }
                ]}
              />
              <TableBody>
                {dentist
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      accountName={row.userAccountName}
                      profileName={row.patientName}
                      slot={row.startAt + "-" + row.endAt}
                      date={row.date}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={() => handleRowClick(row.id)}
                    />
                  ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <div className='dentist-appointment-paging'>
          <button className='paging-btn' onClick={handlePreviousPage}> Previous page </button>
          <button className='paging-btn' onClick={handleNextPage}> Next page </button>
        </div>
      </Card>
    </Container>
  );
}
