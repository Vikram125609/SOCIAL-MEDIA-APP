import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react'

const Usercomments = (props) => {
    const { comments } = props;
    return (
        <Stack>
            {
                comments.map((data) => {
                    return (
                        <Stack sx={{ backgroundColor: '#dfdfdf', borderRadius: '10px' }} p={2} my={1} direction='row' key={data?._id} justifyContent='space-between' alignItems='center'>
                            <Stack spacing={2} direction='row'>
                                <Avatar src={data?.image} />
                                <Typography>{data?.first_name}</Typography>
                                <Typography>{data?.last_name}</Typography>
                            </Stack>
                            <span>{data?.comment}</span>
                        </Stack>
                    )
                })
            }
        </Stack>
    )
}

export default Usercomments
