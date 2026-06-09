import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/etc/password.css';

const Password = ({ user, setUser }) => {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordChk, setNewPasswordChk] = useState("");

    useEffect(() => {


    }, []);

    const doUpdatePassword = () => {
        const url = `/api/users/s/${user.id}/password`;

        console.log(url);

        if (password == '') {
            alert("비밀번호를 입력해주세요.");
            document.querySelector("#password").focus();
            return;
        }

        if (newPassword == '') {
            alert("새 비밀번호를 입력해주세요.");
            document.querySelector("#newPassword").focus();
            return;
        }

        if (newPasswordChk == '') {
            alert("새 비밀번호 확인을 입력해주세요.");
            document.querySelector("#newPasswordChk").focus();
            return;
        }

        if (newPassword !== newPasswordChk) {
            alert("비밀번호가 서로 다릅니다.");
            document.querySelector("#newPassword").focus();
            document.querySelector("#newPassword").value = '';
            document.querySelector("#newPasswordChk").value = '';
            return;
        }

        const updatePasswordForm = {
            curPassword: password,
            newPassword: newPassword,
            newPasswordChk: newPasswordChk
        }

        console.log(updatePasswordForm);

        axios.put(url,
            // 2-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(updatePasswordForm),
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
            {/* 비밀번호 변경 영역 */}
            <div className="password-container">

                <div className="form-group">
                    <label>현재 비밀번호</label>

                    <input type="password" id='password' name='password' placeholder="현재 비밀번호 입력" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />

                <div className="form-group">
                    <label>새 비밀번호</label>

                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="새 비밀번호 입력"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <br />

                <div className="form-group">
                    <label>비밀번호 확인</label>

                    <input
                        type="password"
                        id="newPasswordChk"
                        name="newPasswordChk"
                        placeholder="새 비밀번호 재입력"
                        onChange={(e) => setNewPasswordChk(e.target.value)}
                    />
                </div>
                <br />

                <button type="button"
                    id="passwordSaveBtn"
                    className="save-button"
                    onClick={() => doUpdatePassword()}
                >
                    비밀번호 변경
                </button>

            </div>


        </div>
    );
};

export default Password;