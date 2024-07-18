import React, { useEffect, useState } from 'react';
import './pages.css';
import '../components/BookingStage/StageStyle.css'
import ServiceStage from '../components/BookingStage/ServiceStage';
import DentistStage from '../components/BookingStage/DentistStage';
import CalendarStage from '../components/BookingStage/CalendarStage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/Sections/Footer"
import Calendar from 'react-calendar';
import { Button } from 'antd';
import axios from 'axios';
import TopNavbar from 'src/components/Nav/TopNavbar';
const apiRoot = import.meta.env.VITE_API_ROOT;
const token = localStorage.getItem("accessToken");
export default function BookingPage() {
    //Service state
    const [showServices, setShowServices] = useState(true);
    const [selectedService, setSelectedService] = useState(null);
    //Dentist state
    const [showDentists, setShowDentists] = useState(false);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const [showDentistStage, setShowDentistStage] = useState(false);
    //Calendar state
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendarStage, setShowCalendarStage] = useState(false);
    //Slot state
    const [showSlots, setShowSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showSlotStage, setShowSlotStage] = useState(false);
    //Profile state
    const [showProfiles, setShowProfiles] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showProfilesStage, setShowProfilesStage] = useState(false);
    //Data from api
    const [servicesData, setServicesData] = useState([]);
    const [dentistsData, setDentistsData] = useState([]);
    const [disabledDates, setDisabledDates] = useState([]);
    const [slotsData, setSlotData] = useState([]);
    const [profileData, setProfileData] = useState([]);

    // const [selectedDentistName, setSelectedDentistName] = useState([])

    useEffect(() => {

        console.log("API Root: ", apiRoot);
        axios.get(`${apiRoot}/service/get-all-exam-services`)
            .then(response => {
                console.log("Response data: ", response.data)
                if (response.data.statusCode === 200) {
                    setServicesData(response.data.data);
                } else {
                    console.error('Failed to fetch services:', response.data.message);
                }
            }).catch(error => console.error('Error fetching services:', error));
    }, []);

    const handleDisableDates = ({ date, view }) => {
        const today = new Date();
        const twoMonthsLater = new Date();
        twoMonthsLater.setMonth(today.getMonth() + 2);
        twoMonthsLater.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        if (date < today || date > twoMonthsLater) {
            return true;
        }
        // Disable specific dates
        if (view === 'month') {
            return disabledDates.some(disabledDate =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() - 1 &&
                date.getDate() === disabledDate.getDate()
            );
        }
        return false;
    };

    const handleDateChange = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (zero-based) needs +1
        const day = date.getDate().toString().padStart(2, '0'); // Day of the month

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        console.log(selectedDentist.id);
        setSelectedDate(formattedDate);
        setShowCalendar(false)
        setShowSlotStage(true);
        setShowSlots(true);
        axios.get(`${apiRoot}/slot/get-all-available-slots`, {
            params: {
                dentistId: selectedDentist.id,
                date: formattedDate
            }
        })
            .then(response => {
                console.log("Available slots: ", response.data);
                if (response.data.statusCode === 200) {
                    const formattedSlots = response.data.data.map(slot => ({
                        ...slot,
                        startAt: slot.startAt.slice(0, 5),
                        endAt: slot.endAt.slice(0, 5)
                    }));
                    setSlotData(formattedSlots);
                } else {
                    console.error('Failed to fetch slots:', response.data.message);
                }
            })
            .catch(error => console.error('Error fetching slots:', error));
    };


    const handleSelectService = (service) => {
        setSelectedService(service);
        setShowServices(false);
        setShowDentists(true)
        setShowDentistStage(true);
        axios.get(`${apiRoot}/dentist/get-dentist-service/${service.id}`)
            .then(response => {
                console.log("Response data: ", response.data)
                if (response.data.statusCode === 200) {
                    setDentistsData(response.data.data);
                } else {
                    console.error('Failed to fetch dentists:', response.data.message);
                }
            }).catch(error => console.error('Error fetching dentists:', error));
    };

    const handleExtendService = () => {
        setShowServices(!showServices);
        if (!showServices) {
            setShowDentistStage(false);
            setShowCalendarStage(false);
            setShowSlotStage(false);
            setShowProfilesStage(false);
            setSelectedService(null);
            setSelectedDentist(null);
            setSelectedDate(null);
            setSelectedSlot(null);
            setSelectedProfile(null);
        }
    }

    const handleSelectDentist = (dentist) => {
        setSelectedDentist(dentist);
        setShowCalendarStage(true);
        setShowCalendar(true);
        setShowDentists(false);
        axios.get(`${apiRoot}/dentist/get-date`, {
            params: {
                id: dentist.id
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.statusCode === 200) {
                    const busyDates = response.data.data.map(dateString => new Date(dateString));
                    setDisabledDates(busyDates);
                } else {
                    console.error('Failed to fetch disabled date:', response.data.message);
                }
            }).catch(error => console.error('Error fetching disabled date:', error));
    }

    const handleExtendDentists = () => {
        setShowDentists(!showDentists);
        if (!showDentists) {
            setShowCalendarStage(false);
            setShowSlotStage(false);
            setShowProfilesStage(false);
            setSelectedDentist(null);
            setSelectedDate(null);
            setSelectedSlot(null);
            setSelectedProfile(null);
        }
    }

    const handleExtendCalendar = () => {
        setShowCalendar(!showCalendar)
        if (!showCalendar) {
            setShowSlotStage(false);
            setShowProfilesStage(false);
            setSelectedDate(null);
            setSelectedSlot(null);
            setSelectedProfile(null);
        }
    }

    const handleExtendSlot = () => {
        setShowSlots(!showSlots)
        if (!showSlots) {
            setShowProfilesStage(false);
            setSelectedSlot(null);
            setSelectedProfile(null);
        }
    }

    const handleSelectSlot = (slot) => {
        axios.get(`${apiRoot}/user-profile/get-profile-by-customer`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            if (res.data.statusCode === 200) {
                setProfileData(res.data.data);
            } else {
                console.log("Fail to fetch profile:", res.data.message);
            }
        }).catch(error => console.log("error fetch profile: ", error.message));
        setSelectedSlot(slot);
        setShowSlots(false);
        setShowProfilesStage(true);
        setShowProfiles(true);
    }

    const handleExtendProfile = () => {
        setShowProfiles(!showProfiles);
    }

    const handleSelectProfile = (profile) => {
        setSelectedProfile(profile);
        setShowProfiles(false);
    }
    const handleBookingAppointment = () => {
        axios.post(`${apiRoot}/appointment/user-booking-appointment`, {
            date: selectedDate,
            serviceId: selectedService.id,
            slotId: selectedSlot.id,
            dentistId: selectedDentist.id,
            patientId: selectedProfile.id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log("Booking data:", res.data);
            const paymentUrl = res.data.data.url;
            console.log(paymentUrl);
            window.location.href = paymentUrl
        }).catch(error => console.log("Error at Booking Appointment: ", error.message));

    }

    return (
        <div>
            <TopNavbar />
            <div className='bookingPageContainer'>
                <div style={{ padding: "50px 0px" }}></div>
                <div className='StageAndProccess'>
                    <div className='allStage'>
                        <div className='stageContainer'>
                            <div className='stageHeader'>
                                <h2 className='stageTitle'>Services</h2>
                                <FontAwesomeIcon
                                    onClick={handleExtendService}
                                    icon={faCaretDown}
                                    className='toggleButton'
                                />
                            </div>
                            {showServices && (
                                <div className='serviceList'>
                                    {servicesData.map(service => (
                                        <div key={service.id} className='serviceItem' onClick={() => { handleSelectService(service) }}>
                                            <h4>{service.name}</h4>
                                            <p><strong>Description:</strong> {service.description}</p>
                                            <p><strong>Expected Duration:</strong> {service.expectedDurationInMinute} mins</p>
                                            <p><strong>Price:</strong> {service.price}</p>
                                            <p><strong>ServiceType:</strong> {service.serviceType}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {showDentistStage &&
                            <div className='stageContainer'>
                                <div className='stageHeader'>
                                    <h2 className='stageTitle'>Dentist</h2>
                                    <FontAwesomeIcon
                                        onClick={handleExtendDentists}
                                        icon={faCaretDown}
                                        className='toggleButton'
                                    />
                                </div>
                                {showDentists && (
                                    <div className='serviceList'>
                                        {dentistsData.map(dentist => (
                                            <div key={dentist.id} className='serviceItem' onClick={() => { handleSelectDentist(dentist) }}>
                                                <h4>{dentist.lastName} {dentist.firstName}</h4>
                                                <p><strong>Email: </strong>{dentist.email}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        }
                        {showCalendarStage && (
                            <div className='stageContainer'>
                                <div className='stageHeader'>
                                    <h2 className='stageTitle'>Date</h2>
                                    <FontAwesomeIcon
                                        onClick={handleExtendCalendar}
                                        icon={faCaretDown}
                                        className='toggleButton'
                                    />
                                </div>
                                {showCalendar && (
                                    <div className="calendar">
                                        <Calendar
                                            locale='en'
                                            tileDisabled={handleDisableDates}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        {showSlotStage && (
                            <div className='stageContainer'>
                                <div className='stageHeader'>
                                    <h2 className='stageTitle'>Slot</h2>
                                    <FontAwesomeIcon
                                        onClick={handleExtendSlot}
                                        icon={faCaretDown}
                                        className='toggleButton'
                                    />
                                </div>
                                {showSlots && (
                                    <div className='slotList'>
                                        {slotsData.map(slot => (
                                            <div key={slot.id} className='slotItem' onClick={() => { handleSelectSlot(slot) }}>
                                                <p>{slot.startAt}-{slot.endAt}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {showProfilesStage && (
                            <div className='stageContainer'>
                                <div className='stageHeader'>
                                    <h2 className='stageTitle'>Profile</h2>
                                    <FontAwesomeIcon
                                        onClick={handleExtendProfile}
                                        icon={faCaretDown}
                                        className='toggleButton'
                                    />
                                </div>
                                {/* <hr className='horizonalLine' /> */}
                                {showProfiles && (
                                    <div className='serviceList'>
                                        {profileData.map(profile => (
                                            <div key={profile.id} className='serviceItem' onClick={() => { handleSelectProfile(profile) }}>
                                                <h4>{profile.lastName} {profile.firstName}</h4>
                                                <p><strong>Gender:</strong> {profile.gender}</p>
                                                <p><strong>Date Of Birth:</strong> {[profile.dateOfBirth]}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='stageProccess'>
                        <h1> Your Appointment </h1>
                        <div className='processContainer'>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Service</p>
                                <p className='processSmallContent'>{selectedService ? selectedService.name : null}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Dentist</p>
                                <p className='processSmallContent'>{selectedDentist ? selectedDentist.lastName + " " + selectedDentist.firstName : null}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Date</p>
                                <p className='processSmallContent'>{selectedDate}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Slot</p>
                                <p className='processSmallContent'>{selectedSlot ? selectedSlot.startAt + "-" + selectedSlot.endAt : null}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Profile</p>
                                <p className='processSmallContent'>{selectedProfile ? selectedProfile.lastName + " " + selectedProfile.firstName : null}</p>
                            </div>
                        </div>
                        <Button type='primary' onClick={handleBookingAppointment} className='btnConfirmBooking'>Confirm Appointment</Button>
                    </div>
                </div>
                <Footer className="footerBookingPage" />
            </div>
        </div>
    );
}
