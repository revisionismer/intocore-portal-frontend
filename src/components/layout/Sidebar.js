import React from 'react';

import '../../assets/css/layout/Sidebar.css';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li>
                        <i className="icon-home"></i>
                        대시보드
                    </li>
                    <li>
                        <i className="icon-chart"></i>
                        모니터링
                    </li>
                    <li>
                        <i className="icon-settings"></i>
                        설정
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;