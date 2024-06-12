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
// const apiRoot = process.env.REACT_APP_API_ROOT;
export default function BookingPage() {
    const [showServices, setShowServices] = useState(true);
    const [selectedService, setSelectedService] = useState(null);

    const [showDentists, setShowDentists] = useState(false);
    const [selectedDentist, setSelectedDentist] = useState(null);
    const [showDentistStage, setShowDentistStage] = useState(false);

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendarStage, setShowCalendarStage] = useState(false);

    const [showSlots, setShowSlots] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showSlotStage, setShowSlotStage] = useState(false);

    const [showProfiles, setShowProfiles] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showProfilesStage, setShowProfilesStage] = useState(false);

    const [servicesData, setServicesData] = useState([]);

    // useEffect(() => {
    //     console.log("API Root: ", apiRoot);
    //     axios.get(`${apiRoot}/service/get-all-services`)
    //         .then(response => {
    //             console.log("Response data: ", response.data)
    //             if (response.data.statusCode === 200) {
    //                 setServicesData(response.data.data);
    //             } else {
    //                 console.error('Failed to fetch services:', response.data.message);
    //             }
    //         }).catch(error => console.error('Error fetching services:', error));
    // }, []);

    const serviceList = [
        {
            id: 1,
            serviceName: 'Haircut',
            description: 'Get your hair cut by our professional stylists.',
            duration: '1 hour'
        },
        {
            id: 2,
            serviceName: 'Manicure',
            description: 'Pamper yourself with a relaxing manicure session.',
            duration: '45 minutes'
        },
        {
            id: 3,
            serviceName: 'Pedicure',
            description: 'Enjoy a relaxing pedicure session.',
            duration: '45 minutes'
        },
        {
            id: 4,
            serviceName: 'Massage',
            description: 'Relax with a full body massage.',
            duration: '1 hour'
        },
    ];
    const dentistList = [
        {
            id: 1,
            dentistName: 'Kalen',
            description: 'Get your hair cut by our professional stylists.',
            duration: '1 hour'
        },
        {
            id: 2,
            dentistName: 'Kanat',
            description: 'Pamper yourself with a relaxing manicure session.',
            duration: '45 minutes'
        },
        {
            id: 3,
            dentistName: 'Taboo',
            description: 'Enjoy a relaxing pedicure session.',
            duration: '45 minutes'
        },
        {
            id: 4,
            dentistName: 'Young',
            description: 'Relax with a full body massage.',
            duration: '1 hour'
        },
    ];
    const slotList = [
        {
            id: 1,
            slotName: 'Slot 1',
            description: '7h30 - 7h45',
            duration: '15 minutes'
        },
        {
            id: 2,
            slotName: 'Slot 2',
            description: '7h45 - 8h',
            duration: '15 minutes'
        },
        {
            id: 3,
            slotName: 'Slot 3',
            description: '8h - 8h15',
            duration: '15 minutes'
        },
        {
            id: 4,
            slotName: 'Slot 4',
            description: '8h15-8h30',
            duration: '15 minutes'
        },
    ];

    const profileList = [
        {
            id: 1,
            profileName: 'Ho Vo Nguyen Le',
            description: 'Profile cua toi',
            relationship: 'Toi'
        },
        {
            id: 2,
            profileName: 'HEHEEHE',
            description: 'Profile cua me',
            relationship: 'Mom'
        },
        {
            id: 3,
            profileName: 'hahaha',
            description: 'Profile cua ba',
            relationship: 'Dad'
        },
        {
            id: 4,
            profileName: 'Hihihi',
            description: 'Profile cua em',
            relationship: 'sister'
        },
    ];

    const disabledDates = [
        new Date(2024, 5, 10),
        new Date(2024, 5, 15),
        new Date(2024, 5, 20),
        // Add more dates as needed
    ];

    const handleDisableDates = ({ date, view }) => {
        // Disable specific dates
        if (view === 'month') {
            return disabledDates.some(disabledDate =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
            );
        }
        return false;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date.toDateString());
        setShowCalendar(false)
        setShowSlotStage(true);
        setShowSlots(true);
    };


    const handleSelectService = (service) => {
        setSelectedService(service);
        setShowServices(false);
        setShowDentists(true)
        setShowDentistStage(true);
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
                                    {serviceList.map(service => (
                                        <div key={service.id} className='serviceItem' onClick={() => { handleSelectService(service.name) }}>
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
                                        {dentistList.map(dentist => (
                                            <div key={dentist.id} className='serviceItem' onClick={() => { handleSelectDentist(dentist.dentistName) }}>
                                                <h4>{dentist.dentistName}</h4>
                                                <p><strong>Description:</strong> {dentist.description}</p>
                                                <p><strong>Duration:</strong> {dentist.duration}</p>
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
                                    <div className='serviceList'>
                                        {slotList.map(slot => (
                                            <div key={slot.id} className='serviceItem' onClick={() => { handleSelectSlot(slot.slotName) }}>
                                                <h4>{slot.slotName}</h4>
                                                <p><strong>Description:</strong> {slot.description}</p>
                                                <p><strong>Duration:</strong> {slot.duration}</p>
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
                                        {profileList.map(profile => (
                                            <div key={profile.id} className='serviceItem' onClick={() => { handleSelectProfile(profile.profileName) }}>
                                                <h4>{profile.profileName}</h4>
                                                <p><strong>Description:</strong> {profile.description}</p>
                                                <p><strong>Duration:</strong> {[profile.relationship]}</p>
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
                                <p className='processSmallContent'>{selectedService}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Dentist</p>
                                <p className='processSmallContent'>{selectedDentist}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Date</p>
                                <p className='processSmallContent'>{selectedDate}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Slot</p>
                                <p className='processSmallContent'>{selectedSlot}</p>
                            </div>
                            <div className='processRow'>
                                <p className='processSmallTitle'>Profile</p>
                                <p className='processSmallContent'>{selectedProfile}</p>
                            </div>
                        </div>
                        <Button type='primary' className='btnConfirmBooking'>Confirm Appointment</Button>
                    </div>
                </div>
                <Footer className="footerBookingPage" />
            </div>
        </div>
    );
}
