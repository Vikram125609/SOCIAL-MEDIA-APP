import React from "react";
import { Avatar, Button, Stack, Box, Container, Typography } from '@mui/material';
const color = 'secondary';
const Users = (props) => {
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
                            <Box sx={{ display: 'flex', padding: '10px', margin: '10px 0px 10px 0px', borderRadius: '10px', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.43)' }} key={data._id}>
                                <Avatar sx={{ height: 100, width: 100 }} src={data.image} />
                                <p>{data.first_name}</p>
                                <p>{data.last_name}</p>
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