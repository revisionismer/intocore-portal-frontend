import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/etc/logs.css';

const Logs = ({ user, setUser }) => {

    const [logs, setLogs] = useState([]);

    const navigate = useNavigate();

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
            const status = err.response?.status;
            const message = err.response?.data?.message;

            // 응답 없음: 서버 다운, 네트워크 오류, 타임아웃
            if (!err.response) {
                console.error(err);
                alert("서버와의 연결이 되어있지 않습니다.");
                navigate("/login");
                return;
            }

            // 400: 입력값 오류, 업무 오류 → alert만
            if (status === 400) {
                alert(message || "요청 내용을 확인해 주세요.");
                return;
            }

            // 401, 403: 세션 만료, 권한 없음 → alert + 로그인 이동
            if (status === 401 || status === 403) {
                alert(message || "로그인이 필요합니다.");
                navigate("/login");
                return;
            }

            // 404
            if (status === 404) {
                alert(message || "요청한 정보를 찾을 수 없습니다.");
                return;
            }

            // 500: 서버 오류 → alert만 (main이 안 뜨면 아래 navigate 주석을 풀어도 됩니다)
            if (status === 500) {
                console.error("서버 오류:", err.response);
                alert(message || "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
                // navigate("/login");
                return;
            }

            // 그 외 상태코드
            alert(message || "요청을 처리하지 못했습니다.");

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
                                <td colSpan="5" className="no-data">최근 접속 기록이 없습니다.</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Logs;