import { Avatar, Box, Button, Divider, Typography, Stack } from "@mui/material";
// importing Thumb Icons
import { ReactComponent as Thumb } from './../Icons/Thumb.svg';

// Importing Icons
import { useState } from "react";
import Likes from "./Likes";
const postImageWidth = '50px';
const postImageHeight = '50px';
const postContainerBorderRadius = '10px'
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'
const time = new Date();
const Feed = (props) => {
    const { first_name, last_name, image, post } = props;
    const [like, setLike] = useState('outlined');
    const [visibilityLikeContainer, setVisibilityLikeContainer] = useState('hidden');
    const [likeState, setLikeState] = useState('')
    const handelLike = () => {
        if (like === 'outlined') {
            setLikeState(<Thumb />);
            setLike('contained');
        }
        else {
            setLikeState('');
            setLike('outlined');
        }
    }
    const mouseEntered = () => {
        setVisibilityLikeContainer('visible');
    }
    const mouseLeaved = () => {
        setVisibilityLikeContainer('hidden');
    }
    const clickSvgButton = (component) => {
        setLike('contained')
        setLikeState(component);
    }
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
                    <Likes clickSvgButton={clickSvgButton} mouseLeaved={mouseLeaved} visibilityLikeContainer={visibilityLikeContainer} />
                    <Button onMouseEnter={mouseEntered} onClick={handelLike} color='secondary' variant={like}>
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
            </Stack>
        </Box>
    )
};
export default Feed;