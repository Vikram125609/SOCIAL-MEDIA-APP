import { Link } from "react-router-dom";
import React from "react";
import { Avatar, Button, Stack, Box, Container, Typography } from '@mui/material';
const color = 'secondary';
const Users = (props) => {
    const imageClicked = (e) => {
        window.open(e.target.src);
    }
    const { content, data } = props;
    if (content != 'Followers' && content != 'Following' && content != 'Friends') {
        return;
    }
    else {
        return (
            <div>
                {
                    data.map((data) => {
                        return (
                            <Link key={data._id} style={{ textDecoration: 'none' }} to={"/profile/" + data._id} >
                                <Box sx={{ display: 'flex', padding: '10px', margin: '10px 0px 10px 0px', borderRadius: '10px', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.43)' }} key={data._id}>
                                    <Avatar onClick={imageClicked} sx={{ height: 100, width: 100, border: '1px solid black' }} src={data.image} />
                                    <Typography color='secondary' variant='body1'>{data.first_name}</Typography>
                                    <Typography color='secondary' variant='body1'>{data.last_name}</Typography>
                                    <Button color={color} variant='outlined'> Message </Button>
                                </Box>
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}
export default Users;