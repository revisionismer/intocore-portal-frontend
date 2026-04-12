import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/etc/profile.css';

import Avatar from '../../../assets/img/layout/Avatar.png';

const Profile = ({ user, setUser }) => {

    const navigate = useNavigate();

    const [userProfileForm, setUserProfileForm] = useState({
        name: "",
        gender: "",
        phone: "",
        website: ""
    });

    // 2026-04-12 : 페이지 로딩시 파라미터로 user가 전달되어 user가 존재하면 user 객체를 form 객체에 복사
    useEffect(() => {
        if (user) {
            setUserProfileForm({
                name: user.name || "",
                gender: user.gender || "",
                phone: user.phone || "",
                website: user.website || ""
            });
        }
    }, [user]);

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

    }, [])

    function profileImageUpload() {

        // 1. 파일 선택창 열기
        const input = document.getElementById("profile-img-input");
        input.click();

        input.onchange = async (e) => {
            const f = e.target.files[0];

            console.log(f);

            // 2. 이미지 체크
            if (!f.type.match("image.*")) {
                alert("이미지를 등록해야 합니다.");
                return;
            }

            // 3. FormData 생성
            const form = document.getElementById("userProfileImageForm");
            const formData = new FormData(form);

            console.log(formData);

            try {
                const res = await axios.put(
                    "/api/users/s/update/profileImage",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        withCredentials: true
                    }
                );

                console.log(res.data);

                // 4. 이미지 미리보기
                const reader = new FileReader();
                reader.onload = (e) => {
                    document
                        .getElementById("userProfileImage")
                        .setAttribute("src", e.target.result);

                    setUser(user => ({
                        ...user,
                        profileImageUrl: e.target.result
                    }));
                };
                reader.readAsDataURL(f);

                // 5. 새로고침
                //             location.reload();

            } catch (error) {
                console.log(error);
            }
        };
    }

    const getProfileImage = () => {
        if (!user?.profileImageUrl) return Avatar;

        if (user.profileImageUrl.startsWith("data:")) {
            return user.profileImageUrl;
        }

        return `/thumnail/${user.profileImageUrl}`;
    };

    const doUpdateProfile = () => {
        alert("수정");
    };

    return (
        <div id='main'>

            {/* 프로필 영역 */}
            <div className="profile-container">

                <form id="userProfileImageForm">
                    <input type="file" className="my_hidden" id="profile-img-input" name="profileImageFile" />
                </form>

                {/* 프로필 영역 헤더 */}
                <div className="profile-header">
                    <div className="profile-image" onClick={() => profileImageUpload()}>
                        {/** Tip : src는 함수나 함수를 실행시키는게 아니라 함수에서 return된 값이 필요하기 때문에 getProfileImage, () => getProfileImage() 이런 형식으로는 쓰면 안된다. */}
                        <img id="userProfileImage" src={getProfileImage()} alt="profile" />
                    </div>
                    <div className="profile-id">{user && user.username != null ? user.username : 'Anonymouse'}</div>
                </div>

                {/* 프로필입력 바디 */}
                <div className="profile-body">

                    <div className="form-group">
                        <label>이름</label>
                        <input type="text" id='name' name='name' value={userProfileForm.name} placeholder="이름 입력" onChange={(e) => setUserProfileForm({ ...userProfileForm, name: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <input type="password" id='password' name='password' placeholder="현재 비밀번호 입력" />
                    </div>

                    <div className="form-group">
                        <label>성별</label>
                        {/* ...객체 -> 얕은 복사 : 1단계만 복사, 내부 객체는 공유 */}
                        <select value={userProfileForm.gender} onChange={(e) => setUserProfileForm({ ...userProfileForm, gender: e.target.value })}>
                            <option value={""}>선택</option>
                            <option value={"M"}>남자</option>
                            <option value={"F"}>여자</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>핸드폰 번호</label>
                        <input type="text" id='phone' name='phone' placeholder="010-0000-0000" value={userProfileForm.phone} onChange={(e) => setUserProfileForm({ ...userProfileForm, phone: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label>웹사이트</label>
                        <input type="text" id='website' name='website' placeholder="https://" value={userProfileForm.website} onChange={(e) => setUserProfileForm({ ...userProfileForm, website: e.target.value })} />
                    </div>

                    <button type='button' id='userInfoSaveBtn' className="save-button" onClick={() => doUpdateProfile()}>저장</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;