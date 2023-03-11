import { Avatar, Stack, Box, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { profile } from '../../Api/Api';
import Loader from '../Loader/Loader';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Users from './Users';
const marginTop = 1;
const Profile = () => {
    const [alignment, setAlignment] = useState('Following');
    const [follower, setFollower] = useState([]);
    const [following, setFollowing] = useState([]);
    const [countFollower, setCountFollower] = useState();
    const [countFollowing, setCountFollowing] = useState();
    const [loading, setLoading] = useState(true);
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
    useEffect(() => {
        console.log('This will be executed after every time component render')
        profileData();
    },[]);
    return (
        <>
            {loading ? (<Loader />) : (<Box sx={{ display: 'flex' }} my={marginTop}>
                <Stack sx={{ flex: 2 }}>
                    <Avatar sx={{ height: 200, width: 200 }} src={localStorage.getItem('image')} />
                    <Typography variant='h4'>{localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')[0]}</Typography>
                    <Typography variant='subtitle1'>Followers {countFollower}</Typography>
                    <Typography variant='subtitle1'>Post {0}</Typography>
                    <Typography variant='subtitle1'>Following {countFollowing}</Typography>
                    <hr />
                    <Typography variant='h4'>{alignment}</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        sx={{ display: 'flex' }}
                    >
                        <ToggleButton sx={{ flex: 1 }} value="Followers">Followers</ToggleButton>
                        <ToggleButton sx={{ flex: 1 }} value="Post">Post</ToggleButton>
                        <ToggleButton sx={{ flex: 1 }} value="Following">Following</ToggleButton>
                    </ToggleButtonGroup>
                    <Users content={alignment} follower={follower} following={following} />
                </Stack>
                <Stack sx={{ flex: 1 }}>
                </Stack>
            </Box>)}
        </>
    );
};
export default Profile;