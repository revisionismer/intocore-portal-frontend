import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../assets/css/Login.css';

const Login = () => {

    const navigate = useNavigate();

    var ACCESS_TOKEN = "";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function doLogin() {

        var loginObject = {
            username: username,
            password: password,
        }

        console.log(loginObject);

        axios.post('/login',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(loginObject),
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
        ).then(function (res) {
            console.log(res);

            // 1-3. response에서 가져온 값을 string으로 만들기 위해 앞에 "" 붙임
            var responseHeader = "" + res.headers.get('authorization');

            ACCESS_TOKEN = responseHeader.substring(7);

            console.log("엑세스 토큰 : " + ACCESS_TOKEN);

            navigate("/");

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
        <>
            <div id='login-wrapper'>
                <div id='login-area'>
                    <h2>IntoCore</h2>
                    <form>
                        <div>
                            <label htmlFor='username'>이메일 : </label>
                            <input type='email' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
                        </div>
                        <div>
                            <label htmlFor='password'>패스워드 : </label>
                            <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="password" />
                        </div>
                    </form>

                    <div id="button-area">
                        <button type="button" onClick={() => doLogin()}>로그인</button>
                        <button type="button" onClick={null}>회원가입</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;