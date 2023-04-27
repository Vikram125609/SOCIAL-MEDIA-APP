import { Avatar, Box, Button, Divider, Typography, Stack, TextField } from "@mui/material";

// importing SVG Icons
import { ReactComponent as Thumb } from './../Icons/Thumb.svg';
import { ReactComponent as Love } from './../Icons/Love.svg';
import { ReactComponent as Celebrate } from './../Icons/Celebrate.svg';
import { ReactComponent as Support } from './../Icons/Support.svg';
import { ReactComponent as Insightfull } from './../Icons/Insightfull.svg';
import { ReactComponent as Funny } from './../Icons/Funny.svg';

// importing CSS
import './Feed.css'
// importing Secific home related components
import Likecounter from "./Components/Likecounter";
import Commentcounter from "./Components/Commentcounter";
// importing Icons
import { useEffect, useState } from "react";
import Likes from "./Likes";
import { commentPost, likePost } from "../../Api/Api";
import Userlikes from "./Components/Userlikes";
import Usercomments from "./Components/Usercomments";
const postImageWidth = '50px';
const postImageHeight = '50px';
const postContainerBorderRadius = '10px'
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'
const time = new Date();
const Feed = (props) => {
    const { first_name, last_name, image, post, post_id, likes } = props;
    const [visibilityLikeContainer, setVisibilityLikeContainer] = useState('hidden');
    const [likeState, setLikeState] = useState('')
    const [displayUserLikeContainer, setDisplayUserLikeContainer] = useState('none');
    const [displayUserCommentContainer, setDisplayUserCommentContainer] = useState('none');
    const [displayUserCommentTextBox, setDisplayUserCommentTextBox] = useState('none');
    const handelLike = () => {
        if (likeState === '') {
            setLikeState(<Thumb />);
        }
        else {
            setLikeState('');
        }
    }
    const commentAPost = async () => {
        const data = {
            post_id: post_id
        }
        await commentPost(data);
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
    const displayUsersLikesContainer = () => {
        if (displayUserLikeContainer === 'none') {
            setDisplayUserLikeContainer('block')
        }
        if (displayUserLikeContainer === 'block') {
            setDisplayUserLikeContainer('none')
        }

    }
    const displayUsersCommentContainer = () => {
        if (displayUserCommentContainer === 'none') {
            setDisplayUserCommentContainer('block')
        }
        if (displayUserCommentContainer === 'block') {
            setDisplayUserCommentContainer('none')
        }
    }
    const displayUsersCommentTextBox = () => {
        if (displayUserCommentTextBox === 'none') {
            setDisplayUserCommentTextBox('block')
        }
        if (displayUserCommentTextBox === 'block') {
            setDisplayUserCommentTextBox('none')
        }
    }

    useEffect(() => {
        const data = likes.filter((data) => data._id === localStorage.getItem('_id'));
        if (data[0]?.type) {
            if (data[0]?.type === 1) {
                setLikeState(<Thumb />)
            }
            if (data[0]?.type === 2) {
                setLikeState(<Love />)
            }
            if (data[0]?.type === 3) {
                setLikeState(<Celebrate />)
            }
            if (data[0]?.type === 4) {
                setLikeState(<Support />)
            }
            if (data[0]?.type === 5) {
                setLikeState(<Insightfull />)
            }
            if (data[0]?.type === 6) {
                setLikeState(<Funny />)
            }
        }
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
                    <Button onClick={displayUsersCommentTextBox} color='secondary' variant='outlined'>Comment</Button>
                    <Button color='secondary' variant='outlined'>Share</Button>
                </Stack>
                <hr />
                <Stack sx={{ margin: 0 }}>
                    <Stack direction='row' sx={{ margin: 0, justifyContent: 'space-between' }}>
                        <Likecounter setDisplay={displayUsersLikesContainer} totalLikes={likes.length} />
                        <Commentcounter setDisplay={displayUsersCommentContainer} r totalComments='9' />
                    </Stack>
                    <Stack className='displayUserLikeContainer' sx={{ display: displayUserLikeContainer, maxHeight: '400px', overflow: 'auto' }}>
                        <Userlikes likes={likes} />
                    </Stack>
                    <Stack sx={{ display: displayUserCommentTextBox }}>
                        <Stack display='flex' justifyContent='space-between' alignItems='center' direction='row' >
                            <TextField fullWidth placeholder='Write a comment' />
                            <Button onClick={commentAPost}>Post</Button>
                        </Stack>
                    </Stack>
                    <Stack sx={{ display: displayUserCommentContainer }}>
                        <Usercomments />
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
};
export default Feed;