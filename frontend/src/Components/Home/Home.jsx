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
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'
const postContainerBorderRadius = '10px'
const Home = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userdata, setUserdata] = useState();
    const [display, setDisplay] = useState('none');
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
    const handelPopupDisplay = () => {
        if (display == 'none') {
            setDisplay('block')
        }
        else {
            setDisplay('none')
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
                            <Createpost handelPopupDisplay={handelPopupDisplay} />
                            <Box display={display}>
                                <Stack spacing={2} direction='column' flex={2} sx={{ mx: '10px', p: '10px', borderRadius: postContainerBorderRadius, boxShadow: postContainerBoxShadow }}>
                                    <textarea placeholder="Enter Some Discription"></textarea>
                                    <Stack>
                                        <img style={{ width: '100%' }} src={localStorage.getItem('image')} alt="" />
                                    </Stack>
                                    <Button onClick={handelPopupDisplay} variant="contained">Upload</Button>
                                </Stack>
                            </Box>
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