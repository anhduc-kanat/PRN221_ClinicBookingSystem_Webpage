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
import Iconify from 'src/components/iconify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { message } from "antd";

const apiRoot = import.meta.env.VITE_API_ROOT;

export default function ServiceManagementView() {
    const [services, setServices] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [newService, setNewService] = useState({
        name: "",
        description: "",
        expectedDurationInMinute: "",
        price: "",
        serviceType: ""
    });
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, [])

    const fetchServices = () => {
        axios.get(`${apiRoot}/service/get-all-services`)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    console.log(res.data);
                    setServices(res.data.data);
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error at fetch Services:", error.message);
            })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenAddService = () => {
        setOpenAdd(true);
    }

    const handleCloseAddService = () => {
        setOpenAdd(false);
    }

    const handleOpenEditService = (service) => {
        setSelectedService(service);
        setOpenEdit(true);
    }

    const handleCloseEditService = () => {
        setOpenEdit(false);
    }

    const handleOpenDeleteService = (service) => {
        setSelectedService(service);
        setOpenDelete(true);
    }

    const handleCloseDeleteService = () => {
        setOpenDelete(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setSelectedService((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSaveNewService = () => {
        axios.post(`${apiRoot}/service/create-service`, newService)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    setNewService({
                        name: "",
                        description: "",
                        expectedDurationInMinute: "",
                        price: "",
                        serviceType: ""
                    });
                    fetchServices();
                    handleCloseAddService();
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error creating service:", error.message);
            });
    }

    const handleSaveEditService = () => {
        axios.put(`${apiRoot}/service/update-service/${selectedService.id}`, selectedService)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    console.log("Service updated:", res.data);
                    fetchServices();
                    handleCloseEditService();
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error updating service:", error.message);
            });
    }

    const handleDeleteService = () => {
        axios.delete(`${apiRoot}/service/delete-service/${selectedService.id}`)
            .then(res => {
                if (res.data.statusCode === 200 || res.data.statusCode === 201) {
                    console.log("Service deleted:", res.data);
                    fetchServices();
                    handleCloseDeleteService();
                    message.success(res.data.message);
                } else {
                    message.error(res.data.message);
                }
            })
            .catch(error => {
                console.log("Error deleting service:", error.message);
            });
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Service Management</Typography>

                <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAddService}>
                    New Service
                </Button>
            </Stack>
            <Card>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Duration (minutes)</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Service Type</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((service) => (
                                    <TableRow key={service.id}>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>{service.description}</TableCell>
                                        <TableCell>{service.expectedDurationInMinute}</TableCell>
                                        <TableCell>{service.price}</TableCell>
                                        <TableCell>
                                            {service.serviceType === 1 ? "Khám" : "Điều trị"}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleOpenEditService(service)}>Edit</Button>
                                            <Button onClick={() => handleOpenDeleteService(service)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 25]}
                        component="div"
                        count={services.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Card>

            <Dialog open={openAdd} onClose={handleCloseAddService}>
                <DialogTitle>New Service</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newService.name}
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
                        value={newService.description}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="expectedDurationInMinute"
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newService.expectedDurationInMinute}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={newService.price}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="serviceType"
                        label="Service Type"
                        select
                        fullWidth
                        variant="standard"
                        value={newService.serviceType}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value={1}>Khám</MenuItem>
                        <MenuItem value={2}>Điều trị</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddService}>Cancel</Button>
                    <Button onClick={handleSaveNewService}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEdit} onClose={handleCloseEditService}>
                <DialogTitle>Edit Service</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={selectedService?.name}
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
                        value={selectedService?.description}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="expectedDurationInMinute"
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={selectedService?.expectedDurationInMinute}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={selectedService?.price}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="serviceType"
                        label="Service Type"
                        select
                        fullWidth
                        variant="standard"
                        value={selectedService?.serviceType}
                        onChange={handleChangeEdit}
                        required
                    >
                        <MenuItem value={1}>Khám</MenuItem>
                        <MenuItem value={2}>Điều trị</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditService}>Cancel</Button>
                    <Button onClick={handleSaveEditService}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDelete} onClose={handleCloseDeleteService}>
                <DialogTitle>Delete Service</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this service?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteService}>Cancel</Button>
                    <Button onClick={handleDeleteService}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
