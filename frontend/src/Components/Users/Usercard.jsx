import { Avatar, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from 'react';
import { followUser } from '../../Api/Api';
const Usercard = (props) => {
    const [follow, setFollow] = useState("Follow");
    const { id, user_id, first_name, last_name, image } = props;
    const updateFollow = async () => {
        if (follow === "Follow") {
            setFollow("Followed");
            await followUser(id);
        }
        else {
            setFollow("Follow");
            await followUser(id);
        }
    }
    return (
        <>
            <Box sx={{
                opacity: 0.8,
                backgroundColor: 'primary.dark',
                '&:hover': {
                    backgroundColor: 'white',
                    opacity: 1,
                },
                my: 2
            }}>
                <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} direction='row' spacing={2} >
                    <Avatar src={image} />
                    <p>{first_name} {last_name}</p>
                    <Button onClick={updateFollow} variant='contained' color='secondary'>{follow}</Button>
                    <Button variant='contained' color='secondary'>Friend</Button>
                </Stack>
            </Box>
        </>
    );
}
export default Usercard;