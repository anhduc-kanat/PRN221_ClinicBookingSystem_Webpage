import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Radio
} from 'antd';
import { Alert } from "antd";
import axios from 'axios';
import { last } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

export default function ProfileForm({ updateProfileData, fetchDetails }) {
    const [form] = Form.useForm(); // Sử dụng hook useForm của antd để quản lý form
    const apiRoot = import.meta.env.VITE_API_ROOT;
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const initialValues = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        cccd: '',
        gender: 0,
        dateOfBirth: null,
        type: 'Cha',
    };
    useEffect(() => {
        if (updateProfileData != null) {
            const data = {
                ...updateProfileData,
                dateOfBirth: moment(updateProfileData.dateOfBirth)
            }
            form.setFieldsValue(data);
        } else {
            form.setFieldsValue(initialValues);
        }
    }, [updateProfileData, form]);

    const handleNewProfile = () => {
        form.validateFields().then(values => {

            let formattedDateOfBirth = null;
            if (values.dateOfBirth) {
                const momentDate = values.dateOfBirth;
                if (momentDate.isValid()) {
                    formattedDateOfBirth = momentDate.format('YYYY-MM-DD');
                }
            }
            const data = {
                ...values,
                phoneNumber: values.phoneNumber ? `${values.phoneNumber}` : '',
                cccd: values.cccd ? `${values.cccd}` : '',
                dateOfBirth: formattedDateOfBirth
            };
            console.log(data)
            const token = localStorage.getItem("accessToken");
            axios.post(`${apiRoot}/user-profile/new`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setAlertMessage('Hồ sơ đã được thêm thành công.');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
                fetchDetails();
                form.resetFields()
            }).catch(error => console.log("Error at Booking Appointment: ", error.message));
        }).catch(errorInfo => {
            console.error('Validate Failed:', errorInfo);
        });
    }

    const handleUpdateProfile = () => {
        form.validateFields().then(values => {

            let formattedDateOfBirth = null;
            if (values.dateOfBirth) {
                const momentDate = values.dateOfBirth;
                if (momentDate.isValid()) {
                    formattedDateOfBirth = momentDate.format('YYYY-MM-DD');
                }
            }
            const data = {
                firstName : values.firstName,
                lastName: values.lastName,
                address: values.address,
                email: values.email,
                type: values.type,
                sex : values.gender,
                phone: values.phoneNumber ? `${values.phoneNumber}` : '',
                cccd: values.cccd ? `${values.cccd}` : '',
                dateOfBirth: formattedDateOfBirth
            };
            console.log(data)
            const token = localStorage.getItem("accessToken");
            axios.put(`${apiRoot}/user-profile/update`, data, {
                params:{
                    id: updateProfileData.id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => {
                setAlertMessage('Hồ sơ đã được thay đổi thành công.');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
                fetchDetails();
                form.resetFields()
            }).catch(error => console.log("Error at Booking Appointment: ", error.message));
        }).catch(errorInfo => {
            console.error('Validate Failed:', errorInfo);
        });
    }


    const handleSubmit = () => {
        if (updateProfileData) {
            handleUpdateProfile();
        } else {
            handleNewProfile();
        }
    };

    return (

        <Form variant="filled" style={{ maxWidth: 600 }} form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <h4 className='font-bold text-xl mb-5'>Information</h4>
            {showAlert && (
                <Alert className='mb-5' message={alertMessage} type="success" showIcon onClose={() => setShowAlert(false)} />
            )}

            <div className=''>
                <div className=''>
                    <Form.Item label={<span className="text-lg">First Name</span>} name="firstName" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input className="text-md" style={{ width: '50%' }} />
                    </Form.Item>
                    <Form.Item label={<span className="text-lg">Last Name</span>} name="lastName" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input className="text-md" style={{ width: '50%' }} />
                    </Form.Item>
                    <Form.Item label={<span className="text-lg">Address</span>} name="address" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input className="text-md" style={{ width: '50%' }} />
                    </Form.Item>
                    <Form.Item label={<span className="text-lg">Email</span>} name="email" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input className="text-md" style={{ width: '50%' }} />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item
                        label={<span className="text-lg">Phone</span>}
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Input type='number' className="text-md" style={{ width: '50%' }} />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-lg">CCCD</span>}
                        name="cccd"
                    >
                        <Input type='number' className="text-md" style={{ width: '50%' }} />
                    </Form.Item>

                    <Form.Item label={<span className="text-lg">Gender</span>} name="gender" rules={[{ required: true, message: 'Please input!' }]}>
                        <Select className="text-md"
                            options={[
                                { value: 0, label: 'Man' },
                                { value: 1, label: 'Woman' }
                            ]} style={{ width: '50%' }} />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-lg">Date of birth</span>}
                        name="dateOfBirth"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <DatePicker style={{ width: '50%' }} />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-lg">Type</span>}
                        name="type"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <Radio.Group name="radiogroup" defaultValue={1}>
                            <Radio className='text-lg' value={"Dad"}>Dad</Radio>
                            <Radio className='text-lg' value={"Mom"}>Mom</Radio>
                            <Radio className='text-lg' value={"Son"}>Son</Radio>
                            <Radio className='text-lg' value={"Sibling"}>Sibling</Radio>
                        </Radio.Group>
                    </Form.Item>

                </div>
            </div>



            <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                    {updateProfileData ? 'Update' : 'Submit'}
                </Button>
            </Form.Item>
        </Form>
    )
}



