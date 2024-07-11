
import { Input } from 'antd';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import AppointmentStatus from 'src/enum/appointment-enum';
import GenderStatus from 'src/enum/gender-enum';
import { fDate } from 'src/utils/format-time';



const apiRoot = import.meta.env.VITE_API_ROOT;

// ----------------------------------------------------------------------



export default function AppointmentPage() {
    const [details, setDetails] = useState(null);
    const [appointments, setAppointment] = useState([]);
    const [hover, setHover] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [pageTotal, setPageTotal] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        axios.get(`${apiRoot}/appointment/user-get-appointment`, {
            params: {
                pageNumber: currentPage,
                pageSize: 3
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log("Response data: ", response.data)
            if (response.data.statusCode === 200) {
                setAppointment(response.data.data);
                setPageTotal(response.data.totalPages)
            } else {
                console.error('Failed to fetch services:', response.data.message);
            }
        }).catch(error => console.error('Error fetching services:', error));
    }, [currentPage]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePageChange = (event, page) => {

        setCurrentPage(page);
        console.log('Selected page:', page);
    };

    const handleClick = (appointment) => {
        setDetails(appointment);
        setHover(appointment.id);
    };



    const getStatusComponent = (status) => {
        switch (status) {
            case 3:
                return <p className='text-green'>{AppointmentStatus.SCHEDULED}</p>;
            case 2:
                return <p className='text-blue'>{AppointmentStatus.ONGOING}</p>;
            case 1:
                return <p className='text-green'>{AppointmentStatus.DONE}</p>;
            // Thêm các trường hợp khác nếu cần
            default:
                return <p className='text-red'>{AppointmentStatus.CANCELLED}</p>;
        }
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
                                    <h3 className='font-bold text-xl'>Zouzou Clinic</h3>
                                </div>
                                <div className=''>
                                    <span>{appointment.startAt} / {appointment.date}</span>
                                </div>
                                <div>
                                    <span>{appointment.userTreatmentName}</span>
                                </div>
                                <div className='mt-2 ms-2'>
                                    {getStatusComponent(appointment.status)}
                                </div>
                            </div>
                            <div className='border border-solid border-binc rounded-md content-center p-2 font-bold '>
                                <p className=''>{appointment.slotName}</p>
                            </div>


                        </div>
                    ))}
                </div>
                <div className='mt-5'>
                    <Stack spacing={2}>
                        <Pagination count={pageTotal} color="primary"
                            page={currentPage} // Current active page
                            onChange={handlePageChange} />
                    </Stack>
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
                                {getStatusComponent(details.status)}
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
                            {/* <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Dịch vụ</span>
                                <span className='text-lg'>{details.appointmentServices.serviceName}</span>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Bác sĩ</span>
                                <span className='text-lg'>{details.dentistTreatmentName}</span>
                            </div> */}
                            {/* <div className='flex justify-end mt-5'>
                                <Button color='primary' variant="outlined" onClick={() => handleDetailAppointment()}>Chi tiết</Button>
                            </div> */}
                            {/* </div> */}

                            {/* <div className='ps-8 pe-8 pb-8'> */}
                            {/* <h4 className='font-bold text-xl'>Thông tin bệnh nhân</h4> */}
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Họ và tên</span>
                                <span className='text-lg'>{details.patientName}</span>

                            </div>
                            <div className='flex justify-between mt-4'>
                                <span className='text-lg'>Năm sinh</span>
                                <span className='text-lg'>{fDate(details.patientDateOfBirth)}</span>

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
                        </div>

                        <div className='ps-8 pe-8 pb-8'>
                            <h4 className='font-bold text-xl '>Dịch vụ</h4>
                            {details.appointmentServices.map(service => (
                                <div key={service.id}>
                                    <div className='flex justify-between mt-4'>
                                        <p className='text-lg'>{service.serviceName}</p>
                                        <div className='flex justify-between'>
                                            <p className='text-lg'>{service.dentistName}</p>
                                            {service.meetings && service.meetings.length > 0 && (
                                                <a className='text-lg ms-2 text-primary cursor-pointer' variant="outlined" onClick={handleClickOpen}>Tái khám</a>
                                            )}
                                            <Dialog
                                                fullScreen={fullScreen}
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="responsive-dialog-title">
                                                <DialogTitle id="responsive-dialog-title ">
                                                    {"Lịch tái khám"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    {service.meetings.map(meeting => (
                                                        <div key={meeting.id}>
                                                            <div className='flex justify-between mt-4'>
                                                                <span className='text-lg'>Ngày tái khám</span>
                                                                <span className='text-lg ms-8'>{fDate(meeting.date)}</span>
                                                            </div>
                                                            <div className='flex justify-between mt-4'>
                                                                <span className='text-lg'>Lần gặp thứ</span>
                                                                <span className='text-lg'>{meeting.meetingAttempt}</span>
                                                            </div>
                                                            <div className='flex justify-between mt-4 pb-4 border-b-2 border-solid border-zinc'>
                                                                <span className='text-lg'>Trạng thái</span>
                                                                <span className='text-lg text-primary'>{meeting.status === 0 ? (
                                                                    <span>
                                                                        Undone
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        Done
                                                                    </span>
                                                                )}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose} autoFocus>
                                                        Close
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                        <div className='ps-8 pe-8 pb-8'>
                            <h4 className='font-bold text-xl mb-4'>Kết quả</h4>
                            {details.result && (
                                <div key={details.result.id}>
                                    <div>
                                        {details.result.medicines.map(medicine => (
                                            <div key={medicine.id}>
                                                <p className='text-lg'>Đơn thuốc</p>
                                                <div ></div>

                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {details.result.notes.map(note => (
                                            <div key={note.id}>
                                                <div className='mb-4'>
                                                    <p className='text-lg font-bold'>Ghi chú của bác sĩ {note.dentistName}</p>
                                                    <div className='flex justify-between mt-4'>
                                                        <span className='text-lg'>Nội dung</span>
                                                        <span className='text-lg'>{note.content}</span>
                                                    </div>
                                                    <div className='flex justify-between mt-4'>
                                                        <span className='text-lg'>Dịch vụ</span>
                                                        <span className='text-lg ms-8'>{note.serviceName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {details.result.medicines.length === 0 && details.result.notes.length === 0 && (
                                        <img className='mx-auto max-w-full h-auto' src="/WaitingResult.png" alt="Placeholder" />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='ms-8'>
                            {details.status === 3 && (
                                <Button color='error' variant="outlined" onClick={() => handleDeleteAppointment()}>Hủy đặt lịch</Button>
                            )}
                        </div>
                    </div>
                )
                }

            </div >
        </div >


    )
}

