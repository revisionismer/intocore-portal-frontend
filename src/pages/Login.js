import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../assets/css/Login.css';

const Login = () => {

    const navigate = useNavigate();

    var ACCESS_TOKEN = "";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    
    // 1-1. 기본적으로 로그인 페이지에 들어오면 쿠키에 access_token이 있다면 삭제(페이지 로딩시 한 번 체크)
    useEffect(() => {

        ACCESS_TOKEN = getCookie('access_token');

        if(ACCESS_TOKEN) {
            deleteCookie('access_token');
        }

    }, []);

    function doLogin() {

        if (!loginValidationChk(username, password)) return;

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

    // 2-1. 로그인 폼 유효성 검사
    function loginValidationChk(username, password) {

        const errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!username) {
            errors.username = "아이디를 입력해주세요.";
            setErrors(errors);

            document.querySelector("input[name='username']").focus();

            return false;

        } else if (!emailRegex.test(username)) {
            errors.username = "이메일 형식이 아닙니다.";
            setErrors(errors);

            document.querySelector("input[name='username']").focus();
            setUsername("");

            return false;
        }

        if (!password) {
            errors.password = "비밀번호를 입력해주세요.";
            setErrors(errors);

            document.querySelector("input[name='password']").focus();

            return false;
        } else if (password.length < 4) {
            errors.password = "비밀번호는 4자리 이상 입력해야합니다.";
            setErrors(errors);

            document.querySelector("input[name='password']").focus();
            setPassword("");

            return false;
        }

        // 2-2. validation을 모두 통과하면 문제 없는 코드이니 errors를 빈값으로 초기화.
        setErrors({});

        return Object.keys(errors).length === 0;
    }

    function getCookie(key) {

        let result = null;
        let cookie = document.cookie.split(';');

        cookie.some(function (item) {
            item = item.replace(' ', '');

            let dic = item.split('=');

            if (key === dic[0]) {
                result = dic[1];
                return true;
            }
            return false;
        });
        return result;
    }

    function deleteCookie(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    return (
        <>
            <div id='login-wrapper'>
                <div id='login-area'>
                    <h2>IntoCore</h2>
                    <form>
                        <div>
                            <label htmlFor='username'>아이디 : </label>
                            <input type='email' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
                        </div>
                        {errors.username && (
                            <div className="error-text">{errors.username}</div>
                        )}
                        <div>
                            <label htmlFor='password'>패스워드 : </label>
                            <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="password" />

                        </div>

                        {errors.password && (
                            <div className="error-text">{errors.password}</div>
                        )}
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