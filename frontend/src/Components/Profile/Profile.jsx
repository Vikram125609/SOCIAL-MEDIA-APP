import { Avatar, Stack, Box, Container, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
// import Components
import Post from "./Post";
// import Socket
import { socket } from '../../socket';
// importing Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// importing Api's
import { profile, userPost } from '../../Api/Api';
import { userFriends } from '../../Api/Api';
import Loader from '../Loader/Loader';
import Divider from '@mui/material/Divider';
import Users from './Users';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
// importing icons 
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
// importing css
import './Message.css'
import './User.css'
import './Profile.css'
import Navbar from '../Navigation/Navbar';
// Constants
const marginTop = 1;
const coverImageHeight = "50vh";
const color = 'secondary';
const Profile = () => {
    const [alignment, setAlignment] = useState('Following');
    const [user, setUser] = useState();
    const urlParams = window.location.pathname;
    const id = urlParams.split('/').pop();
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [friends, setFriends] = useState([]);
    const [countFollower, setCountFollower] = useState();
    const [countFollowing, setCountFollowing] = useState();
    const [countFriends, setCountFriends] = useState();
    const [countPost, setCountPost] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState('hidden')
    const [messageUser, setMessageUser] = useState({});
    const [messageUserId, setMessageUserId] = useState('');
    const [messageReceiveUserId, setMessageReceiveUserId] = useState('');
    const [selfFriendsData, setSelfFriendsData] = useState([]);
    const [message, setMessage] = useState('');
    const [received, setReceived] = useState([]);
    const [connectedUsers, setConnectedUsers] = useState([]);
    const [userPostData, setUserPostData] = useState([]);
    const [mounting, setMounting] = useState(true);
    const navigate = useNavigate();
    const profileData = async () => {
        try {
            const data = {
                id: id,
                content: 'profile'
            }
            setLoading(true);
            const profileData = await profile(data);
            setLoading(false);
            setFollower(profileData?.data?.data?.followers);
            setCountFollower(profileData?.data?.data?.followers.length);
            setFollowing(profileData?.data?.data?.following);
            setCountFollowing(profileData?.data?.data?.following.length);
            setFriends(profileData?.data?.data?.friends);
            setCountFriends(profileData?.data?.data?.friends.length);
            setUser(profileData?.data?.data?.user);
        } catch (error) {
            console.log(error);
        }
    }
    const userFriendsData = async () => {
        const friendsData = await userFriends();
        setSelfFriendsData(friendsData?.data?.data?.friends);
    }
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const imageClicked = (e) => {
        window.open(e.target.src);
    };
    const showHideMessageChatContainer = () => {
        setVisibility('visible');
    };
    const setData = (data) => {
        setMessageUser(data);
    };
    const userPosts = async () => {
        const user_id = window.location.pathname.split('/').pop();
        const data = await userPost(user_id);
        setUserPostData(data?.data?.data?.post);
        setCountPost(data?.data?.data?.post?.length);
    };
    const setMessageUsersId = (data) => {
        setMessageUserId(data);
    }
    const sendMessage = (e) => {
        if (e.keyCode === 13) {
            socket.emit('privateMessage', {
                message: message,
                room_id: messageUserId,
                user_id: localStorage.getItem('_id')
            })
            setReceived((prevValue) => {
                return [...prevValue, {
                    'message': message,
                    'position': 'end'
                }];
            })
            setMessage('');
        }
    }
    const handleMessage = (e) => {
        setMessage(e.target.value);
    }
    useEffect(() => {
        // Only for the mounting phase not required to get the friends data baar baar on visiting to each other user profile
        userFriendsData();
    }, []);
    useEffect(() => {
        userPosts();
    }, [id]);
    useEffect(() => {
        profileData();
    }, [id]);
    useEffect(() => {
        if (mounting) {
            socket.emit('profileView', {
                viewed_id: urlParams.split('/').pop(),
                viewer_id: localStorage.getItem('_id')
            })
            setMounting(false);
            return;
        }
        socket.emit('profileView', {
            viewed_id: urlParams.split('/').pop(),
            viewer_id: localStorage.getItem('_id')
        })
    }, [id]);
    useEffect(() => {
        socket.on('broadCast', (data) => {
            const { message, room_id, user_id } = data;
            console.log('room_id', room_id);
            console.log('user_id', user_id);
            setMessageReceiveUserId(`${user_id}`);
            setReceived((prevValue) => {
                return [...prevValue, {
                    'message': message,
                    'position': 'start'
                }]
            });
            toast("New Message Received");
        })
    }, []);
    useEffect(() => {
        // Here I am getting again all connected users
        socket.emit('getAgainAllConnectedUsers');
        socket.on('connectedUsers', (data) => {
            setConnectedUsers(data);
        })
    }, [])
    return (
        <>
            <ToastContainer />
            <Navbar />
            {loading ? (<Loader />) : (<Box sx={{ display: 'flex' }} my={marginTop}>
                <Stack className='userDataContainer' sx={{ flex: 2, mx: '10px' }}>
                    <Box />
                    <Avatar onClick={imageClicked} sx={{ height: 200, width: 200 }} src={user?.image} />
                    <Stack sx={{ justifyContent: 'space-around' }} direction='row' margin='1em 0px 0px 0px' spacing={2}>
                        <h4>{user?.first_name + ' ' + user?.last_name}</h4>
                        <Typography color='secondary' variant='outlined'>Followers {countFollower}</Typography>
                        <Typography color='secondary' variant='outlined'>Post {countPost} </Typography>
                        <Typography color='secondary' variant='outlined'>Following {countFollowing}</Typography>
                        <Typography color='secondary' variant='outlined'>Friends {countFriends}</Typography>
                    </Stack>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        sx={{ display: 'flex', my: '10px' }}
                    >
                        <ToggleButton color={color} sx={{ flex: 1 }} value="Followers">Followers</ToggleButton>
                        <ToggleButton color={color} sx={{ flex: 1 }} value="Post">Post</ToggleButton>
                        <ToggleButton color={color} sx={{ flex: 1 }} value="Following">Following</ToggleButton>
                        <ToggleButton color={color} sx={{ flex: 1 }} value="Friends">Friends</ToggleButton>
                    </ToggleButtonGroup>
                    {
                        alignment === 'Followers' && <Users content={alignment} data={follower} />
                    }
                    {
                        alignment === 'Following' && <Users content={alignment} data={following} />
                    }
                    {
                        alignment === 'Friends' && <Users content={alignment} data={friends} />
                    }
                    {
                        alignment === 'Post' && <Post data={userPostData} />
                    }
                </Stack>
                <hr />
                <Stack className='messageUserContainer' sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', mx: '10px' }}>
                    <Message setMessageUsersId={setMessageUsersId} connectedUsers={connectedUsers} data={selfFriendsData} showHide={showHideMessageChatContainer} getData={setData} />
                </Stack>
                <Stack sx={{ visibility: visibility }} justifyContent='space-between' className='messageChatContainer' >
                    <Stack direction='row' justifyContent='space-around' alignItems='center'>
                        <Avatar sx={{ height: 50, width: 50 }} src={messageUser?.image} />
                        <Typography>{messageUser?.first_name + ' ' + messageUser?.last_name}</Typography>
                        <LocalPhoneIcon />
                        <VideoCallIcon />
                        <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => setVisibility('hidden')} />
                    </Stack>
                    <Stack className='sendreceivedMessageUserContainer' sx={{
                        height: '100%', overflow: 'auto', display: 'flex'
                    }}>
                        {
                            received.map((data, index) => {
                                return (
                                    <div key={index} style={{ display: 'flex', justifyContent: `${data?.position}`, margin: '5px' }}>
                                        <span style={{}}>{data?.message}</span>
                                    </div>
                                )
                            })
                        }
                    </Stack>
                    <TextField onChange={handleMessage} id="outlined-basic" onKeyUp={sendMessage} label="Message" value={message} variant="outlined" InputProps={{
                        endAdornment: <InputAdornment position="end"> <SendIcon onClick={sendMessage} sx={{ cursor: 'pointer' }} />  </InputAdornment>,
                    }} />
                </Stack>
            </Box>)}
        </>
    );
};
export default Profile;