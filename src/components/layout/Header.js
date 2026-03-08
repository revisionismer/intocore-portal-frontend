import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import Avatar from '../../assets/img/layout/Avatar.png';
import '../../assets/css/layout/header.css';

const Header = () => {

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

                setUser(res.data.data);

            }).catch(function (res) {
                console.log(res);

                if (res.code === "ERR_NETWORK") {
                    alert("서버와의 연결이 되어있지 않습니다.");
                    navigate("/login");
                    return;

                }

                if (res.response.status === 500) {
                    alert(res.response.statusText);
                    navigate("/login");
                    return;
                }

                if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    alert(res.response.data.message);

                    // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                    navigate("/login");
                    return;
                }
            })
        }

        getUser();
    }, [])

    function doLogout() {
        axios.post('/logout',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            null,
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                withCredentials: true
            }
        ).then(function (res) {
            console.log(res);

            navigate("/login");

        }).catch(function (res) {
            console.log(res);

        })
    }

    return (
        <>
            <header className="header">
                <div className="logo">
                    <Link>PARK'S</Link>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="검색..." />
                </div>
                <div className="user-area">
                    <div className="user-menu">
                        <img src={Avatar} alt="avatar" className="avatar" />
                        <span className="username">{user ? user.username : 'Anomymous'}</span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;