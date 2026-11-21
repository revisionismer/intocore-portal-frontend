import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Location = () => {

    const navigate = useNavigate();

    return (
        <div id='main'>
            <div className='location-container'>
                <h1>찾아오시는 길</h1>

                <p className="location-text">
                    드루와
                </p>
            </div>
        </div>
    );
};

export default Location;