import { useState } from 'react';
import PropTypes from 'prop-types';

import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  id,
  date,
  isPeriod,
  reExamUnit,
  reExamNumber,
  isApproved,
  status,
  description,
  feedBack,
  isTreatment,
  dentistId,
  dentistName,
  patientId,
  patientName,
  serviceName,
  serviceType,
  slotName,
  startAt,
  endAt,
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
        <TableCell>{id}</TableCell>
        <TableCell>{patientId}</TableCell>
        <TableCell>{patientName}</TableCell>
        <TableCell>{dentistId}</TableCell>
        <TableCell>{dentistName}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{serviceName}</TableCell>
        <TableCell>{serviceType}</TableCell>
        <TableCell>{slotName}</TableCell>
        <TableCell>{startAt}</TableCell>
        <TableCell>{endAt}</TableCell>
        <TableCell>{isTreatment ? 'Yes' : 'No'}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{isApproved ? 'Yes' : 'No'}</TableCell>
        <TableCell>{isPeriod ? 'Yes' : 'No'}</TableCell>
        <TableCell>{reExamUnit}</TableCell>
        <TableCell>{reExamNumber}</TableCell>
        <TableCell>{feedBack}</TableCell>
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

UserTableRow.propTypes = {
  id: PropTypes.number,
  date: PropTypes.string,
  isPeriod: PropTypes.bool,
  reExamUnit: PropTypes.number,
  reExamNumber: PropTypes.number,
  isApproved: PropTypes.bool,
  status: PropTypes.number,
  description: PropTypes.string,
  feedBack: PropTypes.string,
  isTreatment: PropTypes.bool,
  dentistId: PropTypes.number,
  dentistName: PropTypes.string,
  patientId: PropTypes.number,
  patientName: PropTypes.string,
  serviceName: PropTypes.string,
  serviceType: PropTypes.number,
  slotName: PropTypes.string,
  startAt: PropTypes.string,
  endAt: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.bool,
};