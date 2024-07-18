
import { Button } from 'antd';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import React, { useState, useEffect } from 'react';
import { fDate } from 'src/utils/format-time';
import axios from 'axios';
import { message } from "antd";
import { error } from 'src/theme/palette';

const apiRoot = import.meta.env.VITE_API_ROOT;

// ----------------------------------------------------------------------

export default function AccountPage() {
    const [profile, setProfile] = useState({});
    const [updateProfile, setUpdateProfile] = useState({});
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [values, setValues] = useState({
        password1: '',
        password2: '',
        showPassword1: false,
        showPassword2: false,
    });
    const token = localStorage.getItem("accessToken");


    useEffect(() => {
        axios.get(`${apiRoot}/user/my-profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        ).then(response => {
            if (response.data.statusCode == 200) {
                setProfile(response.data.data);
            } else {
                message.error("Fail to load data")
            }
        }).catch(error => {
            console.log(error)
        })

    });

    const handelChangePassword = () => {
        console.log(values)
        axios.post(`${apiRoot}/user/change-password/${profile.id}`, null, {
            params: {
                oldPassword: values.password1,
                newPassword: values.password2
            }, headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.statusCode == 200) {
                message.success(response.data.message)
            } else {
                message.error(response.data.message)
            }
        }).catch(error => {
            console.log(error)
        })

    }

    const handleSave = () => {
        const updateData = {
            firstName: updateProfile.firstName,
            lastName: updateProfile.lastName,
            address: updateProfile.address,
            dateOfBirth: profile.dateOfBirth,
            phoneNumber: updateProfile.phoneNumber,
            email: updateProfile.email
        }
        axios.put(`${apiRoot}/customer/update-customer/${profile.id}`, updateData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.data.statusCode == 201) {
                message.success(response.data.message)
                setOpen(false);

            } else {
                message.error(response.data.message)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = (prop) => () => {
        setValues({ ...values, [prop]: !values[prop] });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        console.log(updateProfile);
    }, [updateProfile]);

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setUpdateProfile((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleClickOpen = () => {
        setUpdateProfile(profile)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <>
            <div className="row container">
                <div className="left col-md-6 col-sm-6 border-r-2 border-solid border-zinc">
                    <div>
                        <h2 className='font-bold text-xl mb-5'>Account Information</h2>
                    </div>
                    <div className='appointment pe-10 '>
                        <div  >
                            <div className="flex justify-between mt-3 text-lg">
                                <span>Name</span>
                                <span>{profile.lastName} {profile.firstName}</span>
                            </div>
                            <div className="flex justify-between mt-3 text-lg">
                                <span>Phone Number</span>
                                <span>{profile.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between mt-3 text-lg">
                                <span>Date of Birth</span>
                                <span>{fDate(profile.dateOfBirth)}</span>
                            </div>
                            <div className="flex justify-between mt-3 text-lg">
                                <span>Address</span>
                                <span>{profile.address}</span>
                            </div>
                            <div className="flex justify-between mt-3 text-lg">
                                <span>Email</span>
                                <span>{profile.email}</span>
                            </div>
                            <div className='mt-5 text-lg'>
                                <a className='text-primary cursor-pointer' onClick={handleClickOpen}>Change Information</a>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-md-6 col-sm-6">
                    <div className='appointment-detail-up'>
                        <h4 className='font-bold text-xl mb-5'>Change password</h4>
                        <div>
                            <p className='text-lg'>Old password <span className='text-red'>*</span></p>
                        </div>
                        <div>
                            <FormControl sx={{ m: 0, width: '50ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password1">Password 1</InputLabel>
                                <Input
                                    id="standard-adornment-password1"
                                    type={values.showPassword1 ? 'text' : 'password'}
                                    value={values.password1}
                                    onChange={handleChange('password1')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword('showPassword1')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword1 ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div className='mt-6'>
                                <p className='text-lg'>New password <span className='text-red'>*</span></p>
                            </div>
                            <FormControl sx={{ m: 0, width: '50ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password2">Password 2</InputLabel>
                                <Input
                                    id="standard-adornment-password2"
                                    type={values.showPassword2 ? 'text' : 'password'}
                                    value={values.password2}
                                    onChange={handleChange('password2')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword('showPassword2')}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>


                    </div>
                    <div className='flex justify-end mt-8'>
                        <div >
                            <Button type="primary" onClick={handelChangePassword}>Change</Button>
                        </div>
                    </div>
                </div>


            </div>




            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Update Information"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateProfile.firstName}
                        onChange={handleChangeEdit}
                        required
                    />

                    <TextField
                        margin="dense"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateProfile.lastName}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="phoneNumber"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateProfile.phoneNumber}
                        onChange={handleChangeEdit}
                        required
                    />

                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateProfile.address}
                        onChange={handleChangeEdit}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="E-mail"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={updateProfile.email}
                        onChange={handleChangeEdit}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleSave} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}

