import { Avatar, Stack, Box, Typography, TextField, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';
// import Components
import Post from "./Post";
import MessageFriendInbox from './Components/MessageFriendInbox';
// import Socket
import { socket } from '../../socket';
// importing Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// importing Api's
import { profile, userPost } from '../../Api/Api';
import { userFriends } from '../../Api/Api';
import Loader from '../Loader/Loader';
import Users from './Users';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
// importing icons 
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// importing css
import './Message.css'
import './User.css'
import './Profile.css'
import Navbar from '../Navigation/Navbar';
// Constants
const marginTop = 1;
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
    const [selfFriendsData, setSelfFriendsData] = useState([]);
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
    const closeMessageInbox = () => {
        setVisibility('hidden');
    }
    useEffect(() => {
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
        socket.emit('getAgainAllConnectedUsers');
        socket.on('connectedUsers', (data) => {
            setConnectedUsers(data);
        })
    }, []);
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
                    <MessageFriendInbox messageUser={messageUser} messageUserId={messageUserId} closeMessageInbox={closeMessageInbox} />
                </Stack>
            </Box>)}
        </>
    );
};
export default Profile;