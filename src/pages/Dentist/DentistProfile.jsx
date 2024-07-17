import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker } from 'antd';
import { Helmet } from 'react-helmet-async';
import dayjs from 'dayjs';

export default function DentistProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    setProfile(storedProfile);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Dentist Profile</title>
      </Helmet>
      <h1>Dentist Profile</h1>
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
          <Form.Item label='First Name' name='firstName'>
            <Input readOnly />
          </Form.Item>
          <Form.Item label='Last Name' name='lastName'>
            <Input readOnly />
          </Form.Item>
          <Form.Item label='Address' name='address'>
            <Input readOnly />
          </Form.Item>
          <Form.Item label='Date of Birth' name='dateOfBirth'>
            <DatePicker readOnly />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input readOnly />
          </Form.Item>
          <Form.Item label='Phone Number' name='phoneNumber'>
            <Input readOnly />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
