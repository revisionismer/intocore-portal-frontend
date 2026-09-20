import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import '../assets/css/main.css';

const Main = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    useEffect(() => {

        const getUser = async () => {
            // 2026-02-26 : ip정보를 따로 적지 말고 package.json에서 설정된 proxy로 자동으로 찾아가게 하자.
            axios.get(`/api/users/s/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    withCredentials: true
                }
            ).then(function (res) {

                console.log(res);


            }).catch(function (res) {
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

            })
        }

        getUser();
    }, [])

    return (
        <div id='main'>
            <div className="hero">
                <div className="overlay"></div>

                <div className="hero-content">
                    <h1>Welcome</h1>
                    <p>당신의 공간을 시작하세요</p>

                    <button>시작하기</button>
                </div>
            </div>

        </div>
    );
};

export default Main;