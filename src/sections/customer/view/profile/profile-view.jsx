import { Input } from 'antd';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import GenderStatus from 'src/enum/gender-enum';
const apiRoot = import.meta.env.VITE_API_ROOT;

// ----------------------------------------------------------------------



export default function ProfilePage() {
    const [details, setDetails] = useState(null);
    const [appointments, setAppointment] = useState([]);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        console.log("API Root: ", apiRoot);
        axios.get(`${apiRoot}/appointment/user-get-appointment/6`,
            {
                params: {
                    pageNumber: 1,
                    pageSize: 10
                }
            }
        )
            .then(response => {
                console.log("Response data: ", response.data)
                if (response.data.statusCode === 200) {
                    setAppointment(response.data.data);
                } else {
                    console.error('Failed to fetch services:', response.data.message);
                }
            }).catch(error => console.error('Error fetching services:', error));
    }, []);


    const handleClick = (appointment) => {
        setDetails(appointment);
        setHover(appointment.id);
    };

    const handleDeleteAppointment = async (id) => {

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
                    {appointments.map(appointment => (
                        <div key={appointment.id}
                            className={`item mt-8 flex justify-between p-4 hover:bg-slate-200 rounded-lg ${hover === appointment.id ? 'bg-zinc' : ''} cursor-pointer`}
                            onClick={() => handleClick(appointment)} >
                            <div className='flex justify-between'>
                                <div className=''>
                                    <div className='relative w-20'>
                                        <div className=' flex items-center justify-center bg-blue100 pt-2 pb-2 rounded-lg'>
                                            <span className='rounded-full bg-blue w-10 h-10' > </span>
                                            <div className=' absolute z-20 font-bold text-xl text-white'>KH</div>
                                            <span className='absolute z-20 -top-2 right-0 bg-binc rounded-lg ps-2 pe-2 text-md px-1 text-white'>Con</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='ms-8'>
                                    <div>
                                        <span className='text-xl font-bold'>{appointment.userTreatmentName}</span>
                                    </div>
                                    <div >
                                        <span>{appointment.startAt} / {appointment.date}</span>
                                    </div>

                                </div>
                            </div>



                        </div>
                    ))}
                    <div className='flex justify-center'>
                        <Box sx={{ '& button': { m: 5 } }}>
                            <div>
                                <Button variant="contained" size="medium">
                                    Thêm hồ sơ
                                </Button>
                            </div>
                        </Box>
                    </div>

                </div>
            </div>
            <div className="col-md-7 col-sm-7">
                {details && (
                    <div className="">
                        <div className='flex justify-start items-center p-8
                        
                        '>
                            <div className='relative w-20 me-6'>
                                <div className=' flex items-center justify-center pt-2 pb-2 '>
                                    <span className='rounded-full bg-blue w-20 h-20' > </span>
                                    <div className=' absolute z-20 font-bold text-2xl text-white'>KH</div>
                                </div>
                            </div>
                            <div className='two text-xl font-bold text-center'>
                                <h3>{details.userTreatmentName}</h3>
                            </div>
                        </div>
                        <div className='p-8 '>
                            <h4 className='font-bold text-xl '>Thông tin cơ bản</h4>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Họ và tên</span>
                                <span className='text-lg'>{details.userTreatmentName}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Năm sinh</span>
                                <span className='text-lg'>{details.patientDateOfBirth}</span>

                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Số điện thoại</span>
                                <span className='text-lg'>{details.patientPhoneNumber}</span>

                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Giới tính</span>
                                <span className='text-lg'>{details.patientGender === 0 ? (
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
                                <span className='text-lg'>{details.patientAddress}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Email</span>
                                <span className='text-lg'>{details.patientAddress}</span>
                            </div>
                        </div>
                        <div className='ms-8 flex justify-end'>
                            {details.status === 3 && (
                                <div className='flex'>
                                    <div className='me-6'>
                                        <Button className='ms-4' color='error' onClick={() => handleDeleteAppointment()}><span className='text-lg'>Xóa hồ sơ</span></Button>
                                    </div>
                                    <div>
                                        <Button color='primary' variant="contained" onClick={() => handleDeleteAppointment()}><span className='text-lg'>Thay đổi thông tin</span></Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}



