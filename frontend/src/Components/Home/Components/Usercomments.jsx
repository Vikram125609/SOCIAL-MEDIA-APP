import { Avatar, Button, Stack, Typography } from '@mui/material';
import React from 'react'

const Usercomments = (props) => {
    const { comments } = props;
    return (
        <Stack my={4}>
            <Typography textAlign='center' variant='h4'>Comments</Typography>
            {
                comments.map((data) => {
                    return (
                        <Stack key={data?._id} my={2}>
                            <Stack sx={{ backgroundColor: '#dfdfdf', borderRadius: '10px' }} p={2} m={1} direction='row' key={data?._id} justifyContent='space-between' alignItems='center'>
                                <Stack spacing={2} direction='row'>
                                    <Avatar src={data?.image} />
                                    <Typography>{data?.first_name}</Typography>
                                    <Typography>{data?.last_name}</Typography>
                                </Stack>
                                <span>{data?.comment}</span>
                            </Stack>
                            <Stack justifyContent='flex-end' paddingRight={1} spacing={1} direction='row'>
                                <span>Like</span>
                                <span>|</span>
                                <span>Reply</span>
                            </Stack>
                        </Stack>
                    )
                })
            }
        </Stack>
    )
}

export default Usercomments
