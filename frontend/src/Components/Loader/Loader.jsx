import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import React from "react";
import "./Loader.css";
const Loader = () => {
    return (
        <Box className='loading' sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>


    );
};

export default Loader;