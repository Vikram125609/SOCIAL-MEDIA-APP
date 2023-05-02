import { useReducer, useState } from "react";
import Navbar from "../Navigation/Navbar";
import { notifications } from "../../Api/Api";
import { Stack } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import Userlist from "./Components/Userlist";
import Loader from "../Loader/Loader";

const initialState = {
    profileView: [],
    profileViewCount: 0,
    loading: true
}

const reducer = (currentState, action) => {
    switch (action?.type) {
        case 'profileView':
            return { ...currentState, profileView: action?.data };
        case 'loading':
            return { ...currentState, loading: action?.data };
    }
}

const Notification = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getAllProfileView = async () => {
        try {
            const data = await notifications();
            dispatch({ type: 'profileView', data: data?.data?.data?.profileView });
            dispatch({ type: 'loading', data: false });
        } catch (error) {
            console.log(error);
        }
    }

    useState(() => {
        getAllProfileView();
    }, []);


    return (
        <>
            <Navbar />
            <Typography variant="h5" textAlign='center'>Profile Visitor</Typography>
            {
                state?.loading && <Loader />
            }
            {
                !state?.loading && state?.profileView?.map((data) => {
                    return (
                        <Userlist key={data?._id} first_name={data?.viewer_id?.first_name} last_name={data?.viewer_id?.last_name} image={data?.viewer_id?.image} seen={data?.seen} />
                    );
                })
            }
        </>
    );
};
export default Notification;