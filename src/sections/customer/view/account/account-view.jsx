
import { Button } from 'antd';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import React, { useState, useEffect } from 'react';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function AccountPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [profile, setProfile] = useState({});

  

    useEffect(() => {
        const p = JSON.parse(localStorage.getItem("profile"));
        setProfile(p);

    });


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="row container">
            <div className="left col-md-6 col-sm-6 border-r-2 border-solid border-zinc">
                <div>
                    <h2 className='font-bold text-xl mb-5'>Thông tin tài khoản</h2>
                </div>
                <div className='appointment pe-10 '>
                    <div  >
                        <div className="flex justify-between mt-3 text-lg">
                            <span>Họ và tên</span>
                            <span>{profile.lastName} {profile.firstName}</span>
                        </div>
                        <div className="flex justify-between mt-3 text-lg">
                            <span>Số điện thoại</span>
                            <span>{profile.phoneNumber}</span>
                        </div>
                        <div className="flex justify-between mt-3 text-lg">
                            <span>Ngày sinh</span>
                            <span>{fDate(profile.dateOfBirth)}</span>
                        </div>
                        <div className="flex justify-between mt-3 text-lg">
                            <span>Địa chỉ</span>
                            <span>{profile.address}</span>
                        </div>
                        <div className="flex justify-between mt-3 text-lg">
                            <span>Email</span>
                            <span>{profile.email}</span>
                        </div>
                        <div className='mt-5 text-lg'>
                            <a className='text-primary cursor-pointer'>Thay đổi thông tin</a>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-md-6 col-sm-6">
                <div className='appointment-detail-up'>
                    <h4 className='font-bold text-xl mb-5'>Thay đổi mật khẩu</h4>
                    <div>
                        <p className='text-lg'>Mật khẩu cũ <span className='text-red'>*</span></p>
                    </div>
                    <div>
                        <FormControl sx={{ m: 0, width: '50ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div className='mt-5'>
                        <p className='text-lg'>Mật khẩu mới <span className='text-red'>*</span></p>
                    </div>
                    <div >
                    <FormControl sx={{ m: 0, width: '50ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>


                </div>
                <div className='flex justify-end mt-8'>
                    <div >
                        <Button type="primary">Thay đổi</Button>
                    </div>
                </div>
            </div>


        </div>
    )
}

