import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import '../../assets/css/info/info.css';

const Info = () => {

    const navigate = useNavigate();

    // /settings/profile 로 이동
    const goToProfile = () => {
        navigate('profile');
    };

    const menuList = [
        { title: '사이트 소개', path: '/info/about' },
        { title: '자주 묻는 질문', path: '/info/faq' },
        { title: '찾아 오시는 길', path: '/info/location' }
    ];

    return (
        <>
            <div id='main'>
                <div className='info-container'>
                    {menuList.map((menu, index) => (
                        <div id='info-menuList' className='info-menuList' key={index} onClick={() => navigate(menu.path)}>
                            {menu.title}
                        </div>
                    ))}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Info;