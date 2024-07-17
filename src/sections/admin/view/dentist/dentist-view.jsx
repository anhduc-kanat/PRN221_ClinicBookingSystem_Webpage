import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button, Alert, Modal, Form, Input, DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { fDate } from 'src/utils/format-time';
const apiRoot = import.meta.env.VITE_API_ROOT;

export default function DentistPage() {
    const [dentists, setDentists] = useState([]);
    const token = localStorage.getItem("accessToken");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [dentistUpdate, setDentistUpdate] = useState(null);
    const [services, setSetvices] = useState([]);
    const [serviceNames, setServiceNames] = useState([]);
    const [typeAlert, setTypeAlert] = useState({});
    const [form] = Form.useForm();
    const initialValues = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: null,
        services: []
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        axios.get(`${apiRoot}/dentist/get-dentists`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.statusCode === 200) {
                    setDentists(response.data.data);
                } else {
                    console.error('Failed to fetch services:', response.data.message);
                }
            }).catch(error => console.error('Error fetching services:', error));
    };

    useEffect(() => {
        if (dentistUpdate && dentistUpdate.services) {
            const defaultServiceIds = dentistUpdate.services.map(service => service.id);
            form.setFieldsValue({
                ...dentistUpdate,
                dateOfBirth: dentistUpdate.dateOfBirth ? moment(dentistUpdate.dateOfBirth) : null,
                service: defaultServiceIds
            });
        } else {
            form.resetFields();
        }
    }, [dentistUpdate]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Date of birth',
            dataIndex: 'date',
        },
        {
            title: 'Update',
            dataIndex: 'update',
            render: (text, record) => (
                <Button type="primary" onClick={() => showModal(record)}>Update</Button>
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (text, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this record?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <a className='text-red'>Delete</a>
                </Popconfirm>
            ),
        }
    ];

    const data = dentists.map(dentist => ({
        ...dentist,
        name: `${dentist.lastName} ${dentist.firstName}`,
        date: fDate(dentist.dateOfBirth)
    }));

    const handleDelete = (id) => {
        axios.delete(`${apiRoot}/dentist/delete-dentist/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.statusCode === 200) {
                    setTypeAlert("success")
                    setAlertMessage('Account delete successfully');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                    fetchDetails();
                } else {
                    console.error('Failed to fetch services:', response.data.message);
                }
            }).catch(error => console.error('Error fetching services:', error));
    };

    const handleUpdate = () => {
        setIsModal(false);
        form.validateFields().then(values => {
            let formattedDateOfBirth = null;
            if (values.dateOfBirth) {
                const momentDate = values.dateOfBirth;
                if (momentDate.isValid()) {
                    formattedDateOfBirth = momentDate.format('YYYY-MM-DD');
                }
            }
            const updatedDentist = {
                ...dentistUpdate,
                ...values,
                servicesId: values.service,
                dateOfBirth: formattedDateOfBirth 

            };
            console.log(updatedDentist)
            axios.put(`${apiRoot}/dentist/update-dentist/${updatedDentist.id}`, updatedDentist, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.data.statusCode === 200) {
                        setTypeAlert("success")
                        setAlertMessage('Account updated successfully');
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 3000);
                        setDentistUpdate(null)
                        fetchDetails();
                    } else {
                        console.error('Failed to update dentist:', response.data.message);
                    }
                }).catch(error => console.error('Error updating dentist:', error));
        })
            .catch(error => console.error('Error updating dentist:', error));
    };


    const handleAdd = () => {
        form.validateFields().then(values => {
            let formattedDateOfBirth = null;
            if (values.dateOfBirth) {
                const momentDate = values.dateOfBirth;
                if (momentDate.isValid()) {
                    formattedDateOfBirth = momentDate.format('YYYY-MM-DD');
                }
            }
            const addDentist = {
                ...values,
                dateOfBirth: formattedDateOfBirth,
                servicesId: values.service
            };
            console.log(addDentist)
            axios.post(`${apiRoot}/dentist/create-dentist`, addDentist, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.statusCode === 201) {
                    setTypeAlert("success")
                    setAlertMessage('Account add successfully');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                    setDentistUpdate(null)
                    fetchDetails();
                } else {
                    setTypeAlert("error")
                    setAlertMessage(response.data.message);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                    console.error('Failed to add dentist:', response.data.message);
                }
            }).catch(error => console.error('Error add dentist:', error));
        });
    }


    const fetchService = () => {
        axios.get(`${apiRoot}/service/get-all-services`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.statusCode === 200) {
                    const serviceOption = response.data.data.map(service => ({
                        label: service.name,
                        value: service.id
                    }))
                    setSetvices(serviceOption)
                } else {
                    console.error('Failed to fetch service:', response.data.message);
                }
            }).catch(error => console.error('Error fetch service:', error));
    };

    const handleCancel = () => {
        setIsModal(false);
    };

    const showModal = (record) => {
        setDentistUpdate(record || initialValues);
        if (record === null) {
            fetchService()
            setIsUpdate(false)

        } else {
            console.log(dentistUpdate)
            fetchService()
            setIsUpdate(true)
            // const defaultServiceNames = dentistUpdate.services.map(service => service.name);
            // setServiceNames(defaultServiceNames)
        }
        setIsModal(true);
    };

    const handleOk = () => {
        if (isUpdate) {
            handleUpdate()
        } else {
            handleAdd()
        }
    }




    return (
        <>
            {showAlert && (
                <Alert className='mb-5' message={alertMessage} type={typeAlert} showIcon onClose={() => setShowAlert(false)} />
            )}
            <div>
                <div className='mb-4 '>
                    <Button className='p-5' onClick={() => showModal(null)} type='primary'>Add dentist account</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </div>

            <Modal title="Basic Modal" open={isModal} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    variant="filled"
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date of birth"
                        name="dateOfBirth"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <DatePicker />
                    </Form.Item>

                    {/* <Form.Item
                        label="Password"
                        name="password"
                        hidden={isUpdate}
                        rules={[
                            {
                                required: !isUpdate,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}

                    <Form.Item
                        label="Service"
                        name="service"
                        // hidden={isUpdate}
                        rules={[
                            {
                                required: !isUpdate,
                                message: 'Please input!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            style={{
                                width: '100%',
                            }}
                            placeholder="Please select"
                            defaultValue={serviceNames}
                            options={services}
                        />
                    </Form.Item>



                </Form>
            </Modal>
        </>
    );
}
