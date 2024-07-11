import { Input } from 'antd';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import GenderStatus from 'src/enum/gender-enum';
import { fDate } from 'src/utils/format-time';
import ProfileForm from './profile-form';
const apiRoot = import.meta.env.VITE_API_ROOT;

// ----------------------------------------------------------------------



export default function ProfilePage() {
    const [details, setDetails] = useState(null);
    const [profiles, setProfile] = useState([]);
    const [hover, setHover] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [updateData, setUpdateData] = useState(null);
    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        const token = localStorage.getItem("accessToken");
        console.log("Token: ", token);
        // const response =  getRequest("/user-profile/get-profile-by-customer");
        // console.log(response)
        axios.get(`${apiRoot}/user-profile/get-profile-by-customer`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Response data: ", response.data)
                if (response.data.statusCode === 200) {
                    setProfile(response.data.data);
                } else {
                    console.error('Failed to fetch services:', response.data.message);
                }
            }).catch(error => console.error('Error fetching services:', error));
    };


    const handleClick = (appointment) => {
        setDetails(appointment);
        setHover(appointment.id);
    };

    const handleShowForm = () => {
        setShowForm(true);
        setDetails(null); 
        setUpdateData(null);
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem("accessToken");
        axios.delete(`${apiRoot}/user-profile/delete/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setAlertMessage('Hồ sơ đã được xóa thành công.');
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            setDetails(null);
            fetchDetails();
        }).catch(error => console.log("Error at Booking Appointment: ", error.message));
    }

    const handleUpdate = (details) => {
        setShowForm(true);
        setDetails(null); 
        setUpdateData(details);
    }


    return (
        <div className="row container">
            <div className="left col-md-5 col-sm-5 border-r-2 border-solid border-zinc">
                <div className=''>
                    <form>
                        <Input placeholder="Mã giao dịch, tên bệnh nhân" />
                    </form>
                </div>
                <div className='appointment  '>
                    {profiles.map(profile => (
                        <div key={profile.id}
                            className={`item mt-8 flex justify-between p-4 hover:bg-slate-200 rounded-lg ${hover === profile.id ? 'bg-zinc' : ''} cursor-pointer`}
                            onClick={() => handleClick(profile)} >
                            <div className='flex justify-between'>
                                <div className=''>
                                    <div className='relative w-20'>
                                        <div className=' flex items-center justify-center bg-blue100 pt-2 pb-2 rounded-lg'>
                                            <span className='rounded-full bg-blue w-10 h-10' > </span>
                                            <div className=' absolute z-20 font-bold text-sm text-white'>{profile.lastName}</div>
                                            <span className='absolute z-20 -top-2 right-0 bg-binc rounded-lg ps-2 pe-2 text-md px-1 text-white'>{profile.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='ms-8'>
                                    <div>
                                        <span className='text-xl font-bold'>{profile.lastName + " " + profile.firstName}</span>
                                    </div>
                                    <div >
                                        <span>{fDate(profile.dateOfBirth)}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-center'>
                        <Box sx={{ '& button': { m: 5 } }}>
                            <div>
                                <Button variant="contained" size="medium" onClick={handleShowForm}>
                                    Thêm hồ sơ
                                </Button>
                            </div>

                        </Box>
                    </div>
                </div>
            </div>
            <div className="col-md-7 col-sm-7">
                <Stack spacing={2} sx={{ width: '100%' }}>
                    {showAlert && (
                        <Alert severity="success" onClose={() => setShowAlert(false)}>
                            {alertMessage}
                        </Alert>
                    )}
                </Stack>
                {details ? (
                    <div className="">
                        <div className='flex justify-start items-center'>
                            <div className='relative w-20 me-6'>
                                <div className=' flex items-center justify-center pt-2 pb-2 '>
                                    <span className='rounded-full bg-blue w-20 h-20' > </span>
                                    <div className=' absolute z-20 font-bold text-xl text-white'>{details.lastName}</div>
                                </div>
                            </div>
                            <div className='two text-xl font-bold text-center'>
                                <h3>{details.userTreatmentName}</h3>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h4 className='font-bold text-xl '>Thông tin cơ bản</h4>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Họ và tên</span>
                                <span className='text-lg'>{details.lastName + " " + details.firstName}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Năm sinh</span>
                                <span className='text-lg'>{fDate(details.dateOfBirth)}</span>

                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Số điện thoại</span>
                                <span className='text-lg'>{details.phoneNumber}</span>

                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Giới tính</span>
                                <span className='text-lg'>{details.gender === 0 ? (
                                    <span>
                                        {GenderStatus.MALE}
                                    </span>
                                ) : (
                                    <span>
                                        {GenderStatus.MALE}
                                    </span>
                                )}</span>

                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Địa chỉ</span>
                                <span className='text-lg'>{details.address}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Email</span>
                                <span className='text-lg'>{details.email}</span>
                            </div>
                        </div>
                        <div className='flex justify-end mt-5'>
                            <div className='me-3'>
                                <Button color='error' variant="contained" size="medium" onClick={() => handleDelete(details.id)}>
                                    Xóa hồ sơ
                                </Button>
                            </div>
                            <div>
                                <Button color='primary' variant="contained" size="medium" onClick={() => handleUpdate(details)}>
                                    Chỉnh hồ sơ
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : showForm && (
                    <ProfileForm 
                    updateProfileData={updateData}
                    fetchDetails={fetchDetails} />
                )}

            </div>
        </div>
    )
}



