import React, { useState } from 'react';

import '../assets/css/Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
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
                    <button type="button" onClick={null}>로그인</button>
                    <button type="button" onClick={null}>회원가입</button>
                </div>
            </div>
        </>
    );
};

export default Login;