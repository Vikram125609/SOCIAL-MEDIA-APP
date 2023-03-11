import React from "react";
import { Avatar, Stack, Box, Container, Typography } from '@mui/material';
const Users = (props) => {
    const { content, follower, following } = props;
    return (
        <>
            {
                content === 'Followers' ? (
                    follower.map((data) => {
                        return (
                            <div key={data._id}>
                                <p>{data.first_name}</p>
                                <p>{data.last_name}</p>
                                <Avatar sx={{ height: 100, width: 100 }} src={data.image} />
                            </div>
                        )
                    })) : (
                    following.map((data) => {
                        return (
                            <div key={data._id}>
                                <p>{data.first_name}</p>
                                <p>{data.last_name}</p>
                                <Avatar sx={{ height: 100, width: 100 }} src={data.image} />
                            </div>
                        )
                    }))
            }
        </>
    );
}
export default Users;