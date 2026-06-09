import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Board from './pages/board/Board';
import Settings from './pages/etc/Settings';
import SignUp from './pages/SignUp';
import Profile from './pages/etc/branch/Profile';
import Password from './pages/etc/branch/Password';
import Notification from './pages/etc/branch/Notification';
import Sample2 from './pages/etc/branch/Sample2';

function App() {

    const { pathname } = useLocation();

    const [user, setUser] = useState({
        id: "",
        name: "",
        username: "",
        gender: "",
        phone: "",
        profileImageUrl: "",
        website: "",
        bio: ""
    });

    if (pathname === '/login') {
        return (
            <div>
                <Routes>
                    {/** Tip : exact : true의 의미 " 정확히 /login이란 urlMapping시만 해당 화면으로 이동시킨다는 의미." */}
                    {/** Tip : /login/* -> 뒤에 /*의 의미는 하위 라우팅을 설정할 예정이면 추가하는거 예를들어 /login/add, /login/modify 이런식으로 하위 라우팅을 해야할 경우에는 추가하는데 login은 단일 페이지라 설정할 필요 없음 */}
                    <Route path='/login/*' element={<Login />}></Route>
                </Routes>
            </div>
        );
    }

    if (pathname === '/signup') {
        return (
            <div>
                <Routes>
                    {/** Tip : exact : true의 의미 " 정확히 /login이란 urlMapping시만 해당 화면으로 이동시킨다는 의미." */}
                    {/** Tip : /login/* -> 뒤에 /*의 의미는 하위 라우팅을 설정할 예정이면 추가하는거 예를들어 /login/add, /login/modify 이런식으로 하위 라우팅을 해야할 경우에는 추가하는데 login은 단일 페이지라 설정할 필요 없음 */}
                    <Route path='/signup/*' element={<SignUp />}></Route>
                </Routes>
            </div>
        );
    }

    return (
        <>
            <Header user={user} setUser={setUser} />
            <Sidebar />
            <Routes>
                <Route path='/*' element={<Main />} />
                <Route path='/home' element={<Main />} />
                <Route path='/board' element={<Board />} />

                <Route path='/settings' element={<Settings />} />
                <Route path="/settings/profile" element={<Profile user={user} setUser={setUser} />} />
                <Route path="/settings/password" element={<Password user={user} setUser={setUser} />} />
                <Route path="/settings/notification" element={<Notification user={user} setUser={setUser} />} />
                <Route path="/settings/sample2" element={<Sample2 />} />


            </Routes>

        </>
    );
}

export default App;