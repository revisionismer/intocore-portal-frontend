import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../../../assets/css/info/faq.css';

const Faq = () => {

    const navigate = useNavigate();

    // 1-1. 질문/답변 목록 : 내용만 바꾸거나 추가하면 화면에 그대로 반영된다
    const faqList = [
        {
            q: '회원가입은 어떻게 하나요?',
            a: '로그인 화면의 회원가입 버튼을 눌러 진행합니다. 아이디는 이메일 형식으로 입력해야 합니다.'
        },
        {
            q: '로그인했는데 갑자기 로그인 화면으로 돌아가요.',
            a: '보안을 위해 로그인 후 일정 시간(최대 24시간)이 지나면 자동으로 로그아웃됩니다. 다시 로그인하시면 됩니다.'
        },
        {
            q: '내 정보와 비밀번호는 어디서 바꾸나요?',
            a: '상단 오른쪽 프로필 메뉴의 프로필에서 내 정보를, 설정 메뉴의 비밀번호에서 비밀번호를 변경할 수 있습니다.'
        },
        {
            q: '내 접속 기록을 확인할 수 있나요?',
            a: '설정 메뉴의 접속 로그에서 로그인 일시, IP, 국가, 기기 정보를 확인할 수 있습니다.'
        },
    ];

    // 1-2. 현재 펼쳐진 질문의 번호(없으면 null)
    const [openIndex, setOpenIndex] = useState(null);

    // 1-3. 같은 질문을 다시 누르면 접고, 다른 질문을 누르면 그 질문만 펼친다
    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id='main'>
            <div className='faq-container'>
                <h1>자주 묻는 질문</h1>

                <p className="faq-text">
                    궁금하신 점을 눌러 답변을 확인해 보세요.
                </p>

                {/* 1-4. faqList 배열을 반복 출력 */}
                {faqList.map((item, index) => {
                    // 1-5. 이 질문이 지금 펼쳐진 상태인지 계산
                    const isOpen = openIndex === index;

                    return (
                        <div key={index} className='faq-item'>
                            <div className='faq-question' onClick={() => toggle(index)}>
                                Q. {item.q}
                            </div>

                            {isOpen && (
                                <p className='faq-desc'>A. {item.a}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Faq;