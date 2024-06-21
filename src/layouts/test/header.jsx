import React from 'react';

const customStyle = {
    width: '24px',
    height: '24px',
  };
const Header = () => (
    <header>
        <div className='row '>
            <div className='col-md-3'>
                <a href=''><img src='../../assets/svg/Logo' alt='Clinic Logo' /></a>
            </div>
            <div className='col-md-6'>
                    <ul className='flex align-items-center '>
                        <li className='col-md-4 text-center'>Đặt khám</li> 
                        <li className='col-md-4 text-center'>Tư vấn trực tuyến</li>
                        <li className='col-md-4 text-center'>Tin Y tế</li>
                    </ul>
            </div>
        <div className='col-md-3'>
            <div>
            <svg style={customStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
            </div>
            <span>+84915984817</span>
            <div className='dropdown-toggle'/>
            <ul className=''>
                        <li className='text-center'>Đặt khám</li> 
                        <li className='text-center'>Tư vấn trực tuyến</li>
                        <li className=' text-center'>Tin Y tế</li>
            </ul>
        </div>
    </div>
    </header >
);
export default Header;