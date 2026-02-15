import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    // 2026-02-15 : react-router를 사용하려면 BrowserRouter로 App.js를감싸야한다 
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
);
