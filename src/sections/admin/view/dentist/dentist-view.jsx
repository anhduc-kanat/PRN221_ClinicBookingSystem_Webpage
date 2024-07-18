import React, { useEffect, useState } from 'react';
import { Table, Popconfirm, Button, Alert, Modal, Form, Input, DatePicker, Select, message } from 'antd';
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
    const [specifications, setSpecifications] = useState([]);
    const [form] = Form.useForm();
    const initialValues = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: null,
        specifications: []
    };

    useEffect(() => {
        fetchDetails();
        fetchSpecifications();
    }, []);

    const fetchDetails = async () => {
        axios.get(`${apiRoot}/dentist/get-dentists`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.statusCode === 200) {
                    setDentists(response.data.data);
                } else {
                    console.error('Failed to fetch dentists:', response.data.message);
                }
            }).catch(error => console.error('Error fetching dentists:', error));
    };

    useEffect(() => {
        if (dentistUpdate && dentistUpdate.specifications) {
            const defaultSpecificationIds = dentistUpdate.specifications.map(spec => spec.id);
            form.setFieldsValue({
                ...dentistUpdate,
                dateOfBirth: dentistUpdate.dateOfBirth ? moment(dentistUpdate.dateOfBirth) : null,
                specifications: defaultSpecificationIds
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
                    setAlertMessage('Account deleted successfully');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                    fetchDetails();
                } else {
                    message.error(response.data.message);
                    console.error('Failed to delete dentist:', response.data.message);
                }
            }).catch(error => console.error('Error deleting dentist:', error));
    };

    const handleUpdate = () => {
        setIsModal(false);
        form.validateFields().then(values => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^\d{10}$/;

            if (!emailPattern.test(values.email)) {
                message.error('The input is not a valid E-mail!');
                return;
            }

            if (!phonePattern.test(values.phoneNumber)) {
                message.error('Phone number must be exactly 10 digits!');
                return;
            }
            const updatedDentist = {
                ...dentistUpdate,
                ...values,
                specificationId: values.specifications
            };
            console.log(updatedDentist)
            axios.put(`${apiRoot}/dentist/update-dentist-and-specification/${updatedDentist.id}`, updatedDentist, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.data.statusCode === 200) {
                        setAlertMessage('Account updated successfully');
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 3000);
                        setDentistUpdate(null)
                        fetchDetails();
                    } else {
                        message.error(response.data.message);
                        console.error('Failed to update dentist:', response.data.message);
                    }
                }).catch(error => console.error('Error updating dentist:', error));
        })
            .catch(error => console.error('Error updating dentist:', error));
    };


    const handleAdd = () => {
        form.validateFields().then(values => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phonePattern = /^\d{10}$/;

            if (!emailPattern.test(values.email)) {
                message.error('The input is not a valid E-mail!');
                return;
            }

            if (!phonePattern.test(values.phoneNumber)) {
                message.error('Phone number must be exactly 10 digits!');
                return;
            }
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
                specificationId: values.specifications
            };
            console.log(addDentist)
            axios.post(`${apiRoot}/dentist/create-dentist`, addDentist, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                if (response.data.statusCode === 201) {
                    setAlertMessage('Account added successfully');
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000);
                    setDentistUpdate(null)
                    fetchDetails();
                } else {
                    message.error(response.data.message);
                    console.error('Failed to add dentist:', response.data.message);
                }
            }).catch(error => console.error('Error adding dentist:', error));
        }).catch(error => console.error('Error adding dentist:', error));
    };

    const fetchSpecifications = () => {
        axios.get(`${apiRoot}/specification/get-all-specifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.statusCode === 200) {
                    const specificationOptions = response.data.data.map(spec => ({
                        label: spec.name,
                        value: spec.id
                    }))
                    setSpecifications(specificationOptions)
                } else {
                    message.error(response.data.message);
                    console.error('Failed to fetch specifications:', response.data.message);
                }
            }).catch(error => console.error('Error fetching specifications:', error));
    };

    const handleCancel = () => {
        setIsModal(false);
    };

    const showModal = (record) => {
        setDentistUpdate(record || initialValues);
        if (record === null) {
            fetchSpecifications();
            setIsUpdate(false);
        } else {
            fetchSpecifications();
            setIsUpdate(true);
        }
        setIsModal(true);
    };

    const handleOk = () => {
        if (isUpdate) {
            handleUpdate();
        } else {
            handleAdd();
        }
    };

    return (
        <>
            {showAlert && (
                <Alert className='mb-5' message={alertMessage} type="success" showIcon onClose={() => setShowAlert(false)} />
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
                    <Form.Item
                        label="Specifications"
                        name="specifications"
                        rules={[
                            {
                                required: true,
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
                            options={specifications}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
