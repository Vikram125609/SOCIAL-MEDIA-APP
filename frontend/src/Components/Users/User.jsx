import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { allFollowers, allUsers } from '../../Api/Api';
import Loader from '../Loader/Loader';
import "./User.css"
const User = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const allFollower = async () => {
        setLoading(true);
        const data = await allFollowers();
        setData(data?.data?.data);
        setLoading(false);
        console.log(data?.data?.data)
    }

    const allUser = async () => {
        setLoading(true);
        const data = await allUsers();
        setLoading(false);
        setUsers(data?.data?.data);
    }

    useEffect(() => {
        allFollower();
        allUser();
    }, [])
    return (
        <>
            {
                loading ? (<Loader />) : (
                    data.map((data, index) => {
                        return (
                            <div key={index}>
                                <h1>{data.first_name} {data.last_name}</h1>
                                <img src={data?.image} alt="" width={"100px"} style={{ borderRadius: "50%", objectFit: "cover" }} />
                            </div>);
                    })
                )
            }
            {
                loading ? (<Loader />) : (
                    users.map((data, index) => {
                        return (
                            <div key={index}>
                                <p>{data._id}</p>
                                <p>{data.first_name}</p>
                                <p>{data.last_name}</p>
                                <p>{data.image}</p>
                                <Avatar src={ data.image } />
                                <p>{data.user_id}</p>
                            </div>
                        );
                    })
                )
            }
        </>
    );
}

export default User;
