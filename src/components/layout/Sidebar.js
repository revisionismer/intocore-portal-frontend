import React from 'react';

import '../../assets/css/layout/sidebar.css';

import homeIcon from '../../assets/img/icons/home.png';
import docIcon from '../../assets/img/icons/doc.png';
import settingsIcon from '../../assets/img/icons/settings.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li>
                        <Link to={'/home'}>
                            <img src={homeIcon} className="menu-icon" />
                            홈
                        </Link>
                    </li>
                    <li>
                        <Link to={'/board'}>
                            <img src={docIcon} className="menu-icon" />
                            게시판
                        </Link>
                    </li>
                    <li>
                        <Link to={'/settings'}>
                            <img src={settingsIcon} className="menu-icon" />
                            설정
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;