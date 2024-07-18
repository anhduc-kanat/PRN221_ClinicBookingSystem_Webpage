import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Col, Row, Button, Modal, message } from 'antd';
import { Helmet } from 'react-helmet-async';
import dayjs from 'dayjs';
import './Dentists.css';
import axios from 'axios';

const apiRoot = import.meta.env.VITE_API_ROOT;

export default function DentistProfile() {
  const [profile, setProfile] = useState(null);
  const [responsibleServices, setResponsibleServices] = useState([]);
  const [isChangePasswordModal, setIsChangePasswordModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    setProfile(storedProfile);
    setResponsibleServices(storedProfile.businessServices);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModal(true);
  }

  const handleChangePassword = async () => {
    const values = await form.validateFields();
    const { oldPassword, newPassword } = values;
    await axios.post(`${apiRoot}/user/change-password/${profile.id}`, null,
      {
        params: {
          oldPassword,
          newPassword
        }
      }
    ).then(res => {
      console.log(res)
      if (res.data.statusCode === 200 || res.data.statusCode === 201) {
        message.success(res.data.message);
        setIsChangePasswordModal(false);
        form.resetFields();
      } else {
        message.error(res.data.message);
      }
    }).catch(err => {
      console.log(err)
      message.error("Wrong password");
    })


  }

  const handleCancelChangePassword = () => {
    setIsChangePasswordModal(false);
    form.resetFields();
  }

  return (
    <>
      <Helmet>
        <title>Dentist Profile</title>
      </Helmet>
      <h1 className='profile-title'>{profile.firstName}'s Profile</h1>
      <div className='dentist-profile-form'>
        <Form
          layout='vertical'
          initialValues={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            address: profile.address,
            dateOfBirth: dayjs(profile.dateOfBirth),
            email: profile.email,
            phoneNumber: profile.phoneNumber,
          }}
        >
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item label='First Name' name='firstName'>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Last Name' name='lastName'>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item label='Date of Birth' name='dateOfBirth'>
                <DatePicker readOnly style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label='Address' name='address'>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label='Email' name='email'>
            <Input readOnly />
          </Form.Item>
          <Form.Item label='Phone Number' name='phoneNumber'>
            <Input readOnly />
          </Form.Item>
        </Form>
        <div>
          <p className='profile-title'>Responsible Services</p>
          {responsibleServices.length > 0 ? (
            responsibleServices.map((service, index) => (
              <li key={index}>{service.name}</li>
            ))
          ) : (
            <>
              <h3>No Services Found</h3>
            </>
          )}
        </div>
      </div>
      <Button style={{ width: '30%' }} onClick={handleOpenChangePasswordModal}>Change Password</Button>
      <Modal title="Change Password" open={isChangePasswordModal} onOk={handleChangePassword} onCancel={handleCancelChangePassword}>
        <Form
          form={form}
          variant='filled'
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Old Password"
            name='oldPassword'
            rules={[
              {
                required: true,
                message: "Please input your old password"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please input your new password"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
