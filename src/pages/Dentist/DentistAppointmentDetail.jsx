import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Dentists.css';
import { Button, DatePicker, Select } from "antd";
import axios from "axios";
import { CloseOutlined } from "@mui/icons-material";
const apiRoot = import.meta.env.VITE_API_ROOT;
const token = localStorage.getItem('accessToken');

export default function DentistAppointmentDetail() {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [dates, setDates] = useState([{ value: "" }]);

    useEffect(() => {
        axios.get(`${apiRoot}/appointment/get-appointment-by-id/${id}`)
            .then(res => {
                console.log(res.data);
                setAppointment(res.data.data);
            })
            .catch(error => console.log("Error at fetch appointment detail: ", error.message));
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

        const meetings = dates.map(date => ({ date: date.value }));

        console.log(meetings);
        console.log(selectedService);
        console.log(id);

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
                    })
                    .catch(error => console.log("Error at fetch appointment detail: ", error.message));
            })
            .catch(error => {
                console.log("Error at Add Service: ", error.response.data);
            });
    };

    return (
        <div>
            {appointment ? (
                <>
                    <div className="dentist-appointment-div">
                        <h1>Appointment</h1>
                        <p>Account Name: {appointment.userAccountName}</p>
                        <p>Profile Name: {appointment.patientName}</p>
                        <p>Slot: {appointment.startAt + "-" + appointment.endAt}</p>
                        <p>Date: {appointment.date}</p>
                    </div>
                    <div className="dentist-appointment-detail-header">
                        {appointment.result ? (
                            <div className="dentist-result-div">
                                <h1>Result of Appointment</h1>
                                <h2>Patient Name: {appointment.result.userTreatmentName}</h2>
                                {appointment.result.notes && appointment.result.notes.length > 0 ? (
                                    appointment.result.notes.map(note => (
                                        <div key={note.id}>
                                            <p>Service: {note.ServiceName}</p>
                                            <p>Dentist: {note.DentistName}</p>
                                            <p>Content: {note.Content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="dentist-result-note-none">
                                        <p>No notes available.</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="dentist-result-div-none">
                                <p>No Result</p>
                                <Button type="primary" className="dentist-create-result-btn">Create Result</Button>
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
                                                                />
                                                                <Button
                                                                    type="primary"
                                                                    danger
                                                                    icon={<CloseOutlined />}
                                                                    onClick={() => deleteDateField(index)}
                                                                />
                                                            </div>
                                                        ))}
                                                        <Button type="primary" onClick={addDateField}>Add Another Date</Button>
                                                        {dates.every(date => date.value !== "") && (
                                                            <Button type="primary" onClick={handleAddService}>Add Service</Button>
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
                <p>Loading...</p>
            )}
        </div>
    );
}
