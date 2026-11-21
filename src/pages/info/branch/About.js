import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/info/about.css';

import aboutImage from '../../../assets/img/info/about.png';

const About = () => {

    const navigate = useNavigate();

    return (
        <div id='main'>
            <div className='about-container'>
                {/* 1-2. 배너 영역 : 이미지 위에 제목을 겹쳐서 보여준다 */}
                <div className='about-hero'>
                    <img className='about-hero-image' src={aboutImage} alt='사이트 소개 배너' />

                    <div className='about-hero-text'>
                        <h1>사이트 소개</h1>
                        <p>PARK'S에 오신 것을 환영합니다.</p>
                    </div>
                </div>

                {/* 1-3. 소개글 영역 */}
                <div className='about-body'>
                    <p className='about-text'>
                        PARK'S는 회원 관리와 접속 기록을 한곳에서 확인할 수 있는 포털 사이트입니다.
                    </p>
                    <p className='about-text'>
                        여기에 사이트를 만든 이유나 앞으로의 계획을 두세 줄 적어주세요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;