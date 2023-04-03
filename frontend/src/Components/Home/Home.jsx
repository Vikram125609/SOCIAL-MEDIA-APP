import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { user } from "../../Api/Api";

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
    const [userdata, setUserdata] = useState();
    const [display, setDisplay] = useState('none');
    const [image, setImage] = useState();
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
        if (localStorage.getItem('token') === null) {
            navigate('/')
        }
        else {
            me();
        }
    }, [])
    useEffect(() => {
        socket.connect();
    }, [])
    useEffect(() => {
        socket.emit('getAgainAllConnectedUsers');
        socket.on('connectedUsers', (data) => {
            console.log("Home",data);
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
                            <Post image={image} handelPopupDisplay={handelPopupDisplay} display={display} />
                            <Feed />
                            <Feed />
                            <Feed />
                        </Stack>
                    </Box>
                )
            }
        </div>
    );
}
export default Home