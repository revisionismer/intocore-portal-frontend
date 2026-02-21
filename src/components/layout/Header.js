import React from 'react';

import Avatar from '../../assets/img/layout/Avatar.png';
import '../../assets/css/layout/Header.css';

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="logo">WHATAP</div>
                <div className="search-box">
                    <input type="text" placeholder="검색..." />
                </div>
                <div className="user-area">
                    <div className="user-menu">
                        <img src={Avatar} alt="avatar" className="avatar" />
                        <span className="username">홍길동</span>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;