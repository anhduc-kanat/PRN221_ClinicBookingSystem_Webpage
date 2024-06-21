import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { add } from 'lodash';

// ----------------------------------------------------------------------

export default function DentistTableRow({
  selected,
  firstName,
  lastName,
  phoneNumber,
  address,
  email,
  avatarUrl,
  dateOfBirth,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={lastName} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {firstName} {lastName}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{phoneNumber}</TableCell>
        <TableCell>{email}</TableCell>

        <TableCell>{address}</TableCell>

        <TableCell>
        {
    (() => {
      const date = new Date(dateOfBirth);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    })()
  }
          </TableCell>

        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

DentistTableRow.propTypes = {
  selected : PropTypes.any,
  firstName : PropTypes.any,
  lastName : PropTypes.any,
  phoneNumber : PropTypes.any,
  address: PropTypes.any,
  email: PropTypes.any,
  avatarUrl: PropTypes.any,
  dateOfBirth: PropTypes.any,
  handleClick: PropTypes.func,
  status: PropTypes.string,
};
