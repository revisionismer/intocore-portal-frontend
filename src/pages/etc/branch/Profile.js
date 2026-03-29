import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/etc/profile.css';

import Avatar from '../../../assets/img/layout/Avatar.png';

const Profile = ({user, setUser}) => {

    const navigate = useNavigate();

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
                        <img id="userProfileImage" src={getProfileImage()} alt="profile" />
                    </div>
                    <div className="profile-id">{user && user.username != null ? user.username : 'Anonymouse'}</div>
                </div>

                {/* 프로필입력 바디 */}
                <div className="profile-body">

                    <div className="form-group">
                        <label>이름</label>
                        {/* { ...user } → 기존 user 객체 복사 */}
                        <input type="text" id='name' name='name' value={user && user.name != null ? user.name : ''} placeholder="이름 입력" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </div>
            
                    <div className="form-group">
                        <label>비밀번호</label>
                        <input type="password" id='password' name='password' placeholder="현재 비밀번호 입력" />
                    </div>

                    <div className="form-group">
                        <label>성별</label>
                        <select>
                            <option>선택</option>
                            <option>남자</option>
                            <option>여자</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>핸드폰 번호</label>
                        <input type="text" id='phone' name='phone' placeholder="010-0000-0000"  value={user && user.phone != null ? user.phone : ''} onChange={(e) => setUser({ ...user, phone: e.target.value })}/>
                    </div>

                    <div className="form-group">
                        <label>웹사이트</label>
                        <input type="text" id='website' name='website' placeholder="https://" value={user && user.website != null ? user.website : ''} onChange={(e) => setUser({ ...user, website: e.target.value })} />
                    </div>

                    <button id='userInfoSaveBtn' className="save-button">저장</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;