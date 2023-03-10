import { Avatar, Stack, Box, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { profile } from '../../Api/Api';
import Loader from '../Loader/Loader';
const marginTop = 1;
const Profile = () => {
    const [follower, setFollower] = useState([]);
    const [countFollower, setCountFollower] = useState();
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
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log('This will be executed after every time component render')
        profileData();
    }, []);
    return (
        <>
            {loading ? <Loader /> : <Box sx={{ display: 'flex' }} my={marginTop}>
                <Stack sx={{ flex: 2 }}>
                    <Avatar sx={{ height: 200, width: 200 }} src={localStorage.getItem('image')} />
                    <Typography variant='h4'>{localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')[0]}</Typography>
                    <Typography variant='subtitle1'>Followers {countFollower}</Typography>
                    <Typography variant='subtitle1'>Friends {0}</Typography>
                    <Typography variant='subtitle1'>Following {0}</Typography>
                    <hr />
                    <Typography variant='h4'>Followers</Typography>
                    {
                        follower.map((data) => {
                            return (
                                <div key={data._id}>
                                    <p>{data.first_name}</p>
                                    <p>{data.last_name}</p>
                                    <Avatar sx={{ height: 100, width: 100 }} src={data.image} />
                                </div>
                            )
                        })
                    }
                </Stack>
                <Stack sx={{ flex: 1 }}>
                </Stack>
            </Box>}
        </>
    );
};
export default Profile;