import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/etc/notification.css';

const Notification = ({ user, setUser }) => {

    const navigate = useNavigate();

    // 기존 settings 대신 preferences 사용
    const [preferences, setPreferences] = useState({
        isApprovalEnabled: false,
        isNoticeEnabled: false,
    });

    // 변경 함수
    const handleChange = (e) => {
        const { name, checked } = e.target;

        setPreferences(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    useEffect(() => {
        console.log('현재 설정 상태:', preferences);

    }, [preferences]);

    // 2026-06-09 : 로그인한 계정이 갖고 있는 알림설정 정보를 가져오기
    useEffect(() => {
        axios.get("/api/notifications/s",
            {
                withCredentials: true
            }
        ).then(function (res) {

            console.log(res);

            if (res.data.code === 1) {
                setPreferences({
                    isApprovalEnabled: res.data.data[0].isApprovalEnabled,
                    isNoticeEnabled: res.data.data[0].isNoticeEnabled
                });
            }


        }).catch(function (err) {
            if (err.response?.status !== 401) {
                console.log(err.response?.data);
            }
        });

    }, []);

    const saveNotificationPreferences = async () => {
        const url = `/api/notifications/s/preferences`;

        const updateUserNotificationForm = {
            isApprovalEnabled: preferences.isApprovalEnabled,   // 백엔드 DTO의 필드명과 일치
            isNoticeEnabled: preferences.isNoticeEnabled,
        };

        axios.put(url,
            // 2-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(updateUserNotificationForm),
            // 2-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                withCredentials: true
            }
        ).then(function (res) {
            console.log(res);

            if (res.data.code === 1) {
                alert(res.data.message);

                // 2026-05-14 : 비밀번호 변경 완료, 화면이동이던지 뭘 더 추가해줘야함
                return;
            }

        }).catch(function (res) {
            console.log(res);
            if (res.response.status === 500) {

                alert(res.response.statusText);
                return;
            }

            alert(res.response.data.message);
            return;
        })

    }

    return (
        <div id='main'>
            <div className="notification-container">
                <h2>알림 설정</h2>
                <p className="description">업무 알림 수신 여부를 설정하세요.</p>

                <div className="setting-item">
                    <input type="checkbox" id='isApprovalEnabled' name='isApprovalEnabled' checked={preferences.isApprovalEnabled} onChange={handleChange} />
                    <label htmlFor='isApprovalEnabled'>결재완료 알림 수신</label>
                </div>

                <div className="setting-item">
                    <input type="checkbox" id='isNoticeEnabled' name='isNoticeEnabled' checked={preferences.isNoticeEnabled} onChange={handleChange} />
                    <label htmlFor='isNoticeEnabled'>공지사항 알림 수신</label>
                </div>

                <button id='saveNotificationPreferencesBtn' className="save-btn" onClick={() => saveNotificationPreferences()}>
                    저장하기
                </button>
            </div>
        </div>
    );
};

export default Notification;