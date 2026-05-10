import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../assets/css/signup.css';

const SignUp = () => {

    const navigate = useNavigate();

    const [signupForm, setSignupForm] = useState({
        username: '',
        password: '',
        passwordCheck: '',
        name: '',
        gender: '',
        phone: '',
        website: ''
    });

    const [errors, setErrors] = useState({});

    // 2-1. 로그인 폼 유효성 검사
    function signupValidationChk(username, password, passwordCheck, name, gender, phone, website) {

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
            setSignupForm({
                ...signupForm,
                username: ''
            });

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

            setSignupForm({
                ...signupForm,
                password: ''
            });

            return false;
        } else if (password !== passwordCheck) {
            errors.password = "비밀번호가 일치하지 않습니다.";
            setErrors(errors);

            document.querySelector("input[name='password']").focus();

            setSignupForm({
                ...signupForm,
                password: '',
                passwordCheck: ''
            });

            return false;
        } else if (!name) {
            errors.name = "이름을 입력해주세요.";
            setErrors(errors);

            document.querySelector("input[name='name']").focus();

            return false;

        } else if (name.length > 20) {
            errors.name = "이름은 최대 20자까지 입력해야합니다.";
            setErrors(errors);

            document.querySelector("input[name='name']").focus();

            return false;
        } else if (!gender) {
            errors.gender = "성별을 선택해주세요.";
            setErrors(errors);

            document.querySelector("select").focus();

            return false;
        }

        // 2-2. validation을 모두 통과하면 문제 없는 코드이니 errors를 빈값으로 초기화.
        setErrors({});

        return Object.keys(errors).length === 0;
    }

    function goLogInPage() {
        navigate("/login");
    }

    function doSignUp() {

        if (!signupValidationChk(signupForm.username, signupForm.password, signupForm.passwordCheck, signupForm.name, signupForm.gender)) {
            return;
        }

        console.log(signupForm);

        axios.post('/api/auth/signup',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(signupForm),
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        ).then(function (res) {
            console.log(res);

            navigate("/login");

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
            <div id='signup-wrapper'>

                <div id='signup-area'>

                    <h2>IntoCore</h2>

                    <form id='signupForm'>

                        <div className="form-group">
                            <label>아이디:</label>

                            <input
                                type="text"
                                id='username'
                                name='username'
                                placeholder="아이디로 사용할 이메일 입력(ex. example@naver.com)"
                                value={signupForm.username}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        username: e.target.value
                                    })
                                }
                            />
                        </div>
                        {errors.username && (
                            <div className="error-text">{errors.username}</div>
                        )}

                        <div className="form-group">
                            <label>비밀번호:</label>

                            <input
                                type="password"
                                id='password'
                                name='password'
                                placeholder="비밀번호 입력"
                                value={signupForm.password}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        password: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>비밀번호 확인:</label>

                            <input
                                type="password"
                                id='passwordCheck'
                                name='passwordCheck'
                                placeholder="비밀번호 다시 입력"
                                value={signupForm.passwordCheck}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        passwordCheck: e.target.value
                                    })
                                }
                            />
                        </div>
                        {errors.password && (
                            <div className="error-text">{errors.password}</div>
                        )}

                        <div className="form-group">
                            <label>이름:</label>

                            <input
                                type="text"
                                id='name'
                                name='name'
                                placeholder="이름 입력"
                                value={signupForm.name}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        name: e.target.value
                                    })
                                }
                            />
                        </div>
                        {errors.name && (
                            <div className="error-text">{errors.name}</div>
                        )}

                        <div className="form-group">
                            <label>성별:</label>

                            <select
                                value={signupForm.gender}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        gender: e.target.value
                                    })
                                }
                            >
                                <option value={""}>선택</option>
                                <option value={"M"}>남자</option>
                                <option value={"F"}>여자</option>
                            </select>
                        </div>
                        {errors.gender && (
                            <div className="error-text">{errors.gender}</div>
                        )}

                        <div className="form-group">
                            <label>핸드폰 번호:</label>

                            <input
                                type="text"
                                id='phone'
                                name='phone'
                                placeholder="010-0000-0000"
                                value={signupForm.phone}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        phone: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>웹사이트:</label>

                            <input
                                type="text"
                                id='website'
                                name='website'
                                placeholder="https://"
                                value={signupForm.website}
                                onChange={(e) =>
                                    setSignupForm({
                                        ...signupForm,
                                        website: e.target.value
                                    })
                                }
                            />
                        </div>

                    </form>
                    <br /><br />

                    <div id="button-area">
                        <button type="button" onClick={() => doSignUp()}>회원가입</button>
                        <button type="button" onClick={() => goLogInPage()}>취소</button>
                    </div>

                </div>

            </div>
        </>
    );
};

export default SignUp;