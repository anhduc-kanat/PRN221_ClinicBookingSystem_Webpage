import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Iconify from "src/components/iconify";
import { message } from "antd";

const apiRoot = import.meta.env.VITE_API_ROOT;

export default function SlotManagementView() {
    const [slots, setSlots] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [newSlot, setNewSlot] = useState({
        name: "",
        description: "",
        startAtHour: "",
        startAtMinute: "",
        endAtHour: "",
        endAtMinute: ""
    });
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = () => {
        axios.get(`${apiRoot}/slot/get-all-slots`)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    console.log(res.data);
                    setSlots(res.data.data);
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error at fetch Slots:", error.message);
                message.error(error.response.data.error);
            });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenAddSlot = () => {
        setOpenAdd(true);
    };

    const handleCloseAddSlot = () => {
        setOpenAdd(false);
    };

    const handleOpenEditSlot = (slot) => {
        const [startHour, startMinute] = slot.startAt.split(':');
        const [endHour, endMinute] = slot.endAt.split(':');

        setSelectedSlot({
            ...slot,
            startAtHour: startHour,
            startAtMinute: startMinute,
            endAtHour: endHour,
            endAtMinute: endMinute
        });
        setOpenEdit(true);
    };

    const handleCloseEditSlot = () => {
        setOpenEdit(false);
    };

    const handleOpenDeleteSlot = (slot) => {
        setSelectedSlot(slot);
        setOpenDelete(true);
    };

    const handleCloseDeleteSlot = () => {
        setOpenDelete(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSlot((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setSelectedSlot((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveNewSlot = () => {
        const { name, description, startAtHour, startAtMinute, endAtHour, endAtMinute} = newSlot;

        if (!name || !description || !startAtHour || !startAtMinute || !endAtHour || !endAtMinute) {
            message.error("All fields are required");
            return;
        }
        if (parseInt(startAtHour, 10) > parseInt(endAtHour, 10)) {
            message.error("Start hour must be smaller or equal to end hour");
            return;
        }
        axios.post(`${apiRoot}/slot/create-slot`, newSlot)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    console.log("Slot created:", res.data);
                    setNewSlot({
                        name: "",
                        description: "",
                        startAtHour: "",
                        startAtMinute: "",
                        endAtHour: "",
                        endAtMinute: ""
                    });
                    fetchSlots();
                    handleCloseAddSlot();
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error creating slot:", error.message);
                message.error(error.response.data.error);
            });
    };

    const handleSaveEditSlot = () => {
        const { name, description, startAtHour, startAtMinute, endAtHour, endAtMinute} = selectedSlot;

        if (!name || !description || !startAtHour || !startAtMinute || !endAtHour || !endAtMinute) {
            message.error("All fields are required");
            return;
        }
        if (parseInt(startAtHour, 10) > parseInt(endAtHour, 10)) {
            message.error("Start hour must be smaller or equal to end hour");
            return;
        }

        axios.put(`${apiRoot}/slot/update-slot/${selectedSlot.id}`, selectedSlot)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    console.log("Slot updated:", res.data);
                    fetchSlots();
                    handleCloseEditSlot();
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error updating slot:", error.message);
                message.error(error.response.data.error);
            });
    };

    const handleDeleteSlot = () => {
        axios.delete(`${apiRoot}/slot/delete-slot/${selectedSlot.id}`)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    console.log("Slot deleted:", res.data);
                    fetchSlots();
                    handleCloseDeleteSlot();
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error deleting slot:", error.message);
                message.error(error.response.data.error);
            });
    };

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Slot Management</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAddSlot}>
                    New Slot
                </Button>
            </Stack>
            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Start At</TableCell>
                                <TableCell>End At</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {slots
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((slot) => (
                                    <TableRow key={slot.id}>
                                        <TableCell>{slot.name}</TableCell>
                                        <TableCell>{slot.description}</TableCell>
                                        <TableCell>{slot.startAt}</TableCell>
                                        <TableCell>{slot.endAt}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpenEditSlot(slot)}>Edit</Button>
                                            <Button onClick={() => handleOpenDeleteSlot(slot)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 25]}
                        component="div"
                        count={slots.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Card>

            <Dialog open={openAdd} onClose={handleCloseAddSlot}>
                <DialogTitle>New Slot</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newSlot.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newSlot.description}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="startAtHour"
                        label="Start Hour"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newSlot.startAtHour}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="startAtMinute"
                        label="Start Minute"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newSlot.startAtMinute}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="endAtHour"
                        label="End Hour"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newSlot.endAtHour}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="endAtMinute"
                        label="End Minute"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newSlot.endAtMinute}
                        onChange={handleChange}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddSlot}>Cancel</Button>
                    <Button onClick={handleSaveNewSlot}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={handleCloseEditSlot}>
                <DialogTitle>Edit Slot</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={selectedSlot?.name}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={selectedSlot?.description}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="startAtHour"
                        label="Start Hour"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={selectedSlot?.startAtHour}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="startAtMinute"
                        label="Start Minute"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={selectedSlot?.startAtMinute}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="endAtHour"
                        label="End Hour"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={selectedSlot?.endAtHour}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="endAtMinute"
                        label="End Minute"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={selectedSlot?.endAtMinute}
                        onChange={handleChangeEdit}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditSlot}>Cancel</Button>
                    <Button onClick={handleSaveEditSlot}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDelete} onClose={handleCloseDeleteSlot}>
                <DialogTitle>Delete Slot</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this slot?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteSlot}>Cancel</Button>
                    <Button onClick={handleDeleteSlot}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
