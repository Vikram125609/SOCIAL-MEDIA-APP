import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { allFollowers, allUsers } from '../../Api/Api';
import Loader from '../Loader/Loader';
import Usercard from './Usercard';
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
                                <Usercard  id={data._id} user_id={data.user_id} first_name={data.first_name} last_name={data.last_name} image={data.image} />
                            </div>
                        );
                    })
                )
            }
        </>
    );
}

export default User;
