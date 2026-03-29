import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../assets/css/etc/settings.css';

const Settings = () => {

    const navigate = useNavigate();

    // /settings/profile 로 이동
    const goToProfile = () => {
        navigate('profile');
    };

    const menuList = [
        { title: '계정 정보', path: '/settings/profile' },
        { title: '비밀번호 변경', path: '/settings/password' },
        { title: '샘플1', path: '/settings/sample1' },
        { title: '샘플2', path: '/settings/sample2' },
    ];

    return (
        <>
            <div id='main'>
                <div className='settings-container'>
                {menuList.map((menu, index) => (
                    <div id='settings-menuList' className='settings-menuList' key={index} onClick={() => navigate(menu.path)}>
                    {menu.title}
                </div>
                ))}
             <Outlet />
                </div>
            </div>
        </>
    );
};

export default Settings;