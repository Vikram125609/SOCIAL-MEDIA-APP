import { Avatar, Box, Button, Divider, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { posts, user } from "../../Api/Api";

// Importing css Files
import "./Home.css"

// Importing Components
import Createpost from "./Createpost";
import Post from "./Post"
import Loader from "../Loader/Loader";

// Constants
const marginTop = 1;

const Home = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userdata, setUserdata] = useState();
    const me = async () => {
        const body = {
            token: localStorage.getItem('token'),
            _id: localStorage.getItem('_id')
        }
        try {
            setLoading(true);
            let data = await user(body);
            data = data?.data?.data;
            localStorage.setItem('image', data.image);
            localStorage.setItem("block_user", data.block_user);
            localStorage.setItem("follow_user", data.follow_user);
            setUserdata(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const feed = async () => {
        try {
            let data = await posts();
            console.log(data?.data?.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
        else {
            me();
            // feed();
        }
    }, [])
    return (
        <div className="homeContainer">
            {
                loading ? (<Loader />) : (
                    <Box sx={{ display: 'flex' }} my={marginTop}>
                        <Stack flex={1} sx={{ mx: '10px' }}>
                            <div>
                                <h1>PROFILE DATA</h1>
                            </div>
                        </Stack>
                        <Stack spacing={2} direction='column' flex={2}>
                            <Createpost />
                            <Post />
                            <Post />
                            <Post />
                        </Stack>
                    </Box>
                )
            }
        </div>
    );
}
export default Home