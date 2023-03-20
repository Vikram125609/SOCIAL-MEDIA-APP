import { Avatar, Box, Button, Divider, Typography, Stack } from "@mui/material";
const marginTop = 1;
const postImageWidth = '50px';
const postImageHeight = '50px';
const postContainerBorderRadius = '10px'
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'
const time = new Date();
const Post = () => {
    return (
        <Box>
            <Stack spacing={2} direction='column' flex={2} sx={{ mx: '10px', p: '10px', borderRadius: postContainerBorderRadius, boxShadow: postContainerBoxShadow }}>
                <Stack direction='row' alignItems='center' justifyContent='space-around'>
                    <Avatar sx={{ width: postImageWidth, height: postImageHeight }} src={localStorage.getItem('image')} />
                    <Divider color='black' width='1px' orientation="vertical" flexItem />
                    <Typography>{localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')}</Typography>
                    <Divider color='black' width='1px' orientation="vertical" flexItem />
                    <Typography>{time.getSeconds() + ' ' + 'sec ago'}</Typography>
                    <Divider color='black' width='1px' orientation="vertical" flexItem />
                    <Typography color='secondary' >Rama commented on this</Typography>
                </Stack>
                <Stack>
                    <img style={{ width: '100%' }} src={localStorage.getItem('image')} alt="" />
                </Stack>
                <Stack direction='row' justifyContent='space-evenly'>
                    <Button color='secondary' variant='outlined'>Like</Button>
                    <Button color='secondary' variant='outlined'>Comment</Button>
                    <Button color='secondary' variant='outlined'>Share</Button>
                </Stack>
            </Stack>
        </Box>
    )
};
export default Post;