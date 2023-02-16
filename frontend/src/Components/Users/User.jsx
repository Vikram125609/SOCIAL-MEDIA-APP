import React, { useState, useEffect } from 'react';
import { allFollowers } from '../../Api/Api';
import Loader from '../Loader/Loader';
import "./User.css"
const User = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const allFollower = async () => {
        setLoading(true);
        const data = await allFollowers();
        setData(data?.data?.data);
        setLoading(false);
        console.log(data?.data?.data)
    }
    useEffect(() => {
        allFollower();
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
        </>
    );
}

export default User;
