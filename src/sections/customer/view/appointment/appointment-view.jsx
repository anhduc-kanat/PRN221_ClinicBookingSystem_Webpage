
import { Input } from 'antd';

import Button from '@mui/material/Button';


import React, { useState, useEffect } from 'react';

import axios from 'axios';
import AppointmentStatus from 'src/enum/appointment-enum';
import GenderStatus from 'src/enum/gender-enum';



const apiRoot = import.meta.env.VITE_API_ROOT;

// ----------------------------------------------------------------------



export default function AppointmentPage() {
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
                            <div>
                                <div>
                                    <h3 className='font-bold text-xl'>Zouzou Clinic by {appointment.dentistTreatmentName}</h3>
                                </div>
                                <div className=''>
                                    <span>{appointment.startAt} / {appointment.date}</span>
                                </div>
                                <div>
                                    <span>{appointment.userTreatmentName}</span>
                                </div>
                                <div className='mt-2 ms-2'>
                                    {appointment.status === 3 ? (
                                        <p className='text-green'>{AppointmentStatus.SCHEDULED}</p>
                                    ) : (
                                        <p className='text-red'>{AppointmentStatus.CANCELLED}</p>
                                    )}
                                </div>
                            </div>
                            <div className='border border-solid border-binc rounded-md content-center p-2 font-bold '>
                                <p className=''>{appointment.slotName}</p>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
            <div className="col-md-7 col-sm-7">
                {details && (
                    <div className="details">
                        <div className='flex justify-end'>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                            </span>
                            <div>
                                {details.status === 3 ? (
                                    <p className='text-green'>{AppointmentStatus.SCHEDULED}</p>
                                ) : (
                                    <p className='text-red'>{AppointmentStatus.CANCELLED}</p>
                                )}
                            </div>
                        </div>
                        <div className='two text-xl font-bold text-center'>
                            <h3>ZouZou Clinic</h3>
                            <p>Nhà văn hóa Đại học Quốc gia</p>
                        </div>
                        <div className='p-8 '>
                            <h4 className='font-bold text-xl '>Thông tin đặt khám</h4>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Mã phiếu khám</span>
                                <span className='text-lg'>{details.id}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Ngày khám</span>
                                <span className='text-lg'>{details.date}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Dịch vụ</span>
                                <span className='text-lg'>{details.serviceName}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Bác sĩ</span>
                                <span className='text-lg'>{details.dentistTreatmentName}</span>


                            </div>

                        </div>

                        <div className='p-8'>
                            <h4 className='font-bold text-xl'>Thông tin bệnh nhân</h4>
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
                        </div>
                        <div className='ms-8'>
                            {details.status === 3 && (
                                <Button color='error' variant="outlined" onClick={() => handleDeleteAppointment()}>Hủy đặt lịch</Button>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>


    )
}

