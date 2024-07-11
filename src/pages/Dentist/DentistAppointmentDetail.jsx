import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Dentists.css';
import { Button, DatePicker, Select, Spin } from "antd";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";

const apiRoot = import.meta.env.VITE_API_ROOT;
const token = localStorage.getItem('accessToken');
const userProfile = JSON.parse(localStorage.getItem('profile'));

export default function DentistAppointmentDetail() {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [dates, setDates] = useState([{ value: "" }]);
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${apiRoot}/appointment/get-appointment-by-id/${id}`)
            .then(res => {
                console.log(res.data);
                setAppointment(res.data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Error at fetch appointment detail: ", error.message);
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`${apiRoot}/service/get-all-services`)
            .then(res => {
                console.log(res.data);
                setServices(res.data.data);
            })
            .catch(error => console.log("Error at fetch services: ", error.message));
    }, []);

    const handleServiceChange = (serviceId) => {
        setSelectedService(serviceId);
        console.log("Selected service ID:", serviceId);
    };

    const handleDateChange = (date, dateString, index) => {
        const newDates = [...dates];
        newDates[index].value = dateString;
        setDates(newDates);
    };

    const deleteDateField = (index) => {
        const newDates = dates.filter((_, i) => i !== index);
        setDates(newDates);
    };

    const addDateField = () => {
        setDates([...dates, { value: "" }]);
    };

    const handleAddService = () => {
        if (!selectedService || dates.some(date => date.value === "")) {
            console.log("No service selected or not all dates provided");
            return;
        }

        setIsLoading(true);

        const meetings = dates.map(date => ({ date: date.value }));
        axios.post(
            `${apiRoot}/appointment/dentist-add-service-into-appointment/${id}`,
            [
                {
                    businessServiceId: selectedService,
                    meetings: meetings
                }
            ],
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => {
                console.log(res.data);
                // Reload the appointment data
                setSelectedService(null);
                setDates([{ value: "" }]);
                axios.get(`${apiRoot}/appointment/get-appointment-by-id/${id}`)
                    .then(res => {
                        setAppointment(res.data.data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log("Error at fetch appointment detail: ", error.message);
                        setIsLoading(false);
                    });
            })
            .catch(error => {
                console.log("Error at Add Service: ", error.response.data);
                setIsLoading(false);
            });
    };

    const handleAddNote = async () => {
        const currentDate = new Date().toISOString().split('T')[0];
        let appointmentBusinessServiceId = null;

        appointment.appointmentServices.forEach(service => {
            service.meetings.forEach(meeting => {
                if (
                    meeting.date === currentDate &&
                    meeting.status === 2 &&
                    meeting.dentistId === userProfile.id
                ) {
                    appointmentBusinessServiceId = service.id;
                }
            });
        });

        if (appointmentBusinessServiceId) {
            setIsLoading(true);
            try {
                await axios.post(`${apiRoot}/note/dentist-add-note`, {
                    content: note,
                    resultId: appointment.result.id,
                    appointmentBusinessServiceId,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNote('');
                const res = await axios.get(`${apiRoot}/appointment/get-appointment-by-id/${id}`);
                setAppointment(res.data.data);
            } catch (err) {
                console.log("Error at fetch appointment detail: ", err.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            // Handle case where no matching appointmentBusinessServiceId is found
        }
    };

    return (
        <div>
            {isLoading && (
                <div className="loading-overlay">
                    <Spin size="large" />
                </div>
            )}
            <div className={isLoading ? "content-container blur" : "content-container"}>
                {appointment ? (
                    <>
                        <div className="dentist-first-div">
                            <div className="dentist-appointment-div">
                                <h1>Appointment</h1>
                                <p>Account Name: {appointment.userAccountName}</p>
                                <p>Profile Name: {appointment.patientName}</p>
                                <p>Slot: {appointment.startAt + "-" + appointment.endAt}</p>
                                <p>Date: {appointment.date}</p>
                            </div>
                            <div className="dentist-done-btn">
                                <button>Done</button>
                            </div>
                        </div>
                        <div className="dentist-appointment-detail-header">
                            {appointment.result ? (
                                <div className="dentist-result-div">
                                    <h1>Result of Appointment</h1>
                                    <h2 className="result-patient-name">Patient Name: {appointment.result.userTreatmentName}</h2>
                                    {appointment.result.notes && appointment.result.notes.length > 0 ? (
                                        appointment.result.notes.map(note => (
                                            <div key={note.id} className="note-each-div">
                                                <p className="note-dentist-service">{note.dentistName} - {note.serviceName}</p>
                                                <div className="note-content">{note.content}</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="dentist-result-note-none">
                                            <p>No notes available.</p>
                                        </div>
                                    )}
                                    <div className="content-of-description">
                                        <textarea
                                            className="textarea-description"
                                            placeholder="Enter description here..."
                                            value={note}
                                            onChange={e => setNote(e.target.value)}
                                            disabled={isLoading}
                                        ></textarea>
                                    </div>
                                    <Button type="primary" onClick={handleAddNote} disabled={isLoading}>Add Note</Button>
                                </div>
                            ) : (
                                <div className="dentist-result-div-none">
                                    <p>No Result</p>
                                    <Button type="primary" className="dentist-create-result-btn" disabled={isLoading}>Create Result</Button>
                                </div>
                            )}
                            {appointment.appointmentServices && appointment.appointmentServices.length > 0 ? (
                                <>
                                    <div className="dentist-service-div">
                                        <h1>Services of Appointment</h1>
                                        {appointment.appointmentServices.map(service => (
                                            <div key={service.id}>
                                                <p>Dentist Name: {service.dentistName}</p>
                                                <p>Service Name: {service.serviceName}</p>
                                                <hr></hr>
                                            </div>
                                        ))}
                                        <h1 className="dentist-add-service-h1">Select a Service</h1>
                                        <div className="dentist-add-service-div">
                                            <div>
                                                <div className="dentist-add-service-select">
                                                    <Select
                                                        placeholder="Select a service"
                                                        onChange={handleServiceChange}
                                                        style={{ width: 200 }}
                                                        disabled={isLoading}
                                                    >
                                                        {services.map(service => (
                                                            <Select.Option key={service.id} value={service.id}>
                                                                {service.name}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <div className="dentist-add-service-date-box">
                                                    {selectedService && (
                                                        <>
                                                            {dates.map((date, index) => (
                                                                <div key={index} className="each-date-box">
                                                                    <DatePicker
                                                                        onChange={(date, dateString) => handleDateChange(date, dateString, index)}
                                                                        style={{ margin: '0 0 10px', width: '100%' }}
                                                                        disabled={isLoading}
                                                                    />
                                                                    <Button
                                                                        type="primary"
                                                                        danger
                                                                        icon={<CloseOutlined />}
                                                                        onClick={() => deleteDateField(index)}
                                                                        disabled={isLoading}
                                                                    />
                                                                </div>
                                                            ))}
                                                            <Button type="primary" onClick={addDateField} disabled={isLoading}>Add Another Date</Button>
                                                            {dates.every(date => date.value !== "") && (
                                                                <Button type="primary" onClick={handleAddService} disabled={isLoading}>Add Service</Button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="dentist-service-note-none">
                                    <p>No service available.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    !isLoading && <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
