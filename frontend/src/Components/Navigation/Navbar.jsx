import Searchuser from "./Searchuser"
import { Link } from "react-router-dom";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { InputAdornment } from "@mui/material";
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
// import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
// import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { find, profileViewCount } from "../../Api/Api";
import { useEffect, useReducer, useState } from "react";
import { socket } from "../../socket";
// importing Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Typography } from "@material-ui/core";

// Constants
const toolbarLeftRightMargin = "100px";
const iconColor = "white";

const initialState = {
    visibilitySearchUserContainer: 'hidden',
    dataSearchUserContainer: [],
    profileViewCount: 0
}
const reducer = (currentState, action) => {
    switch (action.type) {
        case 'hidden':
            return { ...currentState, visibilitySearchUserContainer: 'hidden' };
        case 'data':
            return { ...currentState, dataSearchUserContainer: action.data, visibilitySearchUserContainer: 'visible' };
        case 'profileViewCount':
            return { ...currentState, profileViewCount: action?.profileViewCount }

    }
}

const Navbar = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProfileViewCount = async () => {
        const data = await profileViewCount();
        dispatch({ type: 'profileViewCount', profileViewCount: data?.data?.data?.profileViewCount });
    };

    useEffect(() => {
        socket.on('viewed', ({ profileViewCount }) => {
            toast(`Profile View Count ${profileViewCount}`);
            dispatch({ type: 'profileViewCount', profileViewCount: profileViewCount });
        })
        return () => {
            socket.off('viewed').off();
        }
    }, []);

    useEffect(() => {
        getProfileViewCount();
    },[]);

    const searchUser = async (e) => {
        const data = {
            query: e.target.value
        }
        try {
            const response = await find(data);
            if (response?.data?.data?.data?.length === 0) {
                dispatch({ type: 'hidden' })
            }
            else {
                dispatch({ type: 'data', data: response?.data?.data?.data });
            }
        } catch (error) {
            console.log(error)
        }
    }
    const visibilitySearchUserContainer = () => {
        if (state?.visibilitySearchUserContainer === 'visible') {
            dispatch({ type: 'hidden' });
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="Responsive" color="secondary">
                <Toolbar sx={{ mx: `${toolbarLeftRightMargin}` }}>
                    <Stack direction='row' width="100%" sx={{ justifyContent: "space-between" }}>
                        <Stack direction='row' sx={{ alignItems: "center" }} spacing={2}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit">
                                <LinkedInIcon fontSize="large" />
                            </IconButton>
                            <TextField onBlur={visibilitySearchUserContainer} onChange={searchUser} id="outlined-basic" label="Search By First Name" size="small" variant="outlined" InputProps={{
                                endAdornment: <InputAdornment position="end"> <SearchIcon />  </InputAdornment>,
                            }} />
                        </Stack>
                        <Stack direction="row" spacing={6}>
                            <Link to="/home" >
                                <IconButton
                                    style={{ color: `${iconColor}` }}
                                    size="large"
                                    edge="start"
                                    color="inherit">
                                    <HomeIcon fontSize="large" />
                                </IconButton>
                            </Link>
                            <Link to="/user" >
                                <IconButton
                                    style={{ color: `${iconColor}` }}
                                    size="large"
                                    edge="start"
                                    color="inherit">
                                    <PeopleIcon fontSize="large" />
                                </IconButton>
                            </Link>
                            <Link to="/notifications" >
                                <IconButton
                                    style={{ color: `${iconColor}` }}
                                    size="large"
                                    edge="start"
                                    color="inherit">
                                    <NotificationsIcon fontSize="large" />
                                    <span style={{ color: 'red' }} >{state?.profileViewCount}</span>
                                </IconButton>
                            </Link>
                            <Link to={"/profile/" + localStorage.getItem('_id')} >
                                <IconButton
                                    style={{ color: `${iconColor}` }}
                                    size="large"
                                    edge="start"
                                    color="inherit">
                                    <Avatar alt={localStorage.getItem('first_name')} src={localStorage.getItem('image')} />
                                </IconButton>
                            </Link>
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Searchuser dataSearchUserContainer={state?.dataSearchUserContainer} searchUserContainerVisibility={state?.visibilitySearchUserContainer} />
            <ToastContainer />
        </Box>
    );
};

export default Navbar
