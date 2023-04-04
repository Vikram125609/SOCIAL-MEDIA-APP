import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Navbar from '../Navigation/Navbar';

const Post = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
    }, [])
    return (
        <>
            <Navbar />
            <h1>This will be Post Page</h1>
        </>
    );
};

export default Post;