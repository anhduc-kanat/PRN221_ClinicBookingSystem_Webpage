import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';

const _borderColor = 'rgba(255, 255, 255, 0.15)';
const WHITE_COLOR = '#fff';
const BLACK_COLOR = '#000';

const darkTheme = {
  bgcolor: '#181919',
  '& thead tr th': {
    bgcolor: '#202123',
    fontWeight: 700,
    color: 'rgba(255, 255, 255, 0.60)',
    borderColor: _borderColor,
  },
  '& td': {
    borderColor: _borderColor,
    color: WHITE_COLOR,
  },
};

const lightTheme = {
  bgcolor: WHITE_COLOR,
  '& thead tr th': {
    bgcolor: '#7620ff',
    color: 'white',
    fontWeight: 800,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  '& td': {
    borderColor: 'rgba(0, 0, 0, 0.1)',
    color: BLACK_COLOR,
  },
};

const THEME = {
  dark: darkTheme,
  light: lightTheme,
};

/**
 * Renders a table component with customizable columns and rows.
 *
 * @param {array} columns - An array of objects representing the table columns.
 * @param {array} rows - An array of objects representing the table rows.
 * @param {object} sx - Additional styles for the table component.
 * @param {string} borderColor - The color of the table border.
 * @param {number} maxHeight - The maximum height of the table.
 * @param {boolean} resetPage - Whether to reset the page when the component re-renders.
 * @param {string} theme - The theme of the table component.
 * @param {string} emptyMessage - The message to display when there are no rows.
 * @param {function} onClickRow - The function to call when a row is clicked.
 * @param {object} other - Additional props for the table component.
 * @return {ReactElement} The rendered table component.
 */
export default function TableCustom({
  columns = [],
  rows = [],
  sx = {},
  borderColor = _borderColor,
  maxHeight,
  resetPage,
  theme = 'light',
  emptyMessage,
  loading,
  loadingComponent,
  onClickRow = null,
  ...other
}) {
  return (
    <Paper
      elevation={3}
      square={false}
      sx={{
        width: '100%',
        overflow: 'hidden',
        border: 'solid 1px #707070',
        ...(THEME[theme] || THEME.dark),
        ...sx,
      }}
      {...other}
    >
      <TableContainer sx={{ maxHeight: maxHeight ?? 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={(row.id || 0) + index}
                  onClick={() => {
                    if (onClickRow) {
                      onClickRow(row);
                    }
                  }}
                  sx={{
                    cursor: onClickRow && 'pointer',
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'expectedDurationInMinute' ? value + ' minute' : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {loading ? (
              <>
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    {loadingComponent}
                  </TableCell>
                </TableRow>
              </>
            ) : (
              rows.length === 0 &&
              emptyMessage && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

let column = PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  width: PropTypes.number,
});

TableCustom.propTypes = {
  columns: PropTypes.arrayOf(column),
  rows: PropTypes.arrayOf(PropTypes.object),
};
