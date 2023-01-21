import React, { useState, useEffect } from 'react';
import { allFollowers } from '../../Api/Api';
import Loader from '../Loader/Loader';
const User = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const allFollower = async () => {
        setLoading(true);
        const data = await allFollowers();
        setData(data?.data?.data);
        setLoading(false);
    }
    useEffect(() => {
        allFollower();
    }, [])
    return (
        <>
            {
                loading ? (<Loader />) : (
                    data.map((data, index) => {
                        return (<h1 key={index}>{ data.first_name }</h1>);
                    })
                )
            }
        </>
    );
}

export default User;
