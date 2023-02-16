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
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Constants
const toolbarLeftRightMargin = "100px";
const iconColor = "white";

const Navbar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="secondary">
                <Toolbar sx={{ mx: `${toolbarLeftRightMargin}` }}>
                    <Stack direction='row' width="100%" sx={{ justifyContent: "space-between" }}>
                        <Stack direction='row' sx={{ alignItems: "center" }} spacing={2}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit">
                                <LinkedInIcon fontSize="large" />
                            </IconButton>
                            <TextField id="outlined-basic" label="Search" size="small" variant="outlined" InputProps={{
                                endAdornment: <InputAdornment position="end"> <SearchIcon />  </InputAdornment>,
                            }} />
                        </Stack>
                        <Stack direction="row" spacing={3}>
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
                            <Link to="/home" >
                                <IconButton
                                    style={{ color: `${iconColor}` }}
                                    size="large"
                                    edge="start"
                                    color="inherit">
                                    <ControlPointOutlinedIcon fontSize="large" />
                                </IconButton>
                            </Link>
                            <Link to="/user" >
                                <IconButton
                                    style={{ color: `${iconColor}` }}
                                    size="large"
                                    edge="start"
                                    color="inherit">
                                    <MessageIcon fontSize="large" />
                                </IconButton>
                            </Link>
                            <Link to="/home" >
                                <IconButton
                                    style={{ color: `${iconColor}` }}
                                    size="large"
                                    edge="start"
                                    color="inherit">
                                    <NotificationsIcon fontSize="large" />
                                </IconButton>
                            </Link>
                            <Link to="/user" >
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
        </Box>
    );
};

export default Navbar
