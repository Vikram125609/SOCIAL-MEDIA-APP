import { Avatar, Box, Stack, Typography } from "@mui/material";
// Importing Icons
import ImageIcon from '@mui/icons-material/Image';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import ArticleIcon from '@mui/icons-material/Article';
// Constants
const postImageWidth = '75px';
const postImageHeight = '75px';
const postContainerBorderRadius = '10px'
const postContainerBoxShadow = '0px 0px 5px 0px rgba(0,0,0,0.43)'

const Createpost = () => {
    return (
        <Box>
            <Stack spacing={2} sx={{ mx: '10px', p: '10px', borderRadius: postContainerBorderRadius, boxShadow: postContainerBoxShadow }}>
                <Stack direction='row' alignItems='center' spacing={2}>
                    <Avatar sx={{ width: postImageWidth, height: postImageHeight }} src={localStorage.getItem('image')} />
                    <Typography fontSize='20px' textAlign='left' padding='10px' width='100%' sx={{ boxShadow: postContainerBoxShadow, borderRadius: '50px' }}>Start a post</Typography>
                </Stack>
                <Stack spacing={2} justifyContent='space-around' direction='row'>
                    <Stack sx={{ cursor: 'pointer' }} spacing={2} direction='row'>
                        <ImageIcon color="primary" />
                        <Typography>Photo</Typography>
                    </Stack>
                    <Stack sx={{ cursor: 'pointer' }} spacing={2} direction='row'>
                        <SmartDisplayIcon color="secondary" />
                        <Typography>Video</Typography>
                    </Stack>
                    <Stack sx={{ cursor: 'pointer' }} spacing={2} direction='row'>
                        <ArticleIcon color="success" />
                        <Typography>Article</Typography>
                    </Stack>

                </Stack>
            </Stack>
        </Box>
    );
}
export default Createpost;