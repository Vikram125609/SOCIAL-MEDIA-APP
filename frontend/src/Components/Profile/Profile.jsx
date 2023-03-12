import { Avatar, Stack, Box, Container, Typography, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { profile } from '../../Api/Api';
import Loader from '../Loader/Loader';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Users from './Users';
import candles from './cover.jpeg';
import Message from './Message';
import { useNavigate } from 'react-router-dom';
const marginTop = 1;
const coverImageHeight = "50vh";
const color = 'secondary';
const Profile = () => {
    const [alignment, setAlignment] = useState('Following');
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [countFollower, setCountFollower] = useState();
    const [countFollowing, setCountFollowing] = useState();
    const [countPost, setCountPost] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const profileData = async () => {
        try {
            const data = {
                id: localStorage.getItem('_id'),
                content: 'profile'
            }
            setLoading(true);
            const profileData = await profile(data);
            setLoading(false);
            setFollower(profileData?.data?.data?.followers);
            setCountFollower(profileData?.data?.data?.followers.length)
            setFollowing(profileData?.data?.data?.following);
            setCountFollowing(profileData?.data?.data?.following.length)
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const imageClicked = (e) => {
        window.open(e.target.src);
    }
    useEffect(() => {
        console.log('This will be executed after every time component render')
        profileData();
    }, []);
    return (
        <>
            {loading ? (<Loader />) : (<Box sx={{ display: 'flex' }} my={marginTop}>
                <Stack sx={{ flex: 2, mx: '10px' }}>
                    <Box
                        className="candles"
                        sx={{
                            backgroundImage: `url(${candles})`,
                            backgroundSize: "cover",
                            height: `${coverImageHeight}`,
                            position: 'relative',
                            color: "#f5f5f5",
                            borderRadius: "10px"
                        }} />
                    <Stack direction='row' margin='140px 0px 0px 0px' spacing={2}>
                        <Avatar onClick={imageClicked} sx={{ height: 200, width: 200, position: 'absolute', zIndex: 1, top: '50vh', }} src={localStorage.getItem('image')} />
                        <h4>{localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')[0]}</h4>
                        <Button color='secondary' variant='outlined'>Followers {countFollower}</Button>
                        <Button color='secondary' variant='outlined'>Post {countPost} </Button>
                        <Button color='secondary' variant='outlined'>Following {countFollowing}</Button>
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
                    </ToggleButtonGroup>
                    {
                        alignment === 'Followers' ? (<Users content={alignment} data={follower} />
                        ) : (<Users content={alignment} data={following} />)
                    }
                </Stack>
                <hr />
                <Stack sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'flex-start', mx: '10px' }}>
                    <Message data={following} />
                </Stack>
            </Box>)}
        </>
    );
};
export default Profile;