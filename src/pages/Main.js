import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import '../assets/css/Main.css';

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
                console.log(res);

                if (res.code === "ERR_NETWORK") {
                    alert("서버와의 연결이 되어있지 않습니다.");
                    navigate("/login");
                    return false;

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

    return (
        <div id='main'>
            <h3>메인페이지</h3>
        </div>
    );
};

export default Main;