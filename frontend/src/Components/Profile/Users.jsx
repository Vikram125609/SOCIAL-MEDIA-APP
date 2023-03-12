import { Link, useNavigate } from "react-router-dom";

import React from "react";
import { Avatar, Button, Stack, Box, Container, Typography } from '@mui/material';
const color = 'secondary';
const Users = (props) => {
    const navigate = useNavigate();
    const imageClicked = (e) => {
        window.open(e.target.src);
    }
    const { content, data } = props;
    if (content != 'Followers' && content != 'Following') {
        return;
    }
    else {
        return (
            <div>
                {
                    data.map((data) => {
                        return (
                            <Box onClick={() => {
                                navigate(`/profile/${data._id}`, { replace: true })
                            }} sx={{ display: 'flex', padding: '10px', margin: '10px 0px 10px 0px', borderRadius: '10px', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.43)' }} key={data._id}>
                                <Avatar onClick={imageClicked} sx={{ height: 100, width: 100, border: '1px solid' }} src={data.image} />
                                <Typography color='secondary' variant='body1'>{data.first_name}</Typography>
                                <Typography color='secondary' variant='body1'>{data.last_name}</Typography>
                                <Button color={color} variant='outlined'> Message </Button>
                            </Box>
                        )
                    })
                }
            </div>
        );
    }
}
export default Users;