import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import Avatar from '../../assets/img/layout/Avatar.png';
import '../../assets/css/layout/header.css';

import { Search } from 'react-bootstrap-icons';

const Header = ({ user, setUser }) => {

    const navigate = useNavigate();

    // 2026-03-28 : 드롭다운 기능을 위해 추가
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {


        // 2026-03-15 : 헤더에서는 auth/me로 서버가 켜져있을때만 getUser()호출하게 변경
        axios.get("/api/users/auth/me",
            {
                withCredentials: true
            }
        ).then(function (res) {

            setUser(res.data.data);

        }).catch(function (err) {
            if (err.response?.status !== 401) {
                console.log(err.response?.data);
            }
        });

    }, []);

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
    };

    const getProfileImage = () => {
        if (!user?.profileImageUrl) return Avatar;

        if (user.profileImageUrl.startsWith("data:")) {
            return user.profileImageUrl;
        }

        return `/thumnail/${user.profileImageUrl}`;
    };

    return (
        <>
            <header className="header">
                <div className="logo">
                    <Link to={'/'}>PARK'S</Link>
                </div>
                <div className="search-box">
                    <Search className="search-icon" />
                    <input type="text" id='searchIcon' placeholder="검색..." />
                </div>
                <div className="user-area">
                    <div className="user-menu" onClick={() => setIsOpen(!isOpen)}>
                        <img src={getProfileImage()} alt="profileImg" className="profileImg" />
                        <span className="username">{user ? user.username : 'Anomymous'}</span>
                    </div>

                    {isOpen && (
                        <div className="dropdown-menu">
                            <div onClick={() => {
                                navigate("/settings/profile");
                                setIsOpen(false);
                            }}>프로필</div>
                            <div onClick={() => {
                                navigate("/settings");
                                setIsOpen(false);
                            }}>설정</div>
                            <div onClick={doLogout}>로그아웃</div>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;