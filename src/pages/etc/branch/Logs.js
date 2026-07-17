import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/etc/logs.css';

const Logs = ({ user, setUser }) => {

    const [logs, setLogs] = useState([]);

    useEffect(() => {

        axios.get("/api/logs/s/access-logs",
            {
                withCredentials: true
            }
        ).then(function (res) {

            console.log(res);

            if (res.data.code === 1) {
                setLogs(res.data.data);
            }

        }).catch(function (err) {
            if (err.response?.status !== 401) {
                console.log(err.response?.data);
            }
        });

    }, []);

    return (
        <div id='main'>
            <div className="login-logs-container">
                {/* 페이지 헤더 */}
                <div className="logs-header">
                    <h1>로그인 기록</h1>
                    <p>최근 접속한 활동 내역을 확인합니다.</p>
                </div>

                {/* 데이터 테이블 */}
                <table className="logs-table">
                    <thead>
                        <tr>
                            <th>일시</th>
                            <th>로그인 IP</th>
                            <th>아이디</th>
                            <th>국가</th>
                            <th>기기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 데이터가 있을 때 */}
                        {logs.length > 0 ? (
                            logs.map((log) => (
                                <tr key={log.id}>
                                    <td>{log.createdDate}</td>
                                    <td>{log.ip}</td>
                                    <td>{log.username}</td>
                                    <td>{log.country}</td>
                                    <td>{log.device}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-data">최근 접속 기록이 없습니다.</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Logs;