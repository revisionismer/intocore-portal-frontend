import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, json, useLocation, useNavigate, useParams } from 'react-router-dom';

const Settings = () => {

    const navigate = useNavigate();

    // /settings/profile 로 이동
    const goToProfile = () => {
        navigate('profile');
    };

    return (
        <>
            <div id='main'>
                <div id='settings-area'>
                    <div className="settings-card" onClick={goToProfile}>
                        계정 정보 수정
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default Settings;