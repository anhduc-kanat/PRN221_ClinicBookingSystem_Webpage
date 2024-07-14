import React, { useState } from 'react';
import {
    Button,
    Form,
    Input,
    Card,
    DatePicker,
    Alert
} from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiRoot = import.meta.env.VITE_API_ROOT;

export default function SignUp() {
    const navigate = useNavigate(); // Hook for programmatic navigation
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const initialValues = {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: null,
    };

    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };


    const handleSignUp = () => {
        form.validateFields().then(values => {
            const signupData = {
                ...values,
                dateOfBirth: moment(values.date.$d).format('MM/DD/YYYY')
            };
            console.log(signupData)
            axios.post(`${apiRoot}/authentication/register`, signupData)
                .then(response => {
                    if (response.data.statusCode === 201) {
                        navigate("/login");
                    } else {
                        setAlertMessage(response.data.message);
                        setShowAlert(true);
                        setTimeout(() => {
                            setShowAlert(false);
                        }, 3000);
                        console.error('Failed to sign up:', response.data.message);
                    }
                }).catch(error => console.error('Error sign up:', error));
        }).catch(error => console.error('Error sign up:', error));
    }

    return (
        <>

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md p-7" title="Sign Up" bordered={false}>
                    {showAlert && (
                        <Alert className='mb-5' message={alertMessage} type='error' showIcon onClose={() => setShowAlert(false)} />
                    )}
                    <Form
                        form={form}
                        {...formItemLayout}
                        name="register"
                        scrollToFirstError
                        initialValues={initialValues}
                    >
                        <Form.Item
                            name="phoneNumber"
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your first name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Date of birth"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your date of birth!',
                                },
                            ]}
                        >
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" htmlType="submit" className="w-full" onClick={handleSignUp}>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>

    );
}
