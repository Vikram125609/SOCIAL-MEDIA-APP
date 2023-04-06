import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPost, user } from "../../Api/Api";

// Importing css Files
import "./Home.css"

// Imporing Socket
import { socket } from './../../socket';

// Importing Components
import Createpost from "./Createpost";
import Feed from "./Feed"
import Post from "./Post";
import Loader from "../Loader/Loader";
import Navbar from "../Navigation/Navbar";

// Constants
const marginTop = 1;
const Home = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [mounting, setMounting] = useState(true);
    const [userdata, setUserdata] = useState();
    const [display, setDisplay] = useState('none');
    const [image, setImage] = useState();
    const [displayImage, setDisplayImage] = useState('');
    const [feed, setFeed] = useState([]);
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
    const getAllPosts = async () => {
        const data = await getAllPost();
        setFeed(data?.data?.data?.post);
    }
    const handelPopupDisplay = () => {
        if (display === 'none') {
            setDisplay('block')
        }
        else {
            setDisplay('none')
        }
    }
    const handelImage = (image) => {
        setImage(image);
    }
    useEffect(() => {
        if (mounting) {
            setMounting(false);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setDisplayImage(reader.result);
        };
        reader.readAsDataURL(image);
        getAllPost();
    }, [image])
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
        else {
            me();
            getAllPosts();
        }
    }, [])
    useEffect(() => {
        socket.connect();
    }, [])
    useEffect(() => {
        socket.emit('getAgainAllConnectedUsers');
        socket.on('connectedUsers', (data) => {
            console.log("Home", data);
        })
    }, []);
    return (
        <div className="homeContainer">
            <Navbar />
            {
                loading ? (<Loader />) : (
                    <Box sx={{ display: 'flex' }} my={marginTop}>
                        <Stack flex={1} sx={{ mx: '10px' }}>
                            <div>
                                <h1>PROFILE DATA</h1>
                            </div>
                        </Stack>
                        <Stack spacing={2} direction='column' flex={2}>
                            <Createpost handelImage={handelImage} handelPopupDisplay={handelPopupDisplay} />
                            <Post displayImage={displayImage} image={image} handelPopupDisplay={handelPopupDisplay} display={display} />
                            {
                                feed.map((data, index) => {
                                    return <Feed key={index} first_name={data?.user_id?.first_name} last_name={data?.user_id?.last_name} image={data?.user_id?.image} post={data?.image} />
                                })
                            }
                        </Stack>
                    </Box>
                )
            }
        </div>
    );
}
export default Home