import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Col, Row, Button } from 'antd';
import { Helmet } from 'react-helmet-async';
import dayjs from 'dayjs';
import './Dentists.css';

export default function DentistProfile() {
  const [profile, setProfile] = useState(null);
  const [responsibleServices, setResponsibleServices] = useState([]);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    setProfile(storedProfile);
    setResponsibleServices(storedProfile.businessServices);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = () => {

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
            responsibleServices.map((service, index ) => (
              <li key={index}>{service.name}</li>
            ))
          ) : (
            <>
              <h3>No Services Found</h3>
            </>
          )}
        </div>
      </div>
      <Button style={{width: '30%'}}  onclick={handleChangePassword} >Change Password</Button>
    </>
  );
}
