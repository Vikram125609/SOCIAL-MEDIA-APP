import { Avatar, Box, Button, Divider, Typography, Stack } from "@mui/material";

// importing SVG Icons
import { ReactComponent as Thumb } from './../Icons/Thumb.svg';
import { ReactComponent as Love } from './../Icons/Love.svg';
import { ReactComponent as Celebrate } from './../Icons/Celebrate.svg';
import { ReactComponent as Support } from './../Icons/Support.svg';
import { ReactComponent as Insightfull } from './../Icons/Insightfull.svg';
import { ReactComponent as Funny } from './../Icons/Funny.svg';

// importing Secific home related components
import Userlist from "./Components/Like/Userlist";
// Importing Icons
import { useEffect, useState } from "react";
import Likes from "./Likes";
import { likePost } from "../../Api/Api";
const postImageWidth = '50px';
const postImageHeight = '50px';
const postContainerBorderRadius = '10px'
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'
const time = new Date();
const Feed = (props) => {
    const { first_name, last_name, image, post, post_id, likes, times } = props;
    const [visibilityLikeContainer, setVisibilityLikeContainer] = useState('hidden');
    const [likeState, setLikeState] = useState('')
    const handelLike = () => {
        if (likeState === '') {
            setLikeState(<Thumb />);
        }
        else {
            setLikeState('');
        }
    }
    const mouseEntered = () => {
        setVisibilityLikeContainer('visible');
    }
    const mouseLeaved = () => {
        setVisibilityLikeContainer('hidden');
    }
    const clickSvgButton = async (component, post_id, type) => {
        const data = {
            post_id: post_id,
            type: type
        }
        setLikeState(component);
        await likePost(data);
    }
    useEffect(() => {
        const data = likes.filter((data) => data._id == localStorage.getItem('_id'));
        if (data[0]?.type) {
            if (data[0]?.type == 1) {
                setLikeState(<Thumb />)
            }
            if (data[0]?.type == 2) {
                setLikeState(<Love />)
            }
            if (data[0]?.type == 3) {
                setLikeState(<Celebrate />)
            }
            if (data[0]?.type == 4) {
                setLikeState(<Support />)
            }
            if (data[0]?.type == 5) {
                setLikeState(<Insightfull />)
            }
            if (data[0]?.type == 6) {
                setLikeState(<Funny />)
            }
        }
        // console.log(times.toLocaleTimeString())
        console.log(times)
    }, [likes])
    return (
        <Box>
            <Stack spacing={2} direction='column' flex={2} sx={{ mx: '10px', p: '10px', borderRadius: postContainerBorderRadius, boxShadow: postContainerBoxShadow }}>
                <Stack direction='row' alignItems='center' justifyContent='space-around'>
                    <Avatar sx={{ width: postImageWidth, height: postImageHeight }} src={image} />
                    <Divider color='black' width='1px' orientation="vertical" flexItem />
                    <Typography>{first_name + ' ' + last_name}</Typography>
                    <Divider color='black' width='1px' orientation="vertical" flexItem />
                    <Typography>{time.getSeconds() + ' sec ago'}</Typography>
                    <Divider color='black' width='1px' orientation="vertical" flexItem />
                    <Typography color='secondary' >Rama commented on this</Typography>
                </Stack>
                <Stack>
                    <img style={{ width: '100%' }} src={post} alt="" />
                </Stack>
                <Stack style={{ position: 'relative' }} direction='row' justifyContent='space-evenly'>
                    <Likes post_id={post_id} clickSvgButton={clickSvgButton} mouseLeaved={mouseLeaved} visibilityLikeContainer={visibilityLikeContainer} />
                    <Button onMouseEnter={mouseEntered} onClick={handelLike} color='secondary' variant="outlined">
                        {
                            likeState === '' && <span>Like</span>
                        }
                        {
                            likeState !== '' && likeState
                        }
                    </Button>
                    <Button color='secondary' variant='outlined'>Comment</Button>
                    <Button color='secondary' variant='outlined'>Share</Button>
                </Stack>
                <Stack sx={{ margin: 0 }}>
                    <Stack direction='row' sx={{ margin: 0 }}>
                        <Userlist likes={likes} />
                    </Stack>
                </Stack>
                <hr />
            </Stack>
        </Box>
    )
};
export default Feed;