import React from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

function App() {

    const { pathname } = useLocation();

    if (pathname === '/login') {
        return (
            <div>
                <Routes>
                    {/** Tip : exact : true의 의미 " 정확히 /login이란 urlMapping시만 해당 화면으로 이동시킨다는 의미." */}
                    {/** Tip : /login/* -> 뒤에 /*의 의미는 하위 라우팅을 설정할 예정이면 추가하는거 예를들어 /login/add, /login/modify 이런식으로 하위 라우팅을 해야할 경우에는 추가하는데 login은 단일 페이지라 설정할 필요 없음 */}
                    <Route path='/login' exact={true} element={<Login />}></Route>
                </Routes>
            </div>
        );
    }

    return (
        <>
            <Header />
            <Sidebar />
            <Main />
        </>
    );
}

export default App;